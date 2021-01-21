<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import {getDetail, Goods, Shop, GoodsParam} from '../../network/detail'


export default {
    name: "Detail",
    components: {
        DetailNavBar, 
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo:{}
        }
    },
    created() {
        this.iid = this.$route.params.iid;
        this.getDetail()
    },
    methods: {
        //根据iid请求详细数据
        getDetail() {
            getDetail(this.iid).then(res => {
                //获取数据
                const data = res.result;
                console.log(111111111);
                console.log(data);

                //获取顶部的图片数据
                this.topImages = data.itemInfo.topImages;

                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                console.log(2222222);
                console.log(this.goods);

                //获取店铺信息
                this.shop = new Shop(data.shopInfo)
                console.log(data.shopInfo);
                console.log(3333333);
                console.log(this.shop.goodsCount);

                //获取商品详细信息
                this.detailInfo = data.detailInfo;

                //获取商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                console.log(4444444);
                console.log(this.paramInfo);
            })
        }
    }
}
</script>

<style scoped>
 #detail {
     position: relative;
     z-index: 9;
     background-color: #fff;
 }
</style>