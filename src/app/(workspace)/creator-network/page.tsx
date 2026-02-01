export default function CreatorNetworkPage() {
  const creators = [
    {
      name: "Aurora Frames",
      handle: "@auroraframes",
      niche: "Cinematic B-roll & color grading",
      score: 94,
      region: "LA, US",
    },
    {
      name: "Pixel Drift",
      handle: "@pixeldrift",
      niche: "Gaming + storytelling edits",
      score: 88,
      region: "Berlin, DE",
    },
    {
      name: "Cafe Scripts",
      handle: "@cafescripts",
      niche: "Cozy long-form commentary",
      score: 81,
      region: "London, UK",
    },
  ];

  return (
    <div className="creatoros-page">
      <div className="creatoros-grid">
        <section className="creatoros-glass-card p-8 space-y-6">
        <div className="space-y-3">
          <span className="creatoros-pill">CreatorOS · Creator Network</span>
          <h1 className="creatoros-section-title creatoros-hero-title">
            Map your collab universe
          </h1>
          <p className="creatoros-subtitle max-w-xl">
            A prototype map of compatible creators by niche, vibe, and audience overlap. Each profile
            shows a Collab Match Score so you can design multi-creator drops with confidence.
          </p>
        </div>
        <div className="relative mt-4 h-64 rounded-3xl border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-sky-500/5 to-indigo-500/20" />
          <div className="absolute inset-6 grid grid-cols-3 gap-4 text-xs text-cyan-50/90">
            <div className="creatoros-glass-card px-3 py-2 flex flex-col gap-1 border border-white/15">
              <span className="text-[0.65rem] uppercase tracking-[0.22em] text-cyan-100/90">
                Heatmap
              </span>
              <p className="creatoros-subtitle text-[0.7rem]">
                Bubbles = channels. Lines = collab potential based on audience overlap.
              </p>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-cyan-300/40 flex items-center justify-center relative">
                <span className="creatoros-badge absolute -top-4">You</span>
                <div className="absolute -right-6 top-6 w-16 h-16 rounded-full border border-cyan-300/40" />
                <div className="absolute -left-4 bottom-4 w-14 h-14 rounded-full border border-cyan-300/40" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="creatoros-glass-card p-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="creatoros-section-label">Nearby creators</p>
          <span className="creatoros-badge">Prototype</span>
        </div>
        <div className="space-y-3">
          {creators.map((creator) => (
            <div
              key={creator.handle}
              className="flex items-center justify-between border border-white/10 rounded-2xl px-4 py-3 bg-black/30"
            >
              <div>
                <p className="font-semibold text-cyan-100">{creator.name}</p>
                <p className="text-xs text-cyan-100/80">{creator.handle}</p>
                <p className="creatoros-subtitle text-[0.7rem] mt-1">{creator.niche}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="creatoros-badge">Collab Match {creator.score}</span>
                <span className="text-[0.65rem] text-cyan-100/70">{creator.region}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
