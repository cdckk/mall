<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" :pull-up-load="true" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
            <goods-list :goods="recommendInfo"></goods-list>
        </scroll>
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
            itemImgListener: null
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
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh);
        this.itemImgListener = () => {
            refresh()
        };
        this.$emit.$on('itemImageLoad', this.itemImgListener())
    },
    destroyed() {
        this.$emit.$off('itemImageLoad', this.itemImgListener())
    },
    methods: {
        //接收子组件DetailGoodsInfo发来的自定义事件
        imageLoad() {
            const refresh = debounce(this.$refs.scroll.refresh);
            refresh()
        },
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