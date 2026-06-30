import { featuredAppProjects } from "../data/projects";
import type { Project } from "../data/projects";

/**
 * App Lab — App-only 케이스를 폰 목업 비율로 보여주는 섹션.
 * 폰 프레임은 9:19.5 비율 (modern smartphone).
 */
export default function AppLab() {
  return (
    <section className="relative pb-32 md:pb-48 overflow-hidden">

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header는 AppLabIntro (큐브 face)로 분리됨 */}

        {/* Phone mockups */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {featuredAppProjects.map((p, i) => (
            <PhoneCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneCard({ project: p, index }: { project: Project; index: number }) {
  // 카드마다 살짝 다른 tilt
  const tilt = [-2, 0, 2][index % 3];

  return (
    <article
      data-cursor-grow
      className={`group scroll-reveal scroll-stagger-${(index % 4) + 1} flex flex-col items-center`}
    >
      {/* Phone frame — 9:19.5 비율 */}
      <div
        className="relative w-[62%] md:w-[72%] max-w-[240px] transition-transform duration-700 group-hover:-translate-y-3"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {/* Outer bezel */}
        <div className="relative aspect-[9/19.5] rounded-[2rem] bg-brand-ink p-[5px] shadow-xl ring-1 ring-brand-ivory/10">
          {/* Side glow — 톤다운 */}
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
            style={{ background: p.accent }}
          />
          {/* Screen */}
          <div
            className="relative h-full w-full rounded-[1.65rem] overflow-hidden"
            style={{ background: p.accent }}
          >
            {/* Dynamic Island / notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-6 w-24 rounded-full bg-black/70" />

            {/* Status bar */}
            <div className="absolute top-2.5 left-0 right-0 z-10 px-6 flex items-center justify-between font-mono text-[11px] text-brand-ivory/90 mix-blend-difference">
              <span>9:41</span>
              <span className="opacity-0">.</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                <span className="inline-block h-2 w-3 rounded-sm border border-current" />
              </span>
            </div>

            {/* App content placeholder */}
            <div className="absolute inset-0 flex flex-col">
              {/* Top area — app name + category */}
              <div className="pt-12 px-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-ivory/70 mix-blend-difference">
                  {p.category}
                </p>
                <p
                  className="font-display text-3xl md:text-4xl font-bold tracking-tightest mt-2 leading-none"
                  style={{ color: p.accent }}
                >
                  {p.name}
                </p>
              </div>

              {/* Mock UI rows */}
              <div className="flex-1 px-5 mt-8 flex flex-col gap-3">
                <MockRow accent={p.accent} ratio={0.85} h={64} />
                <MockRow accent={p.accent} ratio={0.6} h={48} />
                <MockRow accent={p.accent} ratio={0.78} h={48} />
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <MockTile accent={p.accent} />
                  <MockTile accent={p.accent} />
                </div>
              </div>

              {/* Bottom tab bar */}
              <div className="px-5 pb-3">
                <div
                  className="rounded-2xl h-12 flex items-center justify-around"
                  style={{ background: "#0a0a0a" }}
                >
                  {[0, 1, 2, 3].map((k) => (
                    <span
                      key={k}
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: k === 0 ? p.accent : "rgba(245,241,232,0.4)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Home indicator */}
              <div className="pb-2 flex justify-center">
                <span className="h-1 w-24 rounded-full bg-brand-ivory/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-8 w-full text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute">
          {String(index + 1).padStart(2, "0")} / {p.client}
        </p>
        <h3 className="display-hd text-2xl md:text-3xl mt-2">{p.name}</h3>
        <p className="mt-3 text-sm text-brand-silver max-w-xs mx-auto leading-relaxed">
          {p.summary}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border editorial-line px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-brand-silver"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MockRow({ accent, ratio, h }: { accent: string; ratio: number; h: number }) {
  return (
    <div
      className="rounded-xl flex items-center px-3 gap-3"
      style={{ background: "#0a0a0a", height: h }}
    >
      <span
        className="h-7 w-7 rounded-lg shrink-0"
        style={{ background: accent, opacity: 0.85 }}
      />
      <div className="flex-1 flex flex-col gap-1.5">
        <span
          className="block h-1.5 rounded-full bg-brand-ivory/60"
          style={{ width: `${ratio * 100}%` }}
        />
        <span className="block h-1.5 rounded-full bg-brand-ivory/25 w-1/2" />
      </div>
    </div>
  );
}

function MockTile({ accent }: { accent: string }) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col justify-between"
      style={{ background: "#0a0a0a", aspectRatio: "1 / 1" }}
    >
      <span
        className="h-6 w-6 rounded-md"
        style={{ background: accent, opacity: 0.9 }}
      />
      <span className="block h-1.5 rounded-full bg-brand-ivory/70 w-3/4" />
    </div>
  );
}
