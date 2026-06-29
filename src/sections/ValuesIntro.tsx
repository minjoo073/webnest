/**
 * Values 섹션 헤더 — 큐브 face로 들어갈 100vh.
 * 본문(2x2 grid)은 Values 컴포넌트에 남아 있음.
 */
export default function ValuesIntro() {
  return (
    <section className="relative h-full min-h-screen flex items-center overflow-hidden border-t editorial-line">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 w-full">
        <div className="relative max-w-3xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
              / 05 &nbsp;Values
            </p>
            <h2 className="display-hd text-[6.5vw] md:text-[3.8vw] leading-[1.08] tracking-[-0.02em] mt-6 scroll-reveal-mask">
              우리가 일하는
              <br />
              <span className="text-outline">방식.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              하나의 흐름으로 만든다는 약속을 지키기 위해
              우리가 매일 지키는 네 가지 원칙입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
