<template>
  <div class="page">
    <div class="memberTop">
      <img src="/static/images/icons/membertop_1.jpg" class="bg_img" mode="scaleToFill" alt>
      <div class="conBox" v-if="identity==4">
        <div class="tx_info flex flexAlignCenter">
          <div class="info flex1">
            <p class="name">{{info.NickName}}</p>
            <p class="perId">
              {{info.Mobile}}
            </p>
          </div>
        </div>
      </div>
      <div class="conBox" v-else>
        <div class="tx_info flex flexAlignCenter">
          <div class="tx" @click="gotoMyInfo">
            <img :src="info.Avatar" alt>
          </div>
          <div class="info flex1">
            <p class="name">{{info.NickName}}</p>
            <p class="perId" v-if="identity==2 || identity==3">
              {{info.Mobile}}
              <span
                class="editPhone"
                @click="updateMobile"
                v-if="identity==2 || identity==3"
              >修改手机号</span>
            </p>
            <p class="perId" v-if="identity==1">{{info.MobileStr}}
                <span
                  class="editPhone"
                  @click="updateMobile"
                >修改手机号</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 这个是师傅的时候才有的 -->
    <ul class="numberList flex li_50" v-if="hasData && identity==3">
      <li @click="gotoIntegral">
        <p class="num">{{info.Integral}}</p>
        <p class="title">积分</p>
      </li>
      <li @click="gotoSun">
        <p class="num">{{info.Wallet}}</p>
        <p class="title">余额</p>
      </li>
    </ul>
    <div class="memberIndex__section mb10">
      <div class="section__hd weui-cell">
        <div class="weui-cell__bd">
          <p class="title">我的订单</p>
        </div>
        <div class="weui-cell__ft" @click="gotoUrl(-1)">
          <span class="more">查看全部</span>
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="section__bd">
        <!-- 客户的时候 -->
        <ul class="navList li_25 center" v-if="identity==2">
          <li>
            <div class="outside" @click="gotoUrl(0)">
              <div class="icon-img">
                <img src="/static/images/icons/daiqueren.png" alt>
                <span class="circleNum" v-if="info.notconfirmNum>0">{{info.notconfirmNum}}</span>
              </div>
              <p class="title">待确认</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(1)">
              <div class="icon-img">
                <img src="/static/images/icons/daifukuan.png" alt>
                <span class="circleNum" v-if="info.notpayNum>0">{{info.notpayNum}}</span>
              </div>
              <p class="title">待付款</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(7)">
              <div class="icon-img">
                <img src="/static/images/icons/chulizhong.png" alt>
                <span class="circleNum" v-if="info.handleNum>0">{{info.handleNum}}</span>
              </div>
              <p class="title">处理中</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(8)">
              <div class="icon-img">
                <img src="/static/images/icons/daipinjia.png" alt>
                <span class="circleNum" v-if="info.notcommentNum>0">{{info.notcommentNum}}</span>
              </div>
              <p class="title">待评价</p>
            </div>
          </li>
          <!-- <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/shouhou.png" alt>
              </div>
              <p class="title">售后</p>
            </div>
          </li>-->
        </ul>
        <!-- 师傅的时候 -->
        <ul class="navList li_25 center" v-if="identity==3">
          <li>
            <div class="outside" @click="masterOrder(1)">
              <div class="icon-img">
                <img src="/static/images/icons/shigongzhong.png" alt>
                <span class="circleNum" v-if="info.constructionNum>0">{{info.constructionNum}}</span>
              </div>
              <p class="title">施工中</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="masterOrder(2)">
              <div class="icon-img">
                <img src="/static/images/icons/daishenhe.png" alt>
                <span class="circleNum" v-if="info.notauditNum>0">{{info.notauditNum}}</span>
              </div>
              <p class="title">待审核</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="masterOrder(3)">
              <div class="icon-img">
                <img src="/static/images/icons/yianzhuang.png" alt>
                <span class="circleNum" v-if="info.auditOKNum>0">{{info.auditOKNum}}</span>
              </div>
              <p class="title">已通过</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="masterOrder(4)">
              <div class="icon-img">
                <img src="/static/images/icons/weitongguo.png" alt>
                <span class="circleNum" v-if="info.auditNoNum>0">{{info.auditNoNum}}</span>
              </div>
              <p class="title">未通过</p>
            </div>
          </li>
        </ul>
        <!-- 客服的时候 -->
        <ul class="navList li_25 center" v-if="identity==1">
          <li>
            <div class="outside" @click="gotoUrl(0)">
              <div class="icon-img">
                <img src="/static/images/icons/daiqueren.png" alt>
                <span class="circleNum" v-if="info.notconfirmNum>0">{{info.notconfirmNum}}</span>
              </div>
              <p class="title">待确认</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(1)">
              <div class="icon-img">
                <img src="/static/images/icons/serve_point.png" alt>
                <span class="circleNum" v-if="info.notpayNum>0">{{info.notpayNum}}</span>
              </div>
              <p class="title">待付款</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(7)">
              <div class="icon-img">
                <img src="/static/images/icons/shigongzhong.png" alt>
                <span class="circleNum" v-if="info.handleNum>0">{{info.handleNum}}</span>
              </div>
              <!-- 处理中 -->
              <p class="title">处理中</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(8)">
              <div class="icon-img">
                <img src="/static/images/icons/serve_com.png" alt>
                <span class="circleNum" v-if="info.commentNum>0">{{info.commentNum}}</span>
              </div>
              <p class="title">待评论</p>
            </div>
          </li>
        </ul>
        <!-- 执行的时候 -->
        <ul class="navList li_25 center flex-around" v-if="identity==4">
          <li>
            <div class="outside" @click="gotoUrl(0)">
              <div class="icon-img">
                <img src="/static/images/icons/n_1.png" alt>
                <span class="circleNum" v-if="info.notconfirmNum>0">{{info.notconfirmNum}}</span>
              </div>
              <p class="title">待处理</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoUrl(1)">
              <div class="icon-img">
                <img src="/static/images/icons/n_2.png" alt>
                <span class="circleNum" v-if="info.notpayNum>0">{{info.notpayNum}}</span>
              </div>
              <p class="title">已处理</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="memberIndex__section mb10" v-if="identity!=4">
      <div class="section__hd weui-cell">
        <div class="weui-cell__bd">
          <p class="title">我的服务</p>
        </div>
      </div>
      <div class="section__bd">
        <!-- 客户的时候 -->
        <ul class="navList li_25 center navList2" v-if="identity==2">
          <li>
            <div class="outside" @click="gotoAreaOrder">
              <div class="icon-img">
                <img src="/static/images/icons/quyuguanli.png" alt>
              </div>
              <p class="title">区域管理</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="customService">
              <div class="icon-img">
                <img src="/static/images/icons/zhuanshukefu.png" alt>
              </div>
              <p class="title">专属客服</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoAddressList">
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
            <div class="outside" @click="gotoCensus">
              <div class="icon-img">
                <img src="/static/images/icons/tongji.png" alt>
              </div>
              <p class="title">安装统计</p>
            </div>
          </li>
          <li>
            <div class="outside" @click="gotoAccount">
              <div class="icon-img">
                <img src="/static/images/icons/mingxi.png" alt>
              </div>
              <p class="title">结账明细</p>
            </div>
          </li>
          <li>
            <div class="outside">
              <div class="icon-img">
                <img src="/static/images/icons/zhuanshukefu.png" alt>
              </div>
              <p class="title">专属客服</p>
            </div>
            <button class="noShow" open-type="contact"></button>
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
            <div class="outside"  @click="gotoClientOrder">
              <div class="icon-img">
                <img src="/static/images/icons/serve_order.png" alt>
                 <span class="circleNum" v-if="info.kehuNum>0">{{info.kehuNum}}</span>
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
    <div class="ftBtn">
      <div class="inner">
        <div class="btn btn-active fill" @click="outLogin">退出登录</div>
      </div>
    </div>
    <!-- 客户的联系客服 -->
    <serviceTypeSelect
      :selectServiceTypeStatus.sync="selectServiceTypeStatus"
      :servicePhone="servicePhone"
    ></serviceTypeSelect>
    <foot :identity="identity"></foot>
  </div>
</template>
<script>
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import serviceTypeSelect from "@/components/serviceTypeSelect.vue";
import foot from "@/components/foot.vue";
import "@/css/dd_style.css";
export default {
  onLoad() {},
  onShow() {
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.mobile = wx.getStorageSync("mobile");
    this.nickName = wx.getStorageSync("nickName");
    this.info = {};
    if (toLogin(this.curPage)) {
      if (this.identity == 1) {
        //客服
        this.GetCustomerServiceInfo();
      }
      if (this.identity == 2) {
        //客户
        this.GetMemberInfo();
      }
      if (this.identity == 4) {
        //执行
        this.info = {
          Mobile:this.mobile,
          NickName:this.nickName
        }
        console.log(this.info,"{{{")
        
      }
      if (this.identity == 3) {
        //师傅
        this.GetInstalMasterInfo();
        console.log(this.info);
      }
    }
    console.log("当前的身份：" + this.identity);
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      identity: "",
      hasData: false,
      info: {},
      nickName:"",//执行身份的昵称
      mobile:"",//执行身份的电话
      selectServiceTypeStatus: false, //联系客服类型弹窗状态
      servicePhone: "" //客服的服务电话
    };
  },
  components: {
    foot,
    serviceTypeSelect
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "个人中心"
      });
    },
    customService(){  //客户的点击专属客服
      this.selectServiceTypeStatus = true;
      console.log(this.selectServiceTypeStatus);
    },
    gotoAreaOrder(){  //跳转到客户的区域管理
      wx.navigateTo({
        url: "/pages/custom/areaOrder/main"
      });
    },
    gotoAddressList(){  //客户的跳转到地址列表
      wx.navigateTo({
        url: "/pages/custom/addressList/main"
      });
    },
    gotoSun() {
      //跳转到余额
      wx.navigateTo({
        url: "/pages/master/sum/main"
      });
    },
    gotoIntegral() {
      //跳转积分
      wx.navigateTo({
        url: "/pages/master/integral/main"
      });
    },
    gotoCensus() {
      //跳转到安装明细
      wx.navigateTo({
        url: "/pages/master/census/main"
      });
    },
    gotoAccount() {
      //跳转到师傅的对账明细
      wx.navigateTo({
        url: "/pages/master/account/main"
      });
    },
    masterOrder(index){
      let typeNo = -1;
      //师傅的---订单状态：-1全部，0-已接单(施工中),1-待审核(已安装) ,2-审核通过, 3-审核拒绝, 4-订单完成
      if(index==1){
        typeNo=0;
      }
      if(index==2){
        typeNo=1;
      }
      if(index==3){
        typeNo=2;
      }
      if(index==4){
        typeNo=3;
      }
      wx.navigateTo({
        url: "/pages/master/myOrder/main?typeNo="+typeNo
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
    gotoMyInfo() {
      //if (this.identity == 2 || this.identity == 3) {
        wx.navigateTo({
          url: "/pages/myInfo/main"
        });
     // }
    },
    GetCustomerServiceInfo() {
      let that = this;
      //客服的信息
      post(
        "CustomerService/GetCustomerServiceInfo",
        {
          CsdId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.hasData = true;
          
          that.info = result.data;
        }
      });
    },
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
        console.log(result);
        if (result.code === 0) {
          that.$set(
            result.data,
            "Mobile",
            result.data.Mobile.substring(0, 3) +
              "****" +
              result.data.Mobile.substring(result.data.Mobile.length - 4)
          );
          that.hasData = true;
          that.info = result.data;
        }
      });
    },
    GetMemberInfo() {
      let that = this;
      //客户信息
      post(
        "User/GetMemberInfo",
        {
          UserId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          that.servicePhone = result.data.ServiceTel;
          that.$set(
            result.data,
            "Mobile",
            result.data.Mobile.substring(0, 3) +
              "****" +
              result.data.Mobile.substring(result.data.Mobile.length - 4)
          );
          that.hasData = true;
          that.info = result.data;
        }
      });
    },
    outLogin() {
      //退出登录 
      wx.setStorageSync("userId", "");
      wx.setStorageSync("token", "");
      wx.setStorageSync("identity", "");
      wx.setStorageSync("openId", "");
      wx.setStorageSync("unionid", "");
      wx.setStorageSync("mobile", "");
      wx.setStorageSync("userInfo", "");
      wx.setStorageSync("askUrl", "");
      wx.redirectTo({
        url: "/pages/login2/main"
      });
    },
    //更改用户手机号码
    updateMobile() {
      wx.navigateTo({
        url: "/pages/setPhone/main"
      });
    },
    // 跳转到订单列表identity=1--客服；2--客户
    gotoUrl(typeNo) {
      // typeNo--进入订单列表展示的状态
      // 客服--订单状态：-1全部，0-待确认，1-待付款 7-已执行(安装中) 8-待评论9-已完成
      // 客户--订单状态：-1全部，0-待确认，1-待付款，2-处理中，10-待评论

      console.log("跳转类型", typeNo);
      if (this.identity === 1) {
        wx.navigateTo({ url: `/pages/servicemenu/myOrder/main?typeNo=${typeNo}` });
      } else if (this.identity === 2) {
        wx.navigateTo({ url: `/pages/custom/order/main?typeNo=${typeNo}` });
      }else if(this.identity === 4){
        wx.navigateTo({ url: `/pages/perform/myOrder/main?typeNo=${typeNo}`})
      }else{
      wx.navigateTo({ url: `/pages/master/myOrder/main?typeNo=${typeNo}` });
      }
    },
    // 跳转到客服
    gotoClientOrder(){
      wx.navigateTo({ url: `/pages/servicemenu/customeOrder/main` });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./style";

</style>
