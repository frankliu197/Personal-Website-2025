import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { vReveal } from './directives/v-reveal'

const app = createApp(App)
app.directive('reveal', vReveal)
app.mount('#app')
