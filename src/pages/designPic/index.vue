<template>
  <div class="page" style="background:#fff!important;height:100vh">
    <!-- 订单的 -->
      <div class="column levelPanel" >
        <div class="item">
          <div class="item__bd">
            <div class="box">
              <div class="outside">
                <div class="pictrueAll">
                   <img class="pictrue img"  style="width:160rpx;height:160rpx;" :src="schduleInfo.OrderImg"/>
                </div>
                <div class="txtBox">
                  <p class="title" style="margin-bottom:0;">
                    订单状态：
                    <span class="status">{{schduleInfo.OrderStatusStr}}</span>
                  </p>
                  <p class="type">订单类型：{{schduleInfo.orderTypeStr}}</p>
                  <p style="font-size:26rpx;">
                    <span class="orderNo">订单编号：{{schduleInfo.orderNo}}</span>
                    <span class="btnCopy2"  @click="copy(schduleInfo.orderNo)">复制</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--展示图片-->
      <div class="pic flex" v-for="(img,index) in piclist" :key="index" style="margin-top:20rpx;">
          <div style="width:32%;">
              <img :src="img" alt @click="lookPic(index,piclist)" mode="widthFix">
          </div>
      </div>
  </div>
</template>
<script>
//orderType 0-设计 1-制作" 2-安装 3-设计_制作 4-制作_安装 5-设计_制作_安装
import "@/css/dd_style.css";
import {post,toLogin, getCurrentPageUrlWithArgs,formatTime,previewImage} from "@/utils/index";
export default {
  onLoad() {
      this.setBarTitle();
  },
  onShow() {
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    this.orderId = this.$root.$mp.query.orderId;
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.piclist=[]
    //console.log(this.OrderNoId,this.orderStatus,"this.orderStatus")
    if(this.identity == 1){
      //客服
        this.getkfDate()
    }
    if(this.identity == 2){
      //客户
        this.getusDate()
    }
  },
  data() {
    return {
      UserId: "",
      Token: "",
      OrderNoId:'',
      orderStatus:'',
      curPage: "",
      identity:'',
      piclist:[],
      schduleInfo:""


    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "查看设计"
      });
    },
   
    getkfDate(){
      //kefu
        if(toLogin(this.curPage)){
          post('CustomerService/OrderInfo',{
              CsdId:this.UserId,
              Token:this.Token,
              OrderNo:this.orderId
          },this.curPage).then(res=>{
            console.log(res,"res")
          this.schduleInfo={
              OrderStatusStr:res.data.OrderStatusStr,
              orderTypeStr:res.data.orderTypeStr,
              orderNo:res.data.orderNo,
              OrderStatus:res.data.OrderStatus,
              orderType:res.data.orderType,
              orderId:res.data.orderId,
              OrderImg:res.data.OrderImg
            }
            console.log(res.data.DesignFrontPicList,"data.DesignAfterPicList------")
              this.piclist=res.data.DesignFrontPicList.split(",")
              console.log(this.piclist,"piclist+++++++")
          })
        }
    },
    getusDate(){
      //客户
      if(toLogin(this.curPage)){
          post('Order/OrderInfo',{
              UserId:this.UserId,
              Token:this.Token,
              OrderNo:this.orderId
          },this.curPage).then(res=>{
            console.log(res,"res")
          this.schduleInfo={
              OrderStatusStr:res.data.OrderStatusStr,
              orderTypeStr:res.data.orderTypeStr,
              orderNo:res.data.orderNo,
              OrderStatus:res.data.OrderStatus,
              orderType:res.data.orderType,
              orderId:res.data.orderId,
              OrderImg:res.data.OrderImg
            }
            console.log(res.data.DesignFrontPicList,"data.DesignAfterPicList------")
              this.piclist=res.data.DesignFrontPicList.split(",")
              console.log(this.piclist,"piclist+++++++")
          })
        }
    },
    lookPic(index, picArr) {
      //预览图片
      previewImage(index, picArr);
    },
    
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
