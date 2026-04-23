import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve vite and plugin from either local or parent node_modules
const { defineConfig } = await import('vite');
const { default: react } = await import('@vitejs/plugin-react');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4321,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
