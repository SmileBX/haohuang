<template>
  <div class="page">
    <div class="addCardStatus center">
      <img src="/static/images/icons/addCard_success.jpg" class="icon_status" alt="">
      <p>绑定成功</p>
    </div>
    <div class="ftBtn pt20 pb20">
      <div class="inner">
        <div class="btn btn-active fill">完成</div>
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
        title: "绑定成功"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>