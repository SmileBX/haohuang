<template>
  <div class="page">
    
    <div class="addCard__form2 weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">卡类型</label>
        </div>
        <div class="weui-cell__bd">
          <p class="txt">中国建设银行卡<span class="type">储蓄卡</span></p>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <p class="txt">151******65</p>
        </div>
      </div>
    </div>
    <div class="ftBtn pt20 pb20">
      <div class="inner">
        <div class="btn btn-active fill">同意协议并绑定</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  onLoad() {
    this.setBarTitle();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "添加银行卡信息"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>