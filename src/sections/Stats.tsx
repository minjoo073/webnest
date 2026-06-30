import { useEffect, useRef, useState } from "react";
import { stats } from "../data/values";

/**
 * 카운트업 애니메이션 — viewport 진입 시 1회.
 */
function CountUp({ to, duration = 1600 }: { to: string; duration?: number }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  // 숫자 + 접미사 분리 ("120+" → 120, "+")
  const match = to.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = elRef.current;
    if (!el || done || !match) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            io.unobserve(el);
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              const val = target * eased;
              el.textContent =
                (target % 1 === 0 ? Math.round(val).toString() : val.toFixed(1)) +
                suffix;
              if (t < 1) requestAnimationFrame(tick);
              else setDone(true);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [done, target, suffix, duration, match]);

  if (!match) return <span>{to}</span>;
  return <span ref={elRef}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative pt-10 pb-40 border-t editorial-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-l editorial-line pl-6 scroll-reveal scroll-stagger-${i + 1}`}
            >
              <p className="display-hd text-5xl md:text-7xl text-brand-green-bright">
                <CountUp to={s.value} />
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
