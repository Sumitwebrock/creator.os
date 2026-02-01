import type { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
// Default to a stable model ID known to work with v1beta; can be overridden via GEMINI_MODEL
const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. Gemini-powered routes will be disabled.");
}

// Use the Generative Language API v1beta endpoint, which supports gemini-1.5-* models
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export async function generateWithGemini(prompt: string, temperature = 0.9): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Gemini API returned no text content");
  }

  return text;
}
