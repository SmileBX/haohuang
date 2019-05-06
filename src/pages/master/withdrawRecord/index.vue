<template>
  <div class="account">
    <div class="scorelist">
      <div class="month">
        <span class="selectTime" @click="selectTime">
          {{timeMsg}}
          <span class="icon-arrow arrow-down"></span>
        </span>
      </div>
      <div class="scoreitem column" v-for="(item,index) in scoreList" :key="index">
        <div class="column iteminfo">
          <p class="title">{{item.Remark}}</p>
          <p class="time">时间:{{item.CreateTime}}</p>
        </div>
        <div class="itemcolor" v-if="item.BudgetType===0">￥{{item.Change}}</div>
        <div class="reduceColor" v-if="item.BudgetType===1">￥{{item.Change}}</div>
      </div>
    </div>
    <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;" v-if="hasScoreData">暂无数据</p>
    <p class="ovedMsg" v-if="isOved && page>1" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p>
    <!--时间选择 不需要弹框-->
    <!-- <picker mode="time" /> -->
    <van-action-sheet :show="showDate" @close="showDate=false" @select="showDate=false">
      <van-datetime-picker
        type="year-month"
        :value="currentDate"
        @confirm="onInput($event,lindex)"
        @cancel="showDate=false"
        title="请选择时间"
      />
    </van-action-sheet>
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
    this.beginTime = ""; //开始时间
      this.endTime = "";
      this.monthTime = "";
    this.initData();
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    // let myDate = new Date();
    // let year = myDate.getFullYear();
    // let month = myDate.getMonth()+1;
    // let day = myDate.getDate();
    // this.beginTime = year+"-"+month+'-'+day;
    // this.endTime = year+"-"+month+'-'+1;
    if (toLogin(this.curPage)) {
      this.getDrawMoneyApplyList();
    }
  },
  data() {
    return {
      currentDate: new Date().getTime(),
      curPage: "",
      userId: "",
      token: "",
      page: 1,
      pageSize: 4,
      count: 0,
      allPage: 0,
      isLoad: false,
      isOved: false,
      hasScoreData: false,
      scoreList: [],
      beginTime: "", //开始时间
      endTime: "", //结束时间
      monthTime:"",  //选择月份
      timeMsg: "选择年月",
      showDate: false //日期 组件
    };
  },

  components: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提现记录"
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
    },
    selectTime() {
      //选择时间
      this.showDate = true;
      console.log("gggggggg");
    },
    onInput(e, i) {
      console.log(e, "时间");
      const date = new Date(e.mp.detail);
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      this.beginTime = `${year}-01-01`;
      this.endTime = `${year+1}-01-01`;
      this.monthTime = month;
      this.showDate = false;
      this.timeMsg = `${year}年${month}月`;
      this.initData();
      this.getDrawMoneyApplyList();
    },
    getDrawMoneyApplyList() {
      let that = this;
      post(
        "InstalMaster/DrawMoneyApplyList",
        {
          MasterId: that.userId,
          Token: that.token,
          page: that.page,
          pagesize: that.pageSize,
          BeginTime: that.beginTime,
          EndTime: that.endTime,
          MonthTime:that.monthTime
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.count = result.count;
          if (that.count === 0) {
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
                "CreateTime",
                item.CreateTime.split("T")[0] +
                  " " +
                  item.CreateTime.split("T")[1].split(".")[0]
              );
              that.$set(
                item,
                "UpdateTime",
                item.UpdateTime.split("T")[0] +
                  " " +
                  item.UpdateTime.split("T")[1].split(".")[0]
              );
              if (item.Change.toString().substr(0, 1) == "-") {
                that.$set(item, "BudgetType", 0);
                that.$set(item, "Change", item.Change.toString().substring(1));
              } else if (item.Change.toString().substr(0, 1) == "+") {
                that.$set(item, "BudgetType", 1);
                that.$set(item, "Change", item.Change.toString().substring(1));
              } else {
                that.$set(item, "BudgetType", "");
                that.$set(item, "Change", item.Change.toString().substring(1));
              }
            });
            that.scoreList = that.scoreList.concat(result.data);
          }
        }
      });
    }
  },
  onPullDownRefresh() {},
  onReachBottom() {
    if (this.isLoad) {
      this.page++;
      this.getDrawMoneyApplyList();
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

