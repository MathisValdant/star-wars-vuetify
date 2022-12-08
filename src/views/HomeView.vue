<template>
  <main>
    <v-carousel show-arrows="hover" height="calc(100vh - 65px)" color="primary">
      <v-carousel-item
        v-for="image of images"
        :key="image"
        :src="image"
        cover
      ></v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row class="justify-center my-6">
        <v-col xs="12" md="8" class="text-center">
          <h1 class="text-h2 mb-1">Star Wars</h1>
          <h2 class="text-h3 mb-5">Et ses planètes</h2>
          <p>
            Depuis des générations, l'univers Star Wars a fasciné les peuples de
            la galaxie avec ses mondes fascinants et ses espèces uniques.
            Chacune de ces planètes a sa propre histoire, sa propre culture et
            ses propres enjeux politiques, formant un tapis de diversité dans la
            galaxie. Sur cette page, vous pourrez en apprendre davantage sur les
            planètes les plus importantes de l'univers Star Wars, ainsi que sur
            leurs habitants et leur rôle dans la saga. Nous espérons que vous
            apprécierez votre visite et que vous en apprendrez quelque chose de
            nouveau sur cet univers fascinant.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="align-self-center text-center">
          <p>
            La force peut être utilisée pour le bien ou pour le mal. Quelle voie
            allez-vous suivre ? Choisissez entre le côté obscur et le côté clair
            de la force et suivez la voie qui vous convient le mieux. Votre
            destin est entre vos mains. Faites le bon choix.
          </p>
          <v-switch
            v-model="model"
            true-value="Obscur"
            false-value="Lumineux"
            color="red"
            hide-details
            inset
            :label="`Côté ${model} de la force`"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="
              model === 'Lumineux'
                ? '/src/assets/x-wing.png'
                : '/src/assets/tie.png'
            "
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "/src/assets/combat.jpg",
        "/src/assets/yoda.jpg",
        "/src/assets/vador.jpg",
      ],
      model: "Lumineux",
    };
  },
};
</script>
