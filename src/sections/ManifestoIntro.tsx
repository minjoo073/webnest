/**
 * Manifesto 헤더 부분 — 큐브 face로 들어갈 100vh 콘텐츠.
 * 라벨 + 헤드라인 + 본문 (도입 + 본문) 까지만.
 */
const HEADLINE: { text: string; cls?: string }[][] = [
  [
    { text: "우리는" },
    { text: "홈페이지를", cls: "outline-to-fill text-outline" },
    { text: "만들지" },
    { text: "않습니다." },
  ],
  [
    { text: "브랜드", cls: "text-brand-green-bright" },
    { text: "경험을", cls: "text-brand-green-bright" },
    { text: "설계합니다." },
  ],
];

export default function ManifestoIntro() {
  let wordIdx = 0;
  return (
    <section className="relative h-full flex items-center overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 w-full max-h-full">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          <div className="md:col-span-3 relative">
            <span className="section-accent" aria-hidden />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright scroll-reveal-left pl-6">
              / 01
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute mt-2 scroll-reveal-left scroll-stagger-1 pl-6">
              Manifesto
            </p>
            <div className="hidden md:block mt-12 pl-6 max-w-[12rem] scroll-reveal scroll-stagger-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-mute leading-relaxed">
                What we believe
                <br />
                &amp; how we build
              </p>
            </div>
          </div>

          <div className="md:col-span-9">
            <h2 className="manifesto-headline display-hd text-[6.5vw] md:text-[3.8vw] leading-[1.08] tracking-[-0.02em]">
              {HEADLINE.map((line, li) => (
                <span key={li} className="block">
                  {line.map((w, wi) => {
                    const i = wordIdx++;
                    return (
                      <span
                        key={wi}
                        className={`manifesto-word ${w.cls ?? ""}`}
                        style={{ transitionDelay: `${i * 0.06}s` }}
                      >
                        {w.text}
                        {wi < line.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>

            <p className="scroll-reveal mt-8 md:mt-10 max-w-2xl text-base md:text-lg font-normal leading-[1.5] text-brand-ivory">
              웹사이트는 기업의 얼굴이자 가장 강력한 마케팅 도구이며,
              브랜드의 첫인상을 결정하는 공간입니다.
            </p>

            <p className="scroll-reveal scroll-stagger-1 mt-4 max-w-2xl text-sm md:text-[15px] font-light leading-[1.6] text-brand-silver">
              저희는 디자인과 개발을 분리하지 않습니다. 브랜드 분석부터
              기획, 디자인, 퍼블리싱, 운영까지 하나의 흐름으로 연결해
              완성도 높은 디지털 경험을 만듭니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
