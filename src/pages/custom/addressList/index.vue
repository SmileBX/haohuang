<template>
  <div class="page">
    <div class="addressList">
      <div class="item">
        <div class="item__bd">
          <div class="remarks">
            <span class="name">张三</span>
            <span class="tel">16620854521</span>
          </div>
          <p class="address">深圳市龙华新区展涛科技大厦</p>
        </div>
        <div class="item__ft flex">
          <div class="flexItem checked">
            <img src="/static/images/icons/radio_2.png" class="IconsCK" alt="">
            <!-- <div class="IconsCK IconsCK-radio checked"></div> -->
            默认地址
          </div>
          <div class="flexItem flex1 text_r">
            <div class="iconText inline-block"><img src="/static/images/icons/eadit.png" class="icon" alt=""> 编辑</div>
            <div class="iconText inline-block"><img src="/static/images/icons/del.png" class="icon" alt="">删除</div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item__bd">
          <div class="remarks">
            <span class="name">张三</span>
            <span class="tel">16620854521</span>
          </div>
          <p class="address">深圳市龙华新区展涛科技大厦</p>
        </div>
        <div class="item__ft flex">
          <div class="flexItem">
            <img src="/static/images/icons/radio.png" class="IconsCK" alt="">
            <!-- <div class="IconsCK IconsCK-radio checked"></div> -->
           设为默认地址
          </div>
          <div class="flexItem flex1 text_r">
            <div class="iconText inline-block"><img src="/static/images/icons/eadit.png" class="icon" alt=""> 编辑</div>
            <div class="iconText inline-block"><img src="/static/images/icons/del.png" class="icon" alt="">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ftBtn" style="heigth:100rpx;">
      <div class="inner fixed bm0 border-box pd0">
        <div class="btn btn-active fill radius0"><img src="/static/images/icons/add.png" class="addImg" alt="">添加新增地址</div>
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
        title: "地址管理"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>