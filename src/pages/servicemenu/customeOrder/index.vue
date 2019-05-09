<template>
  <div class="installbox">
      <div class="flex flex-around " style="padding:20rpx 0;border:1px solid red">
          <p class="flex flexAlignCenter">
                <span class="titleActive">选择区域</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
          <p class="flex flexAlignCenter">
                <span>订单状态</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
      </div>
      <!--订单列表-->
      <div class="orderlist">
          <div class="item p30" v-for="(item,index) in orderList" :key="index">
              <div class="flex ordertitle">
                  <p class="itemname flex1">{{item.TypeName}}</p>
                  <p class="active">{{item.StatuName}}</p>
              </div>
              <p>订单编号：{{item.OrderNo}}</p>
              <p>下单时间：{{item.CreateTime}}</p>
              <p>完成时间：03/25-10:23</p>
          </div>
      </div>
      <!--弹框-->
      <div class="mask" style="top:100rpx;" v-if="isShow"></div>
      <!--弹框订单状态-->
      <div class="modal orderStatu" v-if="showStatu">
          <p>全部状态</p>
          <p>已指派</p>
          <p>未指派</p>
          <p>已完成</p>
      </div>
      <!--选择城市区域-->
      <div class="modal orderCity allPadd" v-if="showCity">
          <div class="flex flexAlignCenter menu">
              <p>河北省</p>
              <p>唐山市</p>
              <p class="menuActive">请选择</p>
          </div>
          <!--城市列表-->
          <div class="city">
              <p>北京市</p>
              <p>天津市</p>
              <p>河北市</p>
              <p>陕西省</p>
              <p>内蒙古</p>
              <p>呼和浩特市</p>
          </div>
      </div> 
      <!-- 数据状态提示节点 -->
        <div v-if="orderList.length<1" style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;">暂时没有数据哦!</div>
        <div v-if="orderListEnd&&page!==1" style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;">已经到底了哦!</div>
      
  </div>
</template>
<script>
import "@/css/common.css";
import areaList from '@/utils/areaList'
import { post } from "@/utils/index";
export default {
  data() {
    return {
      showStatu:false,
      isShow:false,
      showCity:false,

      
      UserId: "",
      Token: "",
      page: 1,
      pageSize: 12,
      typeNo: -1, //订单状态
      searchRegion: "", //搜索地区字段
      searchRegionCode: "", //搜索地区字段
      areaListStatus: false, //选择地区状态
      areaList,
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
      // 取消订单
      cancelOrderWindowStatus:false,
      refuseContent:'',
      editOrderId:''
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
    if(this.$root.$mp.query.typeNo){
      this.typeNo=this.$root.$mp.query.typeNo*1
    }
    console.log(this.typeNo, "订单状态");
    this.init();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "客户订单"
      });
    },
    // 初始化数据
    init(){
        this.orderListEnd = false;
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
      const res = await post("CustomerService/GetKfOrderList", {
        CsdId: this.UserId,
        Token: this.Token,
        page: this.page,
        pageSize: this.pageSize,
        Region: this.searchRegionCode,
        orderStatus: this.typeNo,
        IsService:0 //查询订单分类，0--用户的下单；1--客服的下单
      });
      if(res.data.length!==this.pageSize){
        this.orderListEnd = true;
      }
      this.orderList = this.orderList.concat(res.data);
    },
  },
    // 上拉加载
    onReachBottom(){
      this.page+=1;
      this.getData()
    },
    // 下拉刷新
    onPullDownRefresh(){
      this.searchRegionCode = ''
      this.searchRegion = ''
      this.init()
    wx.stopPullDownRefresh();
    }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>