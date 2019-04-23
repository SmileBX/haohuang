<template>
  <div class="page">
    <div class="addAddress__weui-cells weui-cells mt0">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">收获人</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请输入收货人姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号码</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请输入收货人手机号">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">所在地区</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择所在地区" disabled>
        </div>
        <div class="weui-cell__ft">
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="weui-cell flexAlignStart">
        <div class="weui-cell__hd">
          <label class="weui-label">详细地址</label>
        </div>
        <div class="weui-cell__bd">
          <textarea name="" id="" class="weui-area" placeholder="道路、门牌号、小区、楼栋号、单元、室等"></textarea>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          设为默认地址
        </div>
        <div class="weui-cell__ft">
          <switch checked />
        </div>
      </div>
    </div>
    <div class="ftBtn mt30">
      <div class="inner">
        <div class="btn btn-active fill">保存</div>
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
        title: "添加新地址"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>