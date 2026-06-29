import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import PageTransition from "./components/PageTransition";
import Intro from "./components/Intro";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * 라우트 전환 시 패널이 cover → swap → reveal 순으로 흐르도록 controlled location.
 * - location 변경 감지 → active true (패널 위로 차오름, 0.65s)
 * - cover 완료 시점에 displayedLocation을 새 location으로 swap (사용자는 패널에 가려 못 봄)
 * - 잠시 후 active false → 패널이 다시 아래로 빠지며 새 페이지 reveal
 */
export default function App() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [active, setActive] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (location.pathname === displayed.pathname) return;

    // 모든 타이머 클리어 (연속 클릭 대응)
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];

    // 1) 패널 cover 시작
    setActive(true);

    // 2) cover 완료(0.65s) 직후 → location swap. 사용자는 패널에 가려 깜박임 없음.
    timers.current.push(
      window.setTimeout(() => {
        setDisplayed(location);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, 680),
    );

    // 3) swap 후 150ms 머묾 → reveal
    timers.current.push(
      window.setTimeout(() => {
        setActive(false);
      }, 830),
    );

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [location, displayed.pathname]);

  return (
    <>
      <Intro />
      <SmoothScroll />
      <Cursor />
      <PageTransition active={active} />
      <Header />
      <main id="main" className="relative">
        <Routes location={displayed}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
