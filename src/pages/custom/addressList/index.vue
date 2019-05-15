<template>
  <div class="page" style="min-heigth:100%">
    <p>非订饭订饭订饭订饭订饭订饭</p>
    <div class="ftBtn" style="heigth:100rpx;">
      <div class="inner fixed bm0 border-box pd0">
        <div class="btn btn-active fill radius0">
          <img src="/static/images/icons/add.png" class="addImg" alt>添加新增地址
        </div>
      </div>
    </div>
    <!-- <van-dialog id="van-dialog"/> -->
  </div>
</template>
<script>
import {
  get,
  post,
  toLogin,
  getCurrentPageUrlWithArgs,
  valPhone
} from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
  },
  data() {
    return {
    };
  },
  watch: {},
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "地址管理"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>