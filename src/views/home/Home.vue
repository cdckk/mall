<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <recommand-view :recommands="recommends"></recommand-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
        <back-top/>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'  
import HomeSwiper from './childComps/HomeSwiper'
import recommandView from './childComps/RecommandView'
import FeatureView from './childComps/FeatureView'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import BackTop from '../../components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from '../../network/home'


// import {SwiperItem} from 'components/common/swiper'

    export default {
        name: 'Home',
        components: { 
            NavBar,
            HomeSwiper,
            recommandView,
            FeatureView,
            TabControl,
            GoodsList,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop'
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            //请求多个数据
            this.getHomeMultidata()
            //请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        methods: {
            tabClick(index) {
                switch(index) {
                    case 0:
                        this.currentType = 'pop'; break;
                    case 1: 
                        this.currentType = 'new'; break;
                    case 2: 
                        this.currentType = 'sell'; break;
                }
            },

            getHomeMultidata() {
                getHomeMultidata().then(res => {
                console.log(res.data);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            })
            }
        }
        }
</script>

<style scoped>
    #home {
        padding-top: 44px;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }
</style>