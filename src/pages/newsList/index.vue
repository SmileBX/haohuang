<template>
  <div class="page">
     <div class="newsList">
       <div class="item">
         <div class="time center"><span>2019.04.28 10:20</span></div>
         <div class="contentBox">
           <p class="title">账号登录提醒</p>
           <div class="flex con">
             <div class="flex1">
               您的账号于04/18 10:19在广东省深圳市的一台设备进行登录操作
             </div>
             <span class="icon-arrow arrow-right"></span>
           </div>
         </div>
       </div>
       <div class="item">
         <div class="time center"><span>2019.04.28 10:20</span></div>
         <div class="contentBox">
           <p class="title">账号登录提醒</p>
           <div class="flex con">
             <div class="flex1">
               您的账号于04/18 10:19在广东省深圳市的一台设备进行登录操作
             </div> 
             <span class="icon-arrow arrow-right"></span>
           </div>
         </div>
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
        title: "系统通知"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>