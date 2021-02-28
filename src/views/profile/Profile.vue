<template>
    <div id="profile">
        <nav-bar class="nav-bar"><div slot="center">个人主页</div></nav-bar>
        <user-info/>

        <div class="account">
            <div class="account-item">
                <div><span>{{getUserInfo.money}}</span>元</div>
                <div>我的余额</div>
            </div>
            <div class="account-item">
                <div><span>{{getUserInfo.coupons}}</span>个</div>
                <div>我的优惠</div>
            </div>
            <div class="account-item">
                <div><span>{{getUserInfo.count}}</span>分</div>
                <div>我的积分</div>
            </div>
        </div>

        <list-view>
            <div slot="top">我的消息</div>
            <div slot="center">积分商城</div>
            <div slot="bottom">会员卡</div>
        </list-view>

        <list-view>
            <div slot="top" @click="toCartClick">我的购物车</div>
            <div slot="center">下载购物APP</div>
        </list-view>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import ListView from './childComps/ListView.vue'
import UserInfo from './childComps/UserInfo.vue'

// import {getUserInfo} from '../../network/userInfo'

export default {
    name: 'Profile',
    components: { 
      NavBar,
      UserInfo,
      ListView 
    },
    data() {
        return {
            userInfo: {}
        }
    },
    computed: {
        getUserInfo() {
            return this.$store.state.userInfo
        }
    },
    mounted() {
        // getUserInfo().then(res => {
        //     console.log('使用者信息');
        //     console.log(res);
        //     this.userInfo = res.data;
        // })
        this.$store.dispatch('userInfo')
    },
    methods: {
        toCartClick() {
            this.$router.push('/cart')
        }
    }
    }
</script>

<style scoped>
    #profile {
        background-color: #f2f2f2;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
    .account {
        display: flex;
    }
    .account-item {
        flex: 1;
        text-align: center;
        background-color: #fff;
        margin-right: 1px;
    }
</style>