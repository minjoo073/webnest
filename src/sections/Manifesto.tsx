import { credos } from "../data/manifesto";
import CountUp from "../components/CountUp";

/**
 * Manifesto Body — divider + Three Credos + supporting stats.
 * 헤더는 ManifestoIntro에 분리 (큐브 face로 사용).
 */
export default function Manifesto() {
  return (
    <section className="relative pt-8 pb-32 md:pt-12 md:pb-48">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        {/* === Divider === */}
        <div className="mt-8 mb-20">
          <div className="scroll-line-draw h-px bg-brand-green-bright origin-left" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-mute mt-4 scroll-reveal">
            / Three Credos
          </p>
        </div>

        {/* === Credos === one column = [credo + stat] 같은 묶음 */}
        <div className="grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-16">
          {credos.map((c, i) => {
            const numeric = parseInt(c.statValue, 10);
            const isCountable = !isNaN(numeric) && numeric > 0;
            const suffix = c.statValue.replace(/^\d+/, "");
            return (
              <article
                key={c.index}
                className={`relative scroll-reveal scroll-stagger-${(i % 4) + 1}`}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-2 h-12 w-px bg-brand-green-bright"
                />

                <div className="pl-6 md:pl-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright mb-8">
                    Credo {c.index} / 03
                  </p>
                  <h3 className="display-hd text-3xl md:text-[2.4rem] font-extrabold leading-[1.05] text-brand-ivory mb-5">
                    {c.en}
                  </h3>
                  <p className="text-lg md:text-xl font-semibold leading-[1.4] text-brand-ivory mb-6">
                    {c.ko}
                  </p>
                  <p className="text-[15px] md:text-base font-light leading-[1.7] text-brand-paper/85 break-keep">
                    {c.body.split(/(?<=\.)\s+/).map((s, si, arr) => (
                      <span key={si}>
                        {s}
                        {si < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="pl-6 md:pl-8 mt-12 pt-8 border-t border-brand-ivory/15">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-mute mb-3">
                    / Number that backs it
                  </p>
                  <p className="display-hd text-5xl md:text-6xl font-extrabold leading-none tabular-nums mb-3">
                    {isCountable ? (
                      <>
                        <CountUp
                          value={String(numeric)}
                          className="text-brand-ivory"
                        />
                        <span className="text-brand-green-bright">{suffix}</span>
                      </>
                    ) : (
                      <span className="text-brand-ivory">{c.statValue}</span>
                    )}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-green-bright mb-2">
                    {c.statLabel}
                  </p>
                  <p className="text-sm font-light text-brand-paper/75 leading-[1.55]">
                    {c.statCaption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
