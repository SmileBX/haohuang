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
                <p class="type">
                  订单类型：
                  <span v-if="detail.OrderType===0">设计</span>
                  <span v-if="detail.OrderType===1">制作</span>
                  <span v-if="detail.OrderType===2">安装</span>
                  <span v-if="detail.OrderType===3">设计+制作</span>
                  <span v-if="detail.OrderType===4">制作+安装</span>
                  <span v-if="detail.OrderType===5">设计+制作+安装</span>
                </p>
                <div class="flex">
                  <div class="flex1">
                    <p class="price">
                      <span v-if="detail.MasterType==1">￥{{detail.Change}}</span>
                      <span v-if="detail.MasterType==0">无价格</span>
                    </p>
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
          <!-- 上传展示的图片 -->
          <div class="upload-img img" v-for="(item, index) in frontPicList" :key="index">
            <img :src="item" alt>
            <img src="/static/images/icons/cancle.png" class="close" @click="delImg(1,index)" alt>
          </div>
          <div v-if="frontPicList.length<picLength" class="button-upload" @click="chosseImg(1)">
            <img src="/static/images/icons/upload_1.png" alt>
          </div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">内部结构照片</h2>
        <div class="uploadImage clear">
          <!-- 上传展示的图片 -->
          <div class="upload-img img" v-for="(item, index) in insidePicList" :key="index">
            <img :src="item" alt>
            <img src="/static/images/icons/cancle.png" class="close" @click="delImg(2,index)" alt>
          </div>
          <div v-if="insidePicList.length<picLength" class="button-upload" @click="chosseImg(2)">
            <img src="/static/images/icons/upload_1.png" alt>
          </div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">安装后照片</h2>
        <div class="uploadImage clear">
          <!-- 上传展示的图片 -->
          <div class="upload-img img" v-for="(item, index) in afterPicList" :key="index">
            <img :src="item" alt>
            <img src="/static/images/icons/cancle.png" class="close" @click="delImg(3,index)" alt>
          </div>
          <div v-if="afterPicList.length<picLength" class="button-upload" @click="chosseImg(3)">
            <img src="/static/images/icons/upload_1.png" alt>
          </div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">客户验收单</h2>
        <div class="uploadImage clear">
          <!-- 上传展示的图片 -->
          <div class="upload-img img" v-for="(item, index) in receiptPicList" :key="index">
            <img :src="item" alt>
            <img src="/static/images/icons/cancle.png" class="close" @click="delImg(4,index)" alt>
          </div>
          <div v-if="receiptPicList.length<picLength" class="button-upload" @click="chosseImg(4)">
            <img src="/static/images/icons/upload_1.png" alt>
          </div>
        </div>
      </div>
    </div>
    <!-- 内部师傅才有的 -->
    <div v-if="masterType==0">
      <div
        class="eaditFrom weui-cells noBorder__weui-cells"
        style="margin-bottom:0;"
        v-for="(item,index) in progressInfoList"
        :key="index"
      >
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">交通费</label>
          </div>
          <div class="weui-cell__bd">
            <input
              type="number"
              class="weui-input"
              v-model="item.TrafficMoney"
              placeholder="请输入安装所需的交通费用"
            >
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">餐费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="number" class="weui-input" v-model="item.Meals" placeholder="请输入安装所需的餐费">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">材料费</label>
          </div>
          <div class="weui-cell__bd">
            <input
              type="number"
              class="weui-input"
              v-model="item.MaterialFee"
              placeholder="请输入安装所需的材料费"
            >
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">住宿费</label>
          </div>
          <div class="weui-cell__bd">
            <input
              type="number"
              class="weui-input"
              v-model="item.HotelExpense"
              placeholder="请输入安装所需的费用"
            >
          </div>
        </div>
        <div
        style="padding-bottom:40rpx;padding-top:40rpx;"
        class="addDetail bg_fff" v-if="progressInfoList.length>1 && index !==progressInfoList.length-1"
      >
        <div class="btn btn-add" style="color:#666;border-color:#e5e5e5;" @click="delOrder(index)">
          删除明细
        </div>
      </div>
      </div>
      <!--按钮增加明细-->
      <div
        style="padding-bottom:40rpx;padding-top:40rpx;"
        class="addDetail bg_fff"
        @click="addOrder"
      >
        <div class="btn btn-add">
          <img src="/static/images/icons/add_2.png" alt>增加明细
        </div>
      </div>
    </div>
    <div class="ftBtn" style="height:154rpx;">
      <div class="inner fixed bm0 border-box bg_f4f7fc">
        <a class="btn btn-active fill" @click="submitApply">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
import { post, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import { pathToBase64 } from "@/utils/image-tools";
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId;
      if (toLogin(this.curPage)) {
        this.getData();
      }
    }
    if (this.$root.$mp.query.masterType) {
      this.masterType = this.$root.$mp.query.masterType;
    }
  },
  onShow() {},
  data() {
    return {
      userId: "",
      token: "",
      curPage: "",
      orderId: "",
      detail: {},
      hasData: false,
      picLength: 8, //最多上传10张
      frontPicList: [], //安装前图片
      insidePicList: [], //内部结构图片
      afterPicList: [], //安装后图片
      receiptPicList: [], //验收单据图片
      progressInfoList: [
        {
          TrafficMoney: "0", //交通费
          Meals: "0", //餐费
          HotelExpense: "0", //住宿费
          MaterialFee: "0" //材料费
        }
      ], //明细
      infoLength: 10,
      curInfo: 1,
      masterType: "" //是否显示明细MasterType:1==>外部师傅；0==>内部师傅
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提交审核"
      });
    },
    initData(){
    },
    valOther() {
      if (this.frontPicList.length <= 0) {
        wx.showToast({
          title: "请上传安装前图片!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.insidePicList.length <= 0) {
        wx.showToast({
          title: "请上传内部结构图片!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.afterPicList.length <= 0) {
        wx.showToast({
          title: "请上传安装后图片!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.receiptPicList.length <= 0) {
        wx.showToast({
          title: "请验收单据图片!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
     
      return true;
    },
    chosseImg(index) {
      let that = this;
      let num = 0;
      if (index === 1) {
        //上传安装前照片
        num = that.picLength - that.frontPicList.length;
      } else if (index === 2) {
        //上传内部结构照片
        num = that.picLength - that.insidePicList.length;
      } else if (index === 3) {
        //上传安装后照片
        num = that.picLength - that.afterPicList.length;
      } else if (index === 4) {
        //上传客户验收单照片
        num = that.picLength - that.receiptPicList.length;
      } else {
        return false;
      }
      wx.chooseImage({
        count: num, //最大图片数量=最大数量-临时路径的数量
        sizeType: ["compressed"], //图片尺寸 original--原图；compressed--压缩图
        sourceType: ["album", "camera"], //选择图片的位置 album--相册选择, 'camera--使用相机
        success: res => {
          res.tempFilePaths.forEach(item => {
            if (index === 1) {
              that.frontPicList.push(item);
            }
            if (index === 2) {
              that.insidePicList.push(item);
            }
            if (index === 3) {
              that.afterPicList.push(item);
            }
            if (index === 4) {
              that.receiptPicList.push(item);
            }
          });
        }
      });
    },
    async base64Img(arr) {
      let base64Arr = [];
      for (let i = 0; i < arr.length; i += 1) {
        const res = await pathToBase64(arr[i]);
        base64Arr.push({
          PicUrl: res
        });
      }
      return base64Arr;
    },
    delImg(type, index) {
      if (type === 1) {
        this.frontPicList.splice(index, 1);
      }
      if (type === 2) {
        this.insidePicList.splice(index, 1);
      }
      if (type === 3) {
        this.afterPicList.splice(index, 1);
      }
      if (type === 4) {
        this.receiptPicList.splice(index, 1);
      }
    },
    async submitApply() {
      let that = this;
      let frontPicList = await that.base64Img(that.frontPicList);
      let insidePicList = await that.base64Img(that.insidePicList);
      let afterPicList = await that.base64Img(that.afterPicList);
      let receiptPicList = await that.base64Img(that.receiptPicList);
      let progressInfoList = "";
      that.progressInfoList.forEach(item =>{
         for(let key in item){
           console.log(key);
           if(item[key] ==""){
             item[key] = 0;
           }
         }
       });
      //  console.log()
      if (that.masterType == 0) {
        progressInfoList = JSON.stringify(that.progressInfoList);
      }
       
      if (that.valOther()) {
        that.AddInstallOrder(
          JSON.stringify(frontPicList),
          JSON.stringify(insidePicList),
          JSON.stringify(afterPicList),
          JSON.stringify(receiptPicList),
          progressInfoList

        );
      }
    },
    addOrder() {
      //添加明细
      if (this.curInfo < this.infoLength) {
        this.curInfo++;
        this.progressInfoList.unshift({
          TrafficMoney: "", //交通费
          Meals: "", //餐费
          HotelExpense: "", //住宿费
          MaterialFee: "" //材料费
        });
      } else {
        //提示最多只能加10次明细
      }
    },
    delOrder(index){  //删除明细
     this.progressInfoList.splice(index,1);
    },
    getData() {
      //获取订单信息
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
          that.masterType = res.data.MasterType;
          if (res.data.FrontPicList !== "") {
            //安装前
            that.frontPicList = res.data.FrontPicList.split(",");
          }
          if (res.data.AfterPicList !== "") {
            //安装后
            that.afterPicList = res.data.AfterPicList.split(",");
          }
          if (res.data.InsidePicList !== "") {
            that.insidePicList = res.data.InsidePicList.split(",");
          }
          if (res.data.ReceiptPicList !== "") {
            //验收单图片
            that.receiptPicList = res.data.ReceiptPicList.split(",");
          }
          that.detail = res.data;
          that.hasData = true;
          that.progressInfoList = [];
          if (res.data.ProgressInfo.length > 0) {
            //明细
            // let info = JSON.parse(res.data.ProgressInfo);
            res.data.ProgressInfo.map(item => {
              that.progressInfoList.push({
                TrafficMoney: item.TrafficMoney, //交通费
                Meals: item.Meals, //餐费
                HotelExpense: item.HotelExpense, //住宿费
                MaterialFee: item.MaterialFee //材料费
              });
            });
          }
        }
      });
    },
    AddInstallOrder(
      frontPicList,
      insidePicList,
      afterPicList,
      receiptPicList,
      progressInfoList
    ) {
      //this.base64Img(this.frontPicList);
      //console.log("arr", arr);
      //return false;
      console.log("重新提交");
      let that = this;
      post(
        "InstalMaster/AddInstallOrder",
        {
          MasterId: that.userId,
          Token: that.token,
          ProgressId: that.orderId,
          FrontPicList: frontPicList,
          InsidePicList: insidePicList,
          AfterPicList: afterPicList,
          ReceiptPicList: receiptPicList,
          ProgressInfoList: progressInfoList
        },
        that.curPage
      ).then(result => {
        if (result.code === 0) {
            this.detail={}
            this.frontPicList=[], //安装前图片
            this.insidePicList=[], //内部结构图片
            this.afterPicList=[], //安装后图片
            this.receiptPicList=[], //验收单据图片
            this.progressInfoList=[
            {
              TrafficMoney: "0", //交通费
              Meals: "0", //餐费
              HotelExpense: "0", //住宿费
              MaterialFee: "0" //材料费
            }
            
          ], //明细
          wx.showToast({
            title: "提交成功!",
            icon: "success",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                // wx.navigateTo({
                //   url: "/pages/master/orderDetail/main?orderId=" + that.orderId
                // });
                 wx.reLaunch({
                  url: "/pages/master/myOrder/main?typeNo=1"
                });
              }, 1500);
            }
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