<template>
  <div class="home-swiper">
    <swiper :options="swiperOptions" ref="mySwiper" class="swiper-content">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <img class="swiper-img" :src="item.image" @load="imageLoad">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
  
</template>

<script>
    // import {SwiperItem} from 'components/common/swiper'
    import { swiper, swiperSlide, directive } from 'vue-awesome-swiper'


export default {
    name: 'HomeSwiper',
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isLoad: false,
            swiperOptions: {
              autoplay: 2000,
              loop: true,
              // pagination: {
              //    el: '.swiper-pagination',
              // }
              pagination: '.swiper-pagination',
            }
        }
    },
    components: {
        // SwiperItem,
        swiper,
        swiperSlide
    },
    directives: {
      swiper: directive
    },
    computed: {
       
    },
    mounted() {
      
    },
    methods: {
        imageLoad() {
            if(!this.isLoad)
            this.$emit('swiperLoad');
            this.isLoad = true;
        }
    }
}
</script>

<style scoped>
  .home-swiper {
    width: 100%;
    /* overflow: hidden; */
  }
  .swiper-img {
    width: 100%;
  }
  /* .swiper-pagination {
    color: chartreuse;
  } */
</style>