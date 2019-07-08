<template>
  <div class="page">
    <div class="tabBarBox">
      <ul class="tabBar flex li_20 fixed">
        <li
          :class="{'active':typeNo===menus.typeNo}"
          v-for="menus in menu"
          :key="menus.typeNo"
          @click="tabMenu(menus.typeNo)"
        >
          <span class="title">{{menus.name}}</span>
        </li>
      </ul>
    </div>

    <!-- 搜索 -->
    <!-- <div class="searchBox">
      <div class="search flex AlignCenter border-box" style="margin-top:10rpx;">
        <div class="ipt flex1" @click="areaListStatus = true">
          <input type="text" class="weui-input" :value="searchRegion" disabled placeholder="请选择区域">
          
        </div>
        <div class="remove" @click="removeSelect" v-show="searchRegion">×</div>
      </div>
    </div> -->
    <!-- <van-popup :show="areaListStatus" position="bottom">
    <van-area :area-list="areaList" :columns-num="2" @cancel="areaListStatus = false" @confirm="areaConfirm"></van-area>
    </van-popup> -->
    <!-- 订单列表-->
    <div class="tabContent">
      <!-- 订单 -->
      <div class="column levelPanel bg__levelPanel order__levelPanel" style="margin-top:20rpx;">
        <div class="item" v-for="list in orderList" :key="list.Id">
          <div class="item__hd flex">
            <div class="flex1">
              <p class="orderNo ellipsis">订单编号：{{list.OrderNo}}</p>
            </div>
            <span class="status">{{list.StatuName}}</span>
          </div>
          <div class="item__bd" @click="gotoDetail(list.Id)">
            <div class="box">
              <div class="outside">
                <div class="pictrueAll">
                  <div class="pictrue img" :style="'background-image:url('+list.OrderImg+')'"></div>
                </div>
                <div class="txtBox">
                  <p class="title text-line2">{{list.OrderName}}</p>
                  <p class="type">订单类型：<span v-if="list.OrderType===0">设计</span><span v-if="list.OrderType===1">制作</span><span v-if="list.OrderType===2">安装</span><span v-if="list.OrderType===3">设计+制作</span><span v-if="list.OrderType===4">制作+安装</span><span v-if="list.OrderType===5">设计+制作+安装</span></p>
                  <div class="flex">
                    <div class="flex1">
                      <p class="new-price">￥{{list.TotalMoney}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="item__ft">
            <div class="button" v-if="(list.OrderStatus==0||list.OrderStatus==1) && list.MemberId==0 " @click="showCancelOrder(list.Id)">取消订单</div>
            <div class="button active" v-if="(list.OrderStatus==2 || list.OrderStatus==3 ||list.OrderStatus==4 || list.OrderStatus==5 || list.OrderStatus==6 || list.OrderStatus==7) && list.MemberId==0" @click="seeSchdule(index)">查看进度</div>
            <div class="button active" v-if="list.OrderStatus==4 && list.MemberId==0" @click="getGoods(list.Id)">确认收货</div>
          </div> -->
        </div>
        
        <!-- 数据状态提示节点 -->
        <div v-if="orderList.length<1" style="text-align:center;margin-top:300rpx;font-size:24rpx;color:#999;">暂时没有数据哦!</div>
        <div v-if="orderListEnd&&page!==1" style="text-align:center;font-size:24rpx;line-height:40rpx;padding-bottom:10rpx;color:#999;">已经到底了哦!</div>
      </div>
    </div>
    
        <!-- 取消订单弹窗 -->
        <CancelOrderWindow :cancelOrderWindowStatus.sync="cancelOrderWindowStatus"
        @success="closeContent" :refuseContent.sync="refuseContent"
        ></CancelOrderWindow>
        <foot :identity="identity"></foot>
  </div>
</template>
<script>
import "@/css/common.css";
import areaList from '@/utils/areaList'
import foot from "@/components/foot.vue";
import CancelOrderWindow from '@/components/cancelOrderWindow.vue'
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
  components:{CancelOrderWindow,foot},
  data() {
    return {
      UserId: "",
      Token: "",
      page: 1,
      pageSize: 12,
      curPage: "",
      identity:'',
      typeNo: -1, //订单状态
      searchRegion: "", //搜索地区字段
      searchRegionCode: "", //搜索地区字段
      areaListStatus: false, //选择地区状态
      areaList,
      menu: [
        {
          name: "全部",
          typeNo: -1
        },
        {
          name: "待处理",
          typeNo: 0
        },
        {
          name: "已处理款",
          typeNo: 1
        }
        
      ],
      orderList:[],
      orderListEnd:false, //提示数据到底了
      // 取消订单
      cancelOrderWindowStatus:false,
      refuseContent:'',
      editOrderId:''
    };
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.Token = wx.getStorageSync("token");
    this.UserId = wx.getStorageSync("userId");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    // typeNo--进入订单列表展示的状态
    // 执行--订单状态：-1全部，0-待处理，1-已处理 
    if(this.$root.$mp.query.typeNo){
      this.typeNo=this.$root.$mp.query.typeNo*1
    }
    console.log(this.typeNo,"}}}}}}}}}}}}}}}}}}}}" ,"订单状态");
    this.init();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的订单"
      });
    },
    // 初始化数据
    init(){
        this.orderListEnd = false;
        this.page =1;
        this.getData()
    },
   getData() {
      if(this.orderListEnd){
        return false;
      }
      if(this.page===1){
        this.orderList=[];
      }
        if(toLogin(this.curPage)){
          post("CustomerService/GetKfOrderList", {
            CsdId: this.UserId,
            Token: this.Token,
            page: this.page,
            pageSize: this.pageSize,
            Region: this.searchRegionCode,
            orderStatus: this.typeNo,
            IsService:1 //查询订单分类，0--用户的下单；1--客服的下单
          },this.curPage).then(res=>{
              if(res.data.length!==this.pageSize){
                this.orderListEnd = true;
              }
              this.orderList = this.orderList.concat(res.data);
          })
        }
      
    },
    // 切换订单状态
    tabMenu(typeNo) {
      this.typeNo = typeNo;
      this.curPage = getCurrentPageUrlWithArgs({ typeNo: this.typeNo });
      this.orderList = [];
      this.init()
    },
    // 删除选中的城市
    removeSelect(){
      this.searchRegionCode = ''
      this.searchRegion = ''
      this.init()
    },
    // 选择地区
    areaConfirm(e){
      let val=''
      e.mp.detail.values.map(item=>{
        val+=item.name+' '
      })
      this.searchRegion = val
      this.searchRegionCode = e.mp.detail.values[e.mp.detail.values.length-1].code
      this.areaListStatus = false;
      this.init()
    },
    // 跳转到订单详情
    gotoDetail(orderId){
      wx.navigateTo({
        url:`/pages/servicemenu/orderDetail/main?orderId=${orderId}`
      })
    },
    
    // 展示取消订单窗口
    showCancelOrder(id){
      const that =this;
      wx.showModal({
        content:'您的订单尚未付款成功，确认要取消本订单吗？',
        confirmColor:'#ff662a',
        success(res){
          if(res.confirm){
            that.cancelOrderWindowStatus = true;
            that.editOrderId=id
          }
        }
      })
    },
    // 取消订单的内容
    async closeContent(){
      console.log(this.refuseContent,'取消内容')
        if(toLogin(this.curPage)){
          post('CustomerService/KfOrderCancel',{
            CsdId:this.UserId,
            Token:this.Token,
            OrderNo:this.editOrderId,
            RefuseContent:this.refuseContent
          },this.curPage).then(res=>{
              wx.showToast({
                title:'订单取消成功！',
                duration:1500,
              })
              setTimeout(()=>{
                  this.cancelOrderWindowStatus = false;
                  this.refuseContent=''
                  this.init()
                  console.log(res.data,'取消成功')
              },1500)
              
          })
        }
      
    },
     //付款
    // orderPay(OrderNo){
    //   console.log(OrderNo)
    //   post('/Order/ConfirmWeiXinPay',{
    //       UserId: this.UserId,
    //       Token: this.Token,
    //       OrderNo: OrderNo,
    //   }).then(res=>{
    //       console.log(res)
    //       let payData=JSON.parse(res.data.JsParam);
    //       wx.requestPayment({
    //         timeStamp: payData.timeStamp,
    //         nonceStr: payData.nonceStr,
    //         package: payData.package,
    //         signType: payData.signType,
    //         paySign: payData.paySign,
    //         success(res) {
    //           this.init();
    //           // wx.navigateTo({
    //           //   url:"/pages/custom/order/main"
    //           // });
    //         },
    //         fail(res) {

    //         }
    //       })
    //   })
    // },
    //查看订单进度
    seeSchdule(index){
      wx.setStorageSync('address',this.orderList[index].AddressInfo)
      let orderId = this.orderList[index].Id
      let OrderStatus = this.orderList[index].OrderStatus
        wx.navigateTo({url:"/pages/servicemenu/schedule/main?OrderNoId="+orderId+"&OrderStatus="+OrderStatus})
    },
    //确认收货
    getGoods(OrderNo){
      const that =this;
      wx.showModal({
        title:"确认收货",
        confirmColor:'#33cc33',
        cancelText:'取消',
        confirmText:'确认',
        success:(res)=>{
            if(res.confirm){
                if(toLogin(this.curPage)){
                  post('CustomerService/KfOrderCollection',{
                      CsdId:this.UserId,
                      Token:this.Token,
                      OrderNo:OrderNo
                      },this.curPage).then(res=>{
                        console.log(res)
                        wx.showToast({
                          title:'操作成功！',
                          duration:2000
                        })
                        that.getData();
                        
                      })
                }
            }else if(res.cancel){
                return false
            }
            
        }
        

      })
     
        
    }
  },
    // 上拉加载
    onReachBottom(){
      this.page+=1;
      this.getData()
    },
    // 下拉刷新
    onPullDownRefresh(){
      this.searchRegionCode = ''
      this.searchRegion = ''
      this.init()
    wx.stopPullDownRefresh();
    }
};
</script>
<style lang='scss' scoped>
@import "./style";

</style>