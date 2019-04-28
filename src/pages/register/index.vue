<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>
      <div class="from">
        <!-- <div class="tabbar">
                    <div :class="['tab-item',identity==2?'active':'']" @click="tabclick(2)"><span class="s">客户注册</span></div>
                    <div :class="['tab-item',identity==3?'active':'']" @click="tabclick(3)"><span class="s">师傅注册</span></div>
        </div>-->
        <!-- 客户注册 -->
        <div class="ul-list">
          <div class="li-cell flex">
            <input class="ipt" type="text" placeholder="请输入手机号" v-model="Tel">
            <div class="li-cell-r">
              <span>+86</span>
            </div>
          </div>
          <div class="li-cell li-cell-code flex">
            <input class="ipt" type="text" placeholder="请输入验证码" v-model="Code">
            <div class="li-cell-r">
              <span class="getCode" @click="getCode">{{codeMsg}}</span>
            </div>
          </div>
          <div class="li-cell">
            <input class="ipt" type="password" placeholder="请输入密码" v-model="Pwd">
          </div>
          <div class="li-cell">
            <input class="ipt" type="password" placeholder="请输入确认密码" v-model="Pwd2">
          </div>
        </div>
      </div>
      <button
        @click="register"
        :disabled="Tel==''"
        :class="['login-btn btn_org',Tel==''?'dis':'']"
      >注册</button>
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
import { post, valPhone } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.identity = wx.getStorageSync("identity");
    if(!this.identity){
      wx.reLaunch({
        url: '/pages/login2/main'
      })
    }
    //identity: 1:客服；2：客户；3：师傅
     // 会员注册0,
    //  会员登录1,
    //  会员找回密码2,
    //  会员找回支付密码3,
    //  会员修改手机号4,
    //  会员重新绑定手机号5,
    //  会员微信绑定手机号6,
    //   师傅登录7,
    //   师傅注册8,
    //   师傅绑定银行卡9,
    //   师傅微信绑定手机号10,
    //   师傅修改手机号11,
    //   师傅重新绑定手机号12,
    //   师傅找回密码13,
    //   客服登录14,
    //   客服找回密码15,
    console.log("identity:" + this.identity);
    if (this.identity == 2) {
      this.codeType = 0;
    }
    if (this.identity == 3) {
      this.codeType = 8;
    }
  },
  components: {},
  data() {
    return {
      codeMsg: "获取验证码",
      timer: null,
      count: "",
      TIME_COUNT: 60,
      has_click: false,
      Tel: "",
      Pwd: "",
      Pwd2: "",
      Code: "",
      identity: "",
      codeType: ""
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "注册"
      });
    },
    regResetPwdValOther() {
      if (this.Code == "") {
        wx.showToast({
          title: "验证码不能为空!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.Pwd == "" || this.Pwd2 == "") {
        wx.showToast({
          title: "密码不能为空!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.Pwd != this.Pwd2) {
        wx.showToast({
          title: "两次输入密码不同!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.Pwd.length < 6) {
        wx.showToast({
          title: "密码长度不能小于6个字符!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      return true;
    },
    getCode() {
      if (valPhone(this.Tel)) {
        if (!this.has_click) {
          this.getWxBindTelCode();
        }
      }
    },
    register() {
      //点击注册按钮
      if (valPhone(this.Tel) && this.regResetPwdValOther()) {
        if (this.identity == 2) {
          //客户
          this.MemberMobileRegister();
        }
        if (this.identity == 3) {
          //师傅
          this.InstalMasterMobileRegister();
        }
      }
    },
    //获取验证码
    async getWxBindTelCode() {
      let result = await post("Login/GetWxBindTelCode", {
        Mobile: this.Tel,
        CodeType: this.codeType
      });
      if (result.code === 0) {
        this.has_click = true;
        const TIME_COUNT = 90; // 90s后重新获取验证码
        this.count = TIME_COUNT;
        wx.showToast({
          title: "发送成功，请注意查收!",
          icon: "none",
          duration: 1500
        });
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.codeMsg = this.count + "s后重新获取";
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.codeMsg = "获取验证码";
          }
        }, 1000);
      }
    },
    //客户的注册
    async MemberMobileRegister() {
      let result = await post("Login/MemberMobileRegister", {
        Mobile: this.Tel,
        PassWord: this.Pwd,
        OkPassWord: this.Pwd2,
        VerifyCode: this.Code
      });
      if (result.code === 0) {
        let that = this;
        wx.showToast({
          title: "注册成功，请前往登录!",
          icon: "none",
          duration: 1500,
          success: function() {
            setTimeout(function() {
              wx.redirectTo({
                url: "/pages/loginfrom/main"
              });
            }, 1500);
          }
        });
      }
    },
    //师傅注册
    async InstalMasterMobileRegister() {
      let result = await post("Login/InstalMasterMobileRegister", {
        Mobile: this.Tel,
        PassWord: this.Pwd,
        OkPassWord: this.Pwd2,
        VerifyCode: this.Code
      });
      if (result.code === 0) {
        wx.redirectTo({
          url: "/pages/FillInfp/main"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
