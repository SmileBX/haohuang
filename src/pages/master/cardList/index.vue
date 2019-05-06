<template>
  <div class="page">
    <scroll-view scroll-y @scrolltolower="loadMore" style="height:100%;">
      <div class="cardList" v-if="cardList.length>0">
        <div class="item flex" v-for="(item,index) in cardList" :key="index">
          <img src="/static/images/card/cardBg.png" class="bg" alt>
          <div class="cardImg">
            <img :src="item.BankLogo" alt>
          </div>
          <div class="txtBox">
            <p class="title">{{item.BankName}}</p>
            <p class="type">
              <span @click="DeleteBank(index,item.Id)">[解绑银行卡]</span>
            </p>
            <p class="number">
              <span class="xing" v-for="(item2,index2) in item.cardNoArr" :key="index2">{{item2}}</span>
            </p>
          </div>
        </div>
      </div>
      <p style="text-align:center;font-size:30rpx;color:#666;padding:120rpx 20rpx 80rpx;" v-if="noDataIsShow">暂无数据</p>
      <p class="ovedMsg" v-if="isOved && page>1" style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;">我也是有底线的</p>
      <div class="ftBtn" style="height:154rpx;">
        <div class="inner fixed bm0 border-box" style="background:#fff;">
          <div class="btn btn-active fill" @click="gotoAddCard">
            <img src="/static/images/icons/add.png" class="addImg">添加银行卡
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.initData();
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
      pageSize: 10,
      count: 0,
      allPage: 0,
      isLoad: false,
      isOved: false,
      noDataIsShow:false,
      cardList: []
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的银行卡"
      });
    },
    initData() {
      this.curPage = "";
      this.userId = "";
      this.token = "";
      this.page = 1;
      this.pageSize = 4;
      this.count = 0;
      this.allPage = 0;
      this.noDataIsShow = false;
      this.isLoad = false;
      this.isOved = false;
      this.cardList = [];
    },
    gotoAddCard() {
      wx.navigateTo({
        url: "/pages/master/addCard/main"
      });
    },
    getBankList() {
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
          that.count = result.count;
          if (that.count == 0) {
            that.noDataIsShow = true;
          }
          if (parseInt(that.count) % that.pageSize === 0) {
            that.allPage = that.count / that.pageSize;
          } else {
            that.allPage = parseInt(that.count / that.pageSize) + 1;
          }
          if (that.allPage > that.page) {
            that.isLoad = true;
          } else {
            that.isLoad = false;
          }
          if (result.data.length > 0) {
            if (that.page === 1) {
              that.cardList = [];
            }
            result.data.forEach(item => {
              let cardNo = item.BankCardNo.replace(/\s/g, "").replace(
                /(\d{4})\d+(\d{4})$/,
                "**** **** **** $2"
              );
              console.log(cardNo);
              that.$set(item, "cardNoArr", cardNo.split(" "));
            });
            that.cardList = that.cardList.concat(result.data);
          }
        }
      });
    },
    DeleteBank(index, cardId) {
      let that = this;
      post(
        "Bank/DeleteBank",
        {
          UserId: that.userId,
          Token: that.token,
          Id: cardId
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.showToast({
            title: "解绑成功!",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                that.cardList.splice(index, 1);
              }, 1500);
            }
          });
        }
      });
    },
    loadMore() {
      console.log("ddddd");
      //加载更多
      if (this.isLoad) {
        this.page++;
        this.getBankList();
      } else {
        if (this.page > 1) {
          this.isOved = true;
        } else {
          this.isOved = false;
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>