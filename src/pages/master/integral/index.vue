<template>
  <div>
    <div class="sum border-box column">
      <p>当前积分</p>
      <p>
        <span class="score" v-if="hasData">{{info.Score}}</span>
      </p>
    </div>
    <div class="scorelist" v-if="scoreList.length>0">
      <div class="scoreitem column" v-for="(item,index) in scoreList" :key="index">
        <div class="column iteminfo">
          <p class="title">{{item.Remark}}</p>
          <p class="time">{{item.OperatorTime}}</p>
        </div>
        <div class="itemcolor" v-if="item.BudgetType===0">+{{item.Change}}</div>
        <div class="reduceColor" v-if="item.BudgetType===1">-{{item.Change}}</div>
      </div>
      <!-- <div class="scoreitem column">
            <div class="column iteminfo">
                <p>商城门店装修</p>
                <p class="time">2019/04/01 15：39：21</p>
            </div>
            <div class="itemcolor">+50</div>
      </div>-->
    </div>
    <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;" v-if="hasScoreData">暂无数据</p>
    <p class="ovedMsg" v-if="isOved && page>1" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p>
  </div>
</template>

<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import "@/css/common.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.initData();
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      this.GetInstalMasterInfo();
      this.getWalletList();
    }
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      page: 1,
      pageSize: 12,
      count: 0,
      allPage: 0,
      isLoad: false,
      isOved: false,
      hasScoreData:false,
      scoreList: [],
      hasData: false,
      info: {}
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的积分"
      });
    },
    initData() {
      this.page = 1;
      this.pageSize = 15;
      this.count = 0;
      this.allPage = 0;
      this.isLoad = false;
      this.isOved = false;
      this.hasScoreData = false;
      this.scoreList = [];
      this.hasData = false;
      this.info = {};
    },
    getWalletList() {
      let that = this;
      post(
        "InstalMaster/GetInstalMaster_WalletList",
        {
          MasterId: that.userId,
          Token: that.token,
          page: that.page,
          pagesize: that.pageSize,
          WalletType: 2 //1：钱；2：积分
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.count = result.count;
          if (that.count == 0) {
            that.hasScoreData = true;
          }
          if (parseInt(that.count) % that.pageSize === 0) {
            that.allPage = that.count / that.pageSize;
          } else {
            that.allPage = parseInt(that.count / that.pageSize) + 1;
          }
          if (that.allPage > that.page) {
            that.isLoad = true;
          } else {
            that.isLoad = false;
          }
          if (result.data.length > 0) {
            if (that.page === 1) {
              that.scoreList = [];
            }
            result.data.forEach(item => {
              that.$set(
                item,
                "OperatorTime",
                item.OperatorTime.split("T")[0] +
                  " " +
                  item.OperatorTime.split("T")[1].split(".")[0]
              );
            });
            that.scoreList = that.scoreList.concat(result.data);
          }
        }
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
  },
  onPullDownRefresh() {},
  onReachBottom() {
    if (this.isLoad) {
      this.page++;
      this.getWalletList();
    } else {
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>
