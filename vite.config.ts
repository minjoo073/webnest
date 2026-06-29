import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: minjoo073.github.io/webnest/ — base 경로 필수
export default defineConfig({
  plugins: [react()],
  base: "/webnest/",
});
