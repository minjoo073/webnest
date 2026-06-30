import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socials, contact } from "../../data/stack";

gsap.registerPlugin(ScrollTrigger);

function useSeoulTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useSeoulWeather() {
  const [temp, setTemp] = useState<number | null>(null);
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.978&current=temperature_2m",
    )
      .then((r) => r.json())
      .then((d) => {
        const t = d?.current?.temperature_2m;
        if (typeof t === "number") setTemp(Math.round(t));
      })
      .catch(() => {});
  }, []);
  return temp;
}

const NAV = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "WORKS", to: "/works" },
  { label: "SERVICES", to: "/services" },
  { label: "CONTACT", to: "/contact" },
];

export default function Footer() {
  const time = useSeoulTime();
  const temp = useSeoulWeather();
  const zoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // 1) 카드 자체가 화면 아래에서 위로 슬라이드 업 (명함처럼)
        gsap.fromTo(
          ".footer-card",
          { yPercent: 100, scale: 0.97 },
          {
            yPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".footer-zone",
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );

        // 2-3) 헤드라인/워드마크 reveal은 footer 카드가 슬라이드 업할 때 자연스럽게 노출됨
        //      (별도 ScrollTrigger 없이 항상 visible — stuck 위험 제거)

        // 4) 우하단 인디케이터 idle pulse
        gsap.to(".footer-pulse", {
          scale: 1.6,
          opacity: 0.4,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // 5) 우상단 라이브 점 깜빡임
        gsap.to(".footer-live-dot", {
          opacity: 0.3,
          duration: 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, zone);

    return () => ctx.revert();
  }, []);

  // 별도 IO — footer-card가 70% 이상 viewport 진입 시 reveal 모션 트리거
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".footer-card");
    if (!card) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add("scroll-visible");
          io.unobserve(card);
        }
      },
      { threshold: 0.7 },
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={zoneRef}
      className="footer-zone relative h-screen z-30"
    >
      <footer
        className="footer-card absolute inset-x-0 bottom-0 top-[8vh] md:top-[10vh] bg-brand-green-bright text-brand-black rounded-t-[1.5rem] md:rounded-t-[2.5rem] overflow-hidden"
        style={{ willChange: "transform" }}
      >

        {/* === Grid layout === */}
        <div className="relative h-full grid grid-rows-[auto_1fr_auto] px-5 md:px-12 pt-5 md:pt-8 pb-12 md:pb-16">
          {/* === Top row === */}
          <header className="flex items-start justify-between gap-4">
            <Link
              to="/"
              className="display-hd text-xl md:text-2xl font-extrabold tracking-tighter text-brand-black"
            >
              WEB NEST.
            </Link>
            <div className="flex items-center gap-2 md:gap-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.18em]">
              <span className="footer-live-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-black" />
              <span>
                SEL {temp !== null ? `${temp}°` : "—"} /{" "}
                <span className="tabular-nums">{time || "--:--:--"}</span>
              </span>
            </div>
          </header>

          {/* === Center === */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 mt-6 md:mt-10">
            {/* Headline + CTA */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
              <h2 className="display-hd text-[10vw] md:text-[6vw] leading-[0.95] font-extrabold tracking-tightest text-brand-black">
                <span className="block overflow-hidden">
                  <span
                    className="footer-headline-word inline-block"
                    style={{ transitionDelay: "0.05s" }}
                  >
                    LET&apos;S
                  </span>{" "}
                  <span
                    className="footer-headline-word inline-block"
                    style={{ transitionDelay: "0.13s" }}
                  >
                    BUILD
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="footer-headline-word inline-block"
                    style={{ transitionDelay: "0.21s" }}
                  >
                    A
                  </span>{" "}
                  <span
                    className="footer-headline-word footer-fill inline-block"
                    data-text="NEST"
                    style={{ transitionDelay: "0.29s" }}
                  >
                    NEST
                  </span>
                  <span
                    className="footer-headline-word inline-block"
                    style={{ transitionDelay: "0.37s" }}
                  >
                    .
                  </span>
                </span>
              </h2>

              {/* Email CTA */}
              <a
                href={`mailto:${contact.email}`}
                className="group mt-6 md:mt-10 inline-flex items-center gap-3 md:gap-5 self-start"
              >
                <span className="display-hd text-base md:text-2xl font-extrabold tracking-tighter">
                  HELLO @WEBNEST.KR
                </span>
                <span className="relative h-9 w-9 md:h-12 md:w-12 rounded-full border-2 border-brand-black flex items-center justify-center overflow-hidden shrink-0">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    className="transition-transform duration-500 group-hover:translate-x-8"
                  >
                    <path
                      d="M3 11H19M19 11L11 3M19 11L11 19"
                      stroke="#0a0a0a"
                      strokeWidth="2"
                    />
                  </svg>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    className="absolute transition-transform duration-500 -translate-x-8 group-hover:translate-x-0"
                  >
                    <path
                      d="M3 11H19M19 11L11 3M19 11L11 19"
                      stroke="#0a0a0a"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </a>
            </div>

            {/* Right info column */}
            <div className="col-span-12 md:col-span-5 md:col-start-9 grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-6 font-mono">
              <div>
                <p className="text-[11px] md:text-[11px] uppercase tracking-[0.22em] text-brand-black/60">
                  LOCAL TIME (SEL)
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-base md:text-xl font-bold tabular-nums">
                  <span className="h-1 w-1 rounded-full bg-brand-black" />
                  {time || "--:--:--"}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-[11px] uppercase tracking-[0.22em] text-brand-black/60 mb-2">
                  SOCIALS
                </p>
                <ul className="space-y-0.5">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm font-bold tracking-wide hover:text-brand-ivory transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] md:text-[11px] uppercase tracking-[0.22em] text-brand-black/60 mb-2">
                  NAVIGATION
                </p>
                <ul className="space-y-0.5">
                  {NAV.map((n) => (
                    <li key={n.to}>
                      <Link
                        to={n.to}
                        className="text-xs md:text-sm font-bold tracking-wide hover:text-brand-ivory transition-colors"
                      >
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* === Giant wordmark === */}
          <div className="relative">
            <p
              className="footer-wordmark display-hd font-extrabold tracking-tightest leading-[0.78] text-brand-black"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 8.5rem)",
                marginBottom: "0",
              }}
            >
              WEB NEST.
            </p>
            {/* 우하단 인디케이터 dot */}
            <span
              className="footer-pulse absolute right-2 md:right-8 bottom-3 md:bottom-6 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-brand-ivory shadow-[0_0_14px_rgba(245,241,232,0.7)]"
              aria-hidden
            />
          </div>
        </div>

        {/* === Bottom legal row (overlay) === */}
        <div className="absolute left-5 md:left-12 right-5 md:right-12 bottom-4 md:bottom-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-brand-black/55 pointer-events-auto">
          <span>© {new Date().getFullYear()} WEB NEST. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-brand-black">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-brand-black">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
