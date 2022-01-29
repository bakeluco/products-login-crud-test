<template>
  <v-container>
    <AddProduct />
    <EditProduct />
    <Products />
  </v-container>
</template>

<script>
import Products from "../components/Products.vue";
import AddProduct from "../components/AddProduct.vue";
import EditProduct from "../components/EditProduct.vue";

export default {
  name: "Home",
  components: {
    Products,
    AddProduct,
    EditProduct,
  },
};
</script>
