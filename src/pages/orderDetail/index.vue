<template>
  <div class="page">
    <div class="orderStatus">
      <span>等待买家付款</span>
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
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">龙华展涛科技大厦灯箱安装</p>
                <div class="flex">
                  <div class="flex1">
                    <p class="price">￥1888.00</p>
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
           <div class="flex1 text_r">￥0.00</div>
        </div>
        <div class="flex">
           <div class="flexItem">订单总价</div>
           <div class="flex1 text_r">￥1288.00</div>
        </div>
        <div class="flex">
           <div class="flexItem">需付款</div>
           <div class="flex1 text_r"><span class="allPrice">￥1288.00</span></div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo bg_fff mb10">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title"><span class="title">订单信息</span></div>
      <div class="orderInfo__bd">
        <div class="item">订单编号：2012554122554112 <span class="btnCopy">复制</span></div>
        <div class="item">创建时间：2018-04-20 09：30：05</div>
        <div class="item">支付时间：2018-04-20 09：30：05</div>
        <div class="item">分配师傅：2018-04-20 09：30：05</div>
        <div class="item">完成时间：2018-04-20 09：30：05</div>
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