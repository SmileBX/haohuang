<template>
  <div class="page">
    <!-- 订单的 -->
    <div class="column levelPanel">
      <div class="item">
        <div class="item__bd">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue">
                  <img style="width:100%;position:absolute;top:0;height:100%;" :src="schduleInfo.OrderImg">
                </div>
              </div>
              <div class="txtBox">
                <p class="title" style="margin-bottom:0;">
                  订单状态：
                  <span class="status">{{schduleInfo.OrderStatusStr}}</span>
                </p>
                <p class="type">订单类型：{{schduleInfo.orderTypeStr}}</p>
                <p style="font-size:26rpx;">
                  <span class="orderNo">订单编号：{{schduleInfo.orderNo}}</span>
                  <span class="btnCopy2" @click="copy(schduleInfo.orderNo)">复制</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 进度 -->
    <div class="scheduleBox" >
      <div class="schedule">
        <!-- 订单已完成 -->
        <div class="section" v-if="schduleInfo.OverTime.length>0">
          <div class="item big flex active">
            <div class="left time">
              <p class="date">{{OverDate}}</p>
              <p class="hours">{{OverTime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/wgqr_2.png" class="statusIcon" alt>
                <h2 class="status">已完工</h2>
              </div>
            </div>
          </div>
        </div>
        <!-- 安装模块 -->
        <div
          class="section"
          v-if="schduleInfo.IsInstallModule==1 && schduleInfo.InstallList.length>0"
        >
          <!-- 指派师傅 -->
          <div class="item big flex">
            <div class="left time">
              <p class="date">
                <span>{{MasterNameDate}}</span>
              </p>
              <p class="hours">
                <span>{{MasterNameTime}}</span>
              </p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/zpsf.png" class="statusIcon" alt>
                <h2 class="status">指派师傅</h2>
                <p>{{MasterName}}开始为你安装中</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 安装模块  end -->
        <!-- 专门的制作模块 -->
        <!-- 制作中、发货 -->
        <div class="section" v-if="schduleInfo.IsMakeModule==1 && schduleInfo.OrderStatus>=3">
          <div class="item flex small" v-if="schduleInfo.OrderStatus>=4">
            <div class="left time">
              <p class="date">
                <span>{{Fahuodate}}</span>
              </p>
              <p class="hours">
                <span>{{Fahuotime}}</span>
              </p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <!-- <img src="/static/images/icons/sczz.png" class="statusIcon" alt> -->
                <!-- <h2 class="status">制作中</h2> -->
                <p>
                  已发货
                  <span class="btnCopy" @click="seeLogs(schduleInfo.orderNo)">查看物流</span>
                </p>
                <p style="font-size:24rpx">请查看物流并确认收货</p>
              </div>
            </div>
          </div>
          <div class="item big flex">
            <div class="left time">
              <p class="date">
                <span
                  v-if="schduleInfo.IsMakeModule==1 && schduleInfo.IsDesignModule==1"
                >{{DesignAuditDate}}</span>
                <span
                  v-if="schduleInfo.IsMakeModule==1 && schduleInfo.IsDesignModule==0"
                >{{Paydate}}</span>
              </p>
              <p class="hours">
                <span
                  v-if="schduleInfo.IsMakeModule==1 && schduleInfo.IsDesignModule==1"
                >{{DesignAuditTime}}</span>
                <span
                  v-if="schduleInfo.IsMakeModule==1 && schduleInfo.IsDesignModule==0"
                >{{Paytime}}</span>
              </p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/sczz.png" class="statusIcon" alt>
                <h2 class="status">制作中</h2>
                <p>正在根据设计图制作</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 发货  end -->
        <!-- 专门的制作模块  end -->

        <!-- 专门的设计模块 -->
        <!-- 设计完成 -->
        <div
          class="section"
          v-if="(schduleInfo.IsDesignModule==1 && schduleInfo.DesignStatus == 2) || (schduleInfo.IsDesignModule==1 && schduleInfo.DesignStatus == 4)"
        >
          <div class="item big flex">
            <div class="left time">
              <p class="date">{{DesignAuditDate}}</p>
              <p class="hours">{{DesignAuditTime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
                <h2 class="status">完成设计</h2>
              </div>
            </div>
          </div>
          <div class="item small flex">
            <div class="left time">
              <p class="date">{{DesignOverdate}}</p>
              <p class="hours">{{DesignOverTime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <p>
                  客户确认设计
                  <span class="btnCopy" @click="seePics(schduleInfo.orderId)">查看设计图</span>
                </p>
              </div>
            </div>
          </div>
          <div class="item big flex">
            <div class="left time">
              <p class="date">{{Paydate}}</p>
              <p class="hours">{{Paytime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
                <h2 class="status">设计中</h2>
                <p>设计师正在设计</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 设计完成  end -->
        <!-- 设计待确认 -->
        <div class="section" v-if="schduleInfo.IsDesignModule==1 && schduleInfo.DesignStatus == 1">
          <div class="item small flex">
            <div class="left time">
              <p class="date">{{DesignOverdate}}</p>
              <p class="hours">{{DesignOverTime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <p>
                  客户确认设计
                  <span class="btnCopy" @click="confirmButtonModal">确认设计</span>
                  <span class="btnCopy" @click="seePics(schduleInfo.orderId)">查看设计图</span>
                </p>
              </div>
            </div>
          </div>
          <div class="item big flex">
            <div class="left time">
              <p class="date">{{Paydate}}</p>
              <p class="hours">{{Paytime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
                <h2 class="status">设计中</h2>
                <p>设计师正在设计</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 设计待确认  end -->
        <!-- 设计中 -->
        <div class="section" v-if="schduleInfo.IsDesignModule==1 && schduleInfo.DesignStatus == 0">
          <div class="item big flex">
            <div class="left time">
              <p class="date">{{Paydate}}</p>
              <p class="hours">{{Paytime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
                <h2 class="status">设计中</h2>
                <p>设计师正在设计</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 设计中  end -->
        <!-- 专门的设计模块  end -->
        <div class="section">
          <div class="item small flex">
            <div class="left time">
              <p class="date">{{Confirmdate}}</p>
              <p class="hours">{{Confirmtime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <p>已确认</p>
                <p style="font-size:24rpx">您的订单客服已确认</p>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="item big flex">
            <div class="left time">
              <p class="date">{{Createdate}}</p>
              <p class="hours">{{Createtime}}</p>
            </div>
            <div class="right flex1">
              <div class="txtBox">
                <img src="/static/images/icons/yxd.png" class="statusIcon" alt>
                <h2 class="status">已下单</h2>
                <p>您的订单待客服确认</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//orderType 0-设计 1-制作" 2-安装 3-设计_制作 4-制作_安装 5-设计_制作_安装
// 待确认=0,
// 待付款=1,
// 待设计=2, -----设计中
// 待制作=3,
// 已发货=4,
// 已收货=5,
// 待执行=6,
// 已执行=7,
// 待评论=8,
// 已完成=9,
// 交易关闭=99,
// 待确认=0,---底部按钮---在线客服
// 待付款=1,---去掉订单   付款
//待确认=---底部按钮---在线客服
//处理中=---底部按钮---在线客服
//订单已取消--在线客服
//交易成功---去评价
import "@/css/dd_style.css";
import {
  post,
  toLogin,
  getCurrentPageUrlWithArgs,
  formatTime
} from "@/utils/index";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    this.OrderNoId = this.$root.$mp.query.OrderNoId;
    this.orderStatus = this.$root.$mp.query.OrderStatus;
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    //console.log(this.OrderNoId,this.orderStatus,"this.orderStatus")
    this.getDate();
  },
  data() {
    return {
      UserId: "",
      Token: "",
      OrderNoId: "",
      orderStatus: "",
      curPage: "",
      identity: "",
      schduleInfo: "",
      Createdate: "",
      Createtime: "", //订单创建时间
      Paydate: "",
      Paytime: "", //支付---开始（订单流程时间）
      Confirmdate: "", //订单确认（客服确认时间）
      Confirmtime: "",
      Fahuotime: "", //发货
      Fahuodate: "",
      DesignOverdate: "", //设计提交时间
      DesignOverTime: "",
      DesignAuditDate: "", //设计完成时间（有制作的时候也是制作中）
      DesignAuditTime: "",
      OverDate: "", //完成
      OverTime: "",
      MasterName: "", //安装师傅队长名称
      MasterNameDate: "", //指派师傅的时间
      MasterNameTime: "",
      isShow: false
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "查看进度"
      });
    },
    //获取订单进度
    getDate() {
      if (toLogin(this.curPage)) {
        post(
          "Order/OrderProgressInfo",
          {
            UserId: this.UserId,
            Token: this.Token,
            OrderNo: this.OrderNoId
          },
          this.curPage
        ).then(res => {
          if (res.code === 0) {
             this.schduleInfo = {
              OrderStatusStr: res.data.OrderStatusStr,
              orderTypeStr: res.data.orderTypeStr,
              orderNo: res.data.orderNo,
              OrderStatus: res.data.OrderStatus,
              orderType: res.data.orderType,
              orderId: res.data.orderId,
              OrderImg: res.data.OrderImg,
              IsDesignModule: res.data.IsDesignModule,
              IsInstallModule: res.data.IsInstallModule,
              IsMakeModule: res.data.IsMakeModule,
              DesignStatus: res.data.DesignStatus,
              InstallList: res.data.InstallList,
              OverTime: res.data.OverTime
            };
             this.isShow = true;
             console.log("fdsfsdfsdfsdf");
          }
            if (res.data.InstallList.length > 0) {
              res.data.InstallList.forEach(item => {
                if (item.IsMain === 1) {
                  this.MasterName = item.MasterName;
                  if (item.InstallTime.length > 0) {
                    this.MasterNameDate = item.InstallTime.split(" ")[0]
                      .split("-")
                      .splice(1)
                      .join("-"); //指派师傅的时间
                    this.MasterNameTime = item.InstallTime.split(" ")[1]
                      .split(":")
                      .slice(0, -1)
                      .join(":");
                  }
                }
              });
            }
            //创建订单
            if (res.data.CreateTime.length > 0) {
              this.Createdate = res.data.CreateTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-"); //订单创建时间
              this.Createtime = res.data.CreateTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":"); //订单创建时间
            }
            if (res.data.PayTime.length > 0) {
              //设计单的时候：就是设计中时间；是安装单的时候就是：安装中时间；制作的时候就是：制作中时间
              this.Paydate = res.data.PayTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-"); //支付时间
              this.Paytime = res.data.PayTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":"); //支付时间
            }
            //后台提交设计稿的时间
            if (res.data.DesignOverTime.length > 0) {
              this.DesignOverdate = res.data.DesignOverTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-");
              this.DesignOverTime = res.data.DesignOverTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":");
            }
            //客户确认设计稿的时间
            if (res.data.DesignAuditTime.length > 0) {
              this.DesignAuditDate = res.data.DesignAuditTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-");
              this.DesignAuditTime = res.data.DesignAuditTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":");
            }
            //发货
            if (res.data.Fahuodate.length > 0) {
              this.Fahuodate = res.data.Fahuodate.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-"); //发货时间
              //  console.log(Fahuodate,"Confirmtime")
              this.Fahuotime = res.data.Fahuodate.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":"); //发货时间
            }
            //订单(客户确认)确认
            if (res.data.ConfirmTime.length > 0) {
              // ConfirmTime:res.data.ConfirmTime   //订单
              this.Confirmdate = res.data.ConfirmTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-"); //订单
              this.Confirmtime = res.data.ConfirmTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":"); //订单
            }
            //订单完成
            if (res.data.OverTime.length > 0) {
              // ConfirmTime:res.data.ConfirmTime   //订单完成时间
              this.OverDate = res.data.EndTime.split(" ")[0]
                .split("-")
                .splice(1)
                .join("-"); //订单完成时间
              this.OverTime = res.data.EndTime.split(" ")[1]
                .split(":")
                .slice(0, -1)
                .join(":"); //订单完成时间
            }
            //this.schduleInfo=res.data
           
        });
      }
    },
    // 复制
    copy(orderNo) {
      wx.setClipboardData({
        data: orderNo,
        success() {
          // wx.showToast({
          //   title: "复制成功！"
          // });
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    //查看物流
    seeLogs(OrderNo) {
      wx.navigateTo({
        url: "/pages/schelogs/main?OrderNo=" + OrderNo
      });
    },
    //确认设计
    confirmButtonModal() {
      wx.showModal({
        title: "设计确认",
        confirmColor: "#33cc33",
        cancelColor,
        cancelText: "不通过",
        confirmText: "通过",
        success(res) {
          if (res.confirm) {
            that.confirmButton(0);
          } else if (res.cancel) {
            // 等于设计的时候才有不通过
            if (types === "design") {
              that.confirmButton(1);
            }
          }
        }
      });
    },
    //
    // 确认设计
    confirmButton(AuditType) {
      console.log(AuditType, "设计确认状态");
      if (toLogin(this.curPage)) {
        post("Order/OrderCollection", {
          UserId: this.UserId,
          Token: this.Token,
          OrderNo: this.orderId,
          AuditType: AuditType
        }).then(res => {
          console.log(res);
          wx.showToast({
            title: res.msg,
            duration: 2000
          });
          setTimeout(function() {
            wx.redirectTo({ url: "/pages/custom/order/main" });
          }, 1000);
        });
      }
    },
    //查看设计稿
    seePics(orderId) {
      wx.navigateTo({ url: "/pages/designPic/main?orderId=" + orderId });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
