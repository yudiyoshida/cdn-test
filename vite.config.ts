import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: 'src/main.ts',
      name: 'WidgetEmbed',
      formats: ['iife'],
      fileName: () => `widget-embed.js`
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
          pinia: 'Pinia'
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
});
