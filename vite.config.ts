import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repo from /heron-demo-store/, so production builds
// need that base. Dev stays on "/" so the local demo (and the localhost origin
// registered in HeronSignal) is unchanged.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/heron-demo-store/' : '/',
  plugins: [react()],
  server: { port: 5173, open: true },
}));
