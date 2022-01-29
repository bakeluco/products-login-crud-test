<template>
  <div>
    <v-card class="my-6" :dark="$store.state.darkmode">
      <v-card-title
        v-text="
          $store.state.selected.product._id ? 'Edit Product' : 'Please select a product...'
        "
      ></v-card-title>
      <v-container v-if="$store.state.selected.product._id">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field v-model="product.name" label="Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field v-model="product.SKU" label="SKU"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field v-model="product.code" label="Code"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field
              v-model="product.description"
              label="Descrption"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field
              v-model="product.price"
              prefix="$"
              label="Price"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-text-field
              v-model="product.currency"
              label="Currency"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-progress-linear
          v-if="loading.edit"
          indeterminate
        ></v-progress-linear>
      </v-container>
      <v-card-actions
        v-if="$store.state.selected.product._id"
        d-flex
        justify="center"
      >
        <v-btn :disabled="loading.edit" text @click="edit">edit +</v-btn>
        <v-btn :disabled="loading.edit" text @click="clear">CLEAR</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: {
        edit: false,
      },
    };
  },
  computed: {
    product() {
      return this.$store.state.selected.product;
    },
  },
  methods: {
    async edit() {
      this.loading.edit = true;
      const update = await fetch("http://localhost:3000/api/products/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...this.$store.state.selected.product }),
      })
        .then((res) => {
          this.loading.edit = false;
          return res.json();
        })
        .catch((e) => {
          this.loading.edit = false;
          console.log(e);
        });
      this.clear(update);
    },
    clear() {
      this.$store.state.selected.product = {};
      this.$store.commit('getProducts');
    },
  },
};
</script>