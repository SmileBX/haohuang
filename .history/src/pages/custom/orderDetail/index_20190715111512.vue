<template>
  <div class="page">
    <div class="orderStatus">
      <span>{{detail.OrderStatusStr }}</span>
    </div>
    <div class="orderAddr bg_fff">
      <div class="newsLogistics flex flexAlignCenter"  v-if="detail.OrderStatus==7" >
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">分配师傅：{{MasterName}}为你服务</p>
          <p class="time">{{InstallTime}}</p>
        </div>
        <span class="icon-arrow arrow-right" style="margin-right:-20rpx;"></span>
      </div>
      <div class="newsLogistics flex flexAlignCenter"  v-if="detail.OrderStatus==9" >
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt" style="color:#ff6325">安装完工确认</p>
          <p class="time">{{detail.EndTime}}</p>
        </div>
        <!-- <span class="icon-arrow arrow-right" style="margin-right:-20rpx;"></span> -->
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
                <div class="pictrue">
                  <img  style="width:100%;position:absolute;top:0;height:100%;" :src="detail.OrderImg">
                </div>
              </div>
              <div class="txtBox" >
                <p class="title text-line2">{{detail.orderName}}</p>
                <p class="type">订单类型：<span v-if="detail.orderType===0">设计</span><span v-if="detail.orderType===1">制作</span><span v-if="detail.orderType===2">安装</span><span v-if="detail.orderType===3">设计+制作</span><span v-if="detail.orderType===4">制作+安装</span><span v-if="detail.orderType===5">设计+制作+安装</span></p>
                <div class="flex" >
                  <div class="flex1">
                    <p class="price" style="font-size:26rpx">￥{{detail.ProductMoney}}</p>
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
        <div class="item" v-if="detail.OrderStatus==2 || detail.OrderStatus==3 || detail.OrderStatus==4 || detail.OrderStatus==5 || detail.OrderStatus==6 || detail.OrderStatus==7 ||detail.OrderStatus==8 || detail.OrderStatus==9">支付时间：{{detail.PayTime}}</div>
        <div class="item" v-if="detail.OrderStatus==7">分配师傅：{{detail.InstallList[0].InstallTime}}</div>
         <div class="item" v-if="detail.OrderStatus==9">完工确认：{{detail.OverTime}}</div>
        <div class="item" v-if="detail.EstimateTime">预计完成时间：{{detail.EstimateTime}}</div>
      </div>
    </div>
    <!-- 在线客服 -->
    <!-- <div class="weui-cell bg_fff mb10" style="line-height:1.8;">
      <div class="weui-cell__bd">
        <img src="/static/images/icons/kf.png" class="kfIcon" alt="">
        <span>在线客服</span>
      </div>
    </div> -->
    <!-- 操作按钮 -->
    <div class="ftBtn ftBtns">
      <div class="inner flex fixed bm0 bg_fff border-box justifyContentEnd">
        <!-- IsPay是否支付 -->
        <div class="btn" v-if="detail.OrderStatus==0||detail.OrderStatus==1" @click="showCancelOrder">取消订单</div>
            <div class="button active" @click="callService(detail.ServiceTel)">联系客服</div>
        <!-- 客服是否确认IsConfirm -->
        <div class="btn linear" v-if="detail.OrderStatus==1" @click="orderPay">付款</div>
        <!--查看进度-->
        <div class="button active" v-if="detail.OrderStatus==2 || detail.OrderStatus==3 ||detail.OrderStatus==4 || detail.OrderStatus==5 || detail.OrderStatus==6 || detail.OrderStatus==7 || detail.OrderStatus==8 || detail.OrderStatus==9" @click="seeSchdule(detail.orderId,detail.OrderStatus)">查看进度</div>
        <!-- <div class="btn btn-active" v-if="detail.OrderStatus==4">查看物流</div> -->
        <!-- DesignStatus 0--为设计1--设计待确认 -->
        <div class="btn linear" v-if="detail.DesignStatus==1" @click="confirmButtonModal('design')">设计确认</div>
        <div class="btn linear" v-if="detail.OrderStatus==4" @click="confirmButtonModal('logistics')">确认收货</div>
        <div class="btn linear" v-if="detail.OrderStatus==8" @click="gotoComment">评论</div>
        <!-- <div class="btn btn-active" v-if="detail.OrderStatus==99||detail.OrderStatus==9">删除订单</div> -->
      </div>
    </div>
    <!-- 联系客服 -->
    <serviceTypeSelect
      :selectServiceTypeStatus.sync="selectServiceTypeStatus"
      :servicePhone="servicePhone"
    ></serviceTypeSelect>
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
// 待设计=2, -----设计中   
// 待制作=3,
// 已发货=4,
// 已收货=5,
// 待执行=6,
// 已执行=7,
// 待评论=8,
// 已完成=9,  
// 交易关闭=99,  
// 待确认=0,---底部按钮---在线客服
// 待付款=1,---去掉订单   付款
//待确认=---底部按钮---在线客服
//处理中=---底部按钮---在线客服
//订单已取消--在线客服
//交易成功---去评价
import "@/css/common.css";
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
import CancelOrderWindow from '@/components/cancelOrderWindow.vue'
import serviceTypeSelect from "@/components/serviceTypeSelect.vue";
export default {
  components:{
    CancelOrderWindow,serviceTypeSelect
  },
  data() {
    return {
      UserId: "",
      Token: "",
      orderId: "",//订单id
      OrderNo:'',//订单编号
      curPage: "",
      identity:'',
      InstallTime:'',
      MasterName:'',
      detail: {
        ProductMoney:0,
        Freight:0
      },
      // 取消订单
      cancelOrderWindowStatus:false,
      refuseContent:'', //取消订单填写的原因
      // 联系客服
      selectServiceTypeStatus: false, //联系客服类型弹窗状态
      servicePhone: "" //客服的服务电话
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
    this.cancelOrderWindowStatus = false
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
        post("Order/OrderInfo", {
          UserId: this.UserId,
          Token: this.Token,
          OrderNo: this.orderId,
        },this.curPage).then(res=>{
            console.log(res.data,"res.date.InstallList[0].MasterName");
        //订单编号
            this.OrderNo = res.data.orderNo
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
                  // let date = res.data.InstallList[0].InstallTime.split("T")[0]
                  // let time = res.data.InstallList[0].InstallTime.split("T")[1].split(":").slice(0,-1).join(":")
                  // this.InstallTime =date+"  "+time
                  this.InstallTime = res.data.InstallList[0].InstallTime.split("T").join(" ").split(".")[0]
                    console.log(this.InstallTime,"this.InstallTime")
              }
            
            //console.log(Boolean(detail.InstallTime));
            });
      }
          
    },
    // 成功之后提示的状态
    useSuccess(res,content){
      if(res.code==0){
        wx.showToast({
            title:content
        })
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
            that.cancelOrderWindowStatus = !that.cancelOrderWindowStatus
          }
        }
      })
    },
    // 取消订单的内容
    closeContent(){
      console.log(this.refuseContent,'取消内容')
        if(toLogin(this.curPage)){
            post('Order/OrderCancel',{
              UserId:this.UserId,
              Token:this.Token,
              OrderNo:this.orderId,
              RefuseContent:this.refuseContent
            },this.curPage).then(res=>{
                wx.showToast({
                  title:'订单取消成功！',
                  duration:1500,
                })
                setTimeout(()=>{
                   this.cancelOrderWindowStatus = false
                    this.refuseContent=''
                    this.getData();
                    console.log(res.data,'取消成功')
                 },1500)
                
            })
        }
      
    },
    // 付款
    orderPay(){
        console.log(this.OrderNo,"this.orderNo")
        if(toLogin(this.curPage)){
          post('/Order/ConfirmWeiXinPay',{
              UserId: this.UserId,
              Token: this.Token,
              OrderNo: this.OrderNo,
          },this.curPage).then(res=>{
              console.log(res,"77777777777777777")
              let payData=JSON.parse(res.data.JsParam);
              wx.requestPayment({
                timeStamp: payData.timeStamp,
                nonceStr: payData.nonceStr,
                package: payData.package,
                signType: payData.signType,
                paySign: payData.paySign,
                success(res) {
                  this.getData();
                  // wx.navigateTo({
                  //   url:"/pages/custom/order/main"
                  // });
                },
                fail(res) {

                }
              })

          })
      }
        
    },
    // 确认收货/确认设计模态弹窗
    confirmButtonModal(types){
      const that =this;
      let title=''
      let content=''
       let cancelText=''
        let confirmText=''
        let cancelColor='#ff0000'
      if(types==='design'){ //设计确认
        title='设计确认'
       // content='设计完成图可在流程内查看，设计是否通过审核!'
        cancelText='不通过'
        confirmText='通过'
      }else if(types==='logistics'){ //物流计确认
        title='确认收货'
       // content='设计完成图可在流程内查看，设计是否通过审核!'
        let cancelText='取消'
        let confirmText='确认收货'
      }
      wx.showModal({
        title:title,
        content:content,
        confirmColor:'#33cc33',
        cancelColor:cancelColor,
        cancelText,
        confirmText,
        success(res){
          if(res.confirm){
            that.confirmButton(0)
          }else if(res.cancel){
            // 等于设计的时候才有不通过
            if(types==='design'){
              that.confirmButton(1)
            }
          }
        }
      })
    },
    // 确认设计
    confirmButton(AuditType){
      console.log(AuditType,'设计确认状态')
        if(toLogin(this.curPage)){
          post('Order/OrderCollection',{
                UserId:this.UserId,
                Token:this.Token,
                OrderNo:this.orderId,
                AuditType:AuditType
                },this.curPage).then(res=>{
                  console.log(res)
                  wx.showToast({
                    title:'操作成功！',
                    duration:2000
                  })
                  setTimeout(()=>{
                    wx.redirectTo({url: '/pages/custom/order/main'});
                  },1000)
          })
        }
    },
    // 评论
    gotoComment(){
      wx.navigateTo({
        url: '/pages/appraise/main?orderId='+this.orderId
      })
    },
    // 联系客服
    callService(phone) {
      console.log(phone);
      this.servicePhone = phone;
      this.selectServiceTypeStatus = true;
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
        wx.navigateTo({url:"/pages/custom/schedule/main?OrderNoId="+orderId+"&OrderStatus="+OrderStatus})
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>