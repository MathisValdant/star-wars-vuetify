<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="py-15">
    <v-container>
      <v-row>
        <v-col xs="12" lg="6">
          <h1 class="text-h2 mb-10">404 Page Introuvable</h1>
          <RouterLink to="/">
            <v-btn color="primary"> Retourner à la navigation </v-btn>
          </RouterLink>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
