<template>
  <div class="page">
    <div class="newsDetail" v-if="isOk">
      <div class="newsDetail__hd center">
        <h2 class="title">{{info.title}}</h2>
      </div>
      <div class="newsDetail__bd" v-html="info.Memo"></div>
      <div class="newsDetail__ft text_r">
        <span class="time">{{info.PubTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import foot from "@/components/foot.vue";
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.isOk = false;
    this.info = {};
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.id = this.$root.$mp.query.id;
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
     this.NoticeInfo();
    }
    
  },
  data() {
    return {
      userId: "",
      token: "",
      curPage: "",
      memberType: "",
      identity: "",
      id: "",
      info: {},
      isOk:false
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "通知详情"
      });
    },
    NoticeInfo() {
      let that = this;
      post(
        "News/NoticeInfo",
        {
          UserId: that.userId,
          Token: that.token,
          MemberType: that.memberType,
          newsid: that.id
        },
        that.curPage
      ).then(res => {
        that.info = res.data[0];
        that.isOk = true;
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