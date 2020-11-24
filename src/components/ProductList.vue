<template>
    <div>
        <h1>Product List</h1>
        <img   
        v-if="loading" 
        src="https://i.imgur.com/4yT15sl.gif" />
        <ul v-else>
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

export default {
    data () {
        return {
            loading: false
        }
    },
    computed: {
        products () {
            return this.$store.state.products
        },
        productInStock () {
            return this.$store.getters.productInStock
        }
    }, 
    methods: {
        addProductToCard (product) {
            this.$store.dispach('pushProductToCart', product)
        }
    },   
    created(){
       this.loading = true
       this.$store.dispach('fetchProducts')
       .then(() => this.loading = false)
    }
}
</script>

<style scoped>

</style>