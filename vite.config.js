import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dataBuildPlugin from "./src/dataBuild/data-build-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      dataBuildPlugin,
      vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
