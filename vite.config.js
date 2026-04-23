import { fileURLToPath } from 'node:url';

// Load react plugin if available (installed locally in app/ or root node_modules)
let reactPlugin = null;
try {
  const mod = await import('@vitejs/plugin-react');
  reactPlugin = mod.default ?? mod;
} catch {
  // plugin not available at config-load time; build script installs it first
}

export default {
  plugins: reactPlugin ? [reactPlugin()] : [],
  root: './app',
  build: {
    outDir: '../app/dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/src', import.meta.url)),
    },
  },
};
