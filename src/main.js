import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";

let app = createApp(App);

// Pour modifier le style de base de vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#FFE81F",
          secondary: "#000",
        },
      },
    },
  },
});

app.use(vuetify);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(router);

app.mount("#app");
