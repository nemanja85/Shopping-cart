import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    availableProducts: state => {
      return state.products.filter(products => products.inventory > 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    }
  },
  actions: {
    fetchProducts() {

    }
  },
  modules: {
  }
})
