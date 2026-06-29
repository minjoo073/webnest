import { useEffect, useRef } from "react";

/**
 * 단순 그린 점 커서. 트레일 없음, glow 없음.
 * 마우스 즉시 추적.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: PointerEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[10000] -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-brand-green-bright hidden md:block"
    />
  );
}
