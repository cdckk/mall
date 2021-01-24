<template>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
            <li>分类页滚动</li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

    export default {
        name: 'Category',
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            console.log(document.querySelector(".wrapper"));
            //let wrapper = document.querySelector(".wrapper")
            const bScroll = new BScroll(this.$refs.wrapper, {
                probeType: 3,
                pullUpLoad: true
            })
            bScroll.on('pullingUp', () => {
                console.log("上拉加载更多");
                setTimeout(() => {
                    bScroll.finishPullUp()
                },2000)
            })
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 150px;
        background-color: red;
        overflow: hidden;
    }
</style>