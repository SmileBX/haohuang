<template>
  <div class="page">
    <div class="newsList weui-cells">
      <div class="weui-cell">
        <img src="/static/images/icons/tips_2.png" class="icon" alt>
        <div class="weui-cell__bd">
          <div class="flex">
            <div class="flex1">
              <p class="title">系统通知</p>
            </div>
            <span class="time">2019-03-28</span>
          </div>
          <div class="flex">
            <div class="flex1">
              <p class="con">账号登录提醒</p>
            </div>
            <span class="num">1</span>
          </div>
        </div>
      </div>
       <div class="weui-cell">
        <img src="/static/images/icons/tips_3.png" class="icon" alt>
        <div class="weui-cell__bd">
          <div class="flex">
            <div class="flex1">
              <p class="title">服务通知</p>
            </div>
            <span class="time">2019-03-28</span>
          </div>
          <div class="flex">
            <div class="flex1">
              <p class="con">你的订单已取消</p>
            </div>
            <span class="num">1</span>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "@/components/foot.vue";
export default {
  onLoad() {
    this.setBarTitle();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "消息"
      });
    }
  },
  components: {
    foot
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>