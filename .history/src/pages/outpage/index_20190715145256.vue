<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>
      <button class="login-btn btn_gree" @click="loginTel" open-type="getUserInfo">微信授权</button>
      <!-- <div class="info">
        <p>
          若您的微信手机号未注册，将为您直接注册，注册即视为同
          意
          <span>《浩煌用户注册协议》</span>、
          <span>《浩煌隐私政策》</span>
        </p>
      </div> -->
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
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    wx.setStorageSync("identity",2);
    // if(!this.identity){
    //   wx.reLaunch({
    //     url: '/pages/login2/main'
    //   })
    // }
    //identity: 1:客服；2：客户；3：师傅；4：执行
    //执行只有微信登录
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
        title: "微信授权"
      });
    },
    loginTel() {
      let that = this;
      // this.isPop_Tel = true;
      let _iv = ''
      let _code = ''
      let _encryptedData = ''
      wx.login({
       success:res=>{
         if(res.code){
           _code = res.code
           wx.getUserInfo({
             success:result=>{
               _iv = result.iv
               _encryptedData = result.encryptedData
               post("Login/MemberLogin", {
                    iv:_iv,
                    code:_code,
                    encryptedData:_encryptedData
                }).then(res2=>{
                    if(res2.code==0){
                      wx.setStorageSync("openId", res2.data.MemberOpenId);
                      wx.showToast({
                        title:"授权成功！",
                        duration:1500,
                      })
                      setTimeout(function() {
                          wx.reLaunch({
                              url: wx.getStorageSync("askUrl")
                          });
                          wx.setStorageSync("askUrl", "");
                        }, 1500);
                    }
                })
             }
           })
         }
       }
     })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
