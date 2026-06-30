import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * studiolumio.com 레퍼런스 인트로:
 * - 검정 화면 가운데에 작은 "WEB NEST" 한 줄
 * - 글자별 dim → bright stagger (피아노 건반 패턴)
 * - WEB / NEST 가 좌·우로 펼쳐지면서 가운데가 비워짐
 * - 패널 페이드아웃 → hero 노출
 *
 * - sessionStorage v4 키 (이전 키는 자동 무시)
 * - URL `?intro` 쿼리로 강제 노출 (디버그)
 * - prefers-reduced-motion 즉시 skip
 * - StrictMode 안전 (didInit ref guard)
 */
export default function Intro({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  const [show] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // dev 모드: 항상 강제 노출 (디버그)
    const isDev = import.meta.env.DEV;
    const force = new URLSearchParams(window.location.search).has("intro");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem("webnest_intro_v4") === "1";
    const result = isDev || force || !(reduced || seen);
    console.log("[Intro] decision:", {
      isDev,
      force,
      reduced,
      seen,
      show: result,
    });
    return result;
  });

  useEffect(() => {
    console.log("[Intro] useEffect run, show=", show, "didInit=", didInit.current);
    if (!show) {
      onDone?.();
      return;
    }
    if (didInit.current) return;
    didInit.current = true;

    const root = rootRef.current;
    if (!root) {
      console.warn("[Intro] rootRef.current is null!");
      return;
    }
    console.log("[Intro] timeline starting");

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          sessionStorage.setItem("webnest_intro_v4", "1");
          document.body.style.overflow = "";
          if (rootRef.current) rootRef.current.style.display = "none";
          // 인트로 후 layout 변경 동기화 (footer scrollTrigger 등)
          ScrollTrigger.refresh();
          onDone?.();
        },
      });

      // === Phase 1: 글자별 piano reveal — 두 번째 cycle도 명확하게 ===
      gsap.set(".intro-letter", { opacity: 0.08 });
      // 1차 좌→우 stagger brighten
      tl.to(".intro-letter", {
        opacity: 1,
        duration: 0.45,
        stagger: 0.13,
        ease: "power2.out",
      });
      // 2차 wave: 우→좌로 확실히 dim (0.25까지 떨어뜨림) → 폭 키워서 가시성 ↑
      tl.to(
        ".intro-letter",
        {
          opacity: 0.25,
          duration: 0.45,
          stagger: { each: 0.1, from: "end" },
          ease: "sine.inOut",
        },
        ">+0.15",
      );
      // 3차: 좌→우 다시 bright (overlap 없이 깨끗하게)
      tl.to(
        ".intro-letter",
        {
          opacity: 1,
          duration: 0.45,
          stagger: 0.1,
          ease: "power2.out",
        },
        ">+0.05",
      );

      // === Phase 2: breath ===
      tl.to({}, { duration: 0.35 });

      // === Phase 3: WEB ← 좌측, NEST → 우측 펼침 (천천히) ===
      tl.to(
        leftRef.current,
        {
          xPercent: -270,
          scale: 1.2,
          duration: 1.8,
          ease: "power4.inOut",
        },
        ">",
      );
      tl.to(
        rightRef.current,
        {
          xPercent: 270,
          scale: 1.2,
          duration: 1.8,
          ease: "power4.inOut",
        },
        "<",
      );

      // === Phase 4: hero로 자연스러운 transition ===
      // 펼침 끝 즈음부터 panel이 opacity + scale + blur로 천천히 사라짐
      tl.to(
        root,
        {
          opacity: 0,
          scale: 1.06,
          filter: "blur(8px)",
          duration: 0.95,
          ease: "power2.out",
        },
        "-=0.7",
      );
      // 부제도 살짝 일찍 페이드
      tl.to(
        ".intro-tagline",
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        "-=1.0",
      );
    }, root);

    return () => {
      // StrictMode unmount/remount 시 timeline 살려둠 (didInit guard로 재실행 차단)
      // body overflow는 onComplete에서 복원되므로 cleanup 불필요
      void ctx;
    };
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] bg-brand-black flex items-center justify-center overflow-hidden"
      aria-hidden
      style={{ willChange: "opacity" }}
    >
      {/* 가운데 한 줄 — WEB / NEST 두 묶음 */}
      <div className="flex items-center gap-4 md:gap-6 select-none">
        <div
          ref={leftRef}
          className="display-hd flex text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-brand-ivory"
          style={{ willChange: "transform" }}
        >
          {"WEB".split("").map((ch, i) => (
            <span key={`L${i}`} className="intro-letter inline-block">
              {ch}
            </span>
          ))}
        </div>
        <div
          ref={rightRef}
          className="display-hd flex text-4xl md:text-6xl font-extrabold tracking-[-0.02em] text-brand-green-bright"
          style={{ willChange: "transform" }}
        >
          {"NEST".split("").map((ch, i) => (
            <span key={`R${i}`} className="intro-letter inline-block">
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* 하단 sub-line */}
      <p className="intro-tagline absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-brand-ivory/50 text-center">
        Digital Brand Experience Studio
        <br />
        SEL · EST. 2026
      </p>
    </div>
  );
}
