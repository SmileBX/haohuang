<template>
  <div class="allPadd" style="border-top:1rpx solid #e3e3e3;">
      <div class="column  title">
          <div class="column">
              <img src="/static/images/icons/gong.png" class="cardpic">
              <div class="right">
                  <p>浦发银行</p>
                  <p class="cardnnum">尾号3852储蓄卡</p>
              </div>
          </div>
          <img src="/static/images/icons/right_arrow.png" class="right_arrow">
      </div>
      <div class="charge">
          <p class="apoint">提现金额</p>
          <p class="column">
              <span style="color:#ff6325">￥</span>
              <input>
          </p>
      </div>
      <div class="tips">可提现金额￥8652.00</div>
      <div class="botbtn addcard"></span>提现</div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
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
        title: "提现选择"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>