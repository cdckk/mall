<template>
    <div class="toast" v-show="isShow">
        <div class="toast-title">{{message}}</div>
    </div>
</template>

<script>

export default {
    name: "Toast",
    data() {
        return {
            isShow: false,
            message: ""
        }
    },
    methods: {
        show(message, time) {
            this.message = message;
            this.isShow = true;
            
            //注意这里应该用匿名函数,匿名函数的this为外层作用域!!!
            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            }, time)
        }
    }
}
</script>

<style scoped>
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
        width: 150px;
        height: 50px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.75);
    }
    .toast-title {
        line-height: 50px;
        text-align: center;
    }
</style>