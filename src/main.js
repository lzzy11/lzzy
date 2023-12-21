import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(piniaPluginPersist)
createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app')