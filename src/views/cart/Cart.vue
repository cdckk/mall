<template>
    <div class="cart">
        <!-- 顶部导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'

    export default {
        name: 'Cart',
        components: {   
            NavBar,
            cartList,
            CartBottomBar
        },
        computed: {
            // cartLength() {
            //     return this.$store.state.cartList.length
            // },
            //vuex中的辅助函数
            ...mapGetters({
                length: 'cartLength',
                list: 'cartList'
            }) 
        }
    }
</script>

<style scoped>
.cart {
    height: 100vh;
}

 .nav-bar {
     background-color: var(--color-tint);
     color: #fff;
     font-weight: 700;
}
</style>