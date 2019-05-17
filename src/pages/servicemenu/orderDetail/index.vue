<template>
  <div class="page">
    <div class="orderStatus">
      <span>{{detail.OrderStatusStr }}</span>
    </div>
    <div class="orderAddr bg_fff">
      <div class="newsLogistics flex flexAlignCenter" v-if="detail.OrderStatus==7" >
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">分配师傅：{{MasterName}}师傅为你服务</p>
          <p class="time">{{InstallTime}}</p>
        </div>
        <span class="icon-arrow arrow-right" style="margin-right:-20rpx;"></span>
      </div>
      <div class="addressList">
        <div class="item flex flexAlignEnd">
          <img src="/static/images/icons/address.png" class="addrIcon" alt>
          <div class="item__bd flex1">
            <p class="remarks">
              <span class="name">{{detail.ContactName }}</span>
              <span class="tel">{{detail.Tel}}</span>
            </p>
            <p class="address">{{detail.AddressInfo }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品信息 -->
    <div class="goodsContent bg_fff">
      <div class="column levelPanel">
        <div class="item">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img">
                  <img :src="detail.OrderImg" class="pictrue img">
                </div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">{{detail.orderName}}</p>
                <p class="type">订单类型：<span v-if="detail.orderType===0">设计</span><span v-if="detail.orderType===1">制作</span><span v-if="detail.orderType===2">安装</span><span v-if="detail.orderType===3">设计+制作</span><span v-if="detail.orderType===4">制作+安装</span><span v-if="detail.orderType===5">设计+制作+安装</span></p>
                <div class="flex">
                  <div class="flex1">
                    <p class="price">￥{{detail.ProductMoney}}</p>
                  </div>
                  <span class="buyNum">x{{detail.SpecNum}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="priceDetail">
        <div class="flex">
          <div class="flexItem">运费(快递)</div>
          <div class="flex1 text_r">￥{{detail.Freight}}</div>
        </div>
        <div class="flex">
          <div class="flexItem">其它预计金额</div>
          <div class="flex1 text_r">￥{{detail.OfferTotal}}</div>
        </div>
        <div class="flex">
          <div class="flexItem">订单总价</div>
          <div class="flex1 text_r">￥{{totalPrice}}</div>
        </div>
        <!-- IsPay是否已付款，IsConfirm客服是否确认 -->
        <div class="flex last-child" v-if="!detail.IsPay">
          <div class="flexItem">需付款</div>
          <!-- OfferTotal为预计金额，客服确认后填写 -->
          <div class="flex1 text_r">
            <span class="allPrice">￥{{totalPrice}}</span>
          </div>
        </div>
        <div class="flex last-child" v-if="detail.IsPay">
          <div class="flexItem">付款金额</div>
          <div class="flex1 text_r">
            <span class="allPrice">￥{{detail.PayMoney}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo bg_fff mb10">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title">
        <span class="title">订单信息</span>
      </div>
      <div class="orderInfo__bd">
        <div class="item">
          订单编号：{{detail.orderNo }}
          <span class="btnCopy" @click="copy(detail.orderNo)">复制</span>
        </div>
        <div class="item">创建时间：{{detail.CreateTime}}</div>
        <div class="item" v-if="detail.OrderStatus==0 || detail.OrderStatus==2 || detail.OrderStatus==3 || detail.OrderStatus==4 || detail.OrderStatus==5 || detail.OrderStatus==6 || detail.OrderStatus==7 ||detail.OrderStatus==8 || detail.OrderStatus==9">支付时间：{{detail.PayTime}}</div>
        <div class="item" v-if="detail.OrderStatus==4">发货时间：{{detail.Fahuodate}}</div>
        <div class="item" v-if="detail.OrderStatus==7">分配师傅：{{detail.InstallTime}}</div>
        <div class="item" v-if="detail.EndTime">完成时间：{{detail.EndTime}}</div>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="ftBtn ftBtns">
      <div class="inner flex fixed bm0 bg_fff border-box justifyContentEnd">
        <!-- IsPay是否支付 -->
        <div class="btn btn-active" v-if="(detail.OrderStatus==0||detail.OrderStatus==1) && detail.MemberId==0" @click="showCancelOrder">取消订单</div>
        <!-- 客服是否确认IsConfirm -->
        <!-- <div class="btn btn-active"  v-if="detail.IsConfirm==0">修改价格</div> -->
        <div class="btn linear" v-if="detail.IsConfirm==0" @click="showConfirmOrderWindow">确认订单</div>
        <!-- <div class="btn linear" v-if="detail.IsConfirm==1&&detail.IsPay==0" @click="confirmPay">线下付款</div> -->
        <div class="btn linear" v-if="detail.OrderStatus==1" @click="confirmPay">线下付款</div>
        <!--查看进度-->
        <div class="button active" v-if="detail.OrderStatus==2 || detail.OrderStatus==3 ||detail.OrderStatus==4 || detail.OrderStatus==5 || detail.OrderStatus==6 || detail.OrderStatus==7 || detail.OrderStatus==8" @click="seeSchdule(detail.orderId,detail.OrderStatus)">查看进度</div>
        <div class="btn linear" v-if="detail.DesignStatus==1 && detail.MemberId==0" @click="confirmButtonModal('design')">设计确认</div>
        <div class="btn linear" v-if="detail.OrderStatus==4 && detail.MemberId==0" @click="confirmButtonModal('logistics')">确认收货</div>
        <div class="btn linear" v-if="detail.OrderStatus==8" @click="gotoComment">评论</div>
        <!-- <div class="btn btn-active" v-if="detail.OrderStatus==9">删除订单</div> -->
      </div>
    </div>
    <!-- 确认订单 -->
      <confirmOrder :confirmOrderStatus.sync="confirmOrderStatus" 
      :payPrice="detail.OfferTotal" :payFreight='detail.Freight' @confirm="onConfirmOrder">
      </confirmOrder>
      <!-- 取消订单 -->
       <!-- refuseContent:'', //取消订单填写的原因 -->
      <CancelOrderWindow :cancelOrderWindowStatus.sync="cancelOrderWindowStatus"
       :refuseContent.sync="refuseContent" @success="closeContent" 
       ></CancelOrderWindow>
  </div>
</template>
<script>
// 待确认=0,
// 待付款=1,
// 待设计=2,
// 待制作=3,
// 已发货=4,
// 已收货=5,
// 待执行=6,
// 已执行=7,
// 待评论=8,
// 已完成=9,
// 交易关闭=99,
import "@/css/common.css";
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
import confirmOrder from '@/components/confirmOrder.vue'
import CancelOrderWindow from '@/components/cancelOrderWindow.vue'
export default {
  components:{
    confirmOrder,CancelOrderWindow
  },
  data() {
    return {
      UserId: "",
      Token: "",
      orderId: "",
      OrderNo:'',//订单编号
      curPage: "",
      identity:'',
      InstallTime:'',
      MasterName:'',
      detail: {
        ProductMoney:0,
        Freight:0
      },
      // 确认订单
      confirmOrderStatus: false,
      // 取消订单
      cancelOrderWindowStatus:false,
      refuseContent:'', //取消订单填写的原因

    };
  },
  computed:{
    // 订单总价totalPrice
    totalPrice(){
      return (this.detail.OfferTotal * 1 +this.detail.ProductMoney * 1 + this.detail.Freight * 1).toFixed(2)
    }
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.UserId = wx.getStorageSync("userId");
    this.Token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    console.log(this.$root.$mp.query.orderId);
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId;
    }
    this.getData();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
    },
    getData() {
      if(toLogin(this.curPage)){
          post("CustomerService/OrderInfo", {
            CsdId: this.UserId,
            Token: this.Token,
            OrderNo: this.orderId,
            IsService: 1
          },this.curPage).then(res=>{
              console.log(res);
              this.detail = res.data;
              // 邮费
              this.detail.Freight = res.data.Freight.toFixed(2);
              // 预计价格
              this.detail.OfferTotal = res.data.OfferTotal.toFixed(2);
              // 支付金额
              this.detail.PayMoney = res.data.PayMoney.toFixed(2);
              // 材料金额
              this.detail.ProductMoney = res.data.ProductMoney.toFixed(2);
              if(res.data.InstallList.length>0){
                  this.MasterName = res.data.InstallList[0].MasterName
                  this.InstallTime = res.data.InstallList[0].InstallTime.split("T").join(" ").split(".")[0]
                    console.log(this.InstallTime,"this.InstallTime")
                }
              
              console.log(Boolean(detail.InstallTime));
          })
      }
     
    },
    // 展示确认订单窗口
    showConfirmOrderWindow(){
      console.log(this.confirmOrderStatus)
      this.confirmOrderStatus=!this.confirmOrderStatus
    },
    // 点击完成确认订单，修改金额
    onConfirmOrder(params){
      if(toLogin(this.curPage)){
        post('CustomerService/ConfirmOrder',{
          CsdId: wx.getStorageSync("userId"),
          Token: wx.getStorageSync("token"),
          OrderNo: this.orderId,
          offerMoney:params.offerMoney*1,
          freight: params.freight*1
        },this.curPage).then(res=>{
            this.useSuccess(res,'确认订单成功!');
        })
      }
      
    },
    // 成功之后提示的状态
    useSuccess(res,content){
      if(res.code==0){
        wx.showToast({
            title:content
        })
        this.confirmOrderStatus=false
        setTimeout(()=>{
        this.getData();
        },1000)
      }
    },
    // 展示取消订单窗口
    showCancelOrder(){
      const that =this;
      wx.showModal({
        content:'您的订单尚未付款成功，确认要取消本订单吗？',
        confirmColor:'#ff662a',
        success(res){
          if(res.confirm){
             wx.showToast({
              title:'订单取消成功！',
              duration:1500
            })
            that.cancelOrderWindowStatus = !that.cancelOrderWindowStatus
          }
        }
      })
    },
    // 取消订单的内容
    closeContent(){
      console.log(this.refuseContent,'取消内容')
        if(toLogin(this.curPage)){
          post('CustomerService/KfOrderCancel',{
            CsdId:this.UserId,
            Token:this.Token,
            OrderNo:this.orderId,
            RefuseContent:this.refuseContent
          },this.curPage).then(res=>{
              this.cancelOrderWindowStatus = false;
              this.refuseContent=''
              this.getData();
              console.log(res.data,'取消成功')
           })
        }
    },
    // 线下付款
    confirmPay(){
      console.log('123')
      const that = this;
      wx.showModal({
        title:'支付确认',
        content:'此操作将完成订单付款！',
        confirmColor:'#ff662a',
        success:(res)=>{
            console.log(res,'用户点击')
          if(res.confirm){
            if(toLogin(this.curPage)){
              post('CustomerService/ConfirmPayOrder',{
                CsdId:that.UserId,
                Token:that.Token,
                OrderNo:that.orderId,
                IsChange:0  //是否修改预计金额和运费0-否 1-是
                },this.curPage).then(res=>{
                  that.useSuccess(res,'线下付款成功!');
                })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 确认收货/确认设计模态弹窗
    confirmButtonModal(types){
      const that =this;
      let title=''
      let content=''
        let cancelText='取消'
        let confirmText='确认'
        let cancelColor=''
      if(types==='design'){ //设计确认
        title='设计确认'
        content='设计完成图可在流程内查看，设计是否通过审核!'
        cancelColor='red'
      }else if(types==='logistics'){ //物流计确认
        title='确认收货'
        content='设计完成图可在流程内查看，设计是否通过审核!'
        let cancelText='取消'
        let confirmText='确认收货'
      }
      wx.showModal({
        title:'',
        content:'',
        confirmColor:'#33cc33',
        cancelColor,
        cancelText,
        confirmText,
        success(res){
          if(res.confirm){
            that.confirmButton(1)
          }else if(res.cancel){
            // 等于设计的时候才有不通过
            if(types==='design'){
              that.confirmButton(0)
            }
          }
        }
      })
    },
    // 确认设计
    confirmButton(AuditType){
      console.log(AuditType,'设计确认状态')
      if(toLogin(this.curPage)){
          post('CustomerService/KfOrderCollection',{
                CsdId:this.UserId,
                Token:this.Token,
                OrderNo:this.orderId,
                AuditType:AuditType
          },this.curPage)
      }

    },
    // 评论
    gotoComment(){
      wx.navigateTo({
        url: '/pages/appraise/main?orderId='+this.orderId
      })
    },
    // 复制
    copy(orderNo) {
      wx.setClipboardData({
        data: orderNo,
        success() {
          wx.showToast({
            title: "复制成功！"
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    },
     //查看订单进度
    seeSchdule(orderId,OrderStatus){
       wx.setStorageSync('address',this.detail.AddressInfo)
      //console.log(orderNo,OrderStatus)
        wx.navigateTo({url:"/pages/servicemenu/schedule/main?OrderNoId="+orderId+"&OrderStatus="+OrderStatus})
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>