
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { vBColorMode } from 'bootstrap-vue-next'

import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)

app.use(createPinia())
app.use(createBootstrap())
app.use(router)

app.directive('b-color-mode', vBColorMode)

app.mount('#app')
