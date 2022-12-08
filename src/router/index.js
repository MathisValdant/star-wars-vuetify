import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser, useCurrentUser } from "vuefire";

import HomeView from "../views/HomeView.vue";
import PlanetListView from "../views/PlanetListView.vue";
import PlanetView from "../views/PlanetView.vue";
import LoginView from "../views/LoginView.vue";
import PageNotFound from "../views/PageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "accueil",
      component: HomeView,
    },
    {
      path: "/planetes",
      query: "page",
      name: "planetes",
      component: PlanetListView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/planetes/:nom/:id",
      name: "planet",
      props: true,
      component: PlanetView,
    },
    { path: "/404", component: PageNotFound },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
});

// Ne pas permettre l'affichage de la vue login si on est déjà conneté
// ⚠ Ceci est juste esthétique
router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  if (to.name === "login" && currentUser) {
    return { name: "accueil" };
  }
});

export default router;
