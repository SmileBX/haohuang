<template>
  <div>
      <radio-group @change="changes">
          <label class="column payitem">
            <div class="column">
              <img src="/static/images/icons/wx.png" class="payimg">
              <div class="column">
                  微信
              </div>
            </div>
            <input type="radio" name="payType" :checked="payType==0" value="0">
          </label>
          <label class="column payitem">
            <div class="column">
              <img src="/static/images/icons/gong.png" class="cardpic">
              <div class="column">
                  <p>中国工商银行</p>
                  <p>尾号3972 储蓄卡</p>
              </div>
            </div>
            <input type="radio" name="payType" :checked="payType==1" value="1">
          </label>
          
        </radio-group>
      <!--微信-->
      <div></div>
      <!--银行卡-->
      <div></div>
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