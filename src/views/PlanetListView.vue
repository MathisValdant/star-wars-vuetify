<script setup>
import PlanetCard from "../components/PlanetCard.vue";
</script>

<template>
  <main>
    <v-container>
      <h1 class="ma-2 mb-1">{{ titre }}</h1>
      <p class="mb-4">
        L'Univers Star Wars regorge de mondes aussi luxuriants que dangereux.
        Voici la liste des planètes que vous pouvez visiter dans cette galaxie
        lointaine, très lointaine...
      </p>
      <v-btn color="primary" @click="random()"> Planète aléatoire </v-btn>
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
      randomPage: "",
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
    async random() {
      // On génère un nb aléatoire compris entre 1 et le nb de planète
      const randomId = Math.ceil(Math.random() * this.infos.count);
      // Si l'id de la planète est dans la page actuelle
      if (randomId <= 10) {
        // On boucle dans chaque planète
        for (const planet of this.infos.results) {
          // On split l'URL pour récupérer l'id
          const compUrl = planet.url.split("/");
          const id = parseInt(compUrl[5]);
          // Si la planète à le même id que le random alors on redirige
          if (randomId === id) {
            this.$router.push({
              name: "planet",
              params: { nom: "this.infos.results.name", id: id },
            });
          }
        }
        // Si la planète est dans une autre page
      } else {
        // On crée une variable qui sera l'id de la page de requête de l'api
        // On enlève 1 car une page comprend les planètes de 1 à 10
        let randomIdPage = randomId - 1;
        // On cherche à récupérer la dizaine de l'id
        randomIdPage = randomIdPage.toString().split("");
        let pageId = randomIdPage[0];
        pageId = parseInt(pageId) + 1;
        pageId = pageId.toString();
        // On requête l'api dans la page qui contient la planète
        try {
          const result = await fetch(
            `https://swapi.dev/api/planets?page=${pageId}`
          );
          this.randomPage = await result.json();
          for (const planet of this.randomPage.results) {
            const compUrl = planet.url.split("/");
            const id = parseInt(compUrl[5]);
            if (randomId === id) {
              this.$router.push({
                name: "planet",
                params: { nom: "this.infos.results.name", id: id },
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  created() {
    this.getPlanets();
  },
};
</script>
