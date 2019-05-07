<template>
  <div>
    <div class="sum border-box column">
      <p v-if="hasData">
        ￥
        <span class="money">{{info.Wallet}}</span>
      </p>
      <p>当前余额（元）</p>
      <div class="tips" style="color:#fff;margin-top:60rpx;font-size:24rpx;">最低提现金额为1元</div>
    </div>
    <div class="allPadd">
      <div class="botbtn deposit" @click="gotoDepositmoney">提现</div>
      <div class="tips watch" @click="gotoWithdrawRecord">查看资金明细></div>
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
    this.hasData = false;
    this.info = {};
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      this.GetInstalMasterInfo();
    }
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      hasData: false,
      info: {}
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "余额"
      });
    },
    gotoWithdrawRecord() {
      //跳转到提现明细
      wx.navigateTo({
        url: "/pages/master/withdrawRecord/main"
      });
    },
    gotoDepositmoney() {
      //跳转到体现
      wx.navigateTo({
        url: "/pages/master/depositmoney/main"
      });
    },
    //获取师傅的个人信息
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
        console.log(result);
        if (result.code === 0) {
          that.hasData = true;
          that.info = result.data;
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>