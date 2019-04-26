<template>
    <div class="page">
       <div class="login">
            <div class="logo">
                <img class="logoimg" src="/static/images/logo.png">
            </div> 
            <div class="auth-text">
                <text class="main">浩煌小程序正使用浩煌登录提供的服务，浩煌登录将使用：</text>
                <text class="sub">• 获得你的公开信息（昵称、头像等）</text>
            </div>
            <button class="login-btn btn_gree">允许使用</button>
            <button class="login-btn">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    onLoad() {
        this.setBarTitle();
    },
    components:{
      
    },
    methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "登录"
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
