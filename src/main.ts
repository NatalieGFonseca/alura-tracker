import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roterador from './router'
import { key, store } from './store'

createApp(App)
    .use(roterador)
    .use(store, key)
    .mount('#app')
