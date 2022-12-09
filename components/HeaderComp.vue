<script setup>
import { RouterLink } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useCurrentUser } from "vuefire";
const user = useCurrentUser();
</script>

<template>
  <header class="elevation-11 py-3 px-4">
    <div class="container d-flex justify-space-between align-center h-100">
      <RouterLink to="/" class="h-100">
        <img src="/logo.png" alt="Logo Star Wars" />
      </RouterLink>
      <nav class="d-flex align-center">
        <ul>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/planetes">Planètes</RouterLink></li>
          <li>
            <RouterLink v-if="!user" to="/login"
              >Connexion - Inscription</RouterLink
            >
            <v-btn
              v-if="user"
              variant="outlined"
              color="primary"
              v-on:click="logout"
              >Déconnexion</v-btn
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
header {
  height: 65px;
  background-color: #111;
}
@media screen and (max-width: 600px) {
  header a {
    font-size: 0.8rem;
  }
}
.container {
  margin: 0 auto;
  max-width: 1280px;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
  padding: 0 1rem;
}
a {
  text-decoration: none;
}
</style>

<script>
export default {
  methods: {
    async logout() {
      await signOut(getAuth());
      await this.$router.push({ path: "/login" });
    },
  },
};
</script>
