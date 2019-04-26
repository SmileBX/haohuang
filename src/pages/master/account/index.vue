<template>
  <div class="allPadd account">
    <div class="tips">
        <p>已出账单</p>
        <p>3月</p>
    </div>
    <div class="scorelist">
        <div class="scoreitem column">
            <div class="column iteminfo">
                <p>灯箱安装</p>
                <div class="orderInfo">
                    <p class="time">订单编号：1316546798797964</p>
                    <p class="time">下单时间：04/01 15：39：21</p>
                    <p class="time">完成时间：04/01 15：39：21</p>
                </div>
            </div>
            <div class="column flexDirection">
                <p class="itemcolor">+￥4800</p>
                <p class="time">在线支付</p>
            </div>
        </div>
        
     </div>
     <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;">暂无数据</p>
    <p class="ovedMsg" v-if="isOved" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p> 
  </div>
</template>

<script>
import "@/css/common.css";
export default {
  onShow(){
    this.setBarTitle();
  },
  data () {
    return {
      
    }
  },
 
  components: {
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的积分"
      });
    }
    
    
  },

  created () {
    // let app = getApp()
  },
  onPullDownRefresh(){
     
  },
  onReachBottom(){
    if(this.isLoad){
      this.page++;
      this.getScoreList();
    }else{
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
