import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/geminiClient";

interface ApiChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { messages } = body as { messages?: ApiChatMessage[] };

  const safeMessages: ApiChatMessage[] = Array.isArray(messages)
    ? messages.filter(
        (m): m is ApiChatMessage =>
          !!m && typeof m.content === "string" &&
          (m.role === "user" || m.role === "assistant" || m.role === "system"),
      )
    : [];

  const lastUser = safeMessages.filter((m) => m.role === "user").at(-1)?.content;

  // Demo fallback when GEMINI_API_KEY is not configured
  if (!process.env.GEMINI_API_KEY) {
    const reply =
      lastUser?.trim()
        ? `Demo mode: I can't call the real AI in this environment, but based on your question, I'd suggest breaking it into clear steps and focusing on one platform or feature at a time. You asked: "${lastUser.trim()}"`
        : "Hi! I'm CreatorOS AI in demo mode. Ask me about content ideas, audience growth, or brand deals, and I'll walk you through example strategies.";

    return NextResponse.json({ reply, demo: true });
  }

  const historyText = safeMessages
    .map((m) => {
      const speaker =
        m.role === "user" ? "User" : m.role === "assistant" ? "Assistant" : "System";
      return `${speaker}: ${m.content}`;
    })
    .join("\n");

  const prompt = `You are CreatorOS AI, a focused assistant for content creators.
You help with:
- content ideas and scripts
- audience and growth strategy
- sponsorships and collaborations

Continue the conversation below. Be concise, concrete, and friendly. Use short paragraphs and bullets when helpful.

Conversation so far (User and Assistant):
${historyText || "(no prior messages)"}

Now respond as CreatorOS AI to the latest user message. Do not include any JSON or markdown fences, just plain text.`;

  try {
    const raw = await generateWithGemini(prompt, 0.8);
    const reply = raw.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Gemini returned an empty reply" },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("/api/chat Gemini error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to call Gemini for chat", details: message },
      { status: 500 },
    );
  }
}
