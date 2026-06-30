import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import ErrorBoundary from "./components/ErrorBoundary";
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

  useEffect(() => {
    // displayed는 effect 내부에서만 비교/스왑에 쓰이므로 deps에서 제외한다.
    // (deps에 넣으면 setDisplayed가 effect를 재실행시켜 reveal 타이머를 스스로 지워버림)
    if (location.pathname === displayed.pathname) return;

    // 1) 패널 cover 시작
    setActive(true);

    // 2) cover 완료(0.65s) 직후 → location swap. 사용자는 패널에 가려 깜박임 없음.
    const swap = window.setTimeout(() => {
      setDisplayed(location);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, 680);

    // 3) swap 후 150ms 머묾 → reveal (패널 내림)
    const reveal = window.setTimeout(() => setActive(false), 830);

    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(reveal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Intro />
      <SmoothScroll />
      <Cursor />
      <PageTransition active={active} />
      <Header />
      <main id="main" className="relative">
        <ErrorBoundary
          resetKey={displayed.pathname}
          fallback={
            <div className="flex min-h-screen items-center justify-center px-6 text-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-green-bright mb-4">
                  / 화면을 다시 그리는 중
                </p>
                <p className="text-brand-silver">
                  잠시 후 다시 시도하거나 상단 메뉴로 이동해 주세요.
                </p>
              </div>
            </div>
          }
        >
          <Routes location={displayed}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
