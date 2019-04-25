<template>
  <div class="allPadd installbox">
      <div class="flex flex-around" style="padding:20rpx 0;border:1px solid red">
          <p class="flex flexAlignCenter">
                <span class="titleActive">选择区域</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
          <p class="flex flexAlignCenter">
                <span>订单状态</span>
                <img src="/static/images/down.png" alt="" class="down">
          </p>
      </div>
      <!--订单列表-->
      <div class="orderlist">
          <div class="item">
              <div class="flex ordertitle">
                  <p class="itemname flex1">设计+制作+安装</p>
                  <p class="active">已指派</p>
              </div>
              <p>订单编号：TH236544</p>
              <p>下单时间：03/25-10:23</p>
              <p>完成时间：03/25-10:23</p>
          </div>
          <div class="item">
              <div class="flex ordertitle">
                  <p class="itemname flex1">设计+制作+安装</p>
                  <p class="blue">已完成</p>
              </div>
              <p>订单编号：TH236544</p>
              <p>下单时间：03/25-10:23</p>
              <p>完成时间：03/25-10:23</p>
          </div>
      </div>
      <!--弹框-->
      <div class="mask" style="top:100rpx;" v-if="isShow"></div>
      <!--弹框订单状态-->
      <div class="modal orderStatu" v-if="showStatu">
          <p>全部状态</p>
          <p>已指派</p>
          <p>未指派</p>
          <p>已完成</p>
      </div>
      <!--选择城市区域-->
      <div class="modal orderCity allPadd" v-if="showCity">
          <div class="flex flexAlignCenter menu">
              <p>河北省</p>
              <p>唐山市</p>
              <p class="menuActive">请选择</p>
          </div>
          <!--城市列表-->
          <div class="city">
              <p>北京市</p>
              <p>天津市</p>
              <p>河北市</p>
              <p>陕西省</p>
              <p>内蒙古</p>
              <p>呼和浩特市</p>
          </div>
      </div>
  </div>
</template>
<script>
import "@/css/common.css";
export default {
    onLoad() {
      this.setBarTitle();
  },
  onShow() {},
  data() {
    return {
      showStatu:false,
      isShow:true,
      showCity:true
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "客户订单"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>