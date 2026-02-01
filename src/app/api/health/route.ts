import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseServerClient";

export async function GET(_req: NextRequest) {
  const supabase = getServerSupabase();

  let dbStatus: "ok" | "error" | "not_configured" = "not_configured";
  let dbError: string | null = null;

  if (supabase) {
    try {
      // Lightweight ping against a small table; adjust if needed.
      const { error } = await supabase.from("growth_strategies").select("id").limit(1);
      if (error) {
        dbStatus = "error";
        dbError = error.message ?? "Unknown Supabase error";
      } else {
        dbStatus = "ok";
      }
    } catch (err) {
      dbStatus = "error";
      dbError = err instanceof Error ? err.message : "Unknown Supabase exception";
    }
  }

  return NextResponse.json({
    server: "ok",
    database: dbStatus,
    databaseError: dbError,
  });
}
