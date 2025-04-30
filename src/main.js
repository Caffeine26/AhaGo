import { createApp } from 'vue'
<<<<<<< HEAD
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
=======
import App from './App.vue'

createApp(App).mount('#app')
>>>>>>> 97a39a5 (init vuejs)
