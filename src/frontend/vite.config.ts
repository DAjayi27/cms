import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next/resolvers'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8000,
    proxy: {
      '^/api': {
        target: 'http://localhost:8100', // your Spring Boot port
        changeOrigin: true,
        // If your backend already serves routes with the /api prefix, keep rewrite commented.
        // If your backend serves at /tasks (no /api), uncomment the rewrite:
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
