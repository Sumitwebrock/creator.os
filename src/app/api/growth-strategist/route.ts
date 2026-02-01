import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/geminiClient";
import { getServerSupabase } from "@/lib/supabaseServerClient";

export async function POST(req: NextRequest) {
  // Robustly extract channelUrl from the request body.
  let channelUrl: string | undefined;
  try {
    const bodyText = await req.text();
    if (bodyText) {
      const parsed = JSON.parse(bodyText) as { channelUrl?: string };
      channelUrl = parsed.channelUrl;
    }
  } catch {
    channelUrl = undefined;
  }

  if (!channelUrl) {
    // For local/demo and robustness, fall back to a placeholder channel URL
    // instead of failing hard. The UI only needs some strategy JSON.
    channelUrl = "unknown-channel";
  }

  // If GEMINI_API_KEY is missing, return a deterministic demo response
  // instead of a 500 so the UI still "works" in local/dev without setup.
  if (!process.env.GEMINI_API_KEY) {
    console.warn("/api/growth-strategist called without GEMINI_API_KEY – returning demo data");

    const demo = {
      whatToPost:
        "Short, high-retention explainers and behind-the-scenes clips that double-down on your strongest performing topics.",
      duration:
        "8–12 minutes for long-form explainers, 35–55 seconds for shorts/reels with a clear A → B transformation.",
      postingTime:
        "Weekdays 4–7 PM in your audience's primary time zone, plus 1 weekend upload for experimentation.",
      emotionalTone:
        "Confident, playful, and slightly opinionated – speak like a trusted friend who has receipts, not a lecturer.",
      collabSuggestion:
        "Pair with adjacent-niche creators for 2-part collabs (your channel = depth, their channel = social proof / reaction).",
      // Cards for the visual dashboard (trending topics, times, sentiment, score)
      trendingTopics: [
        { topic: "AI productivity tools", growth: "+320% this week", trend: "up" },
        { topic: "Workflow optimization", growth: "+185% this week", trend: "up" },
        { topic: "Content batching", growth: "-12% this week", trend: "down" },
      ],
      bestTimes: [
        { day: "Monday", time: "2:00 PM", engagement: "High" },
        { day: "Wednesday", time: "6:00 PM", engagement: "Very High" },
        { day: "Friday", time: "12:00 PM", engagement: "Medium" },
      ],
      audienceSentiment: {
        positivePercent: 78,
        breakdown: [
          { emoji: "😍", label: "Love it", percent: 45 },
          { emoji: "👍", label: "Like it", percent: 33 },
          { emoji: "🤔", label: "Curious", percent: 22 },
        ],
      },
      growthScore: {
        overall: 8.7,
        delta: "+2.3",
        metrics: [
          { label: "Engagement", value: 9.2 },
          { label: "Consistency", value: 8.5 },
          { label: "Reach", value: 8.9 },
          { label: "Quality", value: 8.2 },
        ],
      },
      _demo: true,
    } as const;

    try {
      const supabase = getServerSupabase();
      if (supabase) {
        await supabase.from("growth_strategies").insert({
          channel_url: channelUrl,
          result: demo,
        });
      }
    } catch (err) {
      console.error("Failed to persist demo growth strategy to Supabase", err);
    }

    return NextResponse.json(demo);
  }

  const prompt = `You are CreatorOS, an AI growth strategist for creators.
Given a creator channel link, infer their niche, content pacing, and audience.
Generate a concise JSON strategy with keys:
  whatToPost, duration, postingTime, emotionalTone, collabSuggestion,
  trendingTopics (array of { topic, growth, trend }),
  bestTimes (array of { day, time, engagement }),
  audienceSentiment ({ positivePercent, breakdown: [{ emoji, label, percent }]}),
  growthScore ({ overall, delta, metrics: [{ label, value }]}).
Keep each field short (1-2 sentences or compact values) and respond strictly as JSON only.

Channel URL: ${channelUrl}`;

  try {
    const raw = await generateWithGemini(prompt, 0.7);

    try {
      const parsed = JSON.parse(raw);

      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from("growth_strategies").insert({
            channel_url: channelUrl,
            result: parsed,
          });
        }
      } catch (dbErr) {
        console.error("Failed to persist growth strategy to Supabase", dbErr);
      }

      return NextResponse.json(parsed);
    } catch {
      // Raw, non-JSON Gemini response (often JSON wrapped in markdown fences).
      // Try to recover a JSON object from within the raw string; if that fails,
      // fall back to returning { raw } so the UI can still show something.
      let parsedFromRaw: unknown = null;
      if (typeof raw === "string") {
        const firstBrace = raw.indexOf("{");
        const lastBrace = raw.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          const inner = raw.slice(firstBrace, lastBrace + 1);
          try {
            parsedFromRaw = JSON.parse(inner);
          } catch {
            parsedFromRaw = null;
          }
        }
      }

      const resultToStore = parsedFromRaw ?? { raw };

      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from("growth_strategies").insert({
            channel_url: channelUrl,
            result: resultToStore,
          });
        }
      } catch (dbErr) {
        console.error("Failed to persist raw growth strategy to Supabase", dbErr);
      }

      return NextResponse.json(resultToStore, { status: 200 });
    }
  } catch (err) {
    console.error("/api/growth-strategist Gemini error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to call Gemini for growth strategist", details: message },
      { status: 500 },
    );
  }
}
