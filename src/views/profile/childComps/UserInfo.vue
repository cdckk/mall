<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
        <svg class="privateImage-svg left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
        <div class="login-info left" @click="loginClick">
            <div>用户名:{{userInfo}}</div>
            <div class="phone">
                <!-- <span>
                  <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
                </span> -->
            <div name="user-phone">暂无绑定手机号</div>
            </div>
        </div>
    </a>
  </div>
</template>

<script>
	export default {
    name: "UserInfo",
    data() {
      return {
        userInfo: '登录/注册'
      }
    },
    methods: {
      loginClick() {
        this.$router.push('/login')
      }
    },
    mounted() {
      //监听事件总线传过来的登录名
      this.$bus.$on('getLogin', (userInfo) => {
        this.userInfo = userInfo
      })
    },
    destroyed() {
      //移除事件总线监听
      this.$bus.$off('getLogin')
    }
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0px;
  }
</style>
