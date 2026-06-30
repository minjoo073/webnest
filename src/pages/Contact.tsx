import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { contact } from "../data/stack";

const BUDGETS = [
  "500만원 이하",
  "500–1,000만원",
  "1,000–2,000만원",
  "2,000–5,000만원",
  "5,000만원 이상",
  "미정 / 상담 후 결정",
];

const TYPES = [
  "기업 홈페이지",
  "브랜드 사이트",
  "쇼핑몰",
  "랜딩페이지",
  "리뉴얼",
  "기타",
];

export default function Contact() {
  useScrollReveal([]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    type: TYPES[0],
    budget: BUDGETS[0],
    message: "",
  });

  function onChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 데모 — 실제 백엔드 연동 전까지 클라이언트에서 mailto로 폴백
    const body = `회사: ${form.company}\n담당자: ${form.name}\n이메일: ${form.email}\n연락처: ${form.phone}\n유형: ${form.type}\n예산: ${form.budget}\n\n${form.message}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `[프로젝트 문의] ${form.company || form.name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="pt-40 pb-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="relative max-w-4xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright">
              / Contact
            </p>
            <h1 className="display-hd text-[10vw] md:text-[6vw] leading-[1.0] tracking-[-0.025em] mt-6">
              START A
              <br />
              <span className="text-brand-green-bright">PROJECT.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85">
              최소한의 정보만 입력해주세요. 영업일 기준 24시간 이내 답변드립니다.
              간단한 견적 상담도 환영합니다.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          {/* Direct channels */}
          <aside className="lg:col-span-4 space-y-px bg-brand-ivory/10">
            {[
              { label: "EMAIL", value: contact.email, href: `mailto:${contact.email}` },
              { label: "PHONE", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
              { label: "KAKAO", value: contact.kakao, href: "https://pf.kakao.com/" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "KAKAO" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block bg-brand-black p-8 group hover:bg-brand-green-bright transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute group-hover:text-brand-black">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-2xl md:text-3xl font-bold group-hover:text-brand-black">
                  {c.value}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-mute group-hover:text-brand-black">
                  Tap to connect →
                </p>
              </a>
            ))}
          </aside>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-8 space-y-8 scroll-reveal"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="회사명 *">
                <input
                  required
                  value={form.company}
                  onChange={(e) => onChange("company", e.target.value)}
                  className="input"
                  placeholder="WEB NEST Inc."
                />
              </Field>
              <Field label="담당자 *">
                <input
                  required
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="input"
                  placeholder="홍길동"
                />
              </Field>
              <Field label="이메일 *">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="연락처">
                <input
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className="input"
                  placeholder="010-0000-0000"
                />
              </Field>
              <Field label="프로젝트 유형">
                <select
                  value={form.type}
                  onChange={(e) => onChange("type", e.target.value)}
                  className="input"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t} className="bg-brand-black">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="예산">
                <select
                  value={form.budget}
                  onChange={(e) => onChange("budget", e.target.value)}
                  className="input"
                >
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-brand-black">
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="프로젝트 내용 *">
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => onChange("message", e.target.value)}
                className="input resize-none"
                placeholder="어떤 사이트를 만들고 싶으신가요? 참고 사이트나 일정도 함께 알려주시면 좋습니다."
              />
            </Field>

            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-full bg-brand-green-bright px-8 py-4 font-mono text-sm uppercase tracking-[0.18em] text-brand-black hover:bg-brand-ivory transition-colors"
            >
              {sent ? "메일 앱이 열렸습니다 ✓" : "문의 보내기 →"}
            </button>

            <p className="text-xs text-brand-mute">
              입력하신 정보는 상담 목적 외에 사용되지 않으며, 상담 종료 후 6개월 내 파기됩니다.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(245, 241, 232, 0.2);
          padding: 12px 0;
          color: #f5f1e8;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .input::placeholder {
          color: rgba(189, 189, 189, 0.4);
        }
        .input:focus {
          border-bottom-color: #2fa15c;
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-brand-mute mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
