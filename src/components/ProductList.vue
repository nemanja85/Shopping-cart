<template>
    <div>
        <h1>Product List</h1>
        <img    
        v-if="loading" 
        src="https://i.imgur.com/4yT15sl.gif"  />
        <ul v-else>
            <li 
            v-for="product in products" :key="product.id">
            {{product.title}} - {{product.price | currency}}
            <button 
            :disabled="!productInStock(product)"
            @click="addToCard(product)">
            </button>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    data () {
        return {
            loading: false
        }
    },
    computed: {
        // spread operator (ES7)
        ...mapState({
        products: state => state.products
        }),
        ...mapGetters({
            productInStock: 'productInStock'
        })
    }, 
    methods: {
        ...mapActions({
            fetchProducts: 'fetchProducts',
            addToCard: 'addToCard'
        })
    },   
    created(){
       this.loading = true
       this.fetchProducts()
       .then(() => this.loading = false)
    }
}
</script>

<style scoped>

</style>