import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/geminiClient";
import { getServerSupabase } from "@/lib/supabaseServerClient";

export async function POST(req: NextRequest) {
  // If GEMINI_API_KEY is missing, fall back to deterministic demo data
  // so the UI can still show realistic behavior in local/dev.
  if (!process.env.GEMINI_API_KEY) {
    console.warn("/api/sponsor-match called without GEMINI_API_KEY – returning demo data");

    const body = await req.json().catch(() => ({}));
    const { brand, budget, niche, region } = body as {
      brand?: string;
      budget?: string;
      niche?: string;
      region?: string;
    };

    if (!brand || !budget || !niche || !region) {
      return NextResponse.json(
        { error: "brand, budget, niche, and region are required" },
        { status: 400 },
      );
    }

    const demo = {
      creators: [
        {
          handle: "@StudioWorkflow",
          niche: `${niche} • deep-dive tutorials and workflow breakdowns`,
          matchScore: 92,
          region,
        },
        {
          handle: "@NightShiftCreator",
          niche: `${niche} • late-night productivity and desk setup content`,
          matchScore: 88,
          region,
        },
        {
          handle: "@DailySystems",
          niche: `${niche} • systems, automations, and creator tooling`,
          matchScore: 84,
          region,
        },
      ],
      contractPreview:
        `CreatorOS demo contract for ${brand}: 1–2 integrated videos + 3 short clips, 45-day usage rights across organic channels, payment on delivery via escrow, and clear approval checkpoints. Budget range: ${budget}.`,
      _demo: true,
    } as const;

    try {
      const supabase = getServerSupabase();
      if (supabase) {
        await supabase.from("sponsor_matches").insert({
          brand,
          budget,
          niche,
          region,
          result: demo,
        });
      }
    } catch (err) {
      console.error("Failed to persist demo sponsor matches to Supabase", err);
    }

    return NextResponse.json(demo);
  }

  const body = await req.json().catch(() => ({}));
  const { brand, budget, niche, region } = body as {
    brand?: string;
    budget?: string;
    niche?: string;
    region?: string;
  };

  if (!brand || !budget || !niche || !region) {
    return NextResponse.json(
      { error: "brand, budget, niche, and region are required" },
      { status: 400 },
    );
  }

  const prompt = `You are CreatorOS, an AI sponsorship strategist.
Given a brand brief, suggest a few fictional creator profiles with match scores and a short contract summary.
Return compact JSON with keys: creators (array of {handle, niche, matchScore, region}), contractPreview (2-4 short sentences).
Keep the response short and information-dense.

Brand: ${brand}
Budget: ${budget}
Niche: ${niche}
Region: ${region}`;

  try {
    const raw = await generateWithGemini(prompt, 0.75);

    try {
      const parsed = JSON.parse(raw);

      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from("sponsor_matches").insert({
            brand,
            budget,
            niche,
            region,
            result: parsed,
          });
        }
      } catch (dbErr) {
        console.error("Failed to persist sponsor matches to Supabase", dbErr);
      }

      return NextResponse.json(parsed);
    } catch {
      // Persist raw response shape as well for debugging.
      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from("sponsor_matches").insert({
            brand,
            budget,
            niche,
            region,
            result: { raw },
          });
        }
      } catch (dbErr) {
        console.error("Failed to persist raw sponsor matches to Supabase", dbErr);
      }

      return NextResponse.json({ raw }, { status: 200 });
    }
  } catch (err) {
    console.error("/api/sponsor-match Gemini error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to call Gemini for sponsor match", details: message },
      { status: 500 },
    );
  }
}
