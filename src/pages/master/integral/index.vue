<template>
  <div>
     <div class="sum border-box column">
        <p>当前积分</p>
        <p><span class="score">236</span>分</p>
     </div>
     <div class="scorelist allPadd">
        <div class="scoreitem column">
            <div class="column iteminfo">
                <p>灯箱安装</p>
                <p class="time">2019/04/01 15：39：21</p>
            </div>
            <div class="itemcolor">+10</div>
        </div>
        <div class="scoreitem column">
            <div class="column iteminfo">
                <p>商城门店装修</p>
                <p class="time">2019/04/01 15：39：21</p>
            </div>
            <div class="itemcolor">+50</div>
        </div>
     </div>
     <!-- <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;" v-if="scoreList.length===0">暂无数据</p>
    <p class="ovedMsg" v-if="isOved" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p>  -->
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
