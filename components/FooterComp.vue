<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="bg-yellow py-4 mt-10 p-relative">
    <v-row justify="center" no-gutters>
      <RouterLink v-for="(lien, i) in menu" :key="lien" :to="path[i]">
        <v-btn color="black" variant="text" class="mx-2" rounded="xl">
          {{ lien }}
        </v-btn>
      </RouterLink>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Mathis Valdant</strong>
      </v-col>
    </v-row>
  </footer>
</template>

<script>
export default {
  data: () => ({
    menu: ["Accueil", "Planètes"],
    path: ["/", "/planetes"],
  }),
};
</script>
