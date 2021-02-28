<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']"
                         class="tab-control"
                          @tabClick="tabClick"
                          ref="tabControl1"
                          v-show="isTabFixed"></tab-control>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll" 
                :pull-up-load="true"
                @pullingUp="loadMore">
            <home-swiper :banners="banners"
                         @swiperLoad="swiperLoad"/>
            <recommand-view :recommands="recommends"></recommand-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行','新款','精选']"
                          @tabClick="tabClick"
                          ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
            <!-- <scroll/> -->
        <back-top @click.native="backClick" v-if="isShow"/>
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

import Scroll from '../../components/common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from '../../network/home'
import {debounce} from '../../common/utils'



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
            BackTop,
            Scroll
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
                currentType: 'pop',
                isShow: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
                itemImglistener: null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        activated() {
            console.log("activated");
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            console.log("deactivated");
            this.saveY = this.$refs.scroll.getScrollY();

            //取消全局事件的监听
            this.$bus.$off('itemImageLoad', this.itemImglistener)
        },
        created() {
            
            //请求多个数据
            this.getHomeMultidata()
            //请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell') 
        },
        mounted() {
            //监听itm中图片加载完成
            const refresh = debounce(this.$refs.scroll.refresh)

            //对监听事件进行保存
            this.itemImglistener = () => {
                refresh()
            }
            this.$bus.$on('itemImageLoad', this.itemImglistener)
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
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            backClick() {
                this.$refs.scroll.scrollTo(0,0)
            },

            contentScroll(position) {
                //判断backTop是否显示
                this.isShow = position.y < -1000;
                //顶部固定的control
                this.isTabFixed = -position.y > this.tabOffsetTop;
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },

            swiperLoad() {
                //拿到tabcontrol的offsetTop
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
                
            },

            //网络请求方法
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                console.log('首页数据');
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
                
                this.$refs.scroll.finishPullUp();
            })
            },
        }
        }
</script>

<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }
    .tab-control {
        position: relative;
        z-index: 9;
        /* margin-top: 44px; */
    }
</style>