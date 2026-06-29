import { useMemo, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  projects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectPlatform,
} from "../data/projects";

type CatFilter = "All" | ProjectCategory;
type PlatformFilter = "All" | ProjectPlatform;

const PLATFORM_TABS: { key: PlatformFilter; label: string; sub: string }[] = [
  { key: "All", label: "All", sub: "전체" },
  { key: "Web", label: "Web", sub: "웹사이트 / 반응형" },
  { key: "App", label: "App", sub: "iOS · Android" },
  { key: "Web+App", label: "Web + App", sub: "통합 프로젝트" },
];

export default function Works() {
  const [platform, setPlatform] = useState<PlatformFilter>("All");
  const [category, setCategory] = useState<CatFilter>("All");
  useScrollReveal([platform, category]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const pOK = platform === "All" || p.platform === platform;
      const cOK = category === "All" || p.category === category;
      return pOK && cOK;
    });
  }, [platform, category]);

  // 플랫폼별 카운트
  const counts = useMemo(() => {
    const byCat = (cat: CatFilter) =>
      cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
    const byPlat = (plat: PlatformFilter) =>
      plat === "All" ? projects.length : projects.filter((p) => p.platform === plat).length;
    return { byCat, byPlat };
  }, []);

  return (
    <section className="pt-40 pb-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="relative max-w-4xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright">
              / Works
            </p>
            <h1 className="display-hd text-[10vw] md:text-[6vw] leading-[1.0] tracking-[-0.025em] mt-6">
              SELECTED
              <br />
              <span className="text-outline">CASE STUDIES.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85">
              업종과 플랫폼별로 정리된 케이스 스터디입니다. 단순 이미지 나열이 아니라
              문제 정의부터 해결 과정, 결과까지 하나의 흐름으로 소개합니다.
            </p>
          </div>
        </div>

        {/* Platform tabs — 큰 프라이머리 토글 */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-brand-ivory/10 md:grid-cols-4">
          {PLATFORM_TABS.map((tab) => {
            const active = platform === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setPlatform(tab.key)}
                className={`relative bg-brand-black p-6 text-left transition-colors ${
                  active ? "bg-brand-green-bright text-brand-black" : "hover:bg-brand-ivory/5"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                      active ? "text-brand-black/70" : "text-brand-mute"
                    }`}
                  >
                    {tab.sub}
                  </span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      active ? "text-brand-black" : "text-brand-mute"
                    }`}
                  >
                    {String(counts.byPlat(tab.key)).padStart(2, "0")}
                  </span>
                </div>
                <p className="display-hd text-3xl md:text-4xl mt-4 leading-none">
                  {tab.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Category filter — 세컨더리, 칩 형태 */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-mute mr-2">
            / 업종
          </span>
          {(["All", ...PROJECT_CATEGORIES] as CatFilter[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                category === cat
                  ? "border-brand-ivory bg-brand-ivory text-brand-black"
                  : "border-brand-ivory/20 hover:border-brand-ivory/60"
              }`}
            >
              {cat}
              <span
                className={`ml-2 ${
                  category === cat ? "text-brand-black/60" : "text-brand-mute"
                }`}
              >
                {counts.byCat(cat)}
              </span>
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-brand-mute">
          / {filtered.length}개의 케이스
        </p>

        {/* Grid */}
        <div className="mt-6 grid gap-px bg-brand-ivory/10 md:grid-cols-2">
          {filtered.map((p, i) => (
            <article
              key={p.slug}
              className={`group relative overflow-hidden bg-brand-black p-8 scroll-reveal scroll-stagger-${(i % 6) + 1}`}
              data-cursor-grow
            >
              <div
                className="relative aspect-[16/10] overflow-hidden mb-6"
                style={{ background: p.accent }}
              >
                <div className="absolute inset-0 flex items-end p-6">
                  <span
                    className="font-display text-4xl md:text-6xl font-bold tracking-tightest mix-blend-difference opacity-80 transition-transform duration-700 group-hover:scale-105"
                    style={{ color: p.accent }}
                  >
                    {p.name}
                  </span>
                </div>

                {/* Platform badge — 카드 우상단 */}
                <div className="absolute top-4 right-4">
                  <PlatformBadge platform={p.platform} />
                </div>

                <div className="absolute inset-0 bg-brand-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="rounded-full border border-brand-ivory px-5 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                    Case Study →
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-mute">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="display-hd text-2xl mt-1">{p.name}</h3>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-mute">
                  {p.client}
                </p>
              </div>
              <p className="mt-4 text-sm text-brand-silver leading-relaxed">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border editorial-line px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-brand-silver"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute mb-2">
              / No results
            </p>
            <p className="text-brand-silver">
              선택하신 조건의 케이스가 곧 추가됩니다.
            </p>
          </div>
        )}
      </div>
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
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${styles}`}
    >
      {platform === "App" && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="2" y="1" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" />
          <line x1="4" y1="7.5" x2="6" y2="7.5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )}
      {platform === "Web" && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="1" y="2" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
          <line x1="1" y1="4" x2="9" y2="4" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      )}
      {platform === "Web+App" && (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="1" y="2" width="8" height="6" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
          <rect x="8" y="1" width="5" height="8" rx="0.6" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.1" />
        </svg>
      )}
      {platform}
    </span>
  );
}
