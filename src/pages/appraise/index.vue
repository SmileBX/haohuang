<template>
  <div class="page" v-if="isOved">
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
                <p class="title text-line2">{{detail.OrderTypeStr}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="appraiseBox">
      <div class="checkboxGroup">
        <h2 class="title">服务态度</h2>
        <radio-group @change="getValue(0,$event)">
          <label class="checkbox">
            <checkbox value="响应不及时，态度不好"/>响应不及时，态度不好
          </label>
          <label class="checkbox">
            <checkbox value="及时响应，按要求完成"/>及时响应，按要求完成
          </label>
          <label class="checkbox">
            <checkbox value="积极热情，高度配合，灵活应对突发情况"/>积极热情，高度配合，灵活应对突发情况
          </label>
        </radio-group>
      </div>
      <div class="checkboxGroup" v-if="detail.OrderType>=1">
        <h2 class="title">专业度</h2>
        <radio-group @change="getValue(1,$event)">
          <label class="checkbox">
            <checkbox value="未按图纸安装，安装存在隐患"/>未按图纸安装，安装存在隐患
          </label>
          <label class="checkbox">
            <checkbox value="按图施工，安装符合标准（有小瑕疵）"/>按图施工，安装符合标准（有小瑕疵）
          </label>
          <label class="checkbox">
            <checkbox value="效果非常好，没有任何瑕疵"/>效果非常好，没有任何瑕疵
          </label>
        </radio-group>
      </div>
      <div class="checkboxGroup" v-if="detail.OrderType>=4 || detail.OrderType===2">
        <h2 class="title">安装时间</h2>
        <radio-group @change="getValue(2,$event)">
          <label class="checkbox">
            <checkbox value="未能按时完成安装"/>未能按时完成安装
          </label>
          <label class="checkbox">
            <checkbox value="准时完成安装"/>准时完成安装
          </label>
          <label class="checkbox">
            <checkbox value="提前完成安装"/>提前完成安装
          </label>
        </radio-group>
      </div>
      <div class="checkboxGroup" v-if="detail.OrderType>=4 || detail.OrderType===2">
        <h2 class="title">清洁卫生</h2>
        <radio-group @change="getValue(3,$event)">
          <label class="checkbox">
            <checkbox value="安装后未打扫卫生，环境比较差"/>安装后未打扫卫生，环境比较差
          </label>
          <label class="checkbox">
            <checkbox value="打扫过卫生，看不见明细污物"/>打扫过卫生，看不见明细污物
          </label>
          <label class="checkbox">
            <checkbox value="打扫卫生非常干净"/>打扫卫生非常干净
          </label>
        </radio-group>
      </div>
      <div class="checkboxGroup">
        <h2 class="title">其他问题反馈</h2>
        <div class="eaditArea">
          <textarea v-model="txt" name class="weui-area" id placeholder="请输入其他反馈信息"></textarea>
        </div>
      </div>
    </div>
    <div class="ftBtn mt20 mb20">
      <div class="inner">
        <div class="btn btn-active fill" @click="smApprise">提交评价</div>
      </div>
    </div>
  </div>
</template>
<script>
//根据订单的类型 获取评论要显示的评论种类
//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
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
        OrderType: "", //项目类型
        OrderTypeStr: "" //项目类型（文字）
      },
      content: "", //用逗号隔开
      txt: "", //其他问题反馈
      radioVal: [],
      isOved: false //是否加载完
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
      if (toLogin(this.curPage)) {
        this.getKfOrderData();
      }
    }
    if (this.identity == 2) {
      //客户
      if (toLogin(this.curPage)) {
        this.getUserOrderData();
      }
    }
    //this.getData()
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "发表评价"
      });
    },
    initData() {
      this.txt = "";
      this.isOved = false;
      this.detail = {
        OrderName: "", //项目名称
        OrderImg: "", //图片
        OrderType: "", //项目类型
        OrderTypeStr: "" //项目类型（文字）
      };
      this.content = ""; //用逗号隔开
      this.radioVal = [];
    },
    getValue(index, e) {
      //获取radio的value
      console.log("radio发生change事件，携带value值为：", e.target.value);
      this.radioVal[index] = e.target.value;
      console.log(this.radioVal);
    },
    valOther() {
      //订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
      if (
        this.detail.OrderType == 2 ||
        this.detail.OrderType == 4 ||
        this.detail.OrderType == 5
      ) {
        //验证所有的
        // if (this.radioVal.length > 0) {   ----此法不通
          // let num = 0;
          // this.radioVal.forEach(item => {
          //   console.log(item);
          //   if (!item) {
          //     num++;
          //   }
          // });
          // if (num >= 1) {
          //   wx.showToast({
          //     title: "请评价完选项!",
          //     icon: "none",
          //     duration: 1500
          //   });
          //   return false;
          // }
          if (!this.radioVal[0] || !this.radioVal[1] || !this.radioVal[2]　|| !this.radioVal[3]) {
            wx.showToast({
              title: "请评价完选项!",
              icon: "none",
              duration: 1500
            });
            return false;
          }
        } 
      // }
      if (this.detail.OrderType == 0) {
        //验证设计
        if (!this.radioVal[0]) {
          console.log("走到底是了");
          wx.showToast({
            title: "请评价完选项!",
            icon: "none",
            duration: 1500
          });
          return false;
        }
      }
      if (this.detail.OrderType == 3 || this.detail.OrderType == 1) {
        //验证制作
        if (!this.radioVal[0] || !this.radioVal[1]) {
          wx.showToast({
            title: "请评价完选项!",
            icon: "none",
            duration: 1500
          });
          return false;
        }
      }
      return true;
    },
    smApprise() {
      //提交评论
      if (this.valOther() && toLogin(this.curPage)) {
        let conStr = "";
        this.radioVal.forEach(item => {
          if (item) {
            conStr += item + ";";
          }
        });
        if (this.txt !== "") {
          conStr += this.txt;
        } else {
          conStr = conStr.substr(0, conStr.length - 1);
        }
        console.log("conStr:" + conStr);
        this.content = conStr;
        if (this.identity == 1) {
          //客服
         this.KfCommentOrder();
        }
        if (this.identity == 2) {
          //客户
          this.CommentOrder();
        }
      }
    },
    getUserOrderData() {
      //客户的订单详情
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
          OrderType: result.data.orderType, //项目类型
          OrderTypeStr: result.data.orderTypeStr //项目类型（文字）
        });
        that.isOved = true;
      });
    },
    getKfOrderData() {
      //客服的订单详情
      let that = this;
      post("CustomerService/OrderInfo", {
        CsdId: that.userId,
        Token: that.token,
        OrderNo: that.orderId
      }).then(result => {
        // that.$set(that.detail)
        that.detail = Object.assign({}, that.detail, {
          OrderName: result.data.orderName, //项目名称
          OrderImg: result.data.OrderImg, //图片
          OrderType: result.data.orderType, //项目类型
          OrderTypeStr: result.data.orderTypeStr //项目类型（文字）
        });
        that.isOved = true;
      });
    },
    CommentOrder() {
      let that = this;
      //客户的评价订单
      post(
        "Order/CommentOrder",
        {
          UserId: that.userId,
          Token: that.token,
          Oid: that.orderId,
          Content: that.content
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          //评价成功
          wx.showToast({
            title: "评价成功!",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(() => {
                that.initData();
                wx.redirectTo({
                  url: "/pages/custom/order/main?typeNo=8"
                });
              }, 1500);
            }
          });
        }
      });
    },
    KfCommentOrder() {
      let that = this;
      //客服的评价订单
      post(
        "CustomerService/KfCommentOrder",
        {
          CsdId: that.userId,
          Token: that.token,
          Oid: that.orderId,
          Content: that.content
        },
        that.curPage
      ).then(res => {
        wx.showToast({
          title: "评价成功!",
          icon: "none",
          duration: 1500,
          success: function() {
            setTimeout(()=>{
              that.initData();
              wx.redirectTo({
                url: "/pages/servicemenu/myOrder/main?typeNo=8"
              });
            }, 1500);
          }
        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>