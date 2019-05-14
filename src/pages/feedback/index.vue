<template>
  <div class="page">
    <div class="eaditBox bg_fff">
      <div class="areBox">
        <textarea
          name
          class="weui-area"
          maxlength="200"
          v-model="content"
          @input="limitInput"
          placeholder="请输入您的反馈问题及建议..."
        ></textarea>
        <p class="text_r num_tips">{{inputTxtLength}}/200</p>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p class="txt">相关截图（选填）</p>
        </div>
        <div class="weui-cell__ft">
          <!-- <span class="num_tips">0/4</span> -->
        </div>
      </div>
      <div class="uploadImage clear">
        <!-- 上传展示的图片 -->
        <div
          class="upload-img img"
          v-for="(item,index) in imgPathArr"
          :key="index"
          :style="'background-image:url('+item+')'"
        >
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(index)" alt>
        </div>
        <div
          class="button-upload"
          v-if="isShowBtnUpload"
          @click="upLoadImg"
        >
        <img src="/static/images/icons/upload_1.png" alt="">
        </div>
      </div>
    </div>
    <div class="ftBtn pt20 pb20">
      <div class="inner">
        <div class="btn btn-active fill" @click="smFeedBack">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    //identity: 1:客服；2：客户；3：师傅
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      content: "",
      inputTxtLength: 0,
      imgPathArr: [],
      imgPathArr2: [],
      picLength:4,
      isShowBtnUpload: true
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "意见反馈"
      });
    },
    initData(){
      this.content = "";
      this.inputTxtLength = 0;
      this.imgPathArr = [];
      this.imgPathArr2 = [];
      this.isShowBtnUpload = true;
    },
    limitInput() {
      this.inputTxtLength = this.content.length;
    },
    validate() {
      if (this.content == "") {
        wx.showToast({
          title: "请输入你要反馈的内容！",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.content.length < 10) {
        wx.showToast({
          title: "最少输入10个字！",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      return true;
    },
    upLoadImg() {
      let _this = this;
      let num = 0;
      if (this.imgPathArr.length < this.picLength) {
        num = this.picLength - this.imgPathArr.length;
        wx.chooseImage({
          //进入这里面的时候this发生了改变
          count: num,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            console.log(res.tempFilePaths);
            _this.imgPathArr = _this.imgPathArr.concat(res.tempFilePaths);
            if (_this.imgPathArr.length === 8) {
              _this.isShowBtnUpload = false;
            }
            _this.imgPathArr2 = []; //先清空数组
            for (let i = 0; i < _this.imgPathArr.length; i++) {
              let picJson = {};
              wx.getFileSystemManager().readFile({
                filePath: _this.imgPathArr[i], //选择图片返回的相对路径.
                encoding: "base64", //编码格式
                success: res => {
                  //成功的回调
                  let imgBase64Str = "data:image/jpg;base64," + res.data;
                  picJson["PicUrl"] = imgBase64Str;
                  _this.imgPathArr2.push(picJson);
                }
              });
            }
          }
        });
      }
    },
    delImg(index) {
      this.imgPathArr.splice(index, 1);
      this.imgPathArr2.splice(index, 1);
      if (this.imgPathArr.length < 8) {
        this.isShowBtnUpload = true;
      }
    },
    smFeedBack() {
      if (toLogin(this.curPage)) {
        //提交反馈
        if (this.validate()) {
          if (this.identity == 2) {
            this.MemberFeedBack();
          }
          if (this.identity == 3) {
            this.MasterFeedBack();
          }
        }
      }
    },
    MasterFeedBack() {
      let that = this;
      //师傅的
      post(
        "InstalMaster/MemberFeedBack",
        {
          MasterId: that.userId,
          Token: that.token,
          Content: that.content,
          PicList: JSON.stringify(that.imgPathArr2),
          Type: 0
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.showToast({
            title: "提交成功！",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.reLaunch({
                  url: "/pages/my/main"
                });
                that.initData();
              }, 1500);
            }
          });
        }
      });
    },
    MemberFeedBack() {
      let that = this;
      //客户的
      post(
        "User/MemberFeedBack",
        {
          UserId: that.userId,
          Token: that.token,
          Content: that.content,
          PicList: JSON.stringify(that.imgPathArr2),
          Type: 0
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.showToast({
            title: "提交成功！",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                wx.reLaunch({
                  url: "/pages/my/main"
                });
                that.initData();
              }, 1500);
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
