<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      loading
      :variant="isHovering ? 'tonal' : 'outlined'"
      color="primary"
      class="rounded-lg h-100"
      v-bind="props"
    >
      <v-card-title class="pb-0">{{ planets.name }}</v-card-title>
      <v-card-subtitle class="mb-3"
        >Climat : {{ planets.climate }}</v-card-subtitle
      >
      <v-divider color="primary"></v-divider>
      <v-card-text class="text-white">
        {{ planets.name }} est principalement composée de
        {{ planets.terrain }} où plus de {{ planets.population }} personnes y
        habitent.</v-card-text
      >
      <v-card-actions>
        <RouterLink
          :to="{ name: 'planet', params: { nom: planets.name, id: id } }"
        >
          <v-btn color="primary" variant="tonal">En savoir plus</v-btn>
        </RouterLink>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ["planets"],

  data() {
    return {
      id: 0,
    };
  },

  methods: {
    // L'api ne me donne pas d'id, donc je récupère celui qui se situe en toute fin de l'URL
    getId(url) {
      const compUrl = url.split("/");
      const id = compUrl[5];
      this.id = id;
    },
  },

  created() {
    this.getId(this.planets.url);
  },
};
</script>

<style>
.v-card {
  transition: all 0.2s ease-in-out;
}
</style>
