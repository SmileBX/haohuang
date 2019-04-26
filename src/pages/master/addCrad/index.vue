<template>
  <div class="page">
    <div class="tips__txt flex">
      <img src="/static/images/icons/tips.png" alt class="icon_tips">
      <div class="txtBox flex1">
           姓名必须和身份证中的一样，务必保证银行卡信息正确，否则无法退款
      </div>
    </div>
    <div class="addCard__form bg_fff">
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="请输入持卡人姓名" class="weui-input">
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="请输入卡号" class="weui-input">
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="选择银行" disabled="true" class="weui-input">
          </div>
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="预留银行手机号" class="weui-input">
          </div>
        </div>
      </div>
    </div>
    <div class="ftBtn pt20 pb20">
      <div class="inner">
        <div class="btn btn-active fill">下一步</div>
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
        title: "添加银行卡"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>