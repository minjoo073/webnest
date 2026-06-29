import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR =
  ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-mask, .scroll-line-draw, .section-accent, .manifesto-headline";

const markVisibleInViewport = () => {
  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
    if (el.classList.contains("scroll-visible")) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("scroll-visible");
    }
  });
};

/**
 * .scroll-reveal* 요소 → IntersectionObserver로 .scroll-visible 트리거
 * .text-outline 요소 → 스크롤 진행에 따라 outline → 그린 fill 변환
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    // ===== IntersectionObserver (reveal) =====
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("scroll-visible")) io.observe(el);
      });
    };
    observeAll();

    const raf = requestAnimationFrame(markVisibleInViewport);

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    const fallback = window.setTimeout(markVisibleInViewport, 500);

    // ===== GSAP ScrollTrigger — .text-outline 그린 fill =====
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(".text-outline");
      targets.forEach((el) => {
        if (el.classList.contains("outline-to-fill-skip")) return;
        gsap.fromTo(
          el,
          {
            color: "transparent",
            WebkitTextStrokeColor: "rgba(245,241,232,0.35)",
          },
          {
            color: "#2fa15c",
            WebkitTextStrokeColor: "rgba(47,161,92,0)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });

    });

    // 폰트 로드 / 인트로 종료 등에 대비해 한번 더 refresh
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
