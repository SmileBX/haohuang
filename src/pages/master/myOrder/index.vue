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
    <!-- <div class="searchBox">
      <div class="search flex AlignCenter border-box" style="margin-top:10rpx;">
        <div class="ipt flex1" @click="areaListStatus = true">
          <input type="text" class="weui-input" :value="searchRegion" disabled placeholder="请选择区域">
          
        </div>
        <div class="remove" @click="removeSelect" v-show="searchRegion">×</div>
        <div class="btn" @click="init">搜索</div>
      </div>
    </div>-->
    <!-- <van-popup :show="areaListStatus" position="bottom">
    <van-area :area-list="areaList" @cancel="areaListStatus = false" @confirm="areaConfirm"></van-area>
    </van-popup>-->
    <!-- 订单列表-->
    <div class="tabContent">
      <!-- 订单 -->
      <div class="column levelPanel bg__levelPanel order__levelPanel" style="margin-top:20rpx;">
        <div class="item" v-for="list in orderList" :key="list.Id">
          <div class="item__hd flex">
            <div class="flex1">
              <p class="orderNo ellipsis">订单编号：{{list.OrderNo}}</p>
            </div>
            <span class="status" v-if="list.AuditStatus===0">施工中</span>
            <span class="status" v-if="list.AuditStatus===1">待审核</span>
            <span class="status" v-if="list.AuditStatus===2">已通过</span>
            <span class="status" v-if="list.AuditStatus===3">未通过</span>
            <span class="status" v-if="list.AuditStatus===4">已完成</span>
          </div>
          <div class="item__bd" @click="gotoDetail(list.Id)">
            <div class="box">
              <div class="outside">
                <div class="pictrueAll">
                  <div class="pictrue img" :style="'background-image:url('+list.OrderImg+')'"></div>
                  <!-- <div class="pictrue img"></div> -->
                </div>
                <div class="txtBox">
                  <p class="title text-line2">{{list.orderName}}</p>
                  <div class="flex">
                    <div class="flex1">
                      <p class="new-price"><span v-if="list.MasterType===1">￥{{list.InstallMoney}}</span></p>
                    </div>
                    <span class="buyNum">x{{list.num}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="telInfo">
              <p>申请人：{{list.ContactName}}</p>
              <p>手机号码：{{list.Tel}}</p>
              <p>安装地址：{{list.Addr}}</p>
            </div>
          </div>
          <div class="item__ft">
            <div class="button active" v-if="list.AuditStatus===0">联系客户</div>
            <div class="button active" v-if="list.AuditStatus===1">联系客服</div>
            <div class="button active" v-if="list.AuditStatus===2 || list.AuditStatus===4">删除订单</div>
            <div class="button active" v-if="list.AuditStatus===3">重新提交</div>
          </div>
        </div>
        <!-- 数据状态提示节点 -->
        <div
          v-if="orderList.length<1"
          style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;"
        >暂时没有数据哦!</div>
        <div
          v-if="orderListEnd&&page!==1"
          style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;"
        >已经到底了哦!</div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/common.css";
// import areaList from '@/utils/areaList'
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  data() {
    return {
      UserId: "",
      Token: "",
      curPage: "",
      page: 1,
      pageSize: 12,
      typeNo: -1, //订单状态
      // searchRegion: "", //搜索地区字段
      // searchRegionCode: "", //搜索地区字段
      // areaListStatus: false, //选择地区状态
      // areaList,
      menu: [
        {
          name: "全部",
          typeNo: -1
        },
        {
          name: "施工中",
          typeNo: 0
        },
        {
          name: "待审核",
          typeNo: 1
        },
        {
          name: "已通过",
          typeNo: 2
        },
        {
          name: "未通过",
          typeNo: 3
        }
      ],
      orderList: [],
      orderListEnd: false //提示数据到底了
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    // typeNo--进入订单列表展示的状态
    // 客服--订单状态：-1全部，0-待确认，1-待付款 7-已执行(安装中) 8-待评论9-已完成
    // 客户--订单状态：-1全部，0-待确认，1-待付款，2-处理中，10-待评论
    //师傅的---订单状态：-1全部，0-已接单(施工中),1-待审核(已安装) ,2-审核通过, 3-审核拒绝, 4-订单完成
    if (this.$root.$mp.query.typeNo) {
      this.typeNo = this.$root.$mp.query.typeNo * 1;
    }
    console.log(this.typeNo, "订单状态");
    this.init();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      });
    },
    getData() {
      let that = this;
      if (that.orderListEnd) {
        return false;
      }
      if (that.page === 1) {
        that.orderList = [];
      }
      //MasterType安装师傅所属类型 0-公司内部 1-公司外部
      post("InstalMaster/GetInstallOrderList", {
        MasterId: that.UserId,
        Token: that.Token,
        page: that.page,
        pageSize: that.pageSize,
        orderStatus: that.typeNo
      },that.curPage).then(res => {
        if (res.data.length !== that.pageSize) {
          that.orderListEnd = true;
        }
        that.orderList = that.orderList.concat(res.data);
      });
    },
    // 切换订单状态
    tabMenu(typeNo) {
      this.typeNo = typeNo;
      this.init();
    },
    // 初始化数据
    init() {
      this.orderListEnd = false;
      this.page = 1;
      this.getData();
    },
    // 删除选中的城市
    removeSelect() {
      this.searchRegionCode = "";
      this.searchRegion = "";
      this.init();
    },
    // 选择地区
    // areaConfirm(e){
    //   let val=''
    //   e.mp.detail.values.map(item=>{
    //     val+=item.name+' '
    //   })
    //   this.searchRegion = val
    //   this.searchRegionCode = e.mp.detail.values[e.mp.detail.values.length-1].code
    //   this.areaListStatus = false;
    //   this.init()
    // },
    // 跳转到订单详情
    gotoDetail(orderId) {
      wx.navigateTo({
        url: `/pages/master/orderDetail/main?orderId=${orderId}`
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
    // this.searchRegionCode = "";
    // this.searchRegion = "";
    this.init();
    wx.stopPullDownRefresh();
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>