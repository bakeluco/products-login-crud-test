<template>
  <div>
    <v-card class="my-6" :dark="$store.state.darkmode">
      <v-card-title>
        Add Product
        <v-spacer />
        <v-btn icon @click="enable = !enable"
          ><v-icon>{{
            enable ? "mdi-chevron-left" : "mdi-chevron-down"
          }}</v-icon></v-btn
        >
      </v-card-title>
      <v-container v-if="enable">
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
        <v-progress-linear v-if="loading.add" indeterminate></v-progress-linear>
      </v-container>
      <v-card-actions v-if="enable" d-flex justify="center">
        <v-btn :disabled="loading.add" text @click="add">ADD +</v-btn>
        <v-btn :disabled="loading.add" text @click="clear">CLEAR</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
      product: {
        _id: undefined,
        SKU: "0001",
        code: 1000125,
        name: "Logitech 125 Speakers",
        description: "Wireless bluetooth speakers",
        price: 25000,
        currency: "ARS",
      },
      loading: {
        add: false,
      },
    };
  },
  methods: {
    async add() {
      this.loading.add = true;
      const create = await fetch("http://localhost:3000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...this.product }),
      })
        .then((res) => {
          this.loading.add = false;
          return res.json();
        })
        .catch((e) => {
          this.loading.add = false;
          console.log(e);
        });
      this.clear();
      //   this.getProducts();
      this.$store.commit("getProducts");
      return create;
    },
    clear() {
      this.product._id = undefined;
      this.product.SKU = undefined;
      this.product.code = undefined;
      this.product.name = undefined;
      this.product.description = undefined;
      this.product.price = undefined;
      this.product.currency = undefined;
    },
  },
};
</script>