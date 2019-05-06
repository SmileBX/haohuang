<template>
  <div class="page">
    <div class="sum border-box column">
      <div class="priceBox">
        <p v-if="hasData">
          ￥
          <span class="money">{{info.Wallet}}</span>
        </p>
        <p>当前余额（元）</p>
      </div>
      <div class="tabBox">
        <ul class="numberList flex li_33 center">
          <li :class="{'active':tabIndex===0}" @click="shiftTab(0)">
            <p class="title">总安装金额</p>
          </li>
          <li :class="{'active':tabIndex===1}" @click="shiftTab(1)">
            <p class="title">待收款金额</p>
          </li>
          <li :class="{'active':tabIndex===2}" @click="shiftTab(2)">
            <p class="title">已收款金额</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="census__section bg_fff">
      <div class="section__hd">
        <p class="title">本月</p>
      </div>
      <div class="section__bd">
        <ul class="numberList flex li_50 center numberList2">
          <li class="active">
            <p class="title">金额笔数</p>
            <p class="num color_fd5412">
              <span v-if="hasDetailInfo">{{detailInfo.count_ben}}</span>
            </p>
          </li>
          <li>
            <p class="title">本月金额</p>
            <p class="num color_fd5412">
              <span v-if="hasDetailInfo">￥{{detailInfo.money_ben}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="census__section bg_fff">
      <div class="section__hd">
        <p class="title">上月</p>
      </div>
      <div class="section__bd">
        <ul class="numberList flex li_50 center numberList2">
          <li class="active">
            <p class="title">金额笔数</p>
            <p class="num color_fd5412">
              <span v-if="hasDetailInfo">{{detailInfo.count_top}}</span>
            </p>
          </li>
          <li>
            <p class="title">本月金额</p>
            <p class="num color_fd5412">
              <span v-if="hasDetailInfo">￥{{detailInfo.money_top}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="weui-cells">
      <div class="weui-cell" @click="gotoPage(1)">
        <div class="weui-cell__bd">
          <p class="txt">结算明细</p>
        </div>
        <div class="weui-cell__ft">
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="weui-cell" @click="gotoPage(2)">
        <div class="weui-cell__bd">
          <p class="txt">提现记录</p>
        </div>
        <div class="weui-cell__ft">
          <span class="icon-arrow arrow-right"></span>
        </div>
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
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      this.GetInstalMasterInfo();
      this.getInstallStatistics();
    }
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      hasData: false, //是否成功获取了师傅个人信息接口
      info: {}, //个人信息
      hasDetailInfo: false, //是否成功获取了安装明细的接口
      detailInfo: {}, //安装明细
      tabIndex: 0
    };
  },
  methods: {
    //0-总金额1-代付款 2-已付款
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "安装统计"
      });
    },
    initData() {},
    gotoPage(index) {
      //跳转页面
      let objUrl = "";
      if (index === 1) {
        objUrl = "/pages/master/account/main";
      }
      if (index === 2) {
        objUrl = "/pages/master/withdrawRecord/main";
      }
      wx.navigateTo({
        url: objUrl
      });
    },
    shiftTab(index) {
      //切换tab
      this.tabIndex = index;
      this.hasDetailInfo = false;
      this.detailInfo = {};
      this.getInstallStatistics();
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
    },
    getInstallStatistics() {
      //安装统计
      let that = this;
      post(
        "InstalMaster/InstallStatistics",
        {
          MasterId: that.userId,
          Token: that.token,
          Status: that.tabIndex
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.hasDetailInfo = true;
          that.detailInfo = result.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>