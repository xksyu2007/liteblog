import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve:{
        alias: {
          '@src': path.resolve(__dirname, 'src'),
          '@pages': path.resolve(__dirname,'src/pages'),
          '@assets': path.resolve(__dirname,'src/assets'),
          '@misc': path.resolve(__dirname,'src/misc'),
          '@tools': path.resolve(__dirname,'standalone/tools'),
        }
    }
})
