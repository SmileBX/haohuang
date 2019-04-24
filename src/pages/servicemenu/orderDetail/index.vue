<template>
  <div class="page">
    <div class="orderStatus">
      <span>安装中</span>
    </div>
    <div class="orderAddr bg_fff">
      <div class="newsLogistics flex flexAlignCenter">
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">安装中：张**师傅安装中</p>
          <p class="time">2018-11-15 18:02:25</p>
        </div>
        <span class="icon-arrow arrow-right" style="margin-right:-20rpx;"></span>
      </div>
      <div class="addressList">
        <div class="item flex flexAlignEnd">
          <img src="/static/images/icons/address.png" class="addrIcon" alt>
          <div class="item__bd flex1">
            <p class="remarks">
              <span class="name">张三</span>
              <span class="tel">0755-23105899</span>
            </p>
            <p class="address">广东省深圳市龙岗区坂田街道艳玲淡淡的</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品信息 -->
    <div class="goodsContent bg_fff">
      <div class="column levelPanel">
        <div class="item">
          <div class="box">
            <div class="outside" style="align-items:flex-start;">
              <div class="pictrueAll" >
                <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
              </div>
              <div class="txtBox flex flex-between" style="padding:20rpx 0">
                <p class="title text-line2">维修</p>
                <div>
                  <span class="buyNum">x1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo bg_fff mb10">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title"><span class="title">订单信息</span></div>
      <div class="orderInfo__bd">
        <div class="item">订单编号：2012554122554112 <span class="btnCopy">复制</span></div>
        <div class="item">创建时间：2018-04-20 09：30：05</div>
        <div class="item">指派师傅：2018-04-20 09：30：05</div>
        <div class="item">安装时间：2018-04-20 09：30：05</div>
        <div class="item">完成时间：2018-04-20 09：30：05</div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/service.css";
import "@/css/common.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {},
  data() {
    return {};
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>