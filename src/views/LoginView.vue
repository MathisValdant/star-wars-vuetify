<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
</script>

<template>
  <main class="py-15">
    <v-container>
      <v-row class="justify-center">
        <v-col xs="12" sm="8" md="8" lg="6" class="bg-primary">
          <h1>Connexion / Inscription</h1>
          <p class="pb-5">Rejoignez le côté obscur de la Force...</p>
          <v-text-field type="email" label="Email :" v-model="email" />
          <v-text-field
            type="password"
            label="Mot de passe :"
            v-model="password"
          />
          <div v-if="failed">
            <v-alert type="error"
              >Cet email ou ce mot de passe n'existe pas</v-alert
            >
          </div>
          <v-btn v-on:click="login" class="mr-3" color="primary"
            >Connexion</v-btn
          >
          <v-btn
            v-on:click="register"
            variant="outlined"
            class="mr-3"
            color="primary"
            >Inscription</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      failed: false,
    };
  },
  methods: {
    async register() {
      this.failed = false;
      try {
        await createUserWithEmailAndPassword(
          getAuth(),
          this.email,
          this.password
        );
        console.log("register success");
        this.$router.push("/");
      } catch (error) {
        this.failed = true;
        console.error(
          "register failed",
          error.message,
          "info",
          this.email,
          this.password
        );
      }
    },
    async login() {
      this.failed = false;
      try {
        await signInWithEmailAndPassword(getAuth(), this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        this.failed = true;
        console.error("register failed", error.message);
      }
    },
  },
};
</script>
