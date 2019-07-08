<template>
  <div class="page">
    <div class="list">
        <div class="select__weui-cells" @click="getCustomerList">
            <div class="weui-cells__title">安装师傅</div>
            <div class="ipt flex flexAlignCenter">
                <div class="flex1">
                    <input type="text" class="weui-input" disabled="true" placeholder="请选择" v-model="bindName">
                </div>
                <span class="icon-arrow arrow-down"></span>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import "@/css/common.css";
import "@/css/dd_style.css";
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