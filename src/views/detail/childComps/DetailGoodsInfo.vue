<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
        <div class="info-desc">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="img" v-for="item in detailInfo.detailImage[0].list"
        :key="item"
        >
            <img :src="item" @load="imageLoad">
        </div>
        
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        //向父组件发送图片加载事件，防抖动
        imageLoad() {
            this.$emit('imageLoad')
        }
    }
}
</script>

<style>
    .goods-info {
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-desc {
        padding: 0 15px;
    }   
    .info-desc .desc {
        padding: 15px 0;
        font-size: 14px;
    }


    .info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}

    .info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
    .img img {
        width: 100%;
    }
</style>