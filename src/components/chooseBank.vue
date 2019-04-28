<template>
  <div class="chooseList bg_fff">
    <div class="bank" v-if="banklist.length>0">
      <div class="pull">推荐银行</div>
      <div
        class="payitem flex flexAlignCenter" :class="{'active':activeIndex===index}"
        v-for="(item,index) in banklist"
        :key="index" @click="selectCardName(index,item.Id)"
      >
        <div class="card flex1 flex flexAlignCenter">
          <img :src="item.BankLogo" class="cardpic" mode="widthFix">
          <div class="txtBox flex1">
            <p>{{item.BankName}}</p>
          </div>
        </div>
        <span class="icon-gou"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get } from "../utils";
import "@/css/dd_style.css";
export default {
  onLoad() {
  },
  created() {
    this.banklist = [];
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.getBankinfoList();
  },
  data() {
    return {
      userId: "",
      token: "",
      activeIndex:0,
      banklist: []
    };
  },
  methods: {
    selectCardName(index,id){
      this.activeIndex = index;

    },
    async getBankinfoList() {
      let result = await get("Bank/GetBankinfoList");
      if (result.code === 0) {
        if (result.data.length > 0) {
          this.banklist = result.data;
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.chooseList{
  margin-top:20rpx;
}
.cardpic {
  width: 48rpx;
  max-height: 48rpx;
  margin-right: 20rpx;
}
.pull{
  font-size: 30rpx;
  padding:18rpx 30rpx;
}
.pull,
.payitem{
  position: relative;
}
.pull::before,
.payitem::before{
  position: absolute;
  content: "";
  left:30rpx;
  height: 1px;
  background: #e5e5e5;
  right:0;
  bottom: 0;
}
.payitem{
  padding:20rpx 30rpx;
}
.icon-gou{
  position: relative;
  width: 40rpx;
  height: 40rpx;
}
.payitem.active .icon-gou::after{
  position: absolute;
  content: "";
  width: 28rpx;
  height: 14rpx;
  border-left:2px solid #5694fc;
  border-bottom: 2px solid #5694fc;
  transform: rotate(-45deg);
  top:4rpx;
  left:0;
}
</style>