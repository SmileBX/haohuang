<template>
  <div class="installbox">
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
      <!--订单列表-->
      <scroll-view scroll-y  class="orderlist">
          <div class="item p30" v-for="(item,index) in orderList" :key="index" @click="gotoDetail(item.Id)">
              <div class="flex ordertitle">
                  <p class="itemname flex1">{{item.TypeName}}</p>
                  <p class="blue" v-if="item.OrderStatus==9">已完成</p>
                  <p  v-if="item.OrderStatus==8">待评论</p>
                  <p  v-if="item.OrderStatus==7">安装处理中</p>
                  <p  v-if="item.OrderStatus==6">待处理</p>
              </div>
              <p>订单编号：{{item.OrderNo}}</p>
              <p>下单时间：{{item.CreateTime}}</p>
              <p v-if="item.OverTime">完成时间：{{item.OverTime}}</p>
              <p v-else>完成时间：处理中</p>
          </div>
      </scroll-view>
      <!-- 数据状态提示节点 -->
        <div v-if="orderList.length<1" style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;">暂时没有数据哦!</div>
        <div v-if="orderListEnd&&page!==1" style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;">已经到底了哦!</div>
  </div>
</template>
<script>
import "@/css/common.css";
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  data() {
    return {
      a:1,
      curPage:"",
      UserId: "",
      Token: "",
      page: 1,
      pageSize: 12,
      typeNo: -1, //订单状态
      menu: [
        {
          name: "全部",
          typeNo: 0
        },
        {
          name: "待处理",
          typeNo: 1
        },
        {
          name: "已处理",
          typeNo: 2
        }
        
      ],
      orderList:[],
      orderListEnd:false, //提示数据到底了
      // 取消订单
      cancelOrderWindowStatus:false,
      refuseContent:'',
      editOrderId:''
    };
  },
    onLoad() {
      this.setBarTitle();
      this.typeNo = 0
  },
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    // typeNo--进入订单列表展示的状态  
    // 执行--订单状态：-1全部，0-待处理，1-已处理 
    if(this.$root.$mp.query.typeNo){
      this.typeNo=this.$root.$mp.query.typeNo*1 +1
    }
    
    this.init();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      });
    },
    // 初始化数据
    init(){
        this.page =1;
        this.getData()
    },
    async getData() {
      if(this.orderListEnd){
        return false;
      }
      if(this.page===1){
        this.orderList=[];
      }
      const res = await post("ExecuteOrder/ExecuteOrderList", {
        ExecuteId: this.UserId,
        Token: this.Token,
        page: this.page,
        pageSize: this.pageSize,
        orderStatus: this.typeNo
      });
      if(res.data.length!==this.pageSize){
        this.orderListEnd = true;
      }
      this.orderList = this.orderList.concat(res.data);
      for(let i=0;i<this.orderList.length;i++){
          this.$set(this.orderList[i],"CreateTime",this.orderList[i].CreateTime.split('T').join(" ").split(".")[0])
      }
    },
    // 切换订单状态
    tabMenu(typeNo) {
      this.typeNo = typeNo;
      this.curPage = getCurrentPageUrlWithArgs({ typeNo: this.typeNo });
      this.orderList = [];
      this.init()
    },
    // 跳转到订单详情
    gotoDetail(orderId){
      wx.navigateTo({
        url:`/pages/perform/orderDetail/main?orderId=${orderId}`
      })
    },

  },
    // 上拉加载
    onReachBottom(){
      this.page+=1;
      this.getData()
    },
    // 下拉刷新
    onPullDownRefresh(){
      this.typeNo = 0
      this.init()
    wx.stopPullDownRefresh();
    }
}
</script>
<style lang='scss' scoped>
@import "./style";
.tabBar {
  justify-content:space-between!important;
}
</style>