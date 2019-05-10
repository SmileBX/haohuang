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
    this.token= wx.getStorageSync("token")
    this.userid=wx.getStorageSync('userId')
    
  },
  onShow(){
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    
    this.phoneNumber=""
    this.verifyCode=""
  },
  data() {
    return {
      btnText: "获取验证码",
      phoneNumber: "",
      verifyCode: "",
      curPage:'',
      identity:'',
      token: "",
      userid:""
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
          if(this.identity == 2){  //客户
              const result = await post("User/UpdateMobile", {
                Mobile: this.phoneNumber,
                UserId: this.userid,
                VerifyCode: this.verifyCode,
                Token: this.token,
                Type:1  //类型 0-绑定手机号,1-手机号修改
              });
          }
          if(this.identity == 1){  //客服
              const result = await post("CustomerService/UpdateMobile", {
                Mobile: this.phoneNumber,
                CsdId: this.userid,
                VerifyCode: this.verifyCode,
                Token: this.token
              });
          }
          if(this.identity == 3){  //师傅
              const result = await post("InstalMaster/UpdateMobile", {
                Mobile: this.phoneNumber,
                MasterId: this.userid,
                VerifyCode: this.verifyCode,
                Token: this.token,
                Type:1  //类型 0-绑定手机号,1-手机号修改
              });
          }
          
         
          wx.showToast({
            title: result.msg,
            icon: "success",
            duration: 4000
          });
         // wx.setStorageSync("Mobile",this.phoneNumber),
          setTimeout(()=> {
            console.log(13245613)
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
          let codetype;
          if(this.identity == 2){  //客户
              codetype = 4
          }
          if(this.identity == 1){  //客服
              codetype = 18  
          }
          if(this.identity == 3){  //师傅
              codetype = 12
          }
          const code = await post("Login/GetWxBindTelCode", {
            // Token: this.token,
              Mobile: this.phoneNumber,
              // UserId: this.userid,
              CodeType:codetype  //4,会员重新绑定手机号  12,师傅修改手机号 客服18
            }
          );
          if(code.msg=='该手机号已绑定客服啦，请换一个重试'){  //该手机号被注册了
              wx.showToast({
                  title: code.msg,
                  icon: "none",
                  duration:3000
                });
                return false
          }else{
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
          }
          
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
