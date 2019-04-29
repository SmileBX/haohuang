<template>
  <div class="page">
    <div class="chooseList bg_fff">
      <div class="bank" v-if="banklist.length>0">
        <div class="pull">推荐银行</div>
        <div
          class="payitem flex flexAlignCenter"
          :class="{'active':activeIndex===index}"
          v-for="(item,index) in banklist"
          :key="index"
          @click="selectCardList(index,item.Id)"
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
  </div>
</template>
<script>
import { post, get } from "@/utils";
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
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
  components: {
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "选择银行名称"
      });
    },
    selectCardList(index,id){
      let cardInfo = {
        id,
        bankLogo:this.banklist[index].BankLogo,
        bankName:this.banklist[index].BankName
      };
      this.activeIndex = index;
      const selectCard = this.$store.state.selectCard;
      if(!selectCard.status){
        return false
      }

      // 设置提交订单参数
      this.$store.commit('update',{cardInfo});
      // 跳转到上一页
      wx.redirectTo({ url: selectCard.url});
      // 跳转到上一页
      // wx.redirectTo({ url: ""});
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
@import "./style";
</style>