<template>
  <v-container fluid fill-height class="background">
    <div max-width="250" justify="center" align="center">
      <v-img contain max-height="150" src="../assets/logo.png"></v-img>
      <v-text-field
        class="mb-0 mt-4"
        solo
        placeholder="Username"
        v-model="username"
        append-icon="mdi-account"
        @keyup.enter="login"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        class="mt-0"
        solo
        placeholder="Password"
        @keyup.enter="login"
      ></v-text-field>
      <v-alert dense v-if="invalid" type="error">{{ invalid }}</v-alert>
      <v-checkbox dark label="Remember Me" v-model="rememberme"></v-checkbox>
      <v-btn @click="login" dark color="green darken-3">Login</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      logo: "../assets/logo.png",
      username: undefined,
      password: undefined,
      rememberme: false,
      show: false,
      invalid: false,
    };
  },
  methods: {
    //
    async encrypt(string) {
      const data = new TextEncoder().encode(string);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return hashHex;
    },

    //
    async login() {
      if (!this.username || !this.password) return;
      let hash = await this.encrypt(this.password);
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: hash,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .catch((e) => {
          console.log(e);
        });
      if (!res.state) {
        this.password = undefined;
        return (this.invalid = res.message);
      } else {
        if (this.rememberme) {
          // Object.entries(res.user).forEach(([key, value]) => {
          //   localStorage.setItem(key, value);
          // });
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("token", res.token);
        }
        this.$store.state.user_id = res.user_id;
        this.$store.state.token = res.token;
        this.$router.push("/");
      }
    },

    async restoreSession() {
      //fetch(restoreSession)
      this.$store.state.user_id = localStorage.getItem("user_id");
      this.$store.state.token = localStorage.getItem("token");
      this.$router.push("/");
    },
  },
  mounted() {
    if (localStorage.getItem("user_id") && localStorage.getItem("token")) {
      this.restoreSession();
    }
  },
};
</script>
