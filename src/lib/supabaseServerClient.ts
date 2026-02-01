import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Prefer secure, server-side credentials when available.
// Falls back to the public anon key so local/dev still works,
// but you should use SUPABASE_SERVICE_ROLE_KEY for production writes.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseServerClient: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "Supabase server credentials are not fully configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY for dev).",
  );
} else {
  supabaseServerClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  });
}

export function getServerSupabase(): SupabaseClient | null {
  return supabaseServerClient;
}
