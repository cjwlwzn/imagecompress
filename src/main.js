import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ImageProcessor from './components/ImageProcessor.vue'
import { createMetaManager } from 'vue-meta'
import analyticsPlugin from './plugins/analytics'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ImageProcessor }
  ]
})

const app = createApp(App)
app.use(analyticsPlugin)
app.use(router)
app.use(createMetaManager())
app.mount('#app')