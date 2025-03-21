import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
    server: {
        host: '0.0.0.0'
    }
})
