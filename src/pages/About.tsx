import { useScrollReveal } from "../hooks/useScrollReveal";
import { values, stats } from "../data/values";
import { processSteps } from "../data/process";

export default function About() {
  useScrollReveal([]);
  return (
    <section className="pt-40 pb-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="relative max-w-4xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
              / About
            </p>
            <h1 className="display-hd text-[10vw] md:text-[6vw] leading-[1.0] tracking-[-0.025em] mt-6 scroll-reveal-mask">
              BRAND
              <br />
              <span className="text-outline">EXPERIENCE</span>
              <br />
              STUDIO.
            </h1>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              브랜드가 온라인에서 처음 고객을 만나는 경험을 설계하는
              디지털 파트너입니다. 우리가 누구이고 어떻게 일하는지 소개합니다.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright mb-4 scroll-reveal">
              / 01 Studio
            </p>
            <h2 className="display-hd text-4xl md:text-5xl mb-6 scroll-reveal">
              하나의 흐름으로 만드는 웹.
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-brand-silver scroll-reveal">
              <p>
                WEB NEST는 단순히 홈페이지를 제작하는 에이전시가 아닙니다.
                브랜드가 온라인에서 처음 고객을 만나는 경험을 설계하는
                디지털 파트너입니다.
              </p>
              <p>
                디자인과 개발을 분리된 과정으로 바라보지 않고, 브랜드
                분석부터 기획, 디자인, 퍼블리싱, 운영까지 하나의 흐름으로
                연결합니다. 그 결과는 완성도 높은 디지털 경험입니다.
              </p>
              <p>
                저희가 만드는 사이트는 기업의 얼굴이자 가장 강력한 마케팅
                도구이며, 브랜드의 첫인상을 결정하는 공간입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright mb-4 scroll-reveal">
            / 02 Values
          </p>
          <h2 className="display-hd text-4xl md:text-6xl mb-16 scroll-reveal">
            우리가 일하는 방식.
          </h2>
          <div className="grid gap-px bg-brand-ivory/10 md:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.index}
                className={`bg-brand-black p-10 scroll-reveal scroll-stagger-${(i % 4) + 1}`}
              >
                <p className="font-mono text-xs text-brand-mute mb-6">
                  {v.index}
                </p>
                <h3 className="display-hd text-3xl md:text-4xl mb-4">
                  {v.title}
                </h3>
                <p className="text-brand-silver leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-32 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-t editorial-line pt-6 scroll-reveal scroll-stagger-${i + 1}`}
            >
              <p className="display-hd text-5xl md:text-7xl text-brand-green-bright">
                {s.value}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-mute">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Process preview */}
        <div className="mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright mb-4 scroll-reveal">
            / 03 Process
          </p>
          <h2 className="display-hd text-4xl md:text-6xl mb-16 scroll-reveal">
            제작 프로세스.
          </h2>
          <ol className="space-y-px bg-brand-ivory/10">
            {processSteps.map((step) => (
              <li
                key={step.index}
                className="grid grid-cols-12 gap-6 bg-brand-black p-8 scroll-reveal"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-sm text-brand-green-bright">
                  {step.index}
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="display-hd text-2xl md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute mt-1">
                    {step.korean}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-6 text-brand-silver">
                  {step.body}
                </div>
                <div className="col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-mute self-center">
                  {step.duration}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
