<template>
    <div class="list-item">
        <div class="radio">
            <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="item-img">
            <img :src="itemInfo.image" alt="" class="image">
        </div>
        <div class="item-left">
            <div class="goods-title">
                {{itemInfo.title}}
            </div>
            <div class="goods-desc">
                商品描述:{{itemInfo.desc}}
            </div>
            <div class="info-bottom">
                <div class="goods-price">
                    ¥{{itemInfo.price}}
                </div>
                <div class="goods-count">
                    x{{itemInfo.count}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name: "CartListItem",
    components: {
        CheckButton
    },
    props: {
        itemInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        checkClick() {
            this.itemInfo.checked = !this.itemInfo.checked;
        }
    }
}
</script>

<style scoped>

    .list-item {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 5px;
    }
    .radio {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /* .item-img {
        padding: 5px;
    } */
    .list-item .image {
        width: 80px;
        height: 100px;
        border-radius: 5px;
        padding: 5px;
    }
    .item-left {
        font-size: 17px;
        color: #333;
        padding: 5px 10px;
        overflow: hidden;
        position: relative;
    }
    .goods-title, .goods-desc {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .goods-desc {
        font-size: 14px;
        margin-top: 15px;
        color: #666;
    }
    .info-bottom {
        display: flex;
        justify-content: space-around;
        /* margin-top: 10px; */
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    .goods-price {
        color: orangered;
    }
</style>