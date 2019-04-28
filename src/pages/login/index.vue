<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>

      <button class="login-btn" @click="gotoPage">登录/注册</button>
      <button class="login-btn btn_gree" @click="loginTel" open-type="getUserInfo">微信手机号快捷登录</button>
      <div class="info">
        <p>
          若您的微信手机号未注册，将为您直接注册，注册即视为同
          意
          <span>《浩煌用户注册协议》</span>、
          <span>《浩煌隐私政策》</span>
        </p>
      </div>
    </div>
    <!-- 授权使用手机号 -->
    <!-- <div class="popModal" v-if="isPop_Tel">
      <div class="mask"></div>
      <div class="popup popup-tel">
        <div class="pop-hd">
          <img class="logomin" src="/static/images/logo.png" alt>
          <span>浩煌</span>申请使用
        </div>
        <div class="h2">你的手机号码</div>
        <div class="ul-list mb10">
          <div class="li-cell flex">
            <div class="li-cell-l">
              <span>13526569636</span>
              <span>微信绑定号码</span>
            </div>
            <div class="li-cell-r">
              <icon type="success_no_circle" size="20"></icon>
            </div>
          </div>
          <div class="li-cell li-cell-code flex">
            <div class="li-cell-l">
              <span style="color:#667495">使用其他手机号码</span>
            </div>
            <div class="li-cell-r"></div>
          </div>
        </div>
        <div class="footbtns flex">
          <div class="btn" @click="cancel">拒绝</div>
          <div class="btn btn_gree" @click="confirm">允许</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import {Login } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.identity = this.$root.$mp.query.identity;
    //identity: 1:客服；2：客户；3：师傅
  },
  components: {},
  data() {
    return {
      identity: ""
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "登录"
      });
    },
    gotoPage() {
        let that = this;
      //跳转到h5的登录注册
      wx.navigateTo({
        url: "/pages/loginfrom/main?identity="+that.identity
      });
    },
    loginTel() {
      let that = this;
      // this.isPop_Tel = true;
      Login(this.identity);
    },
    cancel: function() {
      let _this = this;
      wx.showModal({
        title: "提示",
        content: "需要通过授权才能继续，请重新点击并授权！",
        showCancel: false,
        confirmColor: "#19ab18",
        success(res) {
          if (res.confirm) {
            _this.isPop_Tel = false;
          } else if (res.cancel) {
          }
        }
      });
    },
    confirm: function() {
      this.isPop_Tel = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
