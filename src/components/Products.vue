<template>
  <div>
    <!-- PRODUCTS -->
    <v-data-table
      :headers="headers"
      :items="products"
      sort-by="SKU"
      class="elevation-1"
      :dark="$store.state.darkmode"
      :loading="$store.state.loading.products"
    >
      <template v-slot:item="{ item }">
        <tr
          @click="$store.state.selected.product = item"
          :class="item._id === $store.state.selected.product._id ? 'grey' : ''"
        >
          <td v-text="item.SKU"></td>
          <td v-text="item.code"></td>
          <td v-text="item.name"></td>
          <td v-text="item.description"></td>
          <td v-text="item.price"></td>
          <td v-text="item.currency"></td>
          <td>
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Products</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn icon @click="initialize"><v-icon>mdi-refresh</v-icon></v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {
      headers: [
        {
          text: "SKU",
          align: "start",
          sortable: false,
          value: "SKU",
        },
        { text: "Code", value: "code" },
        { text: "Name", value: "name" },
        { text: "Descrption", value: "description" },
        { text: "Price", value: "price" },
        { text: "Currency", value: "currency" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store.commit("getProducts");
    },
    async deleteItem(product) {
      this.$store.state.loading.products = true;
      const response = await fetch(
        "http://localhost:3000/api/products/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: product._id,
          }),
        }
      )
        .then((response) => {
          this.$store.commit("getProducts")
          this.$store.state.loading.products = false;
          return response.json();
        })
        .catch((e) => {
          this.$store.state.loading.products = false;
          console.log(e);
        });
      if (response) return response.message;
    },
  },
};
</script>
