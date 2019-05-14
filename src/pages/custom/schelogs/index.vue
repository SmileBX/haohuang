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
                  物流状态：
                  <span class="status">已签收</span>
                </p>
                <p class="type">承运来源：{{schduleInfo.companyName}}</p>
                <p style="font-size:26rpx;">
                  <span class="orderNo">运单编号：{{schduleInfo.orderNo}}</span>
                  <span class="btnCopy2"  @click="copy(schduleInfo.orderNo)">复制</span>
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
        <!--收-->
        <div class="item big flex">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">07：21</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/get1.png" class="statusIcon statusIcon2" alt>
              <p>[收货地址]广东省2224657986514654987864564</p>
            </div>
          </div>
        </div>
        <!--已签收-->
        <!-- <div class="item big flex">
          <div class="left time">
            <p class="date">11-13</p>
            <p class="hours">07：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/wgqr_2.png" class="statusIcon" alt>
              <h2 class="status">已签收</h2>
              <p>快递被包裹超市签收 如有问题请电联业务员：张三 【1352632541】</p>
            </div>
          </div>
        </div> -->
        <!--派送中-->
        <!-- <div class="item big flex" >
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
              <h2 class="status">派送中</h2>
              <p>【深圳市】广东省深圳公司罗湖区布派件  李四 13625412365</p>
            </div>
          </div>
        </div> -->
        <!--运输中-->
        <!-- <div class="item big flex" >
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
              <h2 class="status">运输中</h2>
              <p>在广东深圳公司进行发出扫描，发往：广东深圳 公司罗湖区布吉中心分部  </p>
            </div>
          </div>
        </div>
        <div class="item small flex" >
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <p>在分拨中心广东深圳公司进行卸车扫描</p>
            </div>
          </div>
        </div> -->
        <!-- <div class="item small flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <p>在上海分拨中心进行装车扫描，发往：广东深圳 公司</p>
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
              <p>在上海分拨中心进行称重扫描</p>
            </div>
          </div>
        </div> -->
        <div class="item flex" v-for="(item,index) in transformList" :key="index" :class="item.getGoods || item.sendGoods || item.pullGoods?'big':'small'">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/wgqr_2.png" class="statusIcon" alt v-if="item.getGoods">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt v-if="item.sendGoods">
              <img src="/static/images/icons/car1.png" class="statusIcon" alt  v-if="item.pullGoods">
              <!-- <p>在上海宝山区罗泾公司进行下级地点扫描，发往： 广东深圳分拨中心</p> -->
              <p>{{item.context}}</p>
            </div>
          </div>
        </div>
        <!--已揽件-->
        <!-- <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/car1.png" class="statusIcon" alt>
              <h2 class="status">已揽件</h2>
              <p>您的包裹在上海公司进行揽件</p>
            </div>
          </div>
        </div> -->
        <!--已发货-->
        <!-- <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/outstore1.png" class="statusIcon" alt>
              <h2 class="status">已发货</h2>
              <p>卖家发货</p>
            </div>
          </div>
        </div> -->
        <!--已出库-->
        <!-- <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yqd.png" class="statusIcon" alt>
              <h2 class="status">已出库</h2>
              <p>您的包裹已出库</p>
            </div>
          </div>
        </div> -->
        <!--已下单-->
        <!-- <div class="item big flex">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yxd.png" class="statusIcon" alt>
              <h2 class="status">已下单</h2>
              <p>您的订单待配送</p>
            </div>
          </div>
        </div> -->
        <!--开始处理-->
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
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
  onLoad() {
      this.setBarTitle();
  },
  onShow() {
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    this.OrderNo = this.$root.$mp.query.OrderNo;
    this.orderStatus = this.$root.$mp.query.OrderStatus;
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    //console.log(this.OrderNoId,this.orderStatus,"this.orderStatus")
    this.getDate()
  },
  data() {
    return {
      UserId: "",
      Token: "",
      OrderNo:'',
      orderStatus:'',
      curPage: "",
      identity:'',
      schduleInfo:"",
      transformList:[],
      //签收的标记
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "查看物流"
      });
    },
    //获取订单进度
    getDate(){
        if(toLogin(this.curPage)){
          post('Order/GetLogistics',{
              UserId:this.UserId,
              Token:this.Token,
              OrderNo:this.OrderNo
          },this.curPage).then(res=>{
            //console.log(res,"物流进度")
            this.schduleInfo= JSON.parse(res.data)
            //console.log(this.schduleInfo,"this.schdulelog111111111111111111111111")
            const transformList=JSON.parse(res.data).data;
            console.log(transformList);
            let info={}
            for(let i=0;i<transformList.length;i++){
                info={
                  date:transformList[i].time,
                  time:transformList[i].time,
                  context:transformList[i].context,
                  getGoods:false,//是否签收
                  sendGoods:false,//派件 
                  pullGoods:false,//揽件  
                }
                this.transformList.push(info)
              }
              for(let int of this.transformList){
                  if(int.context.indexOf('签收')!=-1){
                     int.getGoods=true
                  }
                  if(int.context.indexOf('派件')!=-1){
                    int.sendGoods=true
                  }
                  if(int.context.indexOf('揽件')!=-1){
                    int.pullGoods=true
                  }
              }
            console.log(this.transformList,"transformList66666666666666666")
            })
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
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
