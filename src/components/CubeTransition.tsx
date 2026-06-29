import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 페이지 큐브 transition.
 * - viewport가 큐브 한 면. 스크롤 진행에 따라 큐브가 X축 회전.
 * - 정면(front)이 위로 사라지면서 아래 면(bottom)이 정면으로 등장.
 * - ScrollTrigger pin으로 한 화면에서 회전.
 *
 * Layout:
 *   front: viewport 정면 (rotateX 0deg, translateZ +50vh)
 *   bottom: 큐브 아래 면 (rotateX 90deg, translateY +100vh, transformOrigin top)
 *   큐브 자체가 rotateX(-90)으로 회전 → bottom이 정면으로
 */
export default function CubeTransition({
  front,
  bottom,
}: {
  front: ReactNode;
  bottom: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!stage || !cube) return;

    const ctx = gsap.context(() => {
      gsap.to(cube, {
        rotationX: 90,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    // layout 로드 후 refresh
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="cube-stage relative w-full h-screen overflow-hidden"
      style={{ perspective: "6000px", perspectiveOrigin: "50% 50%" }}
    >
      <div
        ref={cubeRef}
        className="cube relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* 정면 face */}
        <div
          className="cube-face absolute inset-0 w-full h-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: "translateZ(50vh)",
          }}
        >
          {front}
        </div>
        {/* 아래 face — bottom face가 viewport 하단에 위치하도록 -90도 회전 */}
        <div
          className="cube-face absolute inset-0 w-full h-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: "rotateX(-90deg) translateZ(50vh)",
            transformOrigin: "center center",
          }}
        >
          {bottom}
        </div>
      </div>
    </div>
  );
}
