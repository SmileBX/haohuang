<template>
  <div class="page">
    
  </div>
</template>
<script>
import "@/css/common.css";
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
  components:{
   
  },
  data() {
    return {
     

    };
  },
  computed:{
   
    
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.UserId = wx.getStorageSync("userId");
    this.Token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "指派安装师傅"
      });
    },
    
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>