<script setup>
import PlanetCard from "../components/PlanetCard.vue";
</script>

<template>
  <main>
    <v-container>
      <h1 class="ma-2 mb-1">{{ titre }}</h1>
      <p>
        L'Univers Star Wars regorge de mondes aussi luxuriants que dangereux.
        Voici la liste des planètes que vous pouvez visiter dans cette galaxie
        lointaine, très lointaine...
      </p>
      <v-row v-if="inProgress">
        <v-col cols="12" class="my-5 text-center">
          <v-progress-circular
            class=""
            color="primary"
            indeterminate
            :size="80"
            :width="9"
          >
          </v-progress-circular>
        </v-col>
      </v-row>

      <v-row class="my-3 align-items-stretch justify-center">
        <v-col
          v-for="(planet, i) of infos.results"
          :key="i"
          xs="12"
          sm="6"
          md="4"
          lg="3"
        >
          <PlanetCard :planets="planet" />
        </v-col>
      </v-row>
      <!-- PAGINATION -->
      <v-row justify="center">
        <v-col cols="12">
          <v-container class="max-width">
            <v-pagination
              v-model="curPage"
              class="my-4"
              :length="nbPages"
              color="white"
              active-color="primary"
              variant="outlined"
              v-on:click="changePage(curPage)"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <!-- TODO : Système de filtre -->
</template>

<script>
export default {
  data() {
    return {
      titre: "Planètes",
      infos: [],
      inProgress: true,
      nbPages: 1,
      curPage: parseInt(this.$route.query.page) || 1,
    };
  },
  methods: {
    async getPlanets() {
      try {
        const result = await fetch(
          `https://swapi.dev/api/planets?page=${this.curPage}`
        );
        this.infos = await result.json();
        this.inProgress = await false;
        await this.getPagination(this.infos.count);
      } catch (error) {
        console.error(error);
        this.inProgress = false;
      }
    },
    // Récupérer le nombre de page total en fonction du nombre de résultats
    getPagination(count) {
      const nbPages = Math.ceil(count / 10);
      this.nbPages = nbPages;
    },
    changePage(curPage) {
      this.inProgress = true;
      this.$router.push({ query: { ...this.$route.query, page: curPage } });
      this.getPlanets();
    },
  },
  created() {
    this.getPlanets();
  },
};
</script>
