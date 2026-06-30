import { useLayoutEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card", stack);

      // 타이틀은 CSS sticky로 상단 고정(경계가 stack으로 한정 → 다른 섹션 침범 X).
      // 스택이 다 빠질 무렵 스크롤 연동으로 페이드아웃 → 빈 화면에 혼자 안 남음.
      // (pin을 안 써서 DOM 래핑/경계이탈/크래시 없음)
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
              end: "top top+=285",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // 타이틀(CSS sticky)의 투명도를 마지막 카드의 "실제 화면 위치"로 직접 제어.
      // 카드5가 sticky 위치(215px)에 있거나 그 위(올라오는 중)면 100%,
      // 215px 위로 빠지기 시작할 때만 페이드 → 스택형 sticky/transform 타이밍과
      // 어긋나지 않음(getBoundingClientRect가 실제 위치라서).
      const titleEl = titleRef.current;
      const lastCard = cards[cards.length - 1];
      if (titleEl && lastCard) {
        const STICK = 265;
        const update = () => {
          const top = lastCard.getBoundingClientRect().top;
          const o = top >= STICK ? 1 : Math.max(0, top / STICK);
          titleEl.style.opacity = String(o);
          titleEl.style.visibility = o < 0.02 ? "hidden" : "visible";
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
          window.removeEventListener("scroll", update);
          window.removeEventListener("resize", update);
          titleEl.style.opacity = "";
          titleEl.style.visibility = "";
        };
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative pt-28 md:pt-36 pb-32 md:pb-48 border-t editorial-line">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Sticky 타이틀 — 카드 스택이 겹쳐 올라오는 동안 계속 보임 (섹션 유일 타이틀) */}
        <div ref={titleRef} className="sticky top-0 z-40 bg-brand-black pt-20 md:pt-24 pb-5">
          <div className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-0 h-full w-0.5 bg-brand-green-bright" aria-hidden />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright">
              / 04 &nbsp;Process
            </p>
            <h2 className="display-hd text-[6.5vw] md:text-[3.8vw] leading-[1.08] tracking-[-0.02em] mt-4 text-brand-ivory">
              상담부터 런칭까지,{" "}
              <span className="text-brand-green-bright">5단계의 흐름.</span>
            </h2>
          </div>
        </div>

        {/* 설명 — 일반 흐름(스크롤되며 sticky 타이틀 아래로 사라짐) */}
        <p className="pl-6 md:pl-8 mt-6 mb-10 lg:mb-14 max-w-2xl text-sm md:text-base font-light leading-[1.6] text-brand-paper/85">
          아이디어를 듣는 첫 미팅부터 사이트 런칭 이후 운영까지,
          하나의 흐름으로 연결되는 5단계 프로세스입니다.
        </p>

        {/* Stack */}
        <div ref={stackRef} className="relative">
          {processSteps.map((step, i) => (
            <article
              key={step.index}
              className="process-card sticky rounded-3xl p-8 md:p-10 lg:p-12 mb-8 lg:mb-[55vh] last:mb-0 shadow-[0_-30px_60px_-20px_rgba(0,0,0,0.85)] will-change-transform overflow-hidden"
              style={{
                top: "265px",
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
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/75">
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
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 mb-1.5">
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
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 mb-3">
                      / Overview
                    </p>
                    {/* L3 본문 */}
                    <p className="text-sm md:text-base font-light leading-[1.65] text-brand-paper/90">
                      {step.body}
                    </p>

                    <div className="mt-7 pt-5 border-t border-brand-ivory/15">
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 mb-3">
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
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 mb-3">
                        / Key Activities
                      </p>
                      <ul className="space-y-2">
                        {step.activities.map((act, idx) => (
                          <li
                            key={act}
                            className="flex items-baseline gap-3"
                          >
                            <span className="font-mono text-[11px] font-medium text-brand-ivory/75 tabular-nums shrink-0">
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
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 mb-3">
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
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-ivory/70 shrink-0">
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
                  <span className="font-mono text-[11px] font-semibold tabular-nums text-brand-ivory shrink-0">
                    {String(Math.round(((i + 1) / processSteps.length) * 100)).padStart(2, "0")}%
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Tail spacer — 마지막 카드(STEP 5)가 다른 카드처럼 상단에 stick할 공간 */}
          <div ref={tailRef} className="h-[40vh] hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
