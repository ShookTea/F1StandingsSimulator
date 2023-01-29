import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import formulaDriverBuilder from './src/dataBuild/f1/driverData/data-build-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      formulaDriverBuilder,
      vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
