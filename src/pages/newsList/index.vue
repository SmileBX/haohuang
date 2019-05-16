<template>
  <div class="page">
    <div class="newsList" v-if="newsList.length>0">
      <div class="item" v-for="(item,index) in newsList" :key="index">
        <div class="time center">
          <span>{{item.PubTime}}</span>
        </div>
        <div class="contentBox" @click="gotoNewsDetail(item.id)">
          <p class="title ellipsis">
            {{item.title}}
            <span class="redDot" v-if="item.Islook===0"></span>
          </p>
          <div class="flex con">
            <div class="flex1">
              <p v-html="item.Memo" class="text-line2"></p>
              <!-- <div v-if="type==1">{{item.con}}</div> -->
            </div>
            <span class="icon-arrow arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
    <p
      style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;"
      v-if="hasData===false"
    >暂无数据</p>
    <p
      class="ovedMsg"
      v-if="isOved && page>1"
      style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;"
    >我也是有底线的</p>
  </div>
</template>
<script>
//identity: 1:客服；2：客户；3：师傅
import { post, host, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  onShow() {
    this.initData();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.type = this.$root.$mp.query.type;
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
    if (this.type == 0) {
      //公告
      this.barTitle = "系统通知";
    }
    if (this.type == 1) {
      //服务消息
      this.barTitle = "服务通知";
    }
    this.setBarTitle();
    if (toLogin()) {
      this.perNoticeList();
    }
  },
  data() {
    return {
      identity: "",
      userId: "",
      token: "",
      curPage: "",
      type: "", //消息类型；公告0，消息1
      memberType: "", //接收类型   0：会员  1：师傅 2:客服
      page: 1,
      pageSize: 12,
      isOved: false, //是否加载完了
      hasData: "", //有数据的时候
      newsList: [],
      barTitle: ""
    };
  },
  methods: {
    setBarTitle() {
      let that = this;
      wx.setNavigationBarTitle({
        title: that.barTitle
      });
    },
    initData() {
      this.page = 1;
      this.isOved = false;
      this.hasData = "";
      this.newsList = [];
    },
    perNoticeList() {
      let that = this;
      let objUrl = "";
      if (that.type == 0) {
        //消息类型；公告0，消息1
        objUrl = "News/NoticeList";
      } else {
        objUrl = "News/MyNoticeList";
      }
      post(
        objUrl,
        {
          UserId: that.userId,
          Token: that.token,
          MemberType: that.memberType,
          page: that.page,
          pagesize: that.pageSize
        },
        that.curPage
      ).then(res => {
        if (res.count <= 0) {
          that.hasData = false;
        } else {
          that.hasData = true;
        }
        if (that.pageSize !== res.data.length) {
          that.isOved = true;
        }
        if (that.page === 1) {
          that.newsList = [];
        }
        if (res.data.length > 0) {
          that.newsList = that.newsList.concat(res.data);
          res.data.forEach(function(item) {
            if (item.Islook == 0) {
              //未读的时候
              that.ReadNoticeInfo(item.id);
            }
          });
        }
      });
    },
    ReadNoticeInfo(id) {
      console.log("id:" + id);
      //添加阅读记录
      let that = this;
      wx.request({
        url: host + "News/ReadNoticeInfo", //仅为示例，并非真实的接口地址
        method: "POST",
        data: {
          UserId: that.userId,
          Token: that.token,
          MemberType: that.memberType,
          newsid: id
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        success: function(res) {},
        fail: function(error) {},
        complete: function() {}
      });
    },
    gotoNewsDetail(id) {
      //跳转到消息详情
      wx.navigateTo({
        url: "/pages/newsDetail/main?id=" + id
      });
    }
  },
  onPullDownRefresh() {
    // 下拉刷新
    this.initData();
     this.perNoticeList();
  },
  onReachBottom() {
    //上拉加载
    if (!this.isOved) {
      this.page++;
      this.perNoticeList();
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>