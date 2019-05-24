<template>

  <div class="page indexPage">
      <movable-area class="movearea">
    <!-- 搜索 -->
    <!-- <div class="searchBox">
      <div class="search flex flexAlignCenter">
        <img src="/static/images/icons/search.png" alt class="searchIcon">
        <div class="ipt flex1">
          <input type="text" class="weui-input" placeholder="搜索订单号/名称">
        </div>
      </div>
    </div> -->
    <div class="main">
      <!-- 轮播图 -->
      <div class="banner">
        <swiper
          class="swiper-container"
          indicator-dots="true"
          autoplay="true"
          interval="3000"
          circular="true"
          indicator-color="white"
          indicator-active-color="#ffdd77"
          duration="500"
          style="height:294rpx;"
        >
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item class="swiper-item" @click="gotoProduct(item)">
              <img
                style="width:100%;height:294rpx;"
                mode="scaleToFill"
                :src="item"
                class="slide-image"
              >
            </swiper-item>
          </block>
        </swiper>
      </div>
      <!-- 关于浩煌 -->
      <div class="about">
        <h2 class="title">关于浩煌</h2>
        <div class="colorBlock clear center">
          <div class="item">
            <div class="inner">
              <div class="circle flex flexAlignCenter">13年</div>
              <div class="txt">公司成立于2006年</div>
            </div>
          </div>
          <div class="item">
            <div class="inner">
              <div class="circle flex flexAlignCenter">专注精创</div>
              <div class="txt">商业空间展示</div>
            </div>
          </div>
          <div class="item">
            <div class="inner">
              <div class="circle flex flexAlignCenter">品牌客户</div>
              <div class="txt">想客户值所想</div>
            </div>
          </div>
        </div>
        <div class="about_con">
          <img src="/static/images/of/about.jpg" alt mode="widthFix" >
          <p v-html="companyInfo.CompanyDescription"></p>
          <!-- <p>浩煌公司从2006年创业以来，一直专注于商业空间展示、道具、产品专柜、橱窗、图片制作、印刷、活动策划设计及制作施工等业务。</p>
          <p>浩煌总部设于深圳，办公和生产厂区面积一万多平米，员工近300名。我们的安装团队有30人左右，分别在北京，上海，深圳，沈阳，西安，昆明，新疆，济南，武汉等地方设有驻点办事处专门负责安装及维护，覆盖华东，华南，华北，华西，华中，东北等区域，每个办事处驻点都配备专业的安装工具，安装人员具有高空作业证及电工证等岗位证件，确保售后服务完善到位。</p> -->
          <div class="contactBox">
          <div class="contactLine flex tel flexAlignCenter">
            <img src="/static/images/icons/tel.png" mode="widthFix" />  
            <div class="txtBox flex1">
              <p>{{companyInfo.CompanyTel}}</p>
            </div>
          </div>
          <div class="contactLine flex flexAlignCenter">
             <img src="/static/images/icons/address_2.png" mode="widthFix" alt>
            <div class="txtBox flex1">
              <p>{{companyInfo.CompanyAddress}}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
      <foot :identity="identity"></foot>
      <!-- 客服 -->
      <movable-view style="z-index:11;" x="300" y="460" direction="all" out-of-bounds="false"  @click="customService" v-if="identity==2">
          <div class="fixed__kf">
              <img src="/static/images/icons/fixed__kf.png" alt="">
          </div>
      </movable-view>
    </div>
    </movable-area>
    <!-- 客户的联系客服 -->
    <serviceTypeSelect
      :selectServiceTypeStatus.sync="selectServiceTypeStatus"
      :servicePhone="servicePhone"
    ></serviceTypeSelect>
  </div>
  
</template>
<script>
import foot from "@/components/foot.vue";
import { post,get, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import "@/css/dd_style.css";
import serviceTypeSelect from "@/components/serviceTypeSelect.vue";
export default {
  onLoad() {
    this.setBarTitle();
    
  },
  onShow(){
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if(toLogin(this.curPage)){
      this.identity = wx.getStorageSync("identity");
      console.log( this.identity," this.identity+++++++")
      if (this.identity == 2) {
        //客户
        this.GetMemberInfo();
      } 
      this.getBanner();
      this.getConpanyInfo()

    }
    
  },
  data() {
    return {
      bannerList: [],
      companyInfo:{},
      identity:"",
      servicePhone:'',
      selectServiceTypeStatus: false, //联系客服类型弹窗状态
      curPage:"",
      userId: "",
      token: "",
    };
  },
  components: {
    foot,
    serviceTypeSelect

  },
  methods: {
    async getBanner(){
        const res = await post("Banner/BannerList",{
          "type":1
       })
       if(res.code==0){
         this.bannerList = res.data
       }
    },
    async getConpanyInfo(){
      const res = await get("Banner/GetCompanyInfo")
      console.log(res,"res公司信息")
      if(res.code==0){
          this.companyInfo=res.data
          //console.log(res.data.CompanyImg.split(","),'CompanyImg')
          this.bannerList = res.data.CompanyImg.split(",")
      }
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "浩煌"
      });
    },
    customService(){  //客户的点击专属客服
      this.selectServiceTypeStatus = true;
      console.log(this.servicePhone,"servicePhone");
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
          console.log(that.servicePhone,"servicePhone+++++++++++++")
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
