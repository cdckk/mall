<template>
    <swiper-item>
        <!-- <a href="banners[0].link"></a> -->
        <img :src="banners[1].image" @load="imageLoad">
    </swiper-item>
</template>

<script>
    import {SwiperItem} from 'components/common/swiper'


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
            isLoad: false
        }
    },
    components: {
        SwiperItem
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

<style lang="stylus" scoped>

</style>