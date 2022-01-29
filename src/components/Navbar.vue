<template>
  <v-app-bar app :dark="$store.state.darkmode">
    <div class="d-flex align-center">
      <a href="/">
        <v-img
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </a>
    </div>

    <v-spacer></v-spacer>
    <v-btn
      @click="$store.state.darkmode = !$store.state.darkmode"
      text
      v-text="$store.state.darkmode ? 'Light Mode' : 'Dark Mode'"
    ></v-btn>
    <v-btn @click="logout" text> Logout </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async logout() {
      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: this.$store.state.user_id,
        }),
      })
        .then((response) => {
          localStorage.clear();
          this.$store.state.user_id = undefined;
          this.$store.state.token = undefined;
          this.$router.push("/login");
          return response.json();
        })
        .catch((e) => {
          console.log(e);
        });
      if (res) return res.message;
    },
  },
};
</script>
