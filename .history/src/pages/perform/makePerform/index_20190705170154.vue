<template>
  <div class="page bg_fff" >
    <div class="list">
      <div class="list-item">
          <div class="select__weui-cells " @click="getCustomerList">
              <div class="weui-cells__title">安装师傅</div>
              <div class="ipt flex flexAlignCenter">
                  <div class="flex1">
                      <input type="text" class="weui-input" disabled="true" placeholder="请选择" v-model="bindName">
                  </div>
                  <span class="icon-arrow arrow-down"></span>
              </div>
          </div>
          <div class="flex flex1 flexAlignCenter" style="padding:0 30rpx;">
            <span class="lab">安装价格</span>
            <div class="ipt flex">
              <input type="number" class="flex1 weui-input" v-model="spechign" placeholder="0"  @blur="getWide(lindex)">
            </div>
          </div>
          <div
            style="padding-bottom:40rpx;padding-top:40rpx;"
            class="addDetail bg_fff" 
          >
            <div class="btn btn-add" style="color:#666;border-color:#e5e5e5;" @click="delOrder(lindex)">
              删除安装师傅
            </div>
          </div>
      </div>
    </div>
    <!--按钮增加明细-->
    <div style="padding-bottom:40rpx;padding-top:40rpx;" class="addDetail bg_fff" @click="addOrder">
      <div class="btn btn-add">
        <img src="/static/images/icons/add_2.png" alt>增加安装师傅
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
.list-item{
  position: relative;
}
.list-item:after{
  position:absolute;
  content:"";
  bottom:0;
  width:690rpx;
  height:2rpx;
  background:#f2f2f2;
  left:30rpx;
}
.weui-input{
  width: 180rpx;
  border: 1px solid #f2f2f2;
  border-radius: 8rpx;
  padding: 12rpx 20rpx;
}
</style>