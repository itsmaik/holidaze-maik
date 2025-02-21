import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Simulate __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Vite configuration
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
