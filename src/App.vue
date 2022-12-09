<script setup>
import { RouterView } from "vue-router";
import HeaderComp from "./components/HeaderComp.vue";
import FooterComp from "./components/FooterComp.vue";
import DisconnectedAlert from "./components/DisconnectedAlert.vue";
</script>

<template>
  <DisconnectedAlert v-if="isDisconnect" />
  <HeaderComp />
  <RouterView />
  <FooterComp />
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      isDisconnect: false,
    };
  },
  methods: {
    testConnect() {
      if (navigator.onLine && this.isDisconnect) {
        this.isDisconnect = false;
      } else if (!navigator.onLine && !this.isDisconnect) {
        this.isDisconnect = true;
      }
    }
  },
  mounted() {
    setInterval(this.testConnect, 250);
  },
};
</script>
