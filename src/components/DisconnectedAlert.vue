<template>
  <v-container fluid class="contain-disconnect">
    <v-row class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <v-alert type="error" class="disconnect"
          >Vous avez été déconnecté d'internet, vérifiez votre connexion.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.contain-disconnect {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
}
.disconnect {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
