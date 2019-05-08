<template>
  <div class="page">
    <!-- 订单的 -->
    <div class="column levelPanel">
      <div class="item" v-if="hasData">
        <div class="item__bd">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img" :style="'background-image:url('+detail.OrderImg+')'"></div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">{{detail.OrderName}}</p>
                <p class="type">订单类型：<span v-if="detail.OrderType===0">设计</span><span v-if="detail.OrderType===1">制作</span><span v-if="detail.OrderType===2">安装</span><span v-if="detail.OrderType===3">设计+制作</span><span v-if="detail.OrderType===4">制作+安装</span><span v-if="detail.OrderType===5">设计+制作+安装</span></p>
                <div class="flex">
                  <div class="flex1">
                    <p class="price"><span v-if="detail.MasterType==1">￥{{detail.Change}}</span><span v-if="detail.MasterType==0">无价格</span></p>
                  </div>
                  <span class="buyNum">x{{detail.OrderNum}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传图片 -->
    <div class="uploadSection">
      <div class="item">
        <h2 class="uploadTitle">安装前照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">内部结构照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">安装后照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">客户验收单</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <!-- 内部师傅才有的 -->
      <div class="eaditFrom weui-cells noBorder__weui-cells mt0 pb20">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">交通费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的交通费用">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">餐费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的餐费">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">材料费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的材料费">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">住宿费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的费用">
          </div>
        </div>
      </div>
    </div>
    <div class="ftBtn" style="height:154rpx;">
      <div class="inner fixed bm0 border-box bg_f4f7fc">
        <a class="btn btn-active fill">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装 
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId;
      this.getData();
    }
  },
  data() {
    return {
      userId: "",
      token: "",
      curPage: "",
      orderId: "",
      detail: {},
      hasData: false,
      frontPicList: "", //安装前图片
      afterPicList: "", //安装后图片
      receiptPicList: "", //验收单据图片
      insidePicList: "", //内部结构图片
      progressInfoList: "" //明细
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提交审核"
      });
    },
    getData() {  //获取订单信息
      let that = this;
      post(
        "InstalMaster/GetInstallOrderInfo",
        {
          MasterId: that.userId,
          Token: that.token,
          ProgressId: that.orderId
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          if (res.data.AfterPicList !== "") {
            //安装前图片列表
            that.$set(
              res.data,
              "AfterPicList",
              res.data.AfterPicList.split(",")
            );
          }
          if (res.data.FrontPicList !== "") {
            //安装后图片
            that.$set(
              res.data,
              "FrontPicList",
              res.data.FrontPicList.split(",")
            );
          }
          if (res.data.ReceiptPicList !== "") {
            //验收图片
            that.$set(
              res.data,
              "ReceiptPicList",
              res.data.ReceiptPicList.split(",")
            );
          }
          if (res.data.ReferencePicList !== "") {
            //参考图片列表
            that.$set(
              res.data,
              "ReferencePicList",
              res.data.ReferencePicList.split(",")
            );
          }
          if (res.data.GuidancePicList !== "") {
            //指导图片列表
            that.$set(
              res.data,
              "GuidancePicList",
              res.data.GuidancePicList.split(",")
            );
          }
          if (res.data.ScenePicList !== "") {
            //现场图片列表
            that.$set(
              res.data,
              "ScenePicList",
              res.data.ScenePicList.split(",")
            );
          }
          that.detail = res.data;
          that.hasData = true;
        }
      });
    },
    AddInstallOrder() {
      let that = this;
      post(
        "InstalMaster/AddInstallOrder",
        {
          UserId: that.userId,
          Token: that.token,
          ProgressId: that.orderId,
          FrontPicList: that.frontPicList,
          AfterPicList: that.afterPicList,
          ReceiptPicList: that.receiptPicList,
          InsidePicList: that.insidePicList,
          ProgressInfoList: that.progressInfoList
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
          wx.showToast({
            title: "提交审核成功!",
            icon: "success",
            duration: 1500
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