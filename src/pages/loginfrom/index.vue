<template>
    <div class="page">
       <div class="login">
            <div class="logo">
                <img class="logoimg" src="/static/images/logo.png">
            </div> 
            <div class="from">
                <div class="tabbar">
                    <div :class="['tab-item',type==0?'active':'']" @click="tabclick(0)"><span class="s">密码登录</span></div>
                    <div :class="['tab-item',type==1?'active':'']" @click="tabclick(1)"><span class="s">验证码登录</span></div>
                </div>
                <!-- 密码登录 -->
                <div class="ul-list" v-if="type==0">
                    <div class="li-cell">
                        <input class="ipt" type="text" placeholder="请输入手机号" v-model="Tel">
                    </div>
                    <div class="li-cell">
                        <input class="ipt" type="text" placeholder="请输入密码" v-model="Pwd">
                    </div>
                </div>
                <!-- 验证码登录 -->
                <div class="ul-list" v-else>
                    <div class="li-cell flex">
                        <input class="ipt" type="text" placeholder="请输入手机号" v-model="Tel">
                        <div class="li-cell-r"><span>+86</span></div>
                    </div>
                    <div class="li-cell li-cell-code flex">
                        <input class="ipt" type="text" placeholder="请输入验证码" v-model="Code">
                        <div class="li-cell-r"><span class="getCode">获取验证码</span></div>
                    </div>
                </div>
            </div>
            <button :disabled="Tel==''" :class="['login-btn btn_org',Tel==''?'dis':'']">登录</button>
            <div class="info">
                <p>若您的微信手机号未注册，将为您直接注册，注册即视为同
意<span>《浩煌用户注册协议》</span>、<span>《浩煌隐私政策》</span></p>
            </div>
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
    data() {
        return {
            type:0,
            Tel:"",
            Pwd:"",
            Code:""
        }
    },
    methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "登录"
      });
    },
    tabclick(index){
        this.type=index;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
