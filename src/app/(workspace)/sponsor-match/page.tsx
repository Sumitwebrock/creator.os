'use client';

import { useState } from "react";
import { LoadingButton } from "../../loading-button";

type SponsorCreator = {
  handle: string;
  niche: string;
  matchScore: number | string;
  region: string;
};

type SponsorResponse = {
  creators?: SponsorCreator[];
  contractPreview?: string;
  [key: string]: unknown;
};

export default function SponsorMatchPage() {
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState("");
  const [niche, setNiche] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<SponsorResponse | null>(null);

  async function handleMatch() {
    setError(null);
    setMatches(null);
    if (!brand || !budget || !niche || !region) {
      setError("Fill all sponsor fields to generate matches.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/sponsor-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, budget, niche, region }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
        };
        const base = data.error ?? "Failed to generate sponsor matches";
        const details = data.details ? `: ${data.details}` : "";
        throw new Error(base + details);
      }
      const data = (await res.json()) as SponsorResponse;
      setMatches(data);
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
          <span className="creatoros-pill">CreatorOS · Sponsorship Match</span>
          <h1 className="creatoros-section-title creatoros-hero-title">
            Match brands with the right creators
          </h1>
          <p className="creatoros-subtitle max-w-xl">
            Brands share budget, niche, and target region. CreatorOS surfaces aligned creators with a
            transparent Match Score and a ready-to-edit sponsorship contract.
          </p>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-cyan-100/80">Brand name</label>
              <input
                className="creatoros-input"
                placeholder="NovaTech Studio"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-cyan-100/80">Budget (per campaign)</label>
              <input
                className="creatoros-input"
                placeholder="$10,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-cyan-100/80">Niche</label>
            <input
              className="creatoros-input"
              placeholder="Creator tools, productivity, filmmaking"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-cyan-100/80">Target region</label>
            <input
              className="creatoros-input"
              placeholder="North America, UK, DACH"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <LoadingButton
            type="button"
            className="creatoros-glass-button creatoros-glass-button-primary w-full justify-center"
            onClick={handleMatch}
            isLoading={loading}
            loadingLabel="Matching…"
          >
            Find creator matches
          </LoadingButton>
          {error && (
            <p className="mt-2 text-xs text-rose-300">{error}</p>
          )}
        </form>
      </section>
      <section className="creatoros-glass-card p-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="creatoros-section-label">Matched Creators</p>
          <span className="creatoros-badge">AI Draft</span>
        </div>
        {matches?.creators && matches.creators.length > 0 ? (
          <div className="space-y-3 text-cyan-50/90">
            {matches.creators.map((creator) => (
              <div
                key={creator.handle}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-cyan-100">{creator.handle}</p>
                  <p className="creatoros-subtitle text-xs whitespace-pre-wrap">
                    {creator.niche}  {creator.region}
                  </p>
                </div>
                <span className="creatoros-badge">
                  Match Score {typeof creator.matchScore === "number" ? creator.matchScore : creator.matchScore}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 text-cyan-50/90">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-cyan-100">@StudioWorkflow</p>
                <p className="creatoros-subtitle">12.4M views / month  workflow & editing tutorials</p>
              </div>
              <span className="creatoros-badge">Match Score 92</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-cyan-100">@NightShiftCreator</p>
                <p className="creatoros-subtitle">Late-night productivity & IRL desk setups</p>
              </div>
              <span className="creatoros-badge">Match Score 88</span>
            </div>
          </div>
        )}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <p className="creatoros-section-label">Contract preview</p>
          {matches?.contractPreview ? (
            <p className="creatoros-subtitle text-xs whitespace-pre-wrap">
              {matches.contractPreview}
            </p>
          ) : (
            <p className="creatoros-subtitle text-xs">
              AI-generated sponsor contract will appear here  deliverables, timeline, usage rights, and
              approval workflow tailored to each match.
            </p>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}
