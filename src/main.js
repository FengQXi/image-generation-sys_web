import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

// Plugins
import { registerPlugins } from './plugins'

import '@/permission'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
