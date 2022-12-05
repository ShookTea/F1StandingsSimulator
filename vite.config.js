import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import f1SeasonBuilder from "./src/dataBuild/f1/data-build-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      f1SeasonBuilder,
      vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
