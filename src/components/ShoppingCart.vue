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
            <p v-if="checkoutStatus">{{checkoutStatus}}</p>
        </ul>
    </div>    
</template>

<script>
import {mapState, mapGetters} from 'vuex'
export default {
    computed: {
         // spread operators (ES7)
         ...mapState({
             checkoutStatus: 'checkoutStatus'
         }),
         ...mapGetters({
             products: 'cartProducts',
             total: 'cartTotal'
         })
    }
}
</script>

<style scoped>

</style>