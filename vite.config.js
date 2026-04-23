import { fileURLToPath } from 'node:url';

let reactPlugin = null;
try {
  const mod = await import('@vitejs/plugin-react');
  reactPlugin = (mod.default ?? mod)();
} catch {
  // fall through; esbuild handles .tsx by default
}

export default {
  plugins: reactPlugin ? [reactPlugin] : [],
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/src', import.meta.url)),
    },
  },
};
