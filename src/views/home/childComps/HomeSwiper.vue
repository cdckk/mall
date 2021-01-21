<template>
    <swiper-item>
        <!-- <a href="banners[0].link"></a> -->
        <img :src="banners[0].image">
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
    components: {
        SwiperItem
    }
}
</script>

<style lang="stylus" scoped>

</style>