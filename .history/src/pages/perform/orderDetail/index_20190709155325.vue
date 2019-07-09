<template>
  <div class="page">
    <div class="orderStatus">
      <span v-if="detail.OrderStatus == 6">待处理</span>
       <span v-else>已处理</span>
    </div>
    <div class="orderAddr bg_fff">
      <!-- <div class="newsLogistics flex flexAlignCenter" v-if="detail.OrderStatus==7" >
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">分配师傅：{{MasterName}}为你服务</p>
          <p class="time">{{InstallTime}}</p>
        </div>
      </div> -->
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
        <div class="item" v-if="detail.OrderStatus==7">分配师傅：{{detail.InstallList[0].InstallTime}}</div>
        <div class="item" v-if="detail.EstimateTime">预计完成时间：{{detail.EstimateTime}}</div>
      </div>
    </div>
    <!-- 指派师傅的列表 -->
    <div class="orderInfo bg_fff mb10" v-if="InstallList.length>0">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title">
        <span class="title">师傅信息</span>
      </div>
      <div class="orderInfo__bd" v-for="(item,sindex) in InstallList" :key="sindex">
        <div class="flexItem flex"v-if="item.IsMain==1">
          <p class="txt" >主负责师傅：{{item.MasterName}}</p>
          <p>重新指派</p>
        </div>
        <div class="flexItem flex" v-if="item.IsMain==0">
          <p class="txt">其他师傅：{{item.MasterName}}</p>
          <p>重新指派</p>
        </div>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="ftBtn ftBtns">
      <div class="inner flex fixed bm0 bg_fff border-box justifyContentEnd">
       <!--指派-->
        <div class="btn linear" v-if="detail.OrderStatus==6" @click="gotoPoint(0)">指派</div>
        <!--重新指派-->
        <div class="btn linear" v-if="isAgain" @click="gotoPoint(1)">重新指派</div>
        <!-- <div class="btn btn-active" v-if="detail.OrderStatus==9">删除订单</div> -->
      </div>
    </div>
    
     
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
export default {
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
      isAgain:false,//是否显示重新指派 安装师傅的状态都为0的时候显示
      InstallList:[],//安装师傅列表
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
          post("ExecuteOrder/OrderInfo", {
            ExecuteId: this.UserId,
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
                  this.InstallList = res.data.InstallList
                  let num=0
                  res.data.InstallList.map(item=>{
                    if(item.AuditStatus==0){
                      num++
                    }
                  })
                  if(num == res.data.InstallList.length&&num!=0){
                    this.isAgain = true
                  }else{
                    this.isAgain = false
                  }
                    
                }
              
              console.log(Boolean(detail.InstallTime));
          })
      }
     
    },
    
    //指派师傅
    gotoPoint(ExecuteType){
      wx.navigateTo({
        url: '/pages/perform/makePerform/main?orderId='+this.orderId+"&ExecuteType="+ExecuteType
      })
    },
    //编辑师傅
    editMasterPoint(ExecuteType,MsId){
      wx.navigateTo({
        url: '/pages/perform/makePerform/main?orderId='+this.orderId+"&ExecuteType="+ExecuteType+"&MsId="+MsId
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
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>