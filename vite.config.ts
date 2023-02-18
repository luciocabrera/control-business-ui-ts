import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { dependencies } from './package.json';
import svgrPlugin from 'vite-plugin-svgr';

function renderChunks(deps: Record<string, string>) {
  const chunks: { [x: string]: string[] } = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    proxy: {
      // string shorthand
      '/api': 'http://localhost:5500'
    },
    hmr: { overlay: false }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      external: ['fsevents'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ...renderChunks(dependencies)
        }
      }
    }
  }
});
