<template>
  <div class="page">
    <div class="newsList weui-cells">
      <div class="weui-cell" @click="gotoPage(1)">
        <img src="/static/images/icons/tips_2.png" class="icon" alt>
        <div class="weui-cell__bd">
          <div class="flex">
            <div class="flex1">
              <p class="title">系统通知</p>
            </div>
            <span class="time">2019-03-28</span>
          </div>
          <div class="flex">
            <div class="flex1">
              <p class="con">账号登录提醒</p>
            </div>
            <span class="num">1</span>
          </div>
        </div>
      </div>
      <div class="weui-cell" v-if="identity && identity!==1" @click="gotoPage(2)">
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
      </div>
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
  },
  data() {
    return {
      identity: "",
      userId: "",
      token: "",
      curPage: ""
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "消息"
      });
    },
    gotoPage(type) {
      //跳转消息列表页面；1：系统公告；2：服务消息
      wx.navigateTo({
        url: "/pages/newsList/main?type="+type
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