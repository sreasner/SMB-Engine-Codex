import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const appRequire = createRequire(new URL('./app/package.json', import.meta.url));
const rootRequire = createRequire(import.meta.url);

function tryRequire(id) {
  try { return appRequire(id); } catch {}
  try { return rootRequire(id); } catch {}
  return null;
}

let reactPlugin = null;
try {
  const mod = await import('@vitejs/plugin-react');
  reactPlugin = (mod.default ?? mod)();
} catch {
  try {
    const resolved = appRequire.resolve('@vitejs/plugin-react');
    const mod = await import(resolved);
    reactPlugin = (mod.default ?? mod)();
  } catch {}
}

const tailwind = tryRequire('tailwindcss');
const autoprefixer = tryRequire('autoprefixer');

const postcssPlugins = [];
if (tailwind) postcssPlugins.push(tailwind(fileURLToPath(new URL('./tailwind.config.js', import.meta.url))));
if (autoprefixer) postcssPlugins.push(autoprefixer());

export default {
  plugins: reactPlugin ? [reactPlugin] : [],
  esbuild: {
    jsx: 'automatic',
  },
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
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
