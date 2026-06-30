import { Link } from "react-router-dom";

/**
 * FeaturedWorks의 헤더 부분 — 큐브 face로 들어갈 100vh.
 * 본문(가로 스크롤 갤러리)은 FeaturedWorks 컴포넌트에 남아 있음.
 */
export default function FeaturedWorksIntro() {
  return (
    <section className="relative pt-32 md:pt-48 pb-12 md:pb-16 overflow-hidden border-t editorial-line">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="relative max-w-3xl">
            <span className="section-accent" aria-hidden />
            <div className="pl-6 md:pl-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright scroll-reveal-left">
                / 02 &nbsp;Featured · Web
              </p>
              <h2 className="display-hd text-[9vw] md:text-[5vw] leading-[0.95] tracking-[-0.02em] mt-6 scroll-reveal-mask">
                SELECTED
                <br />
                <span className="text-outline">WORK.</span>
              </h2>
              <p
                className="mt-8 max-w-2xl text-base md:text-lg font-light leading-[1.6] text-brand-paper/85 scroll-reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                브랜드 사이트부터 커머스, 코퍼레이트, 통합 플랫폼까지.
                <br className="hidden md:inline" />
                스크롤하면 화면이 잠시 멈추고 작업물이 옆으로 흐릅니다.
              </p>
            </div>
          </div>
          <Link
            to="/works"
            className="self-start md:self-end inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] hover:border-brand-green-bright hover:text-brand-green-bright transition-colors scroll-reveal"
          >
            전체 작업 →
          </Link>
        </div>
      </div>
    </section>
  );
}
