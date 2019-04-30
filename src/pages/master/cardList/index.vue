<template>
  <div class="page">
    <div class="cardList">
      <div class="item flex" v-for="(item,index) in cardList" :key="index">
        <img src="/static/images/card/jianshe.png" class="bg" alt>
        <div class="cardImg">
          <img :src="item.BankLogo" alt>
        </div>
        <div class="txtBox">
          <p class="title">{{item.BankName}}</p>
          <p class="type">储蓄卡</p>
          <p class="number">
            <span class="xing">****</span>
            <span class="xing">****</span>
            <span class="xing">****</span>
            <span class="num">6925</span>
          </p>
        </div>
      </div>
      <div class="item flex">
        <img src="/static/images/card/zhaoshang.png" class="bg" alt>
        <div class="cardImg">
          <img src="/static/images/card/card2.png" alt>
        </div>
        <div class="txtBox">
          <p class="title">招商银行</p>
          <p class="type">储蓄卡</p>
          <p class="number">
            <span class="xing">****</span>
            <span class="xing">****</span>
            <span class="xing">****</span>
            <span class="num">6925</span>
          </p>
        </div>
      </div>
    </div>
    <div class="ftBtn">
      <div class="inner fixed bm0 border-box">
        <div class="btn btn-active fill" @click="gotoAddCard">
          <img src="/static/images/icons/add.png" class="addImg">添加银行卡
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      this.getBankList();
    }
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      page: 1,
      cardList: []
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的银行卡"
      });
    },
    gotoAddCard() {
      wx.navigateTo({
        url: "/pages/master/addCard/main"
      });
    },
    async getBankList() {
      let that = this;
      post(
        "Bank/BankList",
        {
          UserId: that.userId,
          Token: that.token,
          page: that.page,
          pagesize: that.pageSize
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          if (result.data.lenght > 0) {
            if (that.page === 1) {
              that.cardList = [];
            }
            that.cardList = result.data;
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>