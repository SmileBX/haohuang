<template>
  <div class="page">
    <div class="cardList">
      <div class="item flex">
        <img src="/static/images/card/jianshe.png" class="bg" alt>
        <div class="cardImg">
          <img src="/static/images/card/card1.png" alt>
        </div>
        <div class="txtBox">
          <p class="title">中国建设银行</p>
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
    if(toLogin(this.curPage)){
        this.getBankList();
    }
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      page:1,
      cardList:[]
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的银行卡"
      });
    },
    gotoAddCard(){
        console.log("dddddd");
      let that = this;
      wx.navigateTo({
        url: "/pages/master/addCard/main"
      });
    },
    async getBankList(){
      let result = await post("Bank/BankList",{
        UserId:this.userId,
        Token:this.token,
        page:this.page,
        pagesize:this.pageSize
      },this.curPage)
      if(result.code===0){
        if(result.data.lenght>0){
            if(this.page===1){
              this.cardList = [];
            }
            this.cardList = result.data;
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>