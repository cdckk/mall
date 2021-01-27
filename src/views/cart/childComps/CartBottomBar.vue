<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计:{{totalPrice}}
        </div>
        <div class="total-count">去计算({{totalCount}})</div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // sumPrice
        }
    },
    computed: {
        ...mapGetters(['cartLength'],['cartList']),
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price *  item.count
            }, 0).toFixed(2)
        },
        totalCount() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            if(this.$store.state.cartList.length === 0) return false
            //1.find函数性能更高，不需每个遍历
            return !this.$store.state.cartList.find(item => !item.checked)
            //2.使用filter
            // return !(this.$store.state.cartList.filter(item => !item.checked).length)
            //3.普通遍历
            // for(let item of this.cartList) {
            //     if(!item.checked) {
            //         return false
            //     }
            // }
            // return true
        }
    },
    methods: {
        checkClick() {
            //如果全选按钮已经被选中,点击变不选中
            if(this.isSelectAll) {
                this.$store.state.cartList.forEach(item => {
                    item.checked = false
                });
            } else {
                this.$store.state.cartList.forEach(item => {
                    item.checked = true
                })
            }
        }
    }

}
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;
        text-align: center;
        height: 44px;
        line-height: 44px;
        bottom: 45px;
        background-color: #eee; 
        font-size: 14px;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-button {
        margin-right: 5px;
    }
    .total-price {
        flex: 1;
    }
    .total-count {
        width: 90px;
        background-color: red;
    }
</style>