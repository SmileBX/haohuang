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
                  <span class="status">{{schduleInfo.OrderStatusStr}}</span>
                </p>
                <p class="type">订单类型：{{schduleInfo.orderTypeStr}}</p>
                <p style="font-size:26rpx;">
                  <span class="orderNo">订单编号：{{schduleInfo.orderNo}}</span>
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
        <!--完成-->
        <div class="item big flex active" v-if="schduleInfo.OrderStatus==9">
          <div class="left time">
            <p class="date" v-if="enddate.length>0">{{enddate}}</p>
            <p class="hours" v-if="endtime.length>0">{{endtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/wgqr_2.png" class="statusIcon" alt>
              <h2 class="status">已完工</h2>
            </div>
          </div>
        </div>
        <!--已执行、安装中-->
        <!-- <div class="item big flex" v-if="schduleInfo.OrderStatus==7 || schduleInfo.OrderStatus==9"> -->
        <div class="item big flex" v-show="schduleInfo.orderTypeStr!='设计' && schduleInfo.orderTypeStr!='制作' && schduleInfo.orderTypeStr!='设计_制作' && schduleInfo.OrderStatus==7">
          <div class="left time">
            <p class="date" v-if="Installdate.length>0">{{Installdate}}</p>
            <p class="hours" v-if="Installtime.length>0">{{Installtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/zpsf.png" class="statusIcon" alt>
              <h2 class="status">指派师傅</h2>
              <p>{{masterName}}师傅为您安装</p>
            </div>
          </div>
        </div>
        <!--待执行-->
        <!-- <div class="item small flex" v-show="schduleInfo.orderTypeStr!='设计' && schduleInfo.orderTypeStr!='制作' && schduleInfo.orderTypeStr!='设计_制作'  && schduleInfo.OrderStatus==7">
          <div class="left time">
            <p class="date" v-if="Confirmdate.length>0">{{Confirmdate}}</p>
            <p class="hours" v-if="Confirmtime.length>0">{{Confirmtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              
              <p>施工中</p>
            </div>
          </div>
        </div> -->
        <!--发货-->
        <div class="item small flex" v-show=" schduleInfo.orderTypeStr!='安装' &&  schduleInfo.orderTypeStr!='设计' ">
          <div class="left time">
            <p class="date" v-if="Fahuodate.length>0">{{Fahuodate}}</p>
            <p class="hours" v-if="Fahuotime.length>0">{{Fahuotime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <!-- <h2 class="status">指派师傅</h2> orderNo -->
              <p>
                已发货
                <span class="btnCopy" @click="seeLogs(schduleInfo.orderNo)">查看物流</span>
              </p>
              <p style="font-size:24rpx">
                 请查看物流并确认收货
              </p>
            </div>
          </div>
        </div>
        <!--制作 -->
        <!-- <div class="item big flex" v-if="schduleInfo.OrderStatus==4 || schduleInfo.OrderStatus==6 || schduleInfo.OrderStatus==7 || schduleInfo.OrderStatus==9"> -->
        <div class="item big flex" v-show=" schduleInfo.orderTypeStr!='安装' &&  schduleInfo.orderTypeStr!='设计'">
          <div class="left time">
            <p class="date" v-if="Confirmdate.length>0">{{Confirmdate}}</p>
            <p class="hours" v-if="Confirmtime.length>0">{{Confirmtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/sczz.png" class="statusIcon" alt>
              <h2 class="status">生产制作中</h2>
              <p>正在根据设计图制作</p>
            </div>
          </div>
        </div>
        <!--设计-->
        <div class="item big flex" v-show="schduleInfo.orderTypeStr!='制作_安装' && schduleInfo.orderTypeStr!='制作' && schduleInfo.orderTypeStr!='安装'  && schduleInfo.DesignStatus == 2">
          <div class="left time">
            <p class="date" v-if="DesignCreatedate2.length>0">{{DesignCreatedate2}}</p>
            <p class="hours" v-if="DesignCreatetime2.length>0">{{DesignCreatetime2}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
              <h2 class="status">完成设计</h2>
            </div>
          </div>
        </div>
        <div class="item small flex" v-show="schduleInfo.orderTypeStr!='制作_安装' && schduleInfo.orderTypeStr!='制作' && schduleInfo.orderTypeStr!='安装' && schduleInfo.DesignStatus == 2">
          <div class="left time">
            <p class="date" v-if="DesignCreatedate2.length>0">{{DesignCreatedate2}}</p>
            <p class="hours" v-if="DesignCreatetime2.length>0">{{DesignCreatetime2}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <p>客户确认设计
                  <span class="btnCopy" @click="confirmButtonModal">确认设计</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="item big flex" v-if="schduleInfo.OrderStatus==2 || schduleInfo.OrderStatus==4 || schduleInfo.OrderStatus==6 || schduleInfo.OrderStatus==7 || schduleInfo.OrderStatus==9"> -->
        <div class="item big flex" v-show="schduleInfo.orderTypeStr!='制作_安装' && schduleInfo.orderTypeStr!='制作' && schduleInfo.orderTypeStr!='安装'">
          <div class="left time">
            <p class="date" v-if="DesignCreatedate.length>0">{{DesignCreatedate}}</p>
            <p class="hours" v-if="DesignCreatetime.length>0">{{DesignCreatetime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/fpsjs.png" class="statusIcon" alt>
              <h2 class="status">设计中</h2>
              <p>设计师正在设计</p>
            </div>
          </div>
        </div>
        <!-- <div class="item small flex" v-if="schduleInfo.OrderStatus==2 || schduleInfo.OrderStatus==4 ||    schduleInfo.OrderStatus==6 || schduleInfo.OrderStatus==7 || schduleInfo.OrderStatus==9">
          <div class="left time">
            <p class="date">11-12</p>
            <p class="hours">00：18</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
             
              <p>设计师上传设计稿</p>
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
              
              <p>客服审核</p>
            </div>
          </div>
        </div> -->
      
        <div class="item small flex">
          <div class="left time">
            <p class="date" v-if="Confirmdate.length>0">{{Confirmdate}}</p>
            <p class="hours" v-if="Confirmtime.length>0">{{Confirmtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <p>已确认</p>
              <p style="font-size:24rpx">
                 您的订单客服已确认
              </p>
            </div>
          </div>
          <!-- <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yqd.png" class="statusIcon" alt>
              <h2 class="status">已确认</h2>
              <p>您的订单客服已确认</p>
            </div>
          </div> -->
        </div>
        <div class="item big flex">
          <div class="left time">
            <p class="date" v-if="Createdate.length>0">{{Createdate}}</p>
            <p class="hours" v-if="Createtime.length>0">{{Createtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <img src="/static/images/icons/yxd.png" class="statusIcon" alt>
              <h2 class="status">已下单</h2>
              <p>您的订单待客服确认</p>
            </div>
          </div>
        </div>
        <!-- <div class="item small flex">
          <div class="left time">
            <p class="date" v-if="Createdate.length>0">{{Createdate}}</p>
            <p class="hours" v-if="Createtime.length>0">{{Createtime}}</p>
          </div>
          <div class="right flex1">
            <div class="txtBox">
              <p>您的订单已创建</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
//orderType 0-设计 1-制作" 2-安装 3-设计_制作 4-制作_安装 5-设计_制作_安装
import "@/css/dd_style.css";
import {post,toLogin, getCurrentPageUrlWithArgs,formatTime} from "@/utils/index";
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
    this.getDate()
  },
  data() {
    return {
      UserId: "",
      Token: "",
      OrderNoId:'',
      orderStatus:'',
      curPage: "",
      identity:'',
      schduleInfo:"",
      Createdate:"",
      Createtime:"",   //订单创建时间
      Installdate:"",
      Installtime:"",  //安装时间
      Paydate:"",
      Paytime:"",   //支付---下单时间
      Confirmdate:"",  //订单确认
      Confirmtime:"",
      Fahuotime:"",  //发货
      Fahuodate:"",
      masterName:"",
      DesignCreatedate:"",  //设计
      DesignCreatetime:"",
      DesignCreatedate2:"",  //设计完成
      DesignCreatetime2:"",
      enddate:'',  //完成
      endtime:""


    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "查看进度"
      });
    },
    //获取订单进度
    getDate(){
        if(toLogin(this.curPage)){
          post('Order/OrderProgressInfo',{
              UserId:this.UserId,
              Token:this.Token,
              OrderNo:this.OrderNoId
          },this.curPage).then(res=>{
            //创建订单
              if(res.data.CreateTime.length>0){
                this.Createdate=res.data.CreateTime.split(" ")[0].split("-").splice(1).join('-') //订单创建时间
                this.Createtime=res.data.CreateTime.split(" ")[1].split(":").slice(0,-1).join(':')  //订单创建时间
              }
              if(res.data.PayTime.length>0){
                this.Paydate=res.data.PayTime.split(" ")[0].split("-").splice(1).join('-')   //支付时间
                this.Paytime=res.data.PayTime.split(" ")[1].split(":").slice(0,-1).join(':')  //支付时间
              }
              
            //安装
              if(res.data.InstallList.length>0){
                this.Installdate=res.data.InstallList[0].InstallTime.split("T")[0].split("-").splice(1).join('-')//安装时间
                this.Installtime=res.data.InstallList[0].InstallTime.split("T")[1].split(":").slice(0,-1).join(":")//安装时间
                  this.masterName=res.data.InstallList[0].MasterName
                  let num=''
                  for(let i=0;i<this.masterName.slice(1).length;i++){
                    num+="*"
                    // console.log(num)
                    this.masterName=this.masterName.slice(0,1)+num
                  }
                  console.log( this.masterName,"Confirmtime")
              }
              
            // 设计
              if(res.data.DesignCreateTime.length>0){
                this.DesignCreatedate=res.data.DesignCreateTime.split(" ")[0].split("-").splice(1).join('-') 
                //  console.log(Fahuodate,"Confirmtime")
                this.DesignCreatetime=res.data.DesignCreateTime.split(" ")[1].split(":").slice(0,-1).join(":")
               
                // this.DesignCreatetime2=res.data.DesignCreateTime.split(" ")[1].split(":").slice(0,-1).join(":") 
                console.log(res.data.DesignCreateTime)
                let date= new Date(res.data.DesignCreateTime)
                date= +date+2*60*60*1000
                date= new Date(date)
                console.log(date,"date")
                let time = formatTime(date)
                console.log(time) //2019-05-10 16:40:18
                this.DesignCreatedate2=time.split(" ")[0].split("-").splice(1).join('-') 
                this.DesignCreatetime2=time.split(" ")[1].split(":").slice(0,-1).join(":")
                console.log(this.DesignCreatedate2,this.DesignCreatetime2)
              }
            //发货
              if(res.data.Fahuodate.length>0){
                this.Fahuodate=res.data.Fahuodate.split(" ")[0].split("-").splice(1).join('-') //发货时间
                //  console.log(Fahuodate,"Confirmtime")
                this.Fahuotime=res.data.Fahuodate.split(" ")[1].split(":").slice(0,-1).join(":")  //发货时间
              }
              //订单确认
              if(res.data.ConfirmTime.length>0){
                  // ConfirmTime:res.data.ConfirmTime   //订单
                  this.Confirmdate=res.data.ConfirmTime.split(" ")[0].split("-").splice(1).join('-')  //订单
                  this.Confirmtime=res.data.ConfirmTime.split(" ")[1].split(":").slice(0,-1).join(":")   //订单
              }
              //订单完成 
             if(res.data.EndTime.length>0){
                  // ConfirmTime:res.data.ConfirmTime   //订单完成时间
                  this.enddate=res.data.EndTime.split(" ")[0].split("-").splice(1).join('-')  //订单完成时间
                  this.endtime=res.data.EndTime.split(" ")[1].split(":").slice(0,-1).join(":")   //订单完成时间
              }
             //this.schduleInfo=res.data
             this.schduleInfo={
                OrderStatusStr:res.data.OrderStatusStr,
                orderTypeStr:res.data.orderTypeStr,
                orderNo:res.data.orderNo,
                OrderStatus:res.data.OrderStatus,
                OrderType:res.data.orderType
             }
            console.log(this.schduleInfo,"this.schduleInfo")   

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
    //查看物流
    seeLogs(OrderNo){
        wx.navigateTo({
          url:"/pages/custom/schelogs/main?OrderNo="+OrderNo
        })
    },
    //确认设计
    confirmButtonModal(){
        wx.showModal({
        title:'设计确认',
        confirmColor:'#33cc33',
        cancelColor,
        cancelText:'不通过',
        confirmText:'通过',
        success(res){
          if(res.confirm){
            that.confirmButton(0)
          }else if(res.cancel){
            // 等于设计的时候才有不通过
            if(types==='design'){
              that.confirmButton(1)
            }
          }
        }
      })
    },
    //
    // 确认设计
    confirmButton(AuditType){
      console.log(AuditType,'设计确认状态')
      post('Order/OrderCollection',{
            UserId:this.UserId,
            Token:this.Token,
            OrderNo:this.orderId,
            AuditType:AuditType
            }).then(res=>{
              console.log(res)
              wx.showToast({
                title:res.msg,
                duration:2000
              })
              setTimeout(function(){
                wx.redirectTo({url: '/pages/custom/order/main'});
              },1000)
            })
    },
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
