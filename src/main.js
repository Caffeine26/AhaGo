import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/styles/fonts.css';
import { createPinia } from "pinia";
import "leaflet/dist/leaflet.css";

const app = createApp(App)
app.use(router)
app.mount('#app')

app.use(createPinia());

