<template>
  <div class="page">
    <div class="tabBarBox">
      <ul class="tabBar flex li_20 fixed">
        <li
          :class="{'active':typeNo===menus.typeNo}"
          v-for="menus in menu"
          :key="menus.typeNo"
          @click="tabMenu(menus.typeNo)"
        >
          <span class="title">{{menus.name}}</span>
        </li>
      </ul>
    </div>

    <!-- 搜索 -->
    <div class="searchBox">
      <div class="search flex flexAlignCenter fixed border-box" style="top:80rpx;">
        <div class="ipt flex1">
          <input type="text" class="weui-input" disabled placeholder="请选择区域">
        </div>
        <div class="btn">搜索</div>
      </div>
    </div>
    <!-- 订单列表-->
    <div class="tabContent">
      <!-- 订单 -->
      <div class="column levelPanel bg__levelPanel order__levelPanel" style="margin-top:20rpx;">
        <div class="item" v-for="list in orderList" :key="list.Id">
          <div class="item__hd flex">
            <div class="flex1">
              <p class="orderNo ellipsis">订单编号：{{list.OrderNo}}</p>
            </div>
            <span class="status">{{list.StatuName}}</span>
          </div>
          <div class="item__bd">
            <div class="box">
              <div class="outside">
                <div class="pictrueAll">
                  <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
                </div>
                <div class="txtBox">
                  <p class="title text-line2">{{list.OrderName}}</p>
                  <div class="flex">
                    <div class="flex1">
                      <p class="new-price">￥{{list.OfferTotal}}</p>
                    </div>
                    <!-- <span class="buyNum">x1</span> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="priceAllBox flex">
              <div class="flexItem"></div>
              <div class="flexItem flex1 text_r">
                共3件商品（含配送费）合计
                <span class="hj_price">￥3300.00</span>
              </div>
            </div>-->
          </div>
          <div class="item__ft">
            <div class="button" v-if="list.OrderStatus===0">取消订单</div>
            <div class="button active" v-if="list.OrderStatus===1">付款</div>
            <div class="button active" v-if="list.OrderStatus===0">联系客服</div>
            <div class="button active" v-if="list.OrderStatus===8">去评价</div>
          </div>
        </div>
        <div v-if="orderList.length<1" style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;">暂时没有数据哦!</div>
        <div v-if="orderListEnd&&page!==1" style="text-align:center;font-size:24rpx;color:#999;">已经到底了哦!</div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/common.css";
import { post } from "@/utils/index";
export default {
  data() {
    return {
      UserId: "",
      Token: "",
      page: 1,
      pageSize: 8,
      typeNo: -1, //订单状态
      searchRegion: "", //搜索地区字段
      menu: [
        {
          name: "全部",
          typeNo: -1
        },
        {
          name: "待确认",
          typeNo: 0
        },
        {
          name: "待付款",
          typeNo: 1
        },
        {
          name: "安装中",
          typeNo: 7
        },
        {
          name: "待评论",
          typeNo: 8
        }
      ],
      orderList:[],
      orderListEnd:false, //提示数据到底了
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    // typeNo--进入订单列表展示的状态
    // 客服--订单状态：-1全部，0-待确认，1-待付款 7-已执行(安装中) 8-待评论9-已完成
    // 客户--订单状态：-1全部，0-待确认，1-待付款，2-处理中，10-待评论
    console.log(this.$root.$mp.query.typeNo, "订单状态");
    this.getData();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      });
    },
    async getData() {
      const res = await post("CustomerService/GetKfOrderList", {
        CsdId: this.UserId,
        Token: this.Token,
        page: this.page,
        pageSize: this.pageSize,
        Region: this.searchRegion,
        orderStatus: this.typeNo
      });
      this.orderList = res.data;
    },
    // 切换订单状态
    tabMenu(typeNo) {
      this.typeNo = typeNo;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>