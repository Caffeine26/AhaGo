import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import Components from "./views/ComponentsLita.vue";
import Landing from "./views/delivery/landingPage.vue";
import router from "./router";
import "leaflet/dist/leaflet.css";

const app = createApp(Landing);

app.use(createPinia());
app.use(router);

app.mount("#app");
