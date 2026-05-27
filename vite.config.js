import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/theme/tokens" as *;\n@use "@/theme/mixins" as *;\n`,
        },
      },
    },
  };
});
