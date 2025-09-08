import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { vReveal } from './directives/vReveal'
import { vNavHighlight } from './directives/vNavHighlight'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('navHighlight', vNavHighlight)
app.mount('#app')
