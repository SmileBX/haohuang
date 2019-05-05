<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>
      <div class="from">
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
        @click="bindTel"
        :disabled="Tel==''"
        :class="['login-btn btn_org',Tel==''?'dis':'']"
      >确定</button>
    </div>
  </div>
</template>
<script>
import { host, post, valPhone } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    // this.initData();
    //identity: 1:客服；2：客户；3：师傅
    this.identity = wx.getStorageSync("identity");
    if (!this.identity) {
      wx.reLaunch({
        url: "/pages/login2/main"
      });
    }
    console.log("身份：" + this.identity);
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
    this.unionid = wx.getStorageSync("unionid");
    this.openId = wx.getStorageSync("openId");
    this.nickName = wx.getStorageSync("userInfo").nickName;
    this.avatarUrl = wx.getStorageSync("userInfo").avatarUrl;
    if (this.identity == 1) {  //客服的绑定
      this.codeType = 16;
    }
    if (this.identity == 2) {
      this.codeType = 6;
    }
    if (this.identity == 3) {
      this.codeType = 10;
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
      codeType: "",
      nickName: "", //微信昵称
      avatarUrl: "", //微信头像
      unionid: "",
      openId: ""
    };
  },
  methods: {
    initData() {
      this.codeMsg = "获取验证码";
      this.timer = null;
      this.count = "";
      this.TIME_COUNT = 60;
      this.has_click = false;
      this.Tel = "";
      this.Pwd = "";
      this.Pwd2 = "";
      this.Code = "";
      this.identity = "";
      this.codeType = "";
      this.nickName = ""; //微信昵称
      this.avatarUrl = ""; //微信头像
      this.unionid = "";
      this.openId = "";
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "绑定手机号"
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
    bindTel() {
      //点击注册按钮
      if (valPhone(this.Tel) && this.regResetPwdValOther()) {
        if (this.identity == 2) {
          this.MemberBindOrRegister();
        }
        if (this.identity == 3) {
          this.MasterBindOrRegister();
        }
      }
    },
    //获取验证码
    getWxBindTelCode() {
      let that = this;
      post("Login/GetWxBindTelCode", {
        Mobile: that.Tel,
        CodeType: that.codeType
      }).then(result => {
        if (result.code === 0) {
          that.has_click = true;
          const TIME_COUNT = 90; // 90s后重新获取验证码
          that.count = TIME_COUNT;
          wx.showToast({
            title: "发送成功，请注意查收!",
            icon: "none",
            duration: 1500
          });
          that.timer = setInterval(() => {
            if (that.count > 0 && that.count <= TIME_COUNT) {
              that.count--;
              that.codeMsg = that.count + "s后重新获取";
            } else {
              that.has_click = false;
              clearInterval(that.timer);
              that.timer = null;
              that.codeMsg = "获取验证码";
            }
          }, 1000);
        }
      });
    },
    //客户绑定
    MemberBindOrRegister() {
      let that = this;
      post("Login/MemberBindOrRegister", {
        Mobile: that.Tel,
        VerifyCode: that.Code,
        PassWord: that.Pwd,
        Unionid: that.unionid,
        OpenId: that.openId,
        nickName: that.nickName,
        avatarUrl: that.avatarUrl
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("openId", result.data.MemberOpenId);
          wx.setStorageSync("userId", result.data.MemberId);
          wx.setStorageSync("token", result.data.MemberToken);
          console.log("______________");
          wx.reLaunch({
            url: "/pages/my/main"
          });
          // wx.showToast({
          //   title: "登录成功",
          //   icon: "success",
          //   duration: 1500,
          //   success: function() {
          //     setTimeout(function() {

          //     }, 1500);
          //   }
          // });
        }
      });
    },
    //师傅的绑定
    MasterBindOrRegister() {
      let that = this;
      post("Login/MasterBindOrRegister", {
        Mobile: that.Tel,
        VerifyCode: that.Code,
        PassWord: that.Pwd,
        Unionid: that.unionid,
        OpenId: that.openId,
        nickName: that.nickName,
        avatarUrl: that.avatarUrl
      }).then(result => {
        console.log("师傅的绑定手机号");
        console.log(result);
        wx.setStorageSync("openId", result.data.MasterOpenId);
        wx.setStorageSync("userId", result.data.MasterId);
        wx.setStorageSync("token", result.data.MasterToken);
        if (result.code === 0) {
          wx.reLaunch({
            url: "/pages/my/main"
          });
        }
        if (result.code === 102) {
          wx.reLaunch({
            url: "/pages/FillInfp/main"
          });
        }
      });
    },
    //客服的绑定
    async CustomerServiceBind() {
      let that = this;
      post("Login/MasterBindOrRegister", {
        Mobile: that.Tel,
        VerifyCode: that.Code,
        PassWord: that.Pwd,
        Unionid: that.unionid,
        OpenId: that.openId,
        nickName: that.nickName,
        avatarUrl: that.avatarUrl
      }).then(result => {
        if (result.code === 0) {
          console.log("dsddddsddssddsddsdsddd");
          wx.setStorageSync("openId", result.data.ServiceOpenId);
          wx.setStorageSync("userId", result.data.ServiceId);
          wx.setStorageSync("token", result.data.ServiceToken);
          wx.reLaunch({
            url: "/pages/my/main"
          });
          // wx.showToast({
          //   title: "登录成功",
          //   icon: "success",
          //   duration: 1500,
          //   success: function() {
          //     setTimeout(function() {
          //       wx.redirectTo({
          //         url: "/pages/my/main"
          //       });
          //     }, 1500);
          //   }
          // });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
