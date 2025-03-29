import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Define __dirname in an ESM environment
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          "react-query": ["@tanstack/react-query"],
        },
      },
    },
  },
});
