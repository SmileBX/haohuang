<template>
  <div class="page">
    <div class="newsList">
      <div class="item">
        <div class="time center">
          <span>2019.04.28 10:20</span>
        </div>
        <div class="contentBox">
          <p class="title">账号登录提醒</p>
          <div class="flex con">
            <div class="flex1">您的账号于04/18 10:19在广东省深圳市的一台设备进行登录操作</div>
            <span class="icon-arrow arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="time center">
          <span>2019.04.28 10:20</span>
        </div>
        <div class="contentBox">
          <p class="title">账号登录提醒</p>
          <div class="flex con">
            <div class="flex1">您的账号于04/18 10:19在广东省深圳市的一台设备进行登录操作</div>
            <span class="icon-arrow arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//identity: 1:客服；2：客户；3：师傅
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.type = this.$root.$mp.query.type;
    this.perNoticeList();
  },
  data() {
    return {
      identity: "",
      userId: "",
      token: "",
      curPage: "",
      type: "", //消息类型；1：系统公告；2：服务消息
      page: 1,
      pageSize: 15,
      count: 0,
      allPage: 0,
      isLoad: false,
      isOved: false,
      hasData: false,
      newsList: []
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "系统通知"
      });
    },
    perNoticeList() {
      //系统公告
      let that = this;
      post(
        "News/NoticeList",
        {
          UserId: that.userId,
          Token: that.token,
          MsgType: 0,
          page: that.page,
          pagesize: that.pageSize
        },
        that.curPage
      ).then(res => {});
    },
    MasterServerNoticeList(){  //师傅的服务消息
      let that = this;
      post(
        "News/NoticeList",
        {
          MasterId: that.userId,
          Token: that.token,
          MsgType: 0,
          page: that.page,
          pagesize: that.pageSize
        },
        that.curPage
      ).then(res => {});
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>