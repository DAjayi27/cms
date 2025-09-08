
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import  'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { vBColorMode } from 'bootstrap-vue-next';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)

app.component('v-select', vSelect)

app.use(createPinia())
app.use(createBootstrap())
app.use(router)

app.directive('b-color-mode', vBColorMode)

app.mount('#app')
