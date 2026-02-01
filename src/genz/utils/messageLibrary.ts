// Simple client-side message library shared between Creator Network and Library.
// Stores message history in localStorage so both sections can read/write.
// Also optionally syncs messages to Supabase if configured, so other
// services or dashboards can consume the same history.

import { supabase } from "@/lib/supabaseClient";

export type ParticipantRole = "creator" | "mentor" | "sponsor";
export type MessageDirection = "sent" | "received";

export interface LibraryMessage {
  id: string;
  participantName: string;
  participantRole: ParticipantRole;
  content: string;
  direction: MessageDirection;
  // ISO timestamp string
  createdAt: string;
  // Where the message originated from (for analytics / UI hints)
  source: "creator-network" | "library";
}

const STORAGE_KEY = "creatoros_message_library_v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadMessages(): LibraryMessage[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    // Basic runtime validation / normalization
    return parsed
      .map((m) => {
        if (!m || typeof m !== "object") return null;
        const obj = m as Partial<LibraryMessage>;
        if (!obj.participantName || !obj.content) return null;
        return {
          id: obj.id ?? crypto.randomUUID(),
          participantName: String(obj.participantName),
          participantRole: (obj.participantRole ?? "creator") as ParticipantRole,
          content: String(obj.content),
          direction: (obj.direction ?? "sent") as MessageDirection,
          createdAt: obj.createdAt ?? new Date().toISOString(),
          source: (obj.source ?? "library") as LibraryMessage["source"],
        } satisfies LibraryMessage;
      })
      .filter((m): m is LibraryMessage => Boolean(m));
  } catch {
    return [];
  }
}

export function saveMessages(messages: LibraryMessage[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore write errors (e.g. private mode quota)
  }
}

export function removeMessagesForParticipant(participantName: string, participantRole?: ParticipantRole) {
  const existing = loadMessages();
  const filtered = existing.filter((m) => {
    if (m.participantName !== participantName) return true;
    if (participantRole && m.participantRole !== participantRole) return true;
    return false;
  });
  saveMessages(filtered);
}

export function appendMessage(partial: {
  participantName: string;
  participantRole?: ParticipantRole;
  content: string;
  direction?: MessageDirection;
  source?: LibraryMessage["source"];
}): LibraryMessage {
  const existing = loadMessages();
  const now = new Date().toISOString();

  const message: LibraryMessage = {
    id: crypto.randomUUID(),
    participantName: partial.participantName,
    participantRole: partial.participantRole ?? "creator",
    content: partial.content,
    direction: partial.direction ?? "sent",
    createdAt: now,
    source: partial.source ?? "library",
  };

  const next = [...existing, message];
  saveMessages(next);

  // Fire-and-forget Supabase sync. This is best-effort only and won't
  // block the UI or throw if Supabase isn't configured or the table
  // doesn't exist yet.
  void syncMessageToSupabase(message);

  return message;
}

async function syncMessageToSupabase(message: LibraryMessage): Promise<void> {
  if (!supabase) return;

  // Expected Supabase table (you'll need to create this in your project):
  //   message_library (
  //     id uuid primary key default gen_random_uuid(),
  //     created_at timestamptz default now(),
  //     participant_name text,
  //     participant_role text,
  //     content text,
  //     direction text,
  //     source text
  //   )
  try {
    await supabase.from("message_library").insert({
      id: message.id,
      created_at: message.createdAt,
      participant_name: message.participantName,
      participant_role: message.participantRole,
      content: message.content,
      direction: message.direction,
      source: message.source,
    });
  } catch (error) {
    // Non-fatal: log and continue. Local history still works.
    console.error("Failed to sync message to Supabase", error);
  }
}
