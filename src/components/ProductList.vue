<template>
    <div>
        <h1>Product List</h1>
        <ul>
            <li 
            v-for="product in products" :key="product.id">
            {{product.title}} - {{product.price | currency}}
            <button 
            :disabled="!productInStock(product)"
            @click="addProductToCard(product)">
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
        // spread operators (ES7)
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
            addProductToCard: 'addProductToCard',
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