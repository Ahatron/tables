import App from './App.vue'
import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'

import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(PrimeVue)

app.mount('#app')
