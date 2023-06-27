import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

// Plugins
import { registerPlugins } from './plugins'

import { registerSvgIcon } from './icons'

import '@/permission'

const app = createApp(App)

registerPlugins(app)
registerSvgIcon(app)

app.mount('#app')
