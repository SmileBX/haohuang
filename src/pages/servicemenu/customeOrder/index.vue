<template>
  <div class="installbox">
      <div class="flex flex-around " style="line-height:80rpx;height:80rpx;background:#fff;">
          <p class="flex flexAlignCenter" @click="ChoseArea">
                <span :class="{titleActive:a==1}">{{text1}}</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
          <p class="flex flexAlignCenter">
                <span :class="{titleActive:a==2}"  @click="showOrderStatu">{{text2}}</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
      </div>
      <!--订单列表-->
      <scroll-view scroll-y  class="orderlist">
          <div class="item p30" v-for="(item,index) in orderList" :key="index" @click="gotoDetail(item.Id)">
              <div class="flex ordertitle">
                  <p class="itemname flex1">{{item.TypeName}}</p>
                  <p class="blue" v-if="item.StatuName=='已完成'">{{item.StatuName}}</p>
                  <p class="active" v-else>{{item.StatuName}}</p>
              </div>
              <p>订单编号：{{item.OrderNo}}</p>
              <p>下单时间：{{item.CreateTime}}</p>
              <p>完成时间：03/25-10:23</p>
          </div>
      </scroll-view>
      <!--弹框-->
      <div class="mask" v-if="isShow" catchtouchmove='true'></div>
      <!--弹框订单状态-->
      <div  class="modalmask orderStatu"  v-if="showStatu">
        <div class="flex masktip">
            <span @click="closeMask">取消</span>
            <span  style="color:#1a1a1a;font-size:30rpx;font-weight:bold">请选择订单状态</span>
            <span @click="Confirm">确定</span>
        </div>
        <scroll-view scroll-y>
          <p v-for="(menus,mindex) in menu"
            :key="mindex"
            @click="tabMenu(mindex)">
              <span>{{menus.name}}</span>
              <span :class="{'arrow_check':typeNo===menus.typeNo}" style="display: inline-block;"></span>
            </p>
        </scroll-view>

      </div>
      <!-- 数据状态提示节点 -->
        <div v-if="orderList.length<1" style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;">暂时没有数据哦!</div>
        <div v-if="orderListEnd&&page!==1" style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;">已经到底了哦!</div>

      <!--选择地址省市遮罩层-->
    <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
      <van-area :area-list="areaList" :columns-num="2" @cancel="showArea = false" @confirm="confirmArea"/>
    </van-popup>
      
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
      a:1,
      text1:'选择区域',
      text2:'订单状态',
      areaList,
      showArea: false,//显示选择城市
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
          name: "处理中",
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
      this.text1 = '选择区域'
      this.text2 = '订单状态'
      this.typeNo = -1
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
        this.showStatu = false;
        this.showArea = false;
        this.isShow = false;
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
    confirmArea(e){
      console.log(e,"confirmArea")
      this.text1=e.mp.detail.values[1].name
      // e.mp.detail.values.map(item=>{
      //   val+=item.name+' '
      // })
      this.searchRegionCode = e.mp.detail.values[1].code
      this.showArea = false
      this.init()
      // let text = ''
      // const areas = area.mp.detail.values
      // for(let i=0;i<areas.length;i++){
      //   text+=areas[i].name
      // }
      // this.provinceCode=areas[0].code||'',
      // this.cityCode=areas[1].code||'',
      // this.districtCode=areas[2].code||'',
      // this.area = text;

    },
    ChoseArea(){
      console.log(1111)
      this.showArea = true
      this.isShow=false
      this.showStatu=false
      this.a=1
    },
    showOrderStatu(){
      this.a=2
      this.showStatu=true
      this.isShow=true
      this.showArea=false
    },
    // 切换订单状态
    tabMenu(e) {
      this.typeNo = this.menu[e].typeNo;
      this.curPage = getCurrentPageUrlWithArgs({typeNo:this.typeNo})
      //this.text2 = this.menu[e].name
      
    },
    closeMask(){
      this.isShow = false
      this.showStatu = false
      this.typeNo = -1
    },
    Confirm(){
      for(let i=0;i<this.menu.length;i++){
          if(this.typeNo==this.menu[i].typeNo){
              //console.log(i)
              this.text2 = this.menu[i].name
          }
      }
      this.init()
     
    },
    // 跳转到订单详情
    gotoDetail(orderId){
      wx.navigateTo({
        url:`/pages/servicemenu/orderDetail/main?orderId=${orderId}`
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
      this.searchRegionCode = ''
      this.searchRegion = ''
      this.text1 = '选择区域'
      this.text2 = '订单状态'
      this.typeNo = -1
      this.init()
    wx.stopPullDownRefresh();
    }
}
</script>
<style lang='scss' scoped>
@import "./style";
.modalmask{
    position: fixed;
    height:528rpx;
    z-index: 900;
    width: 100%;
    bottom: 0;
    left: 0;
    background:#fff;
}
</style>