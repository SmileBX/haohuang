<template>
  <div class="page">
    <div class="sum border-box column">
      <div class="priceBox">
        <p>
          ￥
          <span class="money">3880.00</span>
        </p>
        <p>当前余额（元）</p>
      </div>
      <div class="tabBox">
        <ul class="numberList flex li_33 center">
          <li class="active">
            <p class="title">总安装金额</p>
          </li>
          <li>
            <p class="title">待收款金额</p>
          </li>
          <li>
            <p class="title">已收款金额</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="census__section bg_fff">
      <div class="section__hd">
        <p class="title">本月</p>
      </div>
      <div class="section__bd">
        <ul class="numberList flex li_50 center numberList2">
          <li class="active">
            <p class="title">金额笔数</p>
            <p class="num color_fd5412">5</p>
          </li>
          <li>
            <p class="title">本月金额</p>
            <p class="num color_fd5412">￥5899.00</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="census__section bg_fff">
      <div class="section__hd">
        <p class="title">上月</p>
      </div>
      <div class="section__bd">
        <ul class="numberList flex li_50 center numberList2">
          <li class="active">
            <p class="title">金额笔数</p>
            <p class="num color_fd5412">8</p>
          </li>
          <li>
            <p class="title">本月金额</p>
            <p class="num color_fd5412">￥5899.00</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="weui-cells">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p class="txt">结算明细</p>
            </div>
            <div class="weui-cell__ft">
                <span class="icon-arrow arrow-right"></span>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p class="txt">提现记录</p>
            </div>
            <div class="weui-cell__ft">
                <span class="icon-arrow arrow-right"></span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  data() {
    return {};
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "安装统计"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>