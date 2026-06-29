import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "../data/process";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stacking cards — 순차 노출 패턴.
 * - 카드 자체 크기 크고, 사이에 큰 spacer가 있어 이전 카드가 머문 뒤에 다음 카드가 등장
 * - 다음 카드 entrance trigger는 viewport 깊숙이 들어왔을 때 시작 → 시선 분산 적음
 */
export default function Process() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card", stack);

      cards.forEach((card, i) => {
        if (i === 0) return;
        // 다음 카드는 viewport 안쪽까지 들어온 다음 빠르게 sticky 자리로 이동
        gsap.fromTo(
          card,
          { y: () => window.innerHeight * 0.55 },
          {
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top top+=140",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative py-32 md:py-48 border-t editorial-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header는 ProcessIntro (큐브 face)로 분리됨 */}

        {/* Stack */}
        <div ref={stackRef} className="relative">
          {processSteps.map((step, i) => (
            <article
              key={step.index}
              className="process-card sticky rounded-3xl p-8 md:p-10 lg:p-12 mb-8 lg:mb-[55vh] last:mb-0 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.85)] will-change-transform overflow-hidden"
              style={{
                top: "120px",
                zIndex: i + 1,
                background: "#1f5e3a",
              }}
            >
              <div className="relative">
                {/* === Card header row === */}
                <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-brand-ivory/20">
                  <div className="flex items-start gap-4">
                    <span
                      className="mt-2.5 h-2 w-2 rounded-full bg-brand-ivory shrink-0"
                      style={{ boxShadow: "0 0 12px rgba(245,241,232,0.6)" }}
                    />
                    <div>
                      {/* L4 인덱스 라벨 */}
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/65">
                        STEP {step.index} &nbsp;·&nbsp; {String(i + 1).padStart(2, "0")} / 0{processSteps.length}
                      </p>
                      {/* L1 영문 타이틀 — 사이즈 정상화 (이전 8xl → 4xl) */}
                      <h3 className="display-hd text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] mt-3 text-brand-ivory">
                        {step.title}
                      </h3>
                      {/* L2 한글 부제 — 일반 폰트, 읽기 쉽게 */}
                      <p className="text-base md:text-lg font-medium leading-[1.4] text-brand-ivory mt-3">
                        {step.korean}
                      </p>
                    </div>
                  </div>
                  <div className="md:text-right shrink-0 pt-1">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 mb-1.5">
                      Duration
                    </p>
                    <p className="display-hd text-xl md:text-2xl font-bold tabular-nums text-brand-ivory">
                      {step.duration}
                    </p>
                  </div>
                </header>

                {/* === Card body grid === */}
                <div className="grid grid-cols-12 gap-6 lg:gap-10 mt-8">
                  {/* Body text */}
                  <div className="col-span-12 md:col-span-7">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 mb-3">
                      / Overview
                    </p>
                    {/* L3 본문 */}
                    <p className="text-sm md:text-base font-light leading-[1.65] text-brand-paper/90">
                      {step.body}
                    </p>

                    <div className="mt-7 pt-5 border-t border-brand-ivory/15">
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 mb-3">
                        / Output
                      </p>
                      {/* L2.5 Output 핵심 문구 — 본문보다 한 단계 강조 */}
                      <p className="text-base md:text-lg font-semibold leading-[1.4] text-brand-ivory">
                        &ldquo;{step.output}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right column — activities + deliverables */}
                  <div className="col-span-12 md:col-span-5 space-y-6">
                    <div>
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 mb-3">
                        / Key Activities
                      </p>
                      <ul className="space-y-2">
                        {step.activities.map((act, idx) => (
                          <li
                            key={act}
                            className="flex items-baseline gap-3"
                          >
                            <span className="font-mono text-[10px] font-medium text-brand-ivory/45 tabular-nums shrink-0">
                              0{idx + 1}
                            </span>
                            <span className="text-sm font-normal text-brand-paper/90 leading-[1.55]">
                              {act}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-5 border-t border-brand-ivory/15">
                      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 mb-3">
                        / Deliverables
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-full bg-brand-ivory/10 border border-brand-ivory/25 px-3 py-1 text-xs font-medium text-brand-ivory"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* === Progress bar bottom === */}
                <div className="mt-8 pt-5 border-t border-brand-ivory/20 flex items-center gap-3">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-brand-ivory/55 shrink-0">
                    Progress
                  </span>
                  <div className="flex-1 h-px bg-brand-ivory/15 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-brand-ivory"
                      style={{
                        width: `${((i + 1) / processSteps.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[10px] font-semibold tabular-nums text-brand-ivory shrink-0">
                    {String(Math.round(((i + 1) / processSteps.length) * 100)).padStart(2, "0")}%
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Tail spacer — 마지막 카드도 잠시 머무를 시간 */}
          <div className="h-[40vh] hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
