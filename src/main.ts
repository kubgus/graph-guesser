import { createMemoryHistory, createRouter } from 'vue-router'

import GameView from './GameView.vue'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const routes = [
  { path: '/', component: GameView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
    .use(router)
    .mount('#app')
