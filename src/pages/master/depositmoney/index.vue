<template>
  <div class="page" style="border-top:1rpx solid #e3e3e3;">
    <div class="widthdrawBox bg_fff allPadd">
      <div class="column title" @click="shiftCardList">
        <div class="column">
          <img :src="bankLogo" class="cardpic">
          <div class="right">
            <p>{{bankCardName}}</p>
            <p class="cardnnum">尾号{{bankCardNo}}储蓄卡</p>
          </div>
        </div>
        <img src="/static/images/icons/right_arrow.png" class="right_arrow">
      </div>
      <div class="charge">
        <p class="apoint">提现金额</p>
        <p class="column flexAlignBaseline">
          <span style="color:#ff6325" class="fh">￥</span>
          <input v-model="amount" type="number" class="inputPrice">
        </p>
      </div>
      <div class="tips" style="padding:20rpx 0;">可提现金额￥{{wallet}}</div>
    </div>
    <div class="botbtn addcard" @click="submitWithdraw">提现</div>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    console.log("___________");
    console.log(this.$store.state.myCardInfo);
    this.bankCardId = this.$store.state.myCardInfo.id;
    this.bankLogo = this.$store.state.myCardInfo.bankLogo;
    this.bankCardName = this.$store.state.myCardInfo.bankCardName;
    this.bankCardNo = this.$store.state.myCardInfo.bankCardNo.substring(
      this.$store.state.myCardInfo.bankCardNo.length - 4,
      this.$store.state.myCardInfo.bankCardNo.length
    );
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      if (this.hasDefaultCard) {
        this.getBankList();
      }
      this.GetInstalMasterInfo();
    }
  },
  data() {
    return {
      wallet: 0,
      curPage: "",
      userId: "",
      token: "",
      hasData: false,
      bankCardId: "",
      bankLogo: "",
      bankCardName: "",
      bankCardNo: "",
      hasDefaultCard: true,
      amount: "" //提现的金额
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提现选择"
      });
    },
    shiftCardList() {
      this.hasDefaultCard = false;
      this.$store.commit("setSelectMyCard", {
        url: "/pages/master/depositmoney/main",
        status: true
      });
      wx.navigateTo({ url: "/pages/master/cardList/main" });
    },
    valOther(){
       let price = Number(this.amount);
       if(price<1){
         wx.showToast({
          title: "最低提现金额为1元!",
          icon: "none",
          duration: 1500
        });
        return false;
       }
       if(price>this.wallet){
         wx.showToast({
          title: "输入的提现金额大于可提现金额!",
          icon: "none",
          duration: 1500
        });
        return false;
       }
       if(!this.bankCardId){
        wx.showToast({
          title: "请选择提现的银行卡!",
          icon: "none",
          duration: 1500
        });
        return false;
       }
       return true;
    },
    submitWithdraw() {
      //提现
      if (this.valOther()) {
        this.MasterDrawMoneyApply();
      }
    },
    //获取师傅的个人信息
    GetInstalMasterInfo() {
      //师傅的信息
      let that = this;
      post(
        "InstalMaster/GetInstalMasterInfo",
        {
          MasterId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.wallet = result.data.Wallet;
        }
      });
    },
    getBankList() {
      //获取银行卡
      let that = this;
      post(
        "Bank/BankList",
        {
          UserId: that.userId,
          Token: that.token,
          page: 1,
          pagesize: 1
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          if (result.data.length > 0) {
            that.bankCardId = result.data[0].Id;
            that.bankLogo = result.data[0].BankLogo;
            that.bankCardName = result.data[0].BankName;
            that.bankCardNo = result.data[0].BankCardNo.substring(
              result.data[0].BankCardNo.length - 4,
              result.data[0].BankCardNo.length
            );
            that.hasData = true;
          }
        }
      });
    },
    MasterDrawMoneyApply() {
      //提现
      let that = this;
      post(
        "InstalMaster/MasterDrawMoneyApply",
        {
          MasterId: that.userId,
          Token: that.token,
          Amount: that.amount,
          BankId: that.bankCardId
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          //提现成功
          wx.showToast({
            title: "提现申请成功！",
            icon: "none",
            duration: 1500,
            success:function(){
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/master/sum/main'
                })
              },1500)
            }
          });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>