<template>
  <div class="installbox">
    <!-- 搜索 -->
    <div class="searchBox">
      <div class="search flex AlignCenter border-box" style="margin-top:1px;">
        <div class="ipt flex1" @click="areaListStatus = true">
          <input type="text" class="weui-input" :value="searchRegion" disabled placeholder="请选择区域">
        </div>
        <div class="remove" @click="removeSelect" v-show="searchRegion"><img src="/static/images/icons/cancle.png" alt=""></div>
        <!-- <div class="btn" @click="search">搜索</div> -->
      </div>
    </div>
    <van-popup :show="areaListStatus" position="bottom">
      <van-area :area-list="areaList" @cancel="areaListStatus = false" @confirm="areaConfirm" columns-num="2"></van-area>
    </van-popup>
    <!--订单列表-->
    <div class="orderlist" v-if="orderList.length>0">
      <div class="item p30" v-for="(item,index) in orderList" :key="index" @click="gotoDetail(index)">
        <div class="flex ordertitle">
          <p class="itemname flex1">{{item.TypeName}}</p>
          <p class="active">{{item.StatuName}}</p>
        </div>
        <p>订单编号：{{item.OrderNo}}</p>
        <p>下单时间：{{item.CreateTime}}</p>
        <p>完成时间：{{item.OverTime}}</p>
      </div>
    </div>
    <!--弹框-->

    <div
      v-if="orderList.length<1"
      style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;"
    >暂时没有数据哦!</div>
    <div
      v-if="orderListEnd&&page!==1"
      style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;"
    >已经到底了哦!</div>
  </div>
</template>
<script>
import "@/css/common.css";
import areaList from "@/utils/areaList";
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      page: 1,
      pageSize: 12,
      typeNo: -1, //订单状态
      searchRegion: "", //搜索地区字段
      searchRegionCode: "", //搜索地区字段
      areaListStatus: false, //选择地区状态
      areaList,
      orderList: [],
      orderListEnd: false, //提示数据到底了
      // 取消订单
      cancelOrderWindowStatus: false,
      refuseContent: "",
      editOrderId: ""
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.token = wx.getStorageSync("token");
    this.userId = wx.getStorageSync("userId");
    this.curPage = getCurrentPageUrlWithArgs();
    // typeNo--进入订单列表展示的状态
    // 客服--订单状态：-1全部，0-待确认，1-待付款 7-已执行(安装中) 8-待评论9-已完成
    // 客户--订单状态：-1全部，0-待确认，1-待付款，2-处理中，10-待评论
    this.init();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "客户订单"
      });
    },
    // 初始化数据
    init() {
      this.orderListEnd = false;
      this.searchRegion = ''
      this.page = 1;
      this.getData();
    },
     // 选择地区
    areaConfirm(e) {
      let val = "";
      e.mp.detail.values.map(item => {
        val += item.name + " ";
      });
      this.searchRegion = val;
      this.searchRegionCode =
        e.mp.detail.values[e.mp.detail.values.length-1].code;
        console.log("ggggggggg");
        console.log(this.searchRegionCode);
      this.areaListStatus = false;
      this.init();
    },
    // 删除选中的城市
    removeSelect() {
      this.searchRegionCode = "";
      this.searchRegion = "";
      this.init();
    },
    search(){  //搜索
       this.init();
    },
    getData() {
      let that = this;
      if (that.orderListEnd) {
        return false;
      }
      if (that.page === 1) {
        that.orderList = [];
      }
      post(
        "Order/GetOrderList",
        {
          UserId: that.userId,
          Token: that.token,
          page: that.page,
          pageSize: that.pageSize,
          Region: that.searchRegionCode,
          orderStatus: 9
        },
        that.curPage
      ).then(res => {
        if (res.data.length !== that.pageSize) {
          that.orderListEnd = true;
        }
        that.orderList = that.orderList.concat(res.data);
      });
    },
    gotoDetail(index){
      let orderId = this.orderList[index].Id
      wx.navigateTo({
        url: `/pages/custom/orderDetail/main?orderId=${orderId}`
      });
    }
  },
  // 上拉加载
  onReachBottom() {
    this.page += 1;
    this.getData();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.searchRegionCode = "";
    this.searchRegion = "";
    this.init();
    wx.stopPullDownRefresh();
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>