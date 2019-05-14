<template>
  <div class="page">
    <div class="login">
      <div class="logo">
        <img class="logoimg" src="/static/images/logo.png">
      </div>
      <div class="from">
        <div class="tabbar">
          <div :class="['tab-item',type==0?'active':'']" @click="tabclick(0)">
            <span class="s">密码登录</span>
          </div>
          <div :class="['tab-item',type==1?'active':'']" @click="tabclick(1)">
            <span class="s">验证码登录</span>
          </div>
        </div>
        <!-- 密码登录 -->
        <div class="ul-list" v-if="type==0">
          <div class="li-cell">
            <input class="ipt" type="text" placeholder="请输入手机号" v-model="Tel">
          </div>
          <div class="li-cell">
            <input class="ipt" type="password" placeholder="请输入密码" v-model="Pwd">
          </div>
        </div>
        <!-- 验证码登录 -->
        <div class="ul-list" v-if="type==1">
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
        </div>
      </div>
      <button
        :disabled="Tel==''"
        :class="['login-btn btn_org',Tel==''?'dis':'']"
        @click="btnLogin"
      >登录</button>
      <div class="flex" v-if="type==0">
        <div class="flex1" style="color:#999;" v-if="identity !==1 ">
          <span @click="gotoReg">新用户注册</span>
        </div>
        <div class="flex1 text_r">
          <span class="color_fd5412" @click="gotoForfetPassword">忘记密码</span>
        </div>
      </div>
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
    // this.initData();
    this.identity = wx.getStorageSync("identity");
    if (!this.identity) {
      wx.reLaunch({
        url: "/pages/login2/main"
      });
    }
    //identity: 1:客服；2：客户；3：师傅
    // 会员注册0,
    //         会员登录1,
    //         会员找回密码2,
    //         会员找回支付密码3,
    //         会员修改手机号4,
    //         会员重新绑定手机号5,
    //         会员微信绑定手机号6,
    //         师傅登录7,
    //         师傅注册8,
    //         师傅绑定银行卡9,
    //         师傅微信绑定手机号10,
    //         师傅修改手机号11,
    //         师傅重新绑定手机号12,
    //         师傅找回密码13,
    //         客服登录14,
    //         客服找回密码15,

    console.log(this.identity);
    if (this.identity == 1) {
      this.codeType = 14;
    }
    if (this.identity == 2) {
      this.codeType = 1;
    }
    if (this.identity == 3) {
      this.codeType = 7;
    }
  },
  components: {},
  data() {
    return {
      type: 0,
      Tel: "",
      Pwd: "",
      Code: "",
      identity: "",
      codeType: "",
      codeMsg: "获取验证码",
      timer: null,
      count: "",
      TIME_COUNT: 60,
      has_click: false
    };
  },
  methods: {
    initData() {
      this.type = 0;
      this.Tel = "";
      this.Pwd = "";
      this.Code = "";
      this.identity = "";
      this.codeType = "";
      this.codeMsg = "获取验证码";
      this.timer = null;
      this.count = "";
      this.TIME_COUNT = 60;
      this.has_click = false;
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "登录"
      });
    },
    tabclick(index) {
      this.type = index;
    },
    gotoForfetPassword() {
      let that = this;
      wx.navigateTo({
        url: "/pages/forgetPassword/main"
      });
    },
    valOther() {
      if (this.type == 0) {
        //密码登录
        if (!this.Pwd) {
          wx.showToast({
            title: "请输入密码",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        return true;
      } else if (this.type == 1) {
        //验证码登录
        if (!this.Code) {
          wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        return true;
      } else {
        return false;
      }
    },
    getCode() {
      if (valPhone(this.Tel)) {
        if (!this.has_click) {
          this.getWxBindTelCode();
        }
      }
    },
    btnLogin() {
      //点击登录
      if (valPhone(this.Tel) && this.valOther()) {
        if (this.identity == 1) {
          //客服
          if (this.type == 0) {
            //密码登录
            this.CustomerServiceLoginByMobile();
          }
          if (this.type == 1) {
            this.CustomerServiceLoginByCode();
          } else {
            return false;
          }
        }
        if (this.identity == 2) {
          //客户
          if (this.type == 0) {
            //密码登录
            this.MemberLoginByMobile();
          }
          if (this.type == 1) {
            this.MemberLoginByCode();
          } else {
            return false;
          }
        }
        if (this.identity == 3) {
          //师傅
          if (this.type == 0) {
            //密码登录
            this.InstalMasterLoginByMobile();
          }
          if (this.type == 1) {
            this.InstalMasterLoginByCode();
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    gotoReg() {
      let that = this;
      //跳转到注册
      wx.navigateTo({
        url: "/pages/register/main"
      });
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
            duration: 2000
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
    //客户的
    //验证码登录
    MemberLoginByCode() {
      let that = this;
      post("Login/MemberLoginByCode", {
        Mobile: that.Tel,
        VerifyCode: that.Code
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.MemberId);
          wx.setStorageSync("token", result.data.MemberToken);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
      });
    },
    //密码登录
    MemberLoginByMobile() {
      let that = this;
      post("Login/MemberLoginByMobile", {
        Mobile: that.Tel,
        PassWord: that.Pwd
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.MemberId);
          wx.setStorageSync("token", result.data.MemberToken);
          console.log("dfsdfsdfdsfsdf");
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
      });
    },
    //师傅的
    //密码登录
    InstalMasterLoginByMobile() {
      let that = this;
      post("Login/InstalMasterLoginByMobile", {
        Mobile: that.Tel,
        PassWord: that.Pwd
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.MasterId);
          wx.setStorageSync("token", result.data.MasterToken);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
        if (result.code === 102) {
          //没有填写审核资料
          wx.navigateTo({
            url: "/pages/FillInfp/main"
          });
        }
      });
    },
    //验证码登录
    InstalMasterLoginByCode() {
      let that = this;
      post("Login/InstalMasterLoginByCode", {
        Mobile: that.Tel,
        VerifyCode: that.Code
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.MasterId);
          wx.setStorageSync("token", result.data.MasterToken);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
        if (result.code === 102) {
          //没有填写审核资料
          wx.navigateTo({
            url: "/pages/FillInfp/main"
          });
        }
      });
    },
    //客服登录
    //验证码登录
    CustomerServiceLoginByCode() {
      let that = this;
      post("Login/CustomerServiceLoginByCode", {
        Mobile: that.Tel,
        VerifyCode: that.Code
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.ServiceId);
          wx.setStorageSync("token", result.data.ServiceToken);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
      });
    },
    //密码登录
    CustomerServiceLoginByMobile() {
      let that = this;
      post("Login/CustomerServiceLoginByMobile", {
        Mobile: that.Tel,
        PassWord: that.Pwd
      }).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("userId", result.data.ServiceId);
          wx.setStorageSync("token", result.data.ServiceToken);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1500,
            success: function() {
              if (wx.getStorageSync("askUrl")) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: wx.getStorageSync("askUrl")
                  });
                }, 1500);
              } else {
                setTimeout(function() {
                  wx.reLaunch({
                    url: "/pages/my/main"
                  });
                }, 1500);
              }
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
