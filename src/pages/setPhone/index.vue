<template>
  <div class="backgray setlist">
    <div class="setitem flex white">
      <div class="flex1">
        <input type="text" placeholder="请输入手机号" v-model="phoneNumber">
      </div>
      <span class="icon-arrow arrow-right"></span>
    </div>
    <div class="setitem flex white">
      <div class="flex1">
        <input type="text" placeholder="请输入验证码" v-model="verifyCode">
      </div>
      <text class="getpass" :class="btnText !== '获取验证码'?'noactive':''" @click="getVerifyCode()">{{btnText}}</text>
    </div>
    <div class="botbtn" @click="setPhone" style="bottom:600rpx;left:30rpx;">确定</div>
  </div>
</template>

<script>
import { post, toLogin, getCurrentPageUrlWithArgs,valPhone } from "@/utils";
import "../../css/common.css";
export default {
  onLoad() {
    this.setBarTitle();
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
  },
  data() {
    return {
      btnText: "获取验证码",
      phoneNumber: "",
      verifyCode: "",
      curPage:'',
      identity:'',
      token: wx.getStorageSync("token"),
      userid: wx.getStorageSync('userId')
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "设置手机号码"
      });
    },

    async setPhone() {
      if (!this.verifyCode) {
        wx.showToast({
          title: "验证码不能为空",
          icon: "none",
          duration: 2000
        });
      } else {
          const result = await post("User/UpdateMobile", {
            Mobile: this.phoneNumber,
            UserId: this.userid,
            VerifyCode: this.verifyCode,
            Token: this.token,
            Type:0
          });
         
          wx.showToast({
            title: result.msg,
            icon: "success",
            duration: 2000
          });
          wx.setStorageSync("Mobile",this.phoneNumber),
          setTimeout(()=> {
              wx.navigateBack();;
          },1500)
      }
    },
    async getVerifyCode() {
      const TIME_COUNT = 60; // 60s后重新获取验证码
      const phoneNum = this.phoneNumber;
      if (!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(phoneNum))) {
        wx.showToast({
          title: "请输入正确的手机号码！",
          icon: "none",
          duration: 2000
        });
      } else {
        // if (toLogin(this.curPage)) {
          const code = await post("Login/GetWxBindTelCode", {
            // Token: this.token,
            Mobile: this.phoneNumber,
            // UserId: this.userid,
            CodeType:5
          }
          );
          
          wx.showToast({
            title: "短信已发送",
            icon: "success"
          });
          this.count = TIME_COUNT;
          const timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count -= 1;
              this.btnText = this.count + "s后重新获取";
              console.log(this.count, this.btnText);
            } else {
              clearInterval(timer);
              this.btnText = "获取验证码";
            }
          }, 1000);
        // }
      }
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
@import "../../css/common.css";
.noactive{
  background:#aaa!important;

}
</style>
