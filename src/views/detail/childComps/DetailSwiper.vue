<template>
    <div class="detail-swiper">
        <swiper-item class="swiper-item">
            <img :src="topImages[0]">
        </swiper-item>
    </div>
</template>

<script>
import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'

export default {
    name: "DetailSwiper",
    components: {
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style>
    .detail-swiper {
        height: 300px;
        overflow: hidden;
    }
</style>