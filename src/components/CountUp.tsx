import { useEffect, useRef, useState } from "react";

/**
 * Viewport 진입 시 1회 카운트업.
 * value는 "120+", "98%", "0", "4.9" 같은 문자열 — 숫자 + 접미사 분리.
 */
export default function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || done || !match || target === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(el);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            el.textContent =
              (target % 1 === 0 ? Math.round(val).toString() : val.toFixed(1)) + suffix;
            if (t < 1) requestAnimationFrame(tick);
            else setDone(true);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [done, target, suffix, duration, match]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
