import { useScrollReveal } from "../hooks/useScrollReveal";
import { serviceGroups, productLineup } from "../data/services";
import { processSteps } from "../data/process";

export default function Services() {
  useScrollReveal([]);
  return (
    <section className="pt-40 pb-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="relative max-w-4xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright">
              / Services
            </p>
            <h1 className="display-hd text-[10vw] md:text-[6vw] leading-[1.0] tracking-[-0.025em] mt-6">
              WHAT
              <br />
              <span className="text-outline">WE DO.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85">
              기업 홈페이지부터 브랜드 사이트, 쇼핑몰, 랜딩페이지까지.
              그리고 런칭 이후의 성장까지 함께합니다.
            </p>
          </div>
        </div>

        {/* Product lineup */}
        <div className="mt-20 border-t editorial-line">
          {productLineup.map((p, i) => (
            <div
              key={p.label}
              className="grid grid-cols-12 gap-6 border-b editorial-line py-8 hover:bg-brand-ivory/5 transition-colors group scroll-reveal"
            >
              <div className="col-span-1 font-mono text-xs text-brand-mute self-center">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-7 md:col-span-4">
                <h3 className="display-hd text-2xl md:text-4xl group-hover:text-brand-green-bright transition-colors">
                  {p.label}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 text-brand-silver self-center">
                {p.description}
              </div>
              <div className="col-span-4 md:col-span-1 self-center text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-mute">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Service groups (deep) */}
        <div className="mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright mb-4">
            / Deep dive
          </p>
          <h2 className="display-hd text-4xl md:text-6xl mb-16 scroll-reveal">
            Strategy · Design · Development · Growth.
          </h2>
          <div className="grid gap-px bg-brand-ivory/10 md:grid-cols-2">
            {serviceGroups.map((g, i) => (
              <div
                key={g.key}
                className={`bg-brand-black p-10 scroll-reveal scroll-stagger-${(i % 4) + 1}`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-mute mb-4">
                  / 0{i + 1}
                </p>
                <h3 className="display-hd text-3xl md:text-5xl mb-4">
                  {g.title}
                </h3>
                <p className="text-brand-green-bright text-sm mb-6">{g.tagline}</p>
                <p className="text-brand-silver leading-relaxed mb-8">{g.body}</p>
                <ul className="space-y-3 border-t editorial-line pt-6">
                  {g.items.map((item) => (
                    <li key={item.label} className="flex items-baseline gap-4">
                      <span className="h-1 w-1 rounded-full bg-brand-green-bright shrink-0 translate-y-[-3px]" />
                      <div>
                        <p className="text-brand-ivory">{item.label}</p>
                        <p className="text-sm text-brand-mute">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mt-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-green-bright mb-4">
            / Process
          </p>
          <h2 className="display-hd text-4xl md:text-6xl mb-16 scroll-reveal">
            5단계 제작 프로세스.
          </h2>
          <div className="relative grid gap-12 md:grid-cols-5">
            <div className="absolute top-3 left-0 right-0 hidden md:block">
              <div className="h-px bg-brand-ivory/15 scroll-line-draw" />
            </div>
            {processSteps.map((step, i) => (
              <div
                key={step.index}
                className={`relative scroll-reveal scroll-stagger-${i + 1}`}
              >
                <div className="relative z-10 mb-6 h-6 w-6 rounded-full border border-brand-green-bright bg-brand-black flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-brand-green-bright" />
                </div>
                <p className="font-mono text-xs text-brand-green-bright mb-2">
                  {step.index}
                </p>
                <h3 className="display-hd text-2xl mb-2">{step.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-mute mb-4">
                  {step.korean} · {step.duration}
                </p>
                <p className="text-sm text-brand-silver leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
