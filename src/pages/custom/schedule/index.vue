<template>
  <div class="page">
    <!-- 订单的 -->
    <div class="column levelPanel">
      <div class="item">
        <div class="item__bd">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
              </div>
              <div class="txtBox">
                <p class="title" style="margin-bottom:0;">
                  订单状态：
                  <span class="status">已完成</span>
                </p>
                <p class="type">订单类型：设计+制作+安装</p>
                <p>
                  <span class="orderNo">订单编号：TH533166886</span>
                  <span class="btnCopy">复制</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 进度 -->
    <div class="scheduleBox">
      <div class="schedule">
        <div class="item big flex active">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">16:12</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/wgqr_2.png" class="statusIcon" alt>
              <h2 class="status">完工确认</h2>
            </div>
          </div>
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">07：21</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/zpsf.png" class="statusIcon" alt>
              <h2 class="status">指派师傅</h2>
              <p>张**师傅开始为您安装</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">07：21</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">指派师傅</h2> -->
              <p>施工中</p>
            </div>
          </div>
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">07：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/sczz.png" class="statusIcon" alt>
              <h2 class="status">生产制作</h2>
              <p>厂家开始根据设计图制作</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">指派师傅</h2> -->
              <p>
                厂家发货
                <span class="btnCopy">查看物流</span>
              </p>
            </div>
          </div>
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
              <h2 class="status">分配设计师</h2>
              <p>设计师开始设计</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">分配设计师</h2> -->
              <p>设计师上传设计稿</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">分配设计师</h2> -->
              <p>客服审核</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">分配设计师</h2> -->
              <p>客户确认</p>
            </div>
          </div>
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yqd.png" class="statusIcon" alt>
              <h2 class="status">已确认</h2>
              <p>您的订单客服已确认</p>
            </div>
          </div>
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yxd.png" class="statusIcon" alt>
              <h2 class="status">已下单</h2>
              <p>您的订单待客服确认您的订单待客服确认您的订单待客服确认您的订单待客服确认您的订单待客服确认</p>
            </div>
          </div>
        </div>
        <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">已确认</h2> -->
              <p>您的订单开始处理</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
  onLoad() {
      this.setBarTitle();
  },
  onShow() {},
  data() {
    return {};
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "查看进度"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
