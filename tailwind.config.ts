import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 모든 텍스트 — Pretendard Variable
        sans: [
          "'Pretendard Variable'",
          "Pretendard",
          "'Apple SD Gothic Neo'",
          "'Malgun Gothic'",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        // 영문 표제 — Plus Jakarta Sans 우선. 한글 글리프 없으면 Pretendard로 fallback.
        display: [
          "'Plus Jakarta Sans'",
          "'Pretendard Variable'",
          "Pretendard",
          "'Apple SD Gothic Neo'",
          "sans-serif",
        ],
        // 영문 모노 + 한글 글리프는 Pretendard로 fallback (시스템 모노로 깨짐 방지)
        mono: [
          "'JetBrains Mono'",
          "'Pretendard Variable'",
          "Pretendard",
          "'Apple SD Gothic Neo'",
          "ui-monospace",
          "monospace",
        ],
      },
      colors: {
        brand: {
          black: "#0a0a0a",
          ink: "#141414",
          ivory: "#f5f1e8",
          paper: "#ece6d6",
          green: "#1f5e3a",
          "green-bright": "#2fa15c",
          silver: "#bdbdbd",
          mute: "#6b6b6b",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in-up": "fadeInUp 1s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in-down": "fadeInDown 1s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        reveal: "reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "blur-in": "blurIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        reveal: {
          "0%": { opacity: "0", clipPath: "inset(0 100% 0 0)" },
          "100%": { opacity: "1", clipPath: "inset(0 0 0 0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(18px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
