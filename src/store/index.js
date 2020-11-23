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
    fetchProducts(commit) {
      return new Promise((resolve) =>{
        shop.getProducts(products =>{
          commit("setProducts", products)
          resolve()
        })
      })
    },
    addToCart(context, product) {
      if(product.inventory > 0){
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem){
            context.commit('pushProductToCart', product.id)
        }
        else {
            context.commit('incrementItem', cartItem)
        }
      }
      context.commit('decrementProduct', product)
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
