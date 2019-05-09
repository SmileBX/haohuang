<template>
  <div class="page" v-if="hasData">
    <div class="orderStatus">
      <span v-if="detail.Status==0">施工中</span>
      <span v-if="detail.Status==1">待审核</span>
      <span v-if="detail.Status==2">审核已通过</span>
      <span v-if="detail.Status==3">审核未通过</span>
      <span v-if="detail.Status==4">已完成</span>
    </div>
    <div class="orderAddr bg_fff">
      <!-- <div class="newsLogistics flex flexAlignCenter">
        <img src="/static/images/icons/logistics.png" class="icon_xiaoche" alt>
        <div class="flexItem flex1">
          <p class="txt">分配师傅：张**师傅为你服务</p>
          <p class="time">2018-11-15 18:02:25</p>
        </div>
        <span class="icon-arrow arrow-right" style="margin-right:-20rpx;"></span>
      </div> -->
      <div class="addressList">
        <div class="item flex flexAlignEnd">
          <img src="/static/images/icons/address.png" class="addrIcon" alt>
          <div class="item__bd flex1">
            <p class="remarks">
              <span class="name">{{detail.ContactName }}</span>
              <span class="tel">{{detail.Tel}}</span>
            </p>
            <p class="address">{{detail.AddressInfo }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品信息 -->
    <div class="goodsContent bg_fff">
      <div class="column levelPanel">
        <div class="item">
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
    <div class="picList bg_fff" v-if="detail.Status!==0">
      <div class="item" v-if="detail.AfterPicList.length>0">
        <h2 class="title">安装前照片</h2>
        <div class="uploadImage clear">
          <div
            class="upload-img img"
            @click="lookPic(index,detail.AfterPicList)"
            v-for="(item,index) in detail.AfterPicList"
            :key="index"
            :style="'background-image:url('+item+')'"
          ></div>
        </div>
      </div>
      <div class="item" v-if="detail.InsidePicList.length>0">
        <h2 class="title">内部结构照片</h2>
        <div class="uploadImage clear">
          <div
            class="upload-img img"
            @click="lookPic(index,detail.InsidePicList)"
            v-for="(item,index) in detail.InsidePicList"
            :key="index"
            :style="'background-image:url('+item+')'"
          ></div>
        </div>
      </div>
      <div class="item" v-if="detail.FrontPicList.length>0">
        <h2 class="title">安装后照片</h2>
        <div class="uploadImage clear">
          <div
            class="upload-img img"
            @click="lookPic(index,detail.FrontPicList)"
            v-for="(item,index) in detail.FrontPicList"
            :key="index"
            :style="'background-image:url('+item+')'"
          ></div>
        </div>
      </div>
      <div class="item" v-if="detail.ReceiptPicList.length>0">
        <h2 class="title">客户验收单</h2>
        <div class="uploadImage clear">
          <div
            class="upload-img img"
            @click="lookPic(index,detail.ReceiptPicList)"
            v-for="(item,index) in detail.ReceiptPicList"
            :key="index"
            :style="'background-image:url('+item+')'"
          ></div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo bg_fff mb10">
      <div class="orderInfo__hd weui-cells__title bl__weui-cells__title">
        <span class="title">订单信息</span>
      </div>
      <div class="orderInfo__bd">
        <div class="item">
          订单编号：{{detail.OrderNo}}
          <span class="btnCopy" @click="copy(detail.OrderNo)">复制</span>
        </div>
        <div class="item">创建时间：{{detail.CreateTime}}</div>
        <div class="item">支付时间：{{detail.PayTime}}</div>
        <div class="item">接单时间：{{detail.ReceiptTime}}</div>
        <div class="item" v-if="detail.Status==0">预计完成：{{detail.EstimateTime}}</div>
        <div class="item" v-if="detail.Status==4">完成时间：{{detail.EndTime}}</div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="ftBtn ftBtns">
      <div class="inner flex fixed bm0 bg_fff border-box justifyContentEnd">
        <!-- 施工中 -->

        <div class="btn linear" v-if="detail.Status==0" @click="gotoSmVerify">提交审核</div>
        <div class="btn linear" v-if="detail.Status==3">重新提交</div>
        <div
          class="btn btn-active"
          v-if="detail.Status==0" @click="callCustom(detail.Tel)"
        >联系客户</div>
        <div class="btn btn-active" @click="callService(detail.ServiceTel)">联系客服</div>
      </div>
    </div>
    <!-- 联系客服 -->
    <serviceTypeSelect
      :selectServiceTypeStatus.sync="selectServiceTypeStatus"
      :servicePhone="servicePhone"
    ></serviceTypeSelect>
  </div>
</template>
<script>
//"Status": "0",--状态 0-已接单(施工中),1-待审核(已安装) ,2-审核通过(结算薪资和积分), 3-审核拒绝, 4-订单完成
//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
//"MasterType": 0,--安装师傅所属类型 0-公司内部 1-公司外部
import {
  post,
  toLogin,
  getCurrentPageUrlWithArgs,
  previewImage
} from "@/utils";
import serviceTypeSelect from "@/components/serviceTypeSelect.vue";

export default {
  data() {
    return {
      UserId: "",
      Token: "",
      curPage: "",
      orderId: "",
      detail: {},
      hasData: false,
      servicePhone:"", //客服电话
      selectServiceTypeStatus: false, //联系客服类型弹窗状态
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.UserId = wx.getStorageSync("userId");
    this.Token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    console.log(this.$root.$mp.query.orderId);
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId;
      this.getData();
    }
  },
  components:{
   serviceTypeSelect
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
    },
    // 联系客服
    callService(phone) {
      console.log("___________");
      console.log("tel:"+phone);
      this.servicePhone = phone;
      this.selectServiceTypeStatus = true;
    },
    callCustom(tel) {
      //拨打电话(联系客户)
      wx.makePhoneCall({
        phoneNumber: tel // 仅为示例，并非真实的电话号码
      });
    },
    lookPic(index, picArr) {
      //预览图片
      previewImage(index, picArr);
    },
    gotoSmVerify() {
      let that = this;
      //跳转到提交审核
      wx.navigateTo({
        url: "/pages/master/smVerify/main?orderId="+that.orderId
      });
    },
    getData() {
      let that = this;
      post(
        "InstalMaster/GetInstallOrderInfo",
        {
          MasterId: that.UserId,
          Token: that.Token,
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
          if (res.data.InsidePicList !== "") {
            //内部结构图片列表
            that.$set(
              res.data,
              "InsidePicList",
              res.data.InsidePicList.split(",")
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
    copy(orderNo) {
      wx.setClipboardData({
        data: orderNo,
        success() {
          wx.showToast({
            title: "复制成功！"
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>