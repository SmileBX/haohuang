<template>
    <div class="page">
        <div class="userhead">
            <div class="tx" @click="changeAvatar">
                <img :src="Avatar"  alt="" style="border:1px solid red">
                <p class="txt">点击更换头像</p>
            </div>
        </div>
        <div class="weui-cells infoForm">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份</label>
                </div>
                <div class="weui-cell__bd">
                    <p class="txt">普通用户</p>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">昵称</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" value="打仗的" v-model="NickName">
                </div>
            </div>
            <div class="weui-cell sex__weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">性别</label>
                </div>
                <div class="weui-cell__bd">
                    <radio-group class="radio-group" @change="changeSex">
                        <label class="radio">
                            <radio value="1" :checked="Sex==1" />
                            男
                        </label>
                        <label class="radio">
                            <radio value="0" :checked="Sex==0" />
                            女
                        </label>
                    </radio-group>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd" @click="updateMobile">
                    <span type="text">{{Mobile}}</span>
                </div>
                <!-- <div class="weui-cell__ft">
                    <span class="icon-arrow arrow-right" @click="updateMobile"></span>
                </div> -->
            </div>
        </div>
        <div class="ftBtn pt30">
            <div class="inner">
                <div class="btn btn-active fill" @click="saveInfo">保存</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
import { post, toLogin, getCurrentPageUrlWithArgs, valPhone } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    //获取展示用户信息
    if (toLogin(this.curPage)) {
      this.getInfo();
    }
  },
  data() {
    return {
      userId: "",
      token: "",
      curPage: "",
      identity: "",
      NickName: "",
      Mobile: "",
      Avatar: "",
      Sex: "",
      sextype: "",
      Birthday: "", //多余参数 后台去掉后更改
      imgBase: "" //头像路径
    };
  },
  watch: {
    imgBase() {
      this.updataImg();
    }
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "个人信息"
      });
    },
    //首次加载获取用户信息
    async getInfo() {
      let objUrl = "";
      if (this.identity == 1) {
        //客服
        objUrl = "CustomerService/GetCustomerServiceInfo";
      }
      if (this.identity == 2) {
        objUrl = "User/GetMemberInfo";
      }
      if (this.identity == 3) {
        //师傅
        objUrl = "InstalMaster/GetInstalMasterInfo";
      }
      let result = await post(
        objUrl,
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      ).then(result => {
        if (result.code === 0) {
          if (Object.keys(result.data).length > 0) {
            wx.setStorageSync("mobile", result.data.Mobile);
            let { NickName, Mobile, Avatar, Sex, Birthday } = result.data;
            this.NickName = NickName;
            this.Mobile = Mobile;
            if ((this.imgBase.length = 0)) {
              this.Avatar = Avatar;
            }
            if (Sex == "男") {
              this.Sex = 1;
            } else {
              this.Sex = 0;
            }
            console.log(this.Sex);
            this.Birthday = Birthday;
            console.log(this.Mobile, this.Avatar, "手机号,头像");
          }
        }
      });
    },
    //上传用户头像
    changeAvatar() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: result => {
          this.Avatar = result.tempFilePaths[0];
          wx.getFileSystemManager().readFile({
            filePath: this.Avatar, //选择图片返回的相对路径
            encoding: "base64", //编码格式
            success: res => {
              //成功的回调
              this.imgBase = "data:image/png;base64," + res.data.toString();
              console.log(this.imgBase, "选择图像的路径");
            }
          });
        },
        fail: () => {},
        complete: () => {}
      });
    },
    //更改用户头像----接口
    async updataImg() {
      if (toLogin(this.curPage)) {
        const res = await post(
          "User/EditHeadImage",
          {
            UserId: this.userId,
            Token: this.token,
            Avatar: this.imgBase
          },
          this.curPage
        );
        console.log(res, "更该用户头像");
      }
    },
    //更改用户性别
    async changeSex(e) {
      this.Sex = e.target.value;
      // if (toLogin(this.curPage) && valPhone(this.Mobile) && this.NickName) {
      //   const res = await post(
      //     "User/UpdateMemberInfo",
      //     {
      //       UserId: this.userId,
      //       Token: this.token,
      //       NickName: this.NickName,
      //       Mobile: this.Mobile,
      //       // Avatar:this.imgBase,
      //       Sex: this.Sex,
      //       Birthday: this.Birthday
      //     },
      //     this.curPage
      //   ).then(res => {
      //     if (res.code == 0) {
      //       wx.showToast({
      //         title: res.msg,
      //         icon: "success",
      //         duration: 1500
      //       });
      //     } else {
      //       wx.showToast({
      //         title: "请填写昵称！!",
      //         icon: "none",
      //         duration: 1500
      //       });
      //     }
      //   });
      // }
    },
    //更改用户手机号码
    updateMobile() {
      wx.navigateTo({
        url: "/pages/setPhone/main"
      });
    },
    //保存用户信息
    async saveInfo() {
      this.updataImg();
      if (toLogin(this.curPage) && valPhone(this.Mobile) && this.NickName) {
        const res = await post(
          "User/UpdateMemberInfo",
          {
            UserId: this.userId,
            Token: this.token,
            NickName: this.NickName,
            Mobile: this.Mobile,
            // Avatar:this.imgBase,
            Sex: this.Sex,
            Birthday: this.Birthday
          },
          this.curPage
        ).then(res => {
          if (res.code == 0) {
            wx.showToast({
              title: res.msg,
              icon: "success",
              duration: 1500
            });
            setTimeout(function() {
              wx.navigateBack();
            }, 1500);
          }
        });
      } else {
        wx.showToast({
          title: "请填写昵称！!",
          icon: "none",
          duration: 1500
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
