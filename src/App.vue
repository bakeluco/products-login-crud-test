<template>
  <v-app fluid fill-height>
    <Navbar v-if="this.$store.state.user_id" />
    <v-main class="background" fluid fill-height>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    auth: false,
  }),
  created() {
    if (!this.$store.state.token) this.$router.push("/login");
  },
  methods: {},
  watch: {},
};
</script>

<style>
.background {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgb(0, 0, 0) 0%,
    rgb(26, 56, 44) 0%,
    rgb(175, 226, 205) 100%
  );
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
