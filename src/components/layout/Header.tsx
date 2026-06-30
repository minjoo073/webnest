import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-black border-b border-brand-ivory/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="font-display text-lg tracking-tightest font-bold leading-none"
          aria-label="WEB NEST 홈"
        >
          WEB <span className="text-brand-green-bright">NEST</span>
          <span className="ml-2 text-[11px] font-mono uppercase tracking-widest text-brand-mute">
            studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.slice(1).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.18em] line-reveal ${
                  isActive
                    ? "text-brand-green-bright"
                    : "text-brand-ivory hover:text-brand-ivory"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-4 inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] hover:border-brand-green-bright hover:text-brand-green-bright transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green-bright animate-pulse" />
            프로젝트 문의
          </Link>
        </nav>

        <button
          type="button"
          aria-label="메뉴"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden font-mono text-xs uppercase tracking-widest"
        >
          {open ? "닫기" : "메뉴"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 pb-8 pt-2">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-display text-3xl ${
                  isActive ? "text-brand-green-bright" : "text-brand-ivory"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
