import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_id: undefined,
    token: undefined,
    darkmode: true,
    products: [],
    selected: {
      product: {},
    },
    loading: {
      products: false,
    }
  },
  mutations: {
    async getProducts(state) {
      state.loading.products = true;
      state.selected.product = {}
      const products = await fetch("http://localhost:3000/api/products", {
        method: "GET",
      })
        .then((res) => {
          state.loading.products = false;
          return res.json();
        })
        .catch((e) => {
          state.loading.products = false;
          console.log(e);
        });
      if (products) return (state.products = products);
    },
  },
  actions: {},
  modules: {},
});
