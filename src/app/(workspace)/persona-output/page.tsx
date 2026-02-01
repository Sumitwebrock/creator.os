export default function PersonaOutputPage() {
  return (
    <div className="creatoros-page">
      <div className="creatoros-grid">
        <section className="creatoros-glass-card p-8 space-y-6">
        <div className="space-y-3">
          <span className="creatoros-pill">CreatorOS · Persona Output</span>
          <h1 className="creatoros-section-title creatoros-hero-title">
            AI assets in your exact creator style
          </h1>
          <p className="creatoros-subtitle max-w-xl">
            After you analyze a video, CreatorOS stores a reusable persona profile that understands your
            pacing, humor, and edit rhythm.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-50/90">
          <div className="space-y-3">
            <h2 className="font-semibold text-cyan-100">Script</h2>
            <p className="creatoros-subtitle text-xs">
              Cold open hook, body, and CTA written in your tone. Will be generated from OpenAI.
            </p>
            <div className="creatoros-textarea">
              <p className="text-xs text-cyan-100/80">
                “Okay, imagine you wake up tomorrow and your editing workflow is 10x faster…”
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-semibold text-cyan-100">Thumbnail & social</h2>
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-semibold text-cyan-100/90">Thumbnail text</p>
                <p className="creatoros-subtitle">“I automated my channel in one weekend (here’s how)”</p>
              </div>
              <div>
                <p className="font-semibold text-cyan-100/90">Caption</p>
                <p className="creatoros-subtitle">
                  Turning my chaotic creator brain into a system so I never miss an upload again.
                </p>
              </div>
              <div>
                <p className="font-semibold text-cyan-100/90">Hashtags</p>
                <p className="creatoros-subtitle">#creatoros #creatorworkflow #contentautomation #youtubetips</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="creatoros-glass-card p-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="creatoros-section-label">Music & visual mood</p>
          <span className="creatoros-badge">Style map</span>
        </div>
        <p className="creatoros-subtitle">
          Mid-tempo electronic with warm synths, subtle sidechain, and glitchy transitions on beat.
        </p>
      </section>
      </div>
    </div>
  );
}
