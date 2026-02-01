import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OPENAI_API_KEY is not set. OpenAI-powered routes will be disabled.");
}

export const openai = apiKey
  ? new OpenAI({ apiKey })
  : (null as unknown as OpenAI);
