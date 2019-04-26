<template>
  <div class="page">
    <div class="newsDetail">
      <div class="newsDetail__hd center">
        <h2 class="title">账号登录提醒</h2>
      </div>
      <div class="newsDetail__bd">
        <p>您的账号于04/28 10:19在广东省深圳市的一台设备（Le X620）进行了登录操作。如非本人操作，则账号安全可能出现危险，建议立即检查第三方登录账号（如微信QQ等）的安全性。</p>
      </div>
      <div class="newsDetail__ft text_r">
        <span class="time">2019-04-28 10:19</span>
      </div>
    </div>
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
        title: "通知详情"
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