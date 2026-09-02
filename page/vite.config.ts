import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [vue()],
    publicDir: command === 'serve' ? 'public' : false,
    server:{
        host: '10.62.58.126'
    },
    resolve:{
        alias: {
          '@src': path.resolve(import.meta.dirname, './src'),
          '@pages': path.resolve(import.meta.dirname,'./src/pages'),
          '@assets': path.resolve(import.meta.dirname,'./src/assets'),
          '@misc': path.resolve(import.meta.dirname,'./src/misc'),
          '@tools': path.resolve(import.meta.dirname,'./src/tools'),
        }
    }
}))
