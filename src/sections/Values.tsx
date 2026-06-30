import { values } from "../data/values";

export default function Values() {
  return (
    <section className="relative pb-16 md:pb-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header는 ValuesIntro (큐브 face)로 분리됨 */}

        <div className="grid gap-px bg-brand-ivory/10 md:grid-cols-2">
          {values.map((v, i) => (
            <div
              key={v.index}
              className={`relative bg-brand-black p-10 md:p-14 scroll-reveal scroll-stagger-${(i % 4) + 1}`}
            >
              <div className="flex items-baseline justify-between mb-10">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-brand-green-bright">
                  {v.index}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-mute">
                  / Principle
                </span>
              </div>
              <h3 className="display-hd text-3xl md:text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-brand-ivory mb-4">
                {v.title}
              </h3>
              <p className="text-sm md:text-base font-light leading-[1.65] text-brand-paper/85 max-w-md">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
