<template>
  <div>
      <div class="sum border-box column">
          <p>￥<span class="money">6523.00</span></p>
          <p>当前余额（元）</p>
      </div>
      <div class="allPadd">
          <div class="tips">最低提现金额为1元</div>
          <div class="botbtn deposit">提现</div>
          <div class="tips watch">查看资金明细></div>
      </div>
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
        title: "余额"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>