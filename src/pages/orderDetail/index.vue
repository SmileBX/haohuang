<template>
  <div class="page">
    <div class="orderStatus">
      <span>{{detail.OrderStatusStr }}</span>
    </div>
    <div class="orderAddr bg_fff">
      <div class="newsLogistics flex flexAlignCenter">
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">分配师傅：张**师傅为你服务</p>
          <p class="time">2018-11-15 18:02:25</p>
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
                <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">{{detail.orderType}}</p>
                <div class="flex">
                  <div class="flex1">
                    <p class="price">￥{{detail.ProductMoney}}</p>
                  </div>
                  <span class="buyNum">x1</span>
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
           <div class="flexItem">订单总价</div>
           <div class="flex1 text_r">￥{{detail.OfferTotal}}</div>
        </div>
        <div class="flex">
           <div class="flexItem">需付款</div>
           <div class="flex1 text_r"><span class="allPrice">￥1288.00</span></div>
        </div>
        <div class="flex">
           <div class="flexItem">付款金额</div>
           <div class="flex1 text_r"><span class="allPrice">￥{{detail.PayMoney}}</span></div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo bg_fff mb10">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title"><span class="title">订单信息</span></div>
      <div class="orderInfo__bd">
        <div class="item">订单编号：{{detail.orderNo }}<span class="btnCopy" @click="copy">复制</span></div>
        <div class="item">创建时间：{{detail.CreateTime}}</div>
        <div class="item">支付时间：{{detail.PayTime}}</div>
        <div class="item">发货时间：{{detail.Fahuodate}}</div>
        <div class="item">分配师傅{{detail.InstallTime}}</div>
        <div class="item">完成时间：{{detail.EndTime}}</div>
      </div>
    </div>
    <!-- 订单已取消的时候 -->
    <div class="weui-cell bg_fff mb10" style="line-height:1.8;">
      <div class="weui-cell__bd">
        <span>同意退款</span>
      </div>
      <div class="weui-cell__ft">
        <span class="msg" style="color:#999;">待财务退款</span>
      </div>
    </div>
    <!-- 不同意取消的时候 -->
    <div class="disagree bg_fff">
      <h2 class="title">不同意取消</h2>
      <div class="area">已生成制作完成，不可取消</div>
      <h2 class="title">图片上传</h2>
      <div class="uploadImage clear">
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
      </div>
    </div>
    <!-- 在线客服 -->
    <div class="weui-cell bg_fff mb10" style="line-height:1.8;">
      <div class="weui-cell__bd">
        <img src="/static/images/icons/kf.png" class="kfIcon" alt="">
        <span>在线客服</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="ftBtn ftBtns">
      <div class="inner flex fixed bm0 bg_fff border-box justifyContentEnd">
        <div class="btn btn-active">取消订单</div>
        <div class="btn linear">付款</div>
      </div>
    </div>
  </div>
</template>
<script>
import {post} from '@/utils/index'
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.UserId = wx.getStorageSync('userId')
    this.Token = wx.getStorageSync('token')
    console.log(this.$root.$mp.query.orderId)
    if(this.$root.$mp.query.orderId){
    this.orderId = this.$root.$mp.query.orderId
    }
    this.getData()
  },
  data() {
    return {
      UserId:'',
      Token:'',
      orderId:'',
      detail:'',

    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
    },
    async getData(){
      const res = await post('CustomerService/OrderInfo',{
        CsdId:this.UserId,
        Token:this.Token,
        // OrderNo:this.orderId
        OrderNo:1025
      })
      console.log(res)
      this.detail = res.data
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>