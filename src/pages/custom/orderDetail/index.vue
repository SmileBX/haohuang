<template>
  <div class="page">
    <div class="orderStatus">
      <span>等待买家付款</span>
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
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>