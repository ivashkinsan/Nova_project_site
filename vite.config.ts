import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "Public",
  assetsInclude: [
    "**/*.jpeg",
    "**/*.jpg",
    "**/*.png",
    "**/*.webp",
    "**/*.JPG",
    "**/*.JPEG",
    "**/*.svg",
  ],
  // GitHub Pages отдаёт проект-сайт по /<repo>/, поэтому base должен совпадать
  // с именем репозитория (origin: github.com/ivashkinsan/Nova_project_site).
  // Значение только ASCII: Vite прогоняет base через URL-парсер и процентно
  // кодирует кириллицу — тогда адрес dev-сервера становится нечитаемым.
  // Если появится свой домен (CNAME) — вернуть "/".
  base: "/Nova_project_site/",
  build: {
    target: "es2020",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
});
