<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" 
                        @titleClick="titleClick"
                        :current-scroll="currentScroll"
                        ref="nav"></detail-nav-bar>
        <scroll class="content" 
                :pull-up-load="true" 
                ref="scroll" 
                @scroll="contentScroll"
                :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ref="goods"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShow"></back-top>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


import Scroll from '../../components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {debounce} from '../../common/utils'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'


export default {
    name: "Detail",
    components: {
        DetailNavBar, 
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        Scroll,
        DetailBottomBar,
        BackTop
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo:{},
            commentInfo: {},
            recommendInfo: [],
            itemImgListener: null,
            themeTopYs: [],
            getThemeTopY: null,
            positionY: 0,
            currentScroll: 0,
            isShow: false
        }
    },
    created() {
        this.iid = this.$route.params.iid;

        //根据iid请求详细数据
        getDetail(this.iid).then(res => {
            //1.获取数据
            const data = res.result;
            console.log(111111111);
            console.log(data);

            //2.获取顶部的图片数据
            this.topImages = data.itemInfo.topImages;

            //3.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            console.log(2222222);
            console.log(this.goods);

            //4.获取店铺信息
            this.shop = new Shop(data.shopInfo)
            console.log(data.shopInfo);
            console.log(3333333);
            console.log(this.shop.goodsCount);

            //5.获取商品详细信息
            this.detailInfo = data.detailInfo;

            //6.获取商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
            console.log(4444444);
            console.log(this.paramInfo);

            //7.取出评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0];
                console.log('评论信息');
                console.log(this.commentInfo);
            }
        })
    

        //请求推荐数据
        getRecommend().then(res => {
            console.log('推荐信息');
            this.recommendInfo = res.data.list;
        })

        //给getThemeTopY赋值,对this.themeTopYs防抖动
        this.getThemeTopY = debounce(() => {
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log('防抖操作');
        }, 100)
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh);
        this.itemImgListener = () => {
            refresh()
        };
        this.$bus.$on('itemImageLoad', this.itemImgListener);
        console.log("挂载");
        console.log(this.positionY);
    },
    destroyed() {
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
        //接收子组件DetailGoodsInfo发来的自定义事件
        imageLoad() {
            const refresh = debounce(this.$refs.scroll.refresh);
            refresh();
            this.getThemeTopY();
        },
        titleClick(index) {
            console.log(index);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 600)
        },
        //获取滚动的位置
        contentScroll(position) {
            this.positionY = -position.y;
            if(this.themeTopYs[0]<=this.positionY && this.positionY<this.themeTopYs[1]) {
                this.currentScroll = 0
            } else if(this.themeTopYs[1]<=this.positionY && this.positionY<this.themeTopYs[2]) {
                this.currentScroll = 1
            } else if(this.themeTopYs[2]<=this.positionY && this.positionY<this.themeTopYs[3]) {
                this.currentScroll = 2
            } else if(this.themeTopYs[3]<=this.positionY) {
                this.currentScroll = 3
            } 
            this.$refs.nav.currentIndex = this.currentScroll;

            //判断backTop是否显示
            this.isShow = position.y < -1000;
        },
        //回到顶部
        backClick() {
            this.$refs.scroll.scrollTo(0,0)
        },
        addToCart() {
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            this.$store.commit('addCart', product)
        }
    }
}
</script>

<style scoped>
 #detail {
     position: relative;
     z-index: 9;
     background-color: #fff;
     /* height: 100%; */
     height: 100vh;
 }
 .content {
     /* height: calc(100% - 44px); */
     /* overflow: hidden; */
    position: absolute;
    top: 44px;
    bottom: 0px;
    left: 0;
    right: 0;
 }
 .detail-nav {
     position: relative;
     z-index: 9;
     background-color: #fff;
}
</style>