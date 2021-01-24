<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
         
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bscroll: null
        }
    },
    mounted() {
        //1.创建scroll对象
        this.bscroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad,
        })
        console.log(1111);
        console.log(this.bscroll);
        //监听滚动的位置
        this.bscroll.on('scroll', (position) => {
            // console.log(position);
            this.$emit('scroll', position)
        })
        //监听上拉加载更多
        this.bscroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods: {
        //封装回滚到顶部
        scrollTo(x, y, time=600) {
            this.bscroll && this.bscroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.bscroll.finishPullUp()
        },
        refresh() {
            console.log(88888888);
            this.bscroll && this.bscroll.refresh()
        },
        getScrollY() {
            return this.bscroll ? this.bscroll.y : 0
        }
    }
}
</script>

<style scoped>
/* .wrapper {
    height: 300px;
    overflow: hidden;
    background-color: red;
} */
</style>