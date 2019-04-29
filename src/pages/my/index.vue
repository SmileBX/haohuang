<template>
  <div class="page">
    <div class="memberTop" v-if="hasData">
      <img src="/static/images/icons/membertop_1.jpg" class="bg_img" mode="scaleToFill" alt>
      <div class="conBox">
        <div class="tx_info flex flexAlignCenter">
          <div class="tx" @click="gotoMyInfo">
            <img :src="info.Avatar" alt>
          </div>
          <div class="info flex1">
            <p class="name">{{info.NickName}}</p>
            <p class="perId">{{info.Mobile}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 这个是师傅的时候才有的 -->
    <ul class="numberList flex li_50" v-if="hasData && identity==3">
      <li>
        <p class="num">0</p>
        <p class="title">积分</p>
      </li>
      <li>
        <p class="num">0.00</p>
        <p class="title">余额</p>
      </li>
    </ul>
    <div class="memberIndex__section mb10">
      <div class="section__hd weui-cell">
        <div class="weui-cell__bd">
          <p class="title">我的订单</p>
        </div>
        <div class="weui-cell__ft">
          <span class="more">查看全部</span>
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="section__bd">
        <!-- 客户的时候 -->
        <ul class="navList li_20 center" v-if="identity==2">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/daiqueren.png" alt>
              </div>
              <p class="title">待确认</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/daifukuan.png" alt>
              </div>
              <p class="title">待付款</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/chulizhong.png" alt>
                <span class="circleNum">2</span>
              </div>
              <p class="title">处理中</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/daipinjia.png" alt>
              </div>
              <p class="title">待评价</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/shouhou.png" alt>
              </div>
              <p class="title">售后</p>
            </div>
          </li>
        </ul>
        <!-- 师傅的时候 -->
        <ul class="navList li_25 center" v-if="identity==3">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/shigongzhong.png" alt>
              </div>
              <p class="title">施工中</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/daishenhe.png" alt>
              </div>
              <p class="title">待审核</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/yianzhuang.png" alt>
                <span class="circleNum">2</span>
              </div>
              <p class="title">已安装</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/weitongguo.png" alt>
              </div>
              <p class="title">未通过</p>
            </div>
          </li>
        </ul>
        <!-- 客服的时候 -->
        <ul class="navList li_25 center" v-if="identity==1">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/daiqueren.png" alt>
              </div>
              <p class="title">待确认</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/serve_point.png" alt>
              </div>
              <p class="title">已指派</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/shigongzhong.png" alt>
                <span class="circleNum">2</span>
              </div>
              <p class="title">安装中</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/serve_com.png" alt>
              </div>
              <p class="title">已完成</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="memberIndex__section mb10">
      <div class="section__hd weui-cell">
        <div class="weui-cell__bd">
          <p class="title">我的服务</p>
        </div>
      </div>
      <div class="section__bd">
        <!-- 客户的时候 -->
        <ul class="navList li_25 center navList2" v-if="identity==2">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/quyuguanli.png" alt>
              </div>
              <p class="title">区域管理</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/zhuanshukefu.png" alt>
              </div>
              <p class="title">专属客服</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/dizhibo.png" alt>
              </div>
              <p class="title">地址薄</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoFeedback">
              <div class="icon-img">
                <img src="/static/images/icons/yijianfankui.png" alt>
              </div>
              <p class="title">意见反馈</p>
            </div>
          </li>
        </ul>
        <!-- 师傅的时候 -->
        <ul class="navList li_25 center navList2" v-if="identity==3">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/tongji.png" alt>
              </div>
              <p class="title">安装统计</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/mingxi.png" alt>
              </div>
              <p class="title">对账明细</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/zhuanshukefu.png" alt>
              </div>
              <p class="title">专属客服</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoFeedback">
              <div class="icon-img">
                <img src="/static/images/icons/yijianfankui.png" alt>
              </div>
              <p class="title">意见反馈</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoCardList">
              <div class="icon-img">
                <img src="/static/images/icons/card.png" alt>
              </div>
              <p class="title">银行卡</p>
            </div>
          </li>
        </ul>
        <!-- 客服的时候 -->
        <ul class="navList li_25 center navList2" v-if="identity==1">
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/serve_order.png" alt>
              </div>
              <p class="title">客户订单</p>
            </div>
          </li>
          <!-- <li>
            <div class="outside" @click="gotoFeedback">
              <div class="icon-img">
                <img src="/static/images/icons/yijianfankui.png" alt>
              </div>
              <p class="title">意见反馈</p>
            </div>
          </li>-->
        </ul>
      </div>
    </div>
    <foot :identity="identity"></foot>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import foot from "@/components/foot.vue";
import "@/css/dd_style.css";
export default {
  onLoad() {},
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      if (this.identity == 1) {
        this.GetCustomerServiceInfo();
      }
      if (this.identity == 2) {
        this.GetMemberInfo();
      }
      if (this.identity == 3) {
        this.GetInstalMasterInfo();
      }
    }
    console.log("当前的身份：" + this.identity);
  },
  data() {
    return {
      curPage: "",
      curPage: "",   
      userId: "",
      token: "",
      identity: "",
      hasData: false,
      info: {}
    };
  },
  components: {
    foot
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "个人中心"
      });
    },
    gotoFeedback() {
      //跳转到反馈页面
      let that = this;
      wx.navigateTo({
        url: "/pages/feedback/main"
      });
    },
    gotoCardList() {
      let that = this;
      wx.navigateTo({
        url: "/pages/master/cardList/main"
      });
    },
    gotoMyInfo(){
      wx.navigateTo({
        url: "/pages/myInfo/main"
      });
    },
    //客户的
    async GetMemberInfo() {
      let result = await post(
        "User/GetMemberInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
          this.$set(
            result.data,
            "Mobile",
            result.data.Mobile.substring(0, 3) +
              "****" +
              result.data.Mobile.substring(result.data.Mobile.length - 4)
          );
          
          this.hasData = true;
          this.info = result.data;
        }
      }
    },
    //师傅的
    async GetInstalMasterInfo() {
      let result = await post(
        "InstalMaster/GetInstalMasterInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
          this.$set(
            result.data,
            "Mobile",
            result.data.Mobile.substring(0, 3) +
              "****" +
              result.data.Mobile.substring(result.data.Mobile.length - 4)
          );
          
          this.hasData = true;
          this.info = result.data;
        }
      }
    },
    //客服的
    async GetCustomerServiceInfo() {
      let result = await post(
        "CustomerService/GetCustomerServiceInfo",
        {
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      );
      if (result.code === 0) {
        if (Object.keys(result.data).length > 0) {
          wx.setStorageSync("mobile", result.data.Mobile);
          this.$set(
            result.data,
            "Mobile",
            result.data.Mobile.substring(0, 3) +
              "****" +
              result.data.Mobile.substring(result.data.Mobile.length - 4)
          );
          
          this.hasData = true;
          this.info = result.data;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
