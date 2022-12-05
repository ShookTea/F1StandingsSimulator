import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import f1SeasonBuilder from "./src/dataBuild/f1/seasonData/data-build-plugin";
import formulaDriverBuilder from './src/dataBuild/f1/driverData/data-build-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      f1SeasonBuilder,
      formulaDriverBuilder,
      vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
