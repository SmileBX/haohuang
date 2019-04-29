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
                            <radio value="男" checked="Sex==value" />
                            男
                        </label>
                        <label class="radio">
                            <radio value="女" checked="Sex==value" />
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
        <div class="ftBtn pt30">
            <div class="inner">
                <div class="btn btn-active fill" @click="saveInfo">保存</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
import { post, toLogin, getCurrentPageUrlWithArgs,valPhone } from "@/utils";
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
        //console.log(this.Avatar.length)
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
            userId: "",
            token: "",
            curPage: "", 
            identity: "",
            NickName:'',
            Mobile:'',
            Avatar:'',
            Sex:'',
            Birthday:'',//多余参数 后台去掉后更改
            imgBase:'',//头像路径
        }
    },
    watch:{
        imgBase(){
            this.updataImg()
        }
    },
    methods: {
    setBarTitle() {
        wx.setNavigationBarTitle({
            title: "个人信息"
        });
    },
    checkPhone(){
        console.log(123)
        valPhone(this.Mobile)
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
            let {NickName,Mobile,Avatar,Sex,Birthday} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            if(this.Avatar.length*1 == 0){
                this.Avatar = Avatar
            }
            this.Sex = Sex
            this.Birthday = Birthday
            console.log(this.Sex,"更新前")
           
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
          let {NickName,Mobile,Avatar,Sex,Birthday} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            if(this.Avatar.length*1 == 0){
                this.Avatar = Avatar
            }
            this.Sex = Sex
            this.Birthday = Birthday
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
          let {NickName,Mobile,Avatar,Sex,Birthday} = result.data
            this.NickName = NickName
            this.Mobile = Mobile
            if(this.Avatar.length*1 == 0){
                this.Avatar = Avatar
            }
            this.Sex = Sex
            this.Birthday = Birthday
        }
      }
    },
    //上传用户头像
    // changeAvatar(){
    //     this.chooseImg().then(
    //        ()=>{
    //            if(toLogin(this.curPage)){
    //                 wx.request({
    //                     url:'http://hhapi.wtvxin.com/api//User/EditHeadImage',
    //                     method:'post',
    //                     data:{
    //                         UserId: this.userId,
    //                         Token: this.token,
    //                         Avatar:this.imgBase,
    //                         curPage:this.curPage
    //                     },
    //                     header: {
    //                     'content-type': 'application/json' // 默认值
    //                     },
    //                     success:(res)=>{
    //                         console.log(res,"更该用户头像")
    //                     }
    //                 })
                
                
    //             }
    //        } 
    //     )
        
    // },
    changeAvatar(){
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: (result)=>{
                this.Avatar = result.tempFilePaths[0]
                wx.getFileSystemManager().readFile({
                    filePath: this.Avatar, //选择图片返回的相对路径
                    encoding: "base64", //编码格式
                    success: res => {
                    //成功的回调
                     this.imgBase = "data:image/png;base64," + res.data.toString()
                     console.log(this.imgBase,"选择图像的路径")
                    }
                });

            },
            fail: ()=>{},
            complete: ()=>{
                
            }
        })
        
        
    },
    //更改用户头像----接口
    async updataImg(){
        if(toLogin(this.curPage)){
            const res = await post(
                'User/EditHeadImage',
                {
                    UserId: this.userId,
                    Token: this.token,
                    Avatar:this.imgBase,
                },
                this.curPage
            )
            console.log(res,"更该用户头像")
        }
    },
    changeSex(e){
        console.log(e,"点击")
        this.Sex=e.target.value
    },
    //更改用户信息
    async saveInfo(){
        if (toLogin(this.curPage) && valPhone(this.Mobile) && this.NickName) {
            const res = await post(
                'User/UpdateMemberInfo',
                {
                  UserId: this.userId,
                  Token: this.token,
                  NickName:this.NickName,
                  Mobile:this.Mobile,
                  Avatar:this.imgBase,
                  Sex:this.Sex,
                  Birthday:this.Birthday

                },
                this.curPage
                );
               if(res.code==0){
                   wx.showToast({
                       title:res.msg,
                       icon:"success",
                       duration:1500,
                   });
                   setTimeout(function(){
                       wx.navigateBack()
                   },1500)
               }
        }else{
            wx.showToast({
            title: "请填写昵称！!",
            icon: "none",
            duration: 1500
            });
        }
        
    }

  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
