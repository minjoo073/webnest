import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NodeNetwork from "../components/NodeNetwork";

export default function Hero() {
  const wordsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // word-reveal 트리거 (페이지 진입 직후)
    const t = setTimeout(() => {
      wordsRef.current?.classList.add("scroll-visible");
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const max = window.innerHeight;
      const p = Math.min(1, y / max);
      el.style.opacity = `${1 - p}`;
      el.style.transform = `translateY(${p * -60}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero — Interactive node network"
    >
      <NodeNetwork />


      {/* Top tag */}
      <div className="absolute top-28 left-6 md:left-10 z-20 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-mute">
        / WEB NEST · EST. 2024 · SEL
      </div>
      <div className="absolute top-28 right-6 md:right-10 z-20 text-right">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-mute">
          Status
        </p>
        <p className="font-mono text-xs mt-1 flex items-center justify-end gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green-bright animate-pulse" />
          Accepting projects · 2026 Q3
        </p>
      </div>

      {/* Center content */}
      <div
        ref={contentRef}
        className="hero-content relative z-20 px-6 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-green-bright mb-8 scroll-reveal scroll-visible">
          Digital Brand Experience Studio
        </p>
        <div ref={wordsRef} className="scroll-visible inline-block">
          <h1 className="display-hd inline-flex flex-col items-start leading-[0.9] text-[18vw] md:text-[12vw] text-left">
            <span className="word-reveal">WEB</span>
            <span
              className="word-reveal text-brand-green-bright"
              style={{ transitionDelay: "0.15s" }}
            >
              NEST
            </span>
          </h1>
        </div>
        <p
          className="mx-auto mt-10 max-w-xl text-base md:text-lg text-brand-silver leading-relaxed scroll-reveal scroll-visible"
          style={{ transitionDelay: "0.4s" }}
        >
          브랜드 분석부터 기획, 디자인, 퍼블리싱, 운영까지.
          <br />
          하나의 흐름으로 만드는 디지털 경험.
        </p>
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-4 scroll-reveal scroll-visible"
          style={{ transitionDelay: "0.55s" }}
        >
          <Link
            to="/works"
            className="inline-flex items-center gap-2 rounded-full bg-brand-ivory px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-black hover:bg-brand-green-bright transition-colors"
          >
            작업 보기
            <span aria-hidden>→</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/30 px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] hover:border-brand-green-bright hover:text-brand-green-bright transition-colors"
          >
            프로젝트 문의
          </Link>
        </div>
      </div>
    </section>
  );
}
