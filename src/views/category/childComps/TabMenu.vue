<template>
    <!-- <div class="wrapper" ref="wrapper">
        <div class="content">
            <div v-for="(item,index) in categoryList" :key="index">{{item.title}}</div>
        </div>
    </div> -->
    <div class="tab-menu">
        <div v-for="(item,index) in categoryList"
             :key="index" @click="itemClick(index)"
              class="menu-item"
              :class="{active: (index === currentIndex)}">{{item.title}}</div>
              <!-- 这里的动态选择样式的方法需掌握 -->
    </div>
</template>

<script>

    export default {
        name: 'Category',
        props: {
            categoryList: {
                type: Array
            },
            currentIndex: {
                type: Number
            }
        },
        data() {
            return {
                isActive: false
            }
        },
        created() {
            this.getCategory()
        },
        mounted() {
            
        },
        methods: {
            itemClick(index) {
                this.$emit('itemClick', index)
            }
        }
    }
</script>

<style scoped>
    .tab-menu {
        background-color: #f2f2f2;
        height: 100%;
        
    }
    .menu-item {
        width: 100px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
    }
    .active {
        background-color: #fff;
    }
</style>