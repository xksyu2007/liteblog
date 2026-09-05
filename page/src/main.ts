import { createApp } from 'vue'
import App from "./App.vue";
import '@style/style'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "@misc/router.ts";

createApp(App).use(router).mount('#app')
