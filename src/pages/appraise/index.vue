<template>
  <div class="page">
    <!-- 订单的 -->
    <div class="column levelPanel">
      <div class="item">
        <div class="item__bd">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img" :style="'background-image:url('+detail.OrderImg+')'"></div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">{{detail.OrderType}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="appraiseBox">
      <div class="checkboxGroup">
        <h2 class="title">服务态度</h2>
        <checkbox-group>
          <label class="checkbox" for="1">
            <checkbox value="1" checked="true"/>响应不及时，态度不好
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>及时响应，按要求完成
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>积极热情，高度配合，灵活应对突发情况
          </label>
        </checkbox-group>
      </div>
      <div class="checkboxGroup">
        <h2 class="title">专业度</h2>
        <checkbox-group>
          <label class="checkbox" for="1">
            <checkbox value="1" checked="true"/>未按图纸安装，安装存在隐患
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>按图施工，安装符合标准（有小瑕疵）
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>效果非常好，没有任何瑕疵
          </label>
        </checkbox-group>
      </div>
      <div class="checkboxGroup">
        <h2 class="title">安装时间</h2>
        <checkbox-group>
          <label class="checkbox" for="1">
            <checkbox value="1" checked="true"/>未能按时完成安装
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>准时完成安装
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>提前完成安装
          </label>
        </checkbox-group>
      </div>
      <div class="checkboxGroup">
        <h2 class="title">清洁卫生</h2>
        <checkbox-group>
          <label class="checkbox" for="1">
            <checkbox value="1" checked="true"/>安装后未打扫卫生，环境比较差
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>打扫过卫生，看不见明细污物
          </label>
          <label class="checkbox" for="2">
            <checkbox value="2"/>打扫卫生非常干净
          </label>
        </checkbox-group>
      </div>
      <div class="checkboxGroup">
        <h2 class="title">其他问题反馈</h2>
        <div class="eaditArea">
          <textarea name class="weui-area" id placeholder="请输入其他反馈信息"></textarea>
        </div>
      </div>
    </div>
    <div class="ftBtn mt20 mb20">
      <div class="inner">
        <div class="btn btn-active fill">提交评价</div>
      </div>
    </div>
  </div>
</template>
<script>
//根据订单的类型 获取评论要显示的评论种类
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
export default {
  data() {
    return {
      userId: "",
      token: "",
      orderId: "",
      curPage: "",
      identity: "", //1:客服；2：客户；3:师傅
      detail: {
        OrderName: "", //项目名称
        OrderImg: "", //图片
        OrderType: "" //项目类型
      }
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.orderId = this.$root.$mp.query.orderId;
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    console.log(this.orderId);
    if (this.identity == 1) {
      //客服
    }
    if (this.identity == 2) {
      //客户
      this.getUserOrderData();
    }
    //this.getData()
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "发表评价"
      });
    },
    getUserOrderData() {
      let that = this;
      post("Order/OrderInfo", {
        // CsdId: that.userId,
        UserId: that.userId,
        Token: that.token,
        OrderNo: that.orderId
      }).then(result => {
        // that.$set(that.detail)
        that.detail = Object.assign({}, that.detail, {
          OrderName: result.data.orderName, //项目名称
          OrderImg: result.data.OrderImg, //图片
          OrderType: result.data.orderType//项目类型
        });

      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>