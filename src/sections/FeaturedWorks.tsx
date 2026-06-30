import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredWebProjects, type ProjectPlatform } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal scroll — 웹/하이브리드 케이스.
 * - 데스크탑(≥1024px): 섹션이 viewport에 닿으면 화면 고정, 휠은 가로 이동으로 변환
 * - 그 외: 일반 가로 터치 스크롤
 */
export default function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const pinArea = pinRef.current;
    if (!section || !track || !pinArea) return;

    const mm = gsap.matchMedia();

    // ===== 데스크탑/태블릿(≥1024px): 화면 고정 + 가로 스크롤 =====
    mm.add("(min-width: 1024px)", () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 80);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinArea,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      return () => {
        tween.kill();
      };
    });

    // 폰트/이미지 로드 끝나면 재계산
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      mm.revert();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Header는 FeaturedWorksIntro (큐브 face)로 분리됨 */}

      {/* Pin area — 데스크탑에서 이 영역이 viewport에 pin됨 */}
      <div ref={pinRef} className="relative h-screen flex flex-col justify-center">
        {/* Progress bar */}
        <div className="absolute top-6 left-0 right-0 z-10 px-10 hidden lg:block">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute shrink-0">
              {String(Math.round(progress * (featuredWebProjects.length))).padStart(2, "0")}
              <span className="text-brand-ivory/30">
                {" "}/ {String(featuredWebProjects.length).padStart(2, "0")}
              </span>
            </span>
            <div className="h-px flex-1 bg-brand-ivory/15 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-brand-green-bright"
                style={{ width: `${Math.max(2, progress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute shrink-0">
              SCROLL →
            </span>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform px-6 md:px-10 lg:px-20 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none"
        >
          {featuredWebProjects.map((p, i) => (
            <article
              key={p.slug}
              data-cursor-grow
              className="group relative shrink-0 w-[82vw] sm:w-[520px] md:w-[600px] lg:w-[680px] snap-start"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: p.accent }}
              >
                <div className="absolute inset-0 flex items-end p-8">
                  <span
                    className="font-display text-5xl md:text-7xl font-bold tracking-tightest mix-blend-difference transition-transform duration-700 group-hover:scale-105"
                    style={{ color: p.accent }}
                  >
                    {p.name}
                  </span>
                </div>
                <div className="absolute top-5 right-5">
                  <PlatformBadge platform={p.platform} />
                </div>
                <div className="absolute top-5 left-5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ivory/80">
                  / {String(i + 1).padStart(2, "0")}
                </div>
                {/* Hover info panel */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-brand-black/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-green-bright mb-2">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="display-hd text-3xl md:text-4xl mb-3">
                    {p.name}
                  </h3>
                  <p className="text-sm text-brand-silver max-w-md">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border editorial-line px-3 py-1 text-[11px] uppercase tracking-[0.15em]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="display-hd text-2xl md:text-3xl">
                  {p.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute">
                  {p.category} · {p.platform}
                </p>
              </div>
              <p className="mt-2 text-sm text-brand-silver max-w-xl line-clamp-2">
                {p.summary}
              </p>
            </article>
          ))}

          {/* Trailing CTA card */}
          <Link
            to="/works"
            className="group relative shrink-0 w-[60vw] md:w-[420px] snap-start flex flex-col justify-center items-center text-center border editorial-line p-12 hover:border-brand-green-bright transition-colors"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute">
              / View
            </p>
            <p className="display-hd text-4xl md:text-5xl mt-6 group-hover:text-brand-green-bright">
              ALL CASES
            </p>
            <p className="mt-4 text-sm text-brand-silver">
              업종·플랫폼별 필터로 더 둘러보세요.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] group-hover:border-brand-green-bright">
              전체 보기 →
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

function PlatformBadge({ platform }: { platform: ProjectPlatform }) {
  const styles =
    platform === "App"
      ? "bg-brand-green-bright text-brand-black"
      : platform === "Web+App"
        ? "bg-brand-ivory text-brand-black"
        : "bg-brand-black text-brand-ivory border border-brand-ivory/30";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] ${styles}`}
    >
      {platform}
    </span>
  );
}
