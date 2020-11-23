<template>

    <div>
        <h1>Shopping cart</h1>
        <ul>
            <li 
            v-for="product in products" 
            :key="product.id">
            {{product.title}} - {{product.prica}} - {{product.quantity}}
            </li>
        </ul>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>