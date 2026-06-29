import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 페이지 전체에 Lenis 부드러운 스크롤 + GSAP ScrollTrigger 동기화.
 * - 데스크탑: Lenis로 smooth scroll, GSAP ticker가 Lenis raf 구동
 * - 모바일: native scroll (Lenis 비활성)
 * - 둘 다 ScrollTrigger는 정상 작동
 */
export default function SmoothScroll() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isMobile || prefersReduced) {
      // 모바일/감속 모션: native scroll. ScrollTrigger는 그대로 작동.
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis가 스크롤할 때마다 ScrollTrigger 업데이트
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // GSAP ticker로 Lenis raf 구동 — 두 시스템이 같은 프레임을 공유
    const rafFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    // 리사이즈/콘텐츠 변화 시 ScrollTrigger 재계산
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
