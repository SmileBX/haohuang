<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>
      <button class="login-btn" @click="gotoLogin(2)">客户登录</button>
      <button class="login-btn" @click="gotoLogin(3)">师傅登录</button>
      <button class="login-btn" @click="gotoLogin(1)">客服登录</button>
      <div class="info">
        <p>
          若您的微信手机号未注册，将为您直接注册，注册即视为同
          意
          <span>《浩煌用户注册协议》</span>、
          <span>《浩煌隐私政策》</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  onLoad() {
    this.setBarTitle();
    //identity: 1:客服；2：客户；3：师傅
  },
  onShow() {
    console.log("vvvvvvvvvvvvvvvv");
    if (this.$root.$mp.query.askUrl) {
      let askUrl = this.$root.$mp.query.askUrl
        .toString()
        .replace(/\%3F/g, "?")
        .replace(/\%3D/g, "=")
        .replace(/\%26/g, "&");
      wx.setStorageSync('askUrl',askUrl);
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "登录"
      });
    },
    gotoLogin(index) {
      wx.setStorageSync("identity", index);
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
