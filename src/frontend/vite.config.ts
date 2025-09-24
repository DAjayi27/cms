import { fileURLToPath, URL } from 'node:url'

import { defineConfig , loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'bootstrap-vue-next/resolvers'


// https://vite.dev/config/
export default defineConfig(({ mode,command }) =>{

    const env = loadEnv(mode,process.cwd(),'')
    let proxyRules = {}

    if (mode === 'development' || mode === 'preview'){
        proxyRules = {
            '^/api': {
                target: `http://localhost:${env.VITE_PREVIEW_PORT}`, // your Spring Boot port
                changeOrigin: true,
                // If your backend already serves routes with the /api prefix, keep rewrite commented.
                // If your backend serves at /tasks (no /api), uncomment the rewrite:
                // rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }

    return {

        plugins: [
            vue(),
            Components({
                resolvers: [BootstrapVueNextResolver()],
            }),
        ],
        resolve: {
            alias:{
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        server: {
            proxy: proxyRules
        }
    }
})
