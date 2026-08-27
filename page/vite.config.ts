import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    publicDir: false,
    resolve:{
        alias: {
          '@src': path.resolve(import.meta.dirname, './src'),
          '@pages': path.resolve(import.meta.dirname,'./src/pages'),
          '@assets': path.resolve(import.meta.dirname,'./src/assets'),
          '@misc': path.resolve(import.meta.dirname,'./src/misc'),
          '@tools': path.resolve(import.meta.dirname,'./src/tools'),
        }
    }
})
