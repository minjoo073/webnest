import { techStack } from "../data/stack";

export default function Stack() {
  // 두 번 반복해서 끊김 없는 마퀴
  const items = [...techStack, ...techStack];
  return (
    <section className="relative py-24 border-t editorial-line overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 mb-16">
        <div className="relative max-w-3xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
              / 07 &nbsp;Stack
            </p>
            <h2 className="display-hd text-[6.5vw] md:text-[3.8vw] leading-[1.08] tracking-[-0.02em] mt-6 scroll-reveal-mask">
              우리의 <span className="text-outline">도구상자.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              검증된 프레임워크와 디자인 툴로
              안정성과 속도를 동시에 챙깁니다.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="display-hd text-xl md:text-3xl font-extrabold tracking-[-0.02em] mx-4 md:mx-6 text-brand-ivory hover:text-brand-green-bright transition-colors"
            >
              {t}
              <span className="mx-4 md:mx-6 text-brand-mute" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
