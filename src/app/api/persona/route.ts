import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/geminiClient";
import { getServerSupabase } from "@/lib/supabaseServerClient";

type PersonaRequestBody = {
  videoUrl?: string;
  textInput?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as PersonaRequestBody;
  const { videoUrl, textInput } = body;

  // Require at least one input source
  if (!videoUrl && !textInput) {
    return NextResponse.json(
      { error: "videoUrl or textInput is required" },
      { status: 400 },
    );
  }

  // If GEMINI_API_KEY is missing, return a static but realistic persona
  // so the front-end experience still works in demo/local environments.
  if (!process.env.GEMINI_API_KEY) {
    console.warn("/api/persona called without GEMINI_API_KEY – returning demo data");

    const demoBase = {
      tone: "High-energy but honest, with friendly storytelling and self-aware humor.",
      style:
        "Fast cuts, on-screen text for key points, B‑roll of desk / timeline, and a clear narrative arc (problem → experiment → takeaway).",
      titleSuggestion: "I Automated My Entire Creator Workflow In One Weekend (Here’s What Broke)",
      thumbnailIdea:
        "Creator looking overwhelmed in front of a cluttered timeline, bold text 'THIS FIXED EVERYTHING', neon pink/purple gradient background.",
      scriptHook:
        "Okay, imagine you wake up tomorrow and your entire creator workflow runs itself – no missed uploads, no 3am edits. That’s basically what I tried this week…",
      scriptIdeas: [
        "My honest thoughts on AI tools (hot take alert)",
        "I automated my entire content calendar with AI (here’s what broke)",
        "Behind the scenes: how I batch a month of videos in 5 days",
      ],
      captionSuggestions: [
        { text: "Spent 12hrs on this... worth it? 🎨✨", match: 98 },
        { text: "POV: You finally crack the algorithm", match: 96 },
        { text: "This changed everything for me ngl", match: 94 },
      ],
      improvementTips:
        "1. Hook: Make the first 3 seconds visually chaotic, then snap to a clean system with a bold on-screen promise.\n2. Pacing: Cut any clip that doesn’t move the story forward in 2–3 seconds.\n3. Retention: Tease the final result early (before/after metrics) and only reveal the full breakdown at the end.\n4. CTA: End with a specific next step – download your template, watch the follow‑up, or comment with their current workflow problem.",
      _demo: true as const,
    };

    const demo = videoUrl
      ? {
          ...demoBase,
          text:
            "Inferred from URL only: this is likely a creator video about productivity / creator workflow. The exact content cannot be viewed, only the URL string.",
          videoUrl,
        }
      : {
          ...demoBase,
          text:
            "Inferred from your text only: this is likely a creator video idea or script about productivity / creator workflow.",
          sourceTextPreview:
            textInput && textInput.length > 160
              ? `${textInput.slice(0, 160)}…`
              : textInput ?? "",
        };

    // Only persist when we have a video URL, to avoid schema issues for text-only analyses.
    if (videoUrl) {
      try {
        const supabase = getServerSupabase();
        if (supabase) {
          await supabase.from("persona_analyses").insert({
            video_url: videoUrl,
            result: demo,
          });
        }
      } catch (err) {
        console.error("Failed to persist demo persona to Supabase", err);
      }
    }

    return NextResponse.json(demo);
  }

  const isTextMode = !!textInput && !videoUrl;

  const prompt = isTextMode
    ? `You are CreatorOS, an AI assistant for content creators.
You are given a text snippet that describes a creator's style, script, or video idea.
You CANNOT watch any actual video – you only see the raw text.

1) Infer what you reasonably can from the text (topic, format, platform if obvious).
2) Then give clear, structured, best-practice suggestions that a creator can apply to improve their next video.
3) Make the writing concise and well organized (short paragraphs, numbered lists, and bullets where helpful).
4) Do NOT wrap the JSON response in markdown code fences or backticks. Return raw JSON only.

Respond STRICTLY in JSON with these keys:
- text: short inferred summary of what this video or idea is probably about. Mention that it is inferred from the provided text only.
- tone: description of the likely emotional tone and energy.
- style: description of likely pacing, editing, persona, and narrative style.
- titleSuggestion: improved video title idea.
- thumbnailIdea: description of a better thumbnail concept (framing, text, emotion).
- scriptHook: 1–2 sentence cold open hook in this creator's style.
- scriptIdeas: an array of 3–5 short video idea titles that fit this creator's style.
- captionSuggestions: an array of 3–5 objects with { text: string, match: number } where match is a 0–100 style/tone match score.
- improvementTips: a structured list in plain text (use line breaks and numbered / dash bullets) on what to improve next time (hook, pacing, retention, CTA, etc.).

Keep everything concrete and practical, and keep sentences tight and easy to scan.

Input text:
${textInput}`
    : `You are CreatorOS, an AI assistant for content creators.
Given a link to a creator video (YouTube, TikTok, or Instagram), you CANNOT actually watch or fetch the video.
You only see the URL string. You must be honest about this limitation.

1) Infer what you reasonably can from the URL (topic, format, platform).
2) Then give **clear, structured, best-practice suggestions** that a creator can apply to improve their next video.
3) Make the writing concise and well organized (short paragraphs, numbered lists, and bullets where helpful).
4) Do NOT wrap the JSON response in markdown code fences or backticks. Return **raw JSON only**.

Respond STRICTLY in JSON with these keys:
- text: short inferred summary of what this video is probably about. Mention that it is inferred from the URL only.
- tone: description of the likely emotional tone and energy.
- style: description of likely pacing, editing, persona, and narrative style.
- titleSuggestion: improved video title idea.
- thumbnailIdea: description of a better thumbnail concept (framing, text, emotion).
- scriptHook: 1–2 sentence cold open hook in this creator's style.
- scriptIdeas: an array of 3–5 short video idea titles that fit this creator's style.
- captionSuggestions: an array of 3–5 objects with { text: string, match: number } where match is a 0–100 style/tone match score.
- improvementTips: a structured list in plain text (use line breaks and numbered / dash bullets) on what to improve next time (hook, pacing, retention, CTA, etc.).

Keep everything concrete and practical, and keep sentences tight and easy to scan.

Video URL: ${videoUrl}`;

  try {
    const raw = await generateWithGemini(prompt, 0.6);

    try {
      // Some Gemini responses may wrap JSON in ``` or ```json fences. Strip them first.
      let cleaned = raw.trim();
      if (cleaned.startsWith("```")) {
        const lines = cleaned.split(/\r?\n/);
        // drop first line (``` or ```json)
        lines.shift();
        // drop last line if it's a closing ```
        if (lines.length && lines[lines.length - 1].trim() === "```") {
          lines.pop();
        }
        cleaned = lines.join("\n").trim();
      }

      const parsed = JSON.parse(cleaned) as any;

      // Normalize to ensure we always return text, tone, and style keys when possible.
      const normalized = (() => {
        if (!parsed || typeof parsed !== "object") {
          return { raw };
        }

        // Try to pull out likely fields from various shapes the model might return.
        const text =
          parsed.text ??
          parsed.summary ??
          parsed.description ??
          (typeof parsed === "string" ? parsed : undefined);

        const tone = parsed.tone ?? parsed.tone_analysis ?? parsed.emotion ?? undefined;

        const style =
          parsed.style ??
          parsed.style_analysis ??
          parsed.persona ??
          parsed.creator_style ??
          undefined;

        return {
          text,
          tone,
          style,
          titleSuggestion: parsed.titleSuggestion ?? parsed.title ?? undefined,
          thumbnailIdea: parsed.thumbnailIdea ?? parsed.thumbnail ?? undefined,
          scriptHook: parsed.scriptHook ?? parsed.hook ?? undefined,
          improvementTips: parsed.improvementTips ?? parsed.tips ?? parsed.suggestions ?? undefined,
          ...parsed,
        };
      })();

      // Only persist analyses that came from a video URL, to match existing schema.
      if (videoUrl) {
        try {
          const supabase = getServerSupabase();
          if (supabase) {
            await supabase.from("persona_analyses").insert({
              video_url: videoUrl,
              result: normalized,
            });
          }
        } catch (dbErr) {
          console.error("Failed to persist persona analysis to Supabase", dbErr);
        }
      }

      return NextResponse.json(normalized);
    } catch {
      // If the model didn't return valid JSON, still return the raw content for debugging.
      if (videoUrl) {
        try {
          const supabase = getServerSupabase();
          if (supabase) {
            await supabase.from("persona_analyses").insert({
              video_url: videoUrl,
              result: { raw },
            });
          }
        } catch (dbErr) {
          console.error("Failed to persist raw persona analysis to Supabase", dbErr);
        }
      }

      return NextResponse.json({ raw }, { status: 200 });
    }
  } catch (err) {
    console.error("/api/persona Gemini error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to call Gemini for persona", details: message },
      { status: 500 },
    );
  }
}
