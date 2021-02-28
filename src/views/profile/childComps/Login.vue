<template>
  <div id="logn">
    <nav-bar>
        <div slot="left" @click="backClick">
            <img src="../../../assets/img/common/back.svg" alt="" class="top-img">
        </div>
        <div slot="right">帮助</div>
    </nav-bar>

    <div class="login-info">
        <span class="title-top">手机号密码登录</span>
        <div class="input">
            <input type="text" class="input-text" placeholder="请输入手机号" v-model="username">
            <input type="password" class="input-password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="title-center">登录时将自动注册,且代表已同意<span class="title-center-span">《用户协议和隐私政策》</span></div>
        <div>
            <button class="login-button" @click="loginClick">登录</button>
        </div>
        <div class="title-bottom" @click="registerClick">没有账号?<span class="title-center-span">注册</span></div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'

import {getLogin, getRegister} from '../../../network/login'
	export default {
        name: "Login",
        components: { NavBar },
        data() {
            return {
                username: '',
                password: '',
                params: {},
                regiter: {},
                login: {}
            }
        },
        methods: {
            //点击注册
            async registerClick() {
                this.params = {
                    username: this.username,
                    password: this.password
                }
                await getRegister(this.params).then(res => {
                    console.log('注册功能',res);
                    this.regiter = res.data.isRegiter;
                })
                if(this.regiter) {
                    console.log("注册成功！");
                    const message = '注册成功';
                    const time = 900;
                    this.$toast.show(message, time)
                    // console.log(this.$toast);
                    this.$router.push('/profile')
                    //发射事件总线向兄弟组件传登录名
                    this.$bus.$emit('getLogin',this.username)
                } else {
                    console.log("注册失败");
                }
            },
            //点击登录
            async loginClick() {
                this.params = {
                    username: this.username,
                    password: this.password
                }
                await getLogin(this.params).then(res => {
                    console.log('登录功能',res);
                    this.login = res.data.isLogin;
                })
                if(this.login) {
                    console.log("登录成功！");
                    this.$router.push('/profile')
                    //发射事件总线向兄弟组件传登录名
                    this.$bus.$emit('getLogin',this.username)
                } else {
                    console.log("登录失败");
                }
            },
            backClick() {
                this.$router.back()
            }
        }
	}
</script>

<style scoped>
    input::-webkit-input-placeholder{
        color: #aaa;
    }
    img {
        border-style: none;
        margin-top: 10px;
    }
    .login-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 45px;
    }
    .title-top {
        margin-left: -140px;
        margin-bottom: 15px;
        font-weight: 700;
        color: black;
    }
    .title-center {
        /* font-size: 10px; */
        /* margin-left: 20px; */
        margin: 10px 15px 10px 30px;
        color: #aaa;
    }
    .title-center-span {
        color: #B0C;
    }
    .title-bottom {
        margin-left: -150px;
        margin-top: 15px;
        color: #aaa;
    }
    .input {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input-text, .input-password {
        margin-top: 10px;
        border: none;
        width: 260px;
        height: 35px;
        background-color: #f2f2f2;
    }
    .input-text:focus, .input-password:focus {
        outline: none;
    }
    .login-button {
        width: 260px;
        height: 35px;
        background-color: #aaa;
        border: none;
        color: #fff;
    }
    .login-button:focus {
        outline: none;
    }
</style>