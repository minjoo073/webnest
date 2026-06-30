import { Link } from "react-router-dom";

/**
 * AppLab의 헤더 부분 — 큐브 face로 들어갈 100vh.
 * 본문(폰 카드 grid)은 AppLab 컴포넌트에 남아 있음.
 */
export default function AppLabIntro() {
  return (
    <section className="relative pt-32 md:pt-48 pb-12 md:pb-16 overflow-hidden border-t editorial-line">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 w-full">
        <div className="relative max-w-3xl">
          <span className="section-accent" aria-hidden />
          <div className="pl-6 md:pl-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
              / 03 &nbsp;From the App Lab
            </p>
            <h2 className="display-hd text-[9vw] md:text-[5vw] leading-[0.95] tracking-[-0.02em] mt-6 scroll-reveal-mask">
              NATIVE.
              <br />
              <span className="text-outline">IN THE POCKET.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
              style={{ transitionDelay: "0.1s" }}
            >
              브랜드 사이트의 끝이 화면이라면, 앱의 시작은 손바닥입니다.
              <br className="hidden md:inline" />
              React Native와 Expo로 만든 모바일 전용 케이스를 모았습니다.
            </p>
            <Link
              to="/works"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-brand-green-bright hover:text-brand-green-bright transition-colors scroll-reveal"
            >
              앱 케이스 전체 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
