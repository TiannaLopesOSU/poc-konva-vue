import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.min.js"; // Import Bootstrap JavaScript

const app = createApp(App);
app.use(VueKonva);
app.mount("#app");
