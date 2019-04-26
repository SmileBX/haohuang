<template>
  <div class="allPadd">
      <radio-group @change="changes">
        <!-- 微信 -->
          <!-- <label class="column payitem">
            <div class="column">
              <img src="/static/images/icons/wx.png" class="payimg">
              <div class="column just">
                  微信
              </div>
            </div>
            <input type="radio" name="payType" :checked="payType==0" value="0">
          </label> -->
          <!--银行卡-->
          <div class="bank">
              <label class="column payitem">
                <div class="column card">
                  <img src="/static/images/icons/gong.png" class="cardpic">
                  <div class="column just">
                      <p>中国工商银行</p>
                      <p  class="cardnum">尾号3972 储蓄卡</p>
                  </div>
                </div>
                <input type="radio" name="payType" :checked="payType==1" value="1">
              </label>
          </div>
        </radio-group>
      
      <div class="botbtn addcard"><span style="font-size:35rpx;">+</span>添加银行卡</div>
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