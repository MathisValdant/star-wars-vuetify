<template>
  <v-list lines="one" class="bg-secondary">
    <v-list-subheader class="text-primary">Caractéristiques</v-list-subheader>
    <v-list-item>
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="primary">mdi-earth</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title>Climat : {{ infos.climate }}</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="primary">mdi-arrow-down-circle</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title>Gravité : {{ infos.gravity }}</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="primary">mdi-water</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title v-if="infos.surface_water"
        >Eau présente : Oui</v-list-item-title
      >
      <v-list-item-title v-else>Eau présente : Non</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="primary">mdi-calendar</v-icon>
        </v-avatar>
      </template>
      <v-list-item-title
        >Durée d'une journée : {{ infos.rotation_period }}h <br />
        Durée d'une année :
        {{ infos.orbital_period }} jours</v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: ["infos"],
};
</script>
