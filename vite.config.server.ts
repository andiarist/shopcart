import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-server',
    ssr: true,
    lib: {
      entry: './server/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['express', 'path', 'url', 'fs'],
    },
  },
});
