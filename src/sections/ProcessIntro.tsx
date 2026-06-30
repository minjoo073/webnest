/**
 * Process 섹션 헤더 — 큐브 face로 들어갈 100vh.
 * 본문(sticky stacking cards)은 Process 컴포넌트에 남아 있음.
 */
export default function ProcessIntro() {
  return (
    <section className="relative pt-32 md:pt-48 pb-12 md:pb-16 overflow-hidden border-t editorial-line">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 w-full">
        <div className="relative max-w-3xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
              / 04 &nbsp;Process
            </p>
            <h2 className="display-hd text-[6.5vw] md:text-[3.8vw] leading-[1.08] tracking-[-0.02em] mt-6 scroll-reveal-mask">
              상담부터 런칭까지,
              <br />
              <span className="text-outline">5단계의 흐름.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              아이디어를 듣는 첫 미팅부터 사이트 런칭 이후 운영까지,
              하나의 흐름으로 연결되는 5단계 프로세스입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
