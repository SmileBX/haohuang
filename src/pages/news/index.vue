<template>
  <div class="page">
    <div class="newsList weui-cells">
      <div class="weui-cell" @click="gotoPage(0)">
        <img src="/static/images/icons/tips_2.png" class="icon" alt>
        <div class="weui-cell__bd">
          <p class="title">系统通知</p>
        </div>
        <div class="weui-cell__ft">
          <span class="num" v-if="ggNum>0">{{ggNum}}</span>
        </div>
      </div>
      <div class="weui-cell" @click="gotoPage(1)">
        <img src="/static/images/icons/tips_3.png" class="icon" alt>
        <div class="weui-cell__bd">
          <p class="title">服务通知</p>
        </div>
        <div class="weui-cell__ft">
          <span class="num" v-if="xxNum>0">{{xxNum}}</span>
        </div>
      </div>
      <!-- <div class="weui-cell" v-if="identity && identity!==1" @click="gotoPage(1)">
        <img src="/static/images/icons/tips_3.png" class="icon" alt>
        <div class="weui-cell__bd">
          <div class="flex">
            <div class="flex1">
              <p class="title">服务通知</p>
            </div>
            <span class="time">2019-03-28</span>
          </div>
          <div class="flex">
            <div class="flex1">
              <p class="con">你的订单已取消</p>
            </div>
            <span class="num">1</span>
          </div>
        </div>
      </div> -->
    </div>
    <foot :identity="identity"></foot>
  </div>
</template>
<script>
//identity: 1:客服；2：客户；3：师傅
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import foot from "@/components/foot.vue";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    if (this.identity == 1) {
      //客服
      this.memberType = 2;
    }
    if (this.identity == 2) {
      //客户
      this.memberType = 0;
    }
    if (this.identity == 3) {
      //师傅
      this.memberType = 1;
    }
    if(toLogin(this.curPage)){
      this.noReadCount(0);
      this.noReadCount(1);
    }
    
  },
  data() {
    return {
      identity: "",
      userId: "",
      token: "",
      curPage: "",
      memberType: "", //接收类型   0：会员  1：师傅 2:客服
      ggNum: 0, //消息的公告的
      xxNum: 0 //消息的未读           //type:""  //公告0，消息1
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "消息"
      });
    },
    noReadCount(type) {
      //未读消息
      let that = this;
      post(
        "News/NewsCount",
        {
          UserId: that.userId,
          Token: that.token,
          MemberType: that.memberType,
          NoticeType: type
        },
        that.curPage
      ).then(res => {
        if (type === 0) {
          //公告
          that.ggNum = res.count;
        }
        if (type == 1) {
          that.xxNum = res.count;
        }
      });
    },
    gotoPage(type) {
      //跳转消息列表页面；消息类型；公告0，消息1
      wx.navigateTo({
        url: "/pages/newsList/main?type=" + type
      });
    }
  },
  components: {
    foot
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>