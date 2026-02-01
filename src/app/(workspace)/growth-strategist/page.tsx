'use client';

import { useState } from "react";
import { LoadingButton } from "../../loading-button";

type StrategyResponse = {
  whatToPost?: string;
  duration?: string;
  postingTime?: string;
  emotionalTone?: string;
  collabSuggestion?: string;
  [key: string]: unknown;
};

export default function GrowthStrategistPage() {
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<StrategyResponse | null>(null);

  async function handleGenerate() {
    setError(null);
    setStrategy(null);
    if (!channelUrl) {
      setError("Paste a channel link to generate a strategy.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/growth-strategist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
        };
        const base = data.error ?? "Failed to generate strategy";
        const details = data.details ? `: ${data.details}` : "";
        throw new Error(base + details);
      }
      const data = (await res.json()) as StrategyResponse;
      setStrategy(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="creatoros-page">
      <div className="creatoros-grid">
        <section className="creatoros-glass-card p-8 space-y-6">
        <div className="space-y-3">
          <span className="creatoros-pill">CreatorOS · Growth Strategist</span>
          <h1 className="creatoros-section-title creatoros-hero-title">
            AI playbook for your channel
          </h1>
          <p className="creatoros-subtitle max-w-xl">
            Paste your channel link and CreatorOS will read your content mix, cadence, and audience
            response to suggest what to post, when to post, and how to sound.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-cyan-100/80">Channel link</label>
            <input
              className="creatoros-input"
              placeholder="https://youtube.com/@yourchannel or https://instagram.com/handle"
              value={channelUrl}
              onChange={(e) => setChannelUrl(e.target.value)}
            />
          </div>
          <LoadingButton
            type="button"
            className="creatoros-glass-button creatoros-glass-button-primary w-full justify-center"
            onClick={handleGenerate}
            isLoading={loading}
            loadingLabel="Generating…"
          >
            Generate strategy
          </LoadingButton>
          {error && (
            <p className="mt-2 text-xs text-rose-300">{error}</p>
          )}
        </form>
      </section>
      <section className="creatoros-glass-card p-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="creatoros-section-label">Strategy Blueprint</p>
          <span className="creatoros-badge">AI Draft</span>
        </div>
        {strategy ? (
          <div className="space-y-3 text-cyan-50/90">
            {strategy.whatToPost && (
              <div>
                <h2 className="font-semibold text-cyan-100">What to post</h2>
                <p className="creatoros-subtitle whitespace-pre-wrap text-xs">
                  {strategy.whatToPost}
                </p>
              </div>
            )}
            {strategy.duration && (
              <div>
                <h2 className="font-semibold text-cyan-100">Optimal duration</h2>
                <p className="creatoros-subtitle whitespace-pre-wrap text-xs">
                  {strategy.duration}
                </p>
              </div>
            )}
            {strategy.postingTime && (
              <div>
                <h2 className="font-semibold text-cyan-100">Best posting time</h2>
                <p className="creatoros-subtitle whitespace-pre-wrap text-xs">
                  {strategy.postingTime}
                </p>
              </div>
            )}
            {strategy.emotionalTone && (
              <div>
                <h2 className="font-semibold text-cyan-100">Emotional tone</h2>
                <p className="creatoros-subtitle whitespace-pre-wrap text-xs">
                  {strategy.emotionalTone}
                </p>
              </div>
            )}
            {strategy.collabSuggestion && (
              <div>
                <h2 className="font-semibold text-cyan-100">Collaboration suggestion</h2>
                <p className="creatoros-subtitle whitespace-pre-wrap text-xs">
                  {strategy.collabSuggestion}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 text-cyan-50/90">
            <div>
              <h2 className="font-semibold text-cyan-100">What to post</h2>
              <p className="creatoros-subtitle">
                Short punchy explainers, behind-the-scenes bites, and recurring series with a clear hook.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-cyan-100">Optimal duration</h2>
              <p className="creatoros-subtitle">8‎12 minutes for YouTube, 35‎55 seconds for shorts/reels.</p>
            </div>
            <div>
              <h2 className="font-semibold text-cyan-100">Best posting time</h2>
              <p className="creatoros-subtitle">Weekdays 4‎7 PM in your audience�s primary time zone.</p>
            </div>
            <div>
              <h2 className="font-semibold text-cyan-100">Emotional tone</h2>
              <p className="creatoros-subtitle">Confident, playful, and slightly opinionated with clear takeaways.</p>
            </div>
            <div>
              <h2 className="font-semibold text-cyan-100">Collaboration suggestion</h2>
              <p className="creatoros-subtitle">
                Partner with creators in adjacent niches for co-hosted breakdowns and challenge-style content.
              </p>
            </div>
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
