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
            <van-field
                clearable
                label="所在地区"
                placeholder="请选择所在地区"
                title-width="70px"
                icon="arrow"
                disabled
                :input-class="area?'color333':''"
                @click="showArea = true"
                :value="area"
                v-if="identity==3"
            />
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
         <!--选择地址省市遮罩层-->
        <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
            <van-area :area-list="areaList" @cancel="showArea = false" @confirm="confirmArea"/>
        </van-popup>
    </div>
</template>
<script>
import "@/css/dd_style.css";
import { post, toLogin, getCurrentPageUrlWithArgs, valPhone } from "@/utils";
import areaList from "@/utils/areaList";
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
      if (this.identity == 1) {
        //客服
        this.GetCustomerServiceInfo();
      }
      if (this.identity == 2) {
        //客户
        this.GetMemberInfo();
      }
      if (this.identity == 3) {
        //师傅
        this.GetInstalMasterInfo();
      }
    }
    console.log("当前的身份：" + this.identity);
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
      imgBase: "", //头像路径，
      showArea:false,
      areaList,
      area:'',
      provinceCode:'',
      cityCode:'',
      districtCode:'',
    };
  },
  // watch: {
  //   imgBase() {
  //     this.updataImg();
  //   }
  // },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "个人信息"
      });
    },
    //首次加载获取用户信息
    GetCustomerServiceInfo() {
      let that = this;
      //客服的信息
      post(
        "CustomerService/GetCustomerServiceInfo",
        {
          CsdId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
          console.log(result.data)
            const info = result.data;
            this.NickName = info.NickName;
            this.Mobile = info.MobileStr;
            if (info.Sex == "男") {
              this.Sex = 1;
            } else {
              this.Sex = 0;
            }
            console.log(this.Sex);
            this.Birthday = info.Birthday
            console.log(this.imgBase.length,"头像的长度")
            if ((this.imgBase.length == 0)) {
              this.Avatar = info.Avatar;
            }
            
           
            console.log(this.Mobile, this.Avatar, "手机号,头像");
        }
      });
    },
    GetInstalMasterInfo() {
      //师傅的信息
      let that = this;
      post(
        "InstalMaster/GetInstalMasterInfo",
        {
          MasterId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        console.log(result,"师傅的信息");
        if (result.code === 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
            wx.setStorageSync("mobile", result.data.Mobile);
          console.log(result.data)
            const info = result.data;
            this.NickName = info.NickName;
            this.Mobile = info.Mobile;
            this.area = info.AddressInfo  //接受默认地址
            if (info.Sex == "男") {
              this.Sex = 1;
            } else {
              this.Sex = 0;
            }
            console.log(this.Sex);
            console.log(this.area,"this.area")
            this.Birthday = info.Birthday
            console.log(this.imgBase.length,"头像的长度")
            if ((this.imgBase.length == 0)) {
              this.Avatar = info.Avatar;
            }
            
           
            console.log(this.Mobile, this.Avatar, "手机号,头像");
        }
      });
    },
    GetMemberInfo() {
      let that = this;
      //客户信息
      post(
        "User/GetMemberInfo",
        {
          UserId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
          console.log(result.data)
            const info = result.data;
            this.NickName = info.NickName;
            this.Mobile = info.Mobile;
            if (info.Sex == "男") {
              this.Sex = 1;
            } else {
              this.Sex = 0;
            }
            console.log(this.Sex);
            this.Birthday = info.Birthday
            console.log(this.imgBase.length,"头像的长度")
            if ((this.imgBase.length == 0)) {
              this.Avatar = info.Avatar;
            }
            
           
          //  console.log(this.Mobile, this.Avatar, "手机号,头像");
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
            //  console.log(this.imgBase, "选择图像的路径");
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
        if(this.identity == 1){  //客服修改个人头像
            const res = await post(
              "CustomerService/EditHeadImage",
              {
                CsdId: this.userId,
                Token: this.token,
                Avatar: this.imgBase
              },
              this.curPage
            );
         }
         if(this.identity == 2){  //客户修改个人头像
            const res = await post(
              "User/EditHeadImage",
              {
                UserId: this.userId,
                Token: this.token,
                Avatar: this.imgBase
              },
              this.curPage
            );
         }
         if(this.identity == 3){   //师傅修改个人头像
            const res = await post(
              "InstalMaster/EditHeadImage",
              {
                MasterId: this.userId,
                Token: this.token,
                Avatar: this.imgBase
              },
              this.curPage
            );
         }

        
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
    //保存用户信息 ----修改用户性别 头像 昵称
    saveInfo() {
     // this.updataImg();
     console.log(this.NickName,"this.NickName")
      if (toLogin(this.curPage)  && this.NickName) {
        //客服修改个人信息
        if(this.identity == 1){
           post(
            "CustomerService/UpdateMemberInfo",
            {
              CsdId: this.userId,
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
        }
        //客户修改个人信息
        if(this.identity == 2){
           post(
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
        }
        //师傅修改个人信息
        if(this.identity == 3){ 
           post(
            "InstalMaster/UpdateMemberInfo",
            {
              MasterId: this.userId,
              Token: this.token,
              NickName: this.NickName,
              Mobile: this.Mobile,
              // Avatar:this.imgBase,
              Sex: this.Sex,
              Birthday: this.Birthday,
              Province:this.provinceCode,
              City:this.cityCode,
              Area:this.districtCode
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
        }
      } else {
        wx.showToast({
          title: "请填写昵称！!",
          icon: "none",
          duration: 1500
        });
      }
     this.updataImg();
    },
    confirmArea(area) {
      this.showArea = false;
      let text = "";
      const areas = area.mp.detail.values;
      for (let i = 0; i < areas.length; i++) {
        text += areas[i].name;
      }
      (this.provinceCode = areas[0].code || ""),
        (this.cityCode = areas[1].code || ""),
        (this.districtCode = areas[2].code || ""),
        (this.area = text);
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
