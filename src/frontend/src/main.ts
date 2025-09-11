
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { vBColorMode } from 'bootstrap-vue-next';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)


app.use(createPinia())
app.use(createBootstrap())
app.use(router)

app.directive('b-color-mode', vBColorMode)

app.mount('#app')
