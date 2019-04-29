<template>
    <div class="page">
        <div class="userhead">
            <div class="tx" @click="changeAvatar">
                <img :src="Avatar"  alt="">
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
                    <radio-group class="radio-group">
                        <label class="radio">
                            <radio value="" checked="true" />
                            男
                        </label>
                        <label class="radio">
                            <radio value=""/>
                            女
                        </label>
                    </radio-group>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" v-model="Mobile">
                </div>
                <div class="weui-cell__ft">
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="ftBtn pt30" @click="saveInfo">
            <div class="inner">
                <div class="btn btn-active fill">保存</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
    onLoad(){
      this.setBarTitle();
    },
    onShow(){
        this.curPage = getCurrentPageUrlWithArgs();
        this.identity = wx.getStorageSync("identity");
        this.userId = wx.getStorageSync("userId");
        this.token = wx.getStorageSync("token");
        //获取展示用户信息
        if (toLogin(this.curPage)) {
            if (this.identity == 1) {
                this.GetCustomerServiceInfo();
            }
            if (this.identity == 2) {
                this.GetMemberInfo();
            }
            if (this.identity == 3) {
                this.GetInstalMasterInfo();
            }
        }
    },
    data(){
        return {
            NickName:'',
            Mobile:'',
            Avatar:'',
            Sex:'',
        }
    },
    methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "个人信息"
        });
    },
    //客户的
    async GetMemberInfo() {
      let result = await post(
        "User/GetMemberInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
            let {NickName,Mobile,Avatar,Sex} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            this.Avatar = Avatar
            this.Sex = Sex
        }
      }
    },
    //师傅的
    async GetInstalMasterInfo() {
      let result = await post(
        "InstalMaster/GetInstalMasterInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
          let {NickName,Mobile,Avatar,Sex} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            this.Avatar = Avatar
            this.Sex = Sex
        }
      }
    },
    //客服的
    async GetCustomerServiceInfo() {
      let result = await post(
        "CustomerService/GetCustomerServiceInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
          let {NickName,Mobile,Avatar,Sex} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            this.Avatar = Avatar
            this.Sex = Sex
        }
      }
    },
    //上传用户头像
    changeAvatar(){
        console.log('上传头像')
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: (result)=>{
                console.log(result)
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
