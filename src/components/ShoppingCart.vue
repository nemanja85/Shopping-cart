<template>

    <div>
        <h1>Shopping cart</h1>
        <ul>
            <li 
            v-for="product in products" 
            :key="product.id">
            {{product.title}} - {{product.price | currency}} - {{product.quantity}}
            </li>
            <p>Total :{{total | currency}} </p>
            <button @click="store.dispach('checkout')">Checkout</button>
            <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
        </ul>
    </div>    
</template>

<script>
export default {
    computed: {
        product() {
            return this.store.getters.cartProducts
        },
        total() {
            return this.store.getters.cartTotal
        }
    }
}
</script>

<style scoped>

</style>