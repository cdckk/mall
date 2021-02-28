<template>
    <!-- <div class="wrapper" ref="wrapper">
        <div class="content">
            <div v-for="(item,index) in categoryList" :key="index">{{item.title}}</div>
        </div>
    </div> -->
    <!-- <div>
        <h2>{{categoryList}}</h2>
    </div> -->
    <div class="category">
        <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
        <div class="category-content">
            <tab-menu :category-list="categoryList" @itemClick="tabClick" :current-index="currentIndex"></tab-menu>
            <tab-content-category :tab-content-category="TabContentCategory"/>
        </div>
        
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getCategory,getSubCategory} from '../../network/category'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
//import func from '../../../vue-temp/vue-editor-bridge'

    export default {
        name: 'Category',
        components: {
            TabMenu,
            NavBar,
            TabContentCategory,
        },
        // props: {
        //     categoryList: {
        //         type: Array,
        //         default() {
        //             return []
        //         }
        //     }
        // },
        data() {
            return {
                scroll: null,
                categoryList: [],
                maitKey: "",
                currentIndex: 0,
                TabContentCategory: []
            }
        },
        computed: {
        },
        created() {
            //请求分类商品标题数据
            this._getCategory();

            // this._getSubCategory()
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
            
        },
        methods: {
            async _getCategory() {
                await getCategory().then(res => { //**执行getCategory,等待返回结果,返回结果后下面的代码才会执行
                    console.log('分类页数据');
                    console.log(res);
                    console.log(1111111111);
                    this.categoryList = res.data.category.list;
                    
                })
                console.log(1213);
                console.log(this.categoryList);

                this.maitKey =  this.categoryList[this.currentIndex].maitKey;
                console.log(this.maitKey);

                getSubCategory(this.maitKey).then(res => {
                    console.log(res);
                    this.TabContentCategory = res.data.list;
                })
            },

            tabClick(index) {
                console.log('当前关键字');
                this.currentIndex = index;
                this.maitKey =  this.categoryList[this.currentIndex].maitKey;
                getSubCategory(this.maitKey).then(res => {
                    console.log(res);
                    this.TabContentCategory = res.data.list;
                })
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 450px;
        background-color: red;
        overflow: hidden;
    }
    .category-nav {
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }
    .category-content {
        display: flex;
    }
</style>