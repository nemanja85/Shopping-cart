import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    chekoutStatus: null
  },
  getters: {
    availableProducts: state => {
      return state.products.filter(products => products.inventory > 0)
    },
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id)
        return {
          title : product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters){
      return getters.cartProducts.reduce((total, product) => total + product.price + product.quantity, 0)
    },
    productInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItem(state, cartItem){
      cartItem.quantity++
    },
    decrementProduct(state, product){
      product.inventory--
    },
    setCheckoutStatus(state, status) {
      state.chekoutStatus = status
    },
    emptyCart(state) {
      state.cart = []
    }
  },
  actions: {
    fetchProducts(context) {
      return new Promise((resolve) =>{
        shop.getProducts(products =>{
          context.commit("setProducts", products)
          resolve()
        })
      })
    },
    addToCart({state, commit, gettters}, product) {
      if(gettters.productInStock(product)){
        const cartItem = state.cart.find(item => item.id === product.id)
        if(!cartItem){
            commit('pushProductToCart', product.id)
        }
        else {
            commit('incrementItem', cartItem)
        }
      }
      commit('decrementProduct', product)
    },
    checkout(state, commit) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )      
    }
  },
  modules: {
  }
})
