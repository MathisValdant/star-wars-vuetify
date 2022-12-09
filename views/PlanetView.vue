<script setup>
import ElementListPlanetVue from "../components/ElementListPlanet.vue";

import { getCurrentUser, useCurrentUser } from "vuefire";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const user = useCurrentUser();
</script>

<template>
  <main class="py-10">
    <v-container class="my-5">
      <v-breadcrumbs
        :items="['Accueil', 'Planètes', infos.name]"
      ></v-breadcrumbs>
      <v-card
        variant="outlined"
        color="primary"
        class="py-5 bg-dark rounded-xl bg-secondary elevation-11"
      >
        <v-row class="mx-1">
          <v-col cols="12" md="4" lg="4" class="align-self-center">
            <img src="@/assets/planet.png" />
          </v-col>
          <v-col cols="12" md="8" lg="8" class="align-self-center">
            <h1 class="d-inline-block">{{ infos.name }}</h1>
            <v-btn
              v-if="user"
              :icon="infos.isFavorite ? 'mdi-heart-off' : 'mdi-heart'"
              color="primary"
              class="float-right"
              @click="toggleFavorite(infos)"
            ></v-btn>
            <v-progress-circular
              v-if="inProgress"
              color="primary"
              indeterminate
              :size="80"
              :width="9"
            >
            </v-progress-circular>
            <ElementListPlanetVue :infos="infos" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </main>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      infos: [],
      inProgress: true,
    };
  },
  methods: {
    // Récupérer les infos de la planète
    async getPlanet(id) {
      try {
        let result = await fetch(`https://swapi.dev/api/planets/${id}/`);
        this.infos = await result.json();
        this.inProgress = false;
        // Vérifier si la planète est en favori
        this.infos.isFavorite = await this.isFavorite(this.infos);
      } catch (error) {
        console.error(error);
      }
    },
    // Vérifier si la planète est déjà en favori
    async isFavorite(infos) {
      const db = getFirestore();
      const currentUser = await getCurrentUser();
      const collectionName = `planets-${currentUser.uid}`;
      const q = query(
        collection(db, collectionName),
        where("uri", "==", infos.url)
      );
      // Exécution de la requête
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },
    async toggleFavorite(infos) {
      const db = getFirestore();
      const currentUser = await getCurrentUser();
      const collectionName = `planets-${currentUser.uid}`;
      if (!infos.isFavorite) {
        await addDoc(collection(db, collectionName), {
          uri: infos.url,
        });
      } else {
        const q = query(
          collection(db, collectionName),
          where("uri", "==", infos.url)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          await deleteDoc(doc(db, collectionName, document.id));
        });
      }
      infos.isFavorite = !infos.isFavorite;
    },
  },
  created() {
    this.getPlanet(this.id);
  },
};
</script>
