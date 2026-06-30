import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Hero from "../sections/Hero";
import ManifestoIntro from "../sections/ManifestoIntro";
import Manifesto from "../sections/Manifesto";
import FeaturedWorksIntro from "../sections/FeaturedWorksIntro";
import FeaturedWorks from "../sections/FeaturedWorks";
import AppLabIntro from "../sections/AppLabIntro";
import AppLab from "../sections/AppLab";
import Process from "../sections/Process";
import ValuesIntro from "../sections/ValuesIntro";
import Values from "../sections/Values";
import Stack from "../sections/Stack";
import Stats from "../sections/Stats";
import CubeTransition from "../components/CubeTransition";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useScrollReveal([]);

  // 모든 컴포넌트(cube + 본문 pin) mount 후 강제 refresh
  // 여러 ScrollTrigger pin들이 layout 위치를 정확히 재계산하도록
  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => ScrollTrigger.refresh(), 200));
    timers.push(window.setTimeout(() => ScrollTrigger.refresh(), 800));
    timers.push(window.setTimeout(() => ScrollTrigger.refresh(), 1800));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <>
      {/* Cube 1: Hero ↔ Manifesto (큐브 transition) */}
      <CubeTransition front={<Hero />} bottom={<ManifestoIntro />} />
      <Manifesto />

      {/* 나머지는 자연스러운 흐름 — 각 섹션의 intro → body 순서 */}
      <FeaturedWorksIntro />
      <FeaturedWorks />
      <AppLabIntro />
      <AppLab />
      <Process />
      <ValuesIntro />
      <Values />
      <Stats />
      <Stack />
    </>
  );
}
