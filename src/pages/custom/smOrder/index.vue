<template>
  <div class="page">
    <movable-area class="movearea">
      <div class="main">
        <!--步骤提示-->
        <div class="tipsList flex" style="margin-top:1px;">
          <div class="item">
            <span class="num">1</span>客户下单
          </div>
          <div class="item">
            <span class="num">2</span>选择类型
          </div>
          <div class="item">
            <span class="num">3</span>客服确认信息及价格
          </div>
          <div class="item">
            <span class="num">4</span>完成支付
          </div>
          <div class="item">
            <span class="num">5</span>好评售后
          </div>
        </div>
        <!--订单-->
        <div v-for="(item,index) in prolist" :key="index">
              <!--子no1-->
              <div class="weui-cells smDetail__weui-cells" style="padding-top:10rpx;">
                <div class="select__weui-cells flex ipt flexAlignCenter">
                  <div class="weui-cells__title">项目名称:</div>
                  <div class="flex1">
                    <input type="text" class="weui-input" placeholder="请输入（必填）" style="margin-left:20rpx;" v-model="item.proname">
                  </div>
                </div>
                <div class="select__weui-cells">
                  <div class="weui-cells__title">选择类型</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text" class="weui-input" placeholder="请输入（必填）" v-model="item.orderType">
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                  </div>
                </div>
                <div class="weui-item">
                  <div class="weui-cells__title">填写尺寸</div>
                  <div class="columnGroup flex flexAlignCenter">
                    <div class="item flex flex1 flexAlignCenter">
                      <span class="lab">宽</span>
                      <div class="ipt flex">
                        <input type="text" class="flex1 weui-input" v-model="item.specwidth">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                      <span class="lab">高</span>
                      <div class="ipt flex">
                        <input type="text" class="flex1 weui-input" v-model="item.spechign">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                      <span class="lab">厚</span>
                      <div class="ipt flex">
                        <input type="text" class="flex1 weui-input" v-model="item.speclong">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                  </div>
                  <div class="columnGroup flex flexAlignCenter">
                    <div class="item flex flexAlignCenter">
                      <span class="lab">数量</span>
                      <div class="ipt flex">
                        <input type="text" class="weui-input" style="width:140rpx;" v-model="item.specnum">
                        <span class="txt">&nbsp;</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="select__weui-cells">
                  <div class="weui-cells__title">制作材料</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text" class="weui-input" placeholder="请输入（必填）" v-model="item.makestatic">
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                  </div>
                </div>
                <div class="select__weui-cells">
                  <div class="weui-cells__title">安装材料</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text" class="weui-input" placeholder="请输入（必填）" v-model="item.installstatic">
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                  </div>
                </div>
                <!-- 上传图片 -->
                <div class="weui-item">
                  <div class="weui-cells__title">
                    参考图片
                    <span class="tips">(可添加多张图)</span>
                  </div>
                  <div class="uploadImage clear">
                    <div
                      class="button-upload"
                      style="background-image:url(/static/images/icons/upload_2.png);"
                    ></div>
                    <!-- 上传展示的图片 -->
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                  </div>
                </div>
                <div class="select__weui-cells">
                  <div class="weui-cells__title">交付时间</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text" disabled="true" class="weui-input" placeholder="请选择日期" v-model="item.estimateTime">
                    </div>
                    <img src="/static/images/icons/date.png" alt class="icon-date" @click="showDate=true">
                  </div>
                </div>
                <div class="weui-item">
                  <div class="weui-cells__title">备注说明</div>
                  <div class="eaditArea">
                    <textarea name class="weui-area" id placeholder="输入维护服务要求" v-model="item.remark"></textarea>
                  </div>
                </div>
                <div class="priceBox flex">
                  <div class="flex1">金额</div>
                  <div>
                    <span class="price">{{item.offerTotal}}</span>
                  </div>
                </div>
              </div>
              <!--子no2-->
              
              <!--子no3-->

              <!--时间选择 不需要弹框-->
              <van-action-sheet :show="showDate" @close="showDate=false" @select="showDate=false">
                  <van-datetime-picker
                  type="date"
                  :value="currentDate"
                  @confirm="onInput($event,index)"
                  @cancel="showDate=false"
                  :min-date="minDate"
                  :formatter="formatter"
                  title="请选择时间"
                  />
              </van-action-sheet>         
         </div>
        <!--下面是订单的汇总金额以及用户信息选择-->
        <!--按钮增加明细-->
        <div style="padding-bottom:40rpx;padding-top:40rpx;" class="addDetail bg_fff" @click="addOrder">
          <div class="btn btn-add">
            <img src="/static/images/icons/add_2.png" alt>增加明细
          </div>
        </div>
        <!-- 总金额 -->
        <div class="flex allPriceBox bg_fff mt10">总金额(员)：500</div>
        <!-- 快递选择 -->
        <div class="weui-cells smDetail__weui-cells">
          <div class="select__weui-cells">
            <div class="weui-cells__title">快递选择</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-right"></span>
            </div>
          </div>
        </div>
        <!-- 地址选择 -->
        <div class="weui-cells smDetail__weui-cells">
            <div class="weui-cells__title">选择地址</div>
            <div class="addressList">
                <div class="item flex flexAlignCenter nosite">
                      <img src="/static/images/icons/addsite.png" class="site" alt>
                      <div class="item__bd flex1" style="padding-left:20rpx;">新增收货地址</div>
                      <span class="icon-arrow arrow-right"></span> 
                </div>      
                <div class="item flex flexAlignCenter">
                    <img src="/static/images/icons/address.png" class="addrIcon" alt>
                    <div class="item__bd flex1">
                        <p class="remarks">
                        <span class="name">张三</span>
                        <span class="tel">0755-23105899</span>
                        </p>
                        <p class="address">店铺地址：挖个点个反对</p>
                        <p class="address">详细地址：深圳市龙华区民治大道展涛科技大厦</p>
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="ftBtn" style="height:156rpx;" @click="showDate=true">
          <div class="inner fixed bm0 border-box bg_f4f7fc">
            <div class="btn btn-active fill">确认下单</div>
          </div>
        </div>
        <!-- 客服 -->
        <movable-view style="z-index:11;" x="300" y="460" direction="all" out-of-bounds="false">
          <div class="fixed__kf">
            <img src="/static/images/icons/fixed__kf.png" alt>
          </div>
        </movable-view>
      </div>
    </movable-area>
    <!--弹层-->
    <div class="mask" v-if="isShow"></div>
    <!--选择类型--> 
    <div class="maskType border-box" v-if="showType">
        <div class="flex">
              <span class="size" @click="cancle">取消</span>
              <span class="title">{{masktitle}}</span>
              <span class="color size" @click="confirm">确定</span>
        </div>
        <scroll-view class="showItem">
            <p class="itemactive">设计+制作+安装</p>
            <p>设计</p>
            <p>设计+制作</p>
            <p>制作</p>
            <p>安装</p>
            <p>制作+安装</p>
        </scroll-view>
    </div>
    <!--支付成功弹框-->
    <div class="paySuccess border-box column" v-if="showPaymask">
        <div class="title">{{orderType}}订单</div>
        <img src="/static/images/icons/task.png" alt="" class="task">
        <div class="paymaskinfo">
            <p>订单提交成功，<span style="color:#ff6325">未付款</span></p>
            <p class="replay">稍后客服确认订单回复您</p>
        </div>
        <div class="flex btn">
            <p class="backindex">返回首页</p>
            <p class="sure">确认</p>
        </div>
    </div>
    
  </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
  onLoad(){
    this.setBarTitle();
  },
  onShow(){
        this.speclong = ""
        this.specwide = ""
        this.spechign = ""
        this.specnum = ""
        this.orderType = ""
        this.referencePicList = ""
        this.estimateTime = ""
        this.remark = ""
        this.offerTotal = ""
        this.tip=0
  },
  watch:{
    // prolist(){
    //    console.log(this.prolist,"plist")
    // }
    prolist: {
    handler(proname) {
      console.log(this.prolist,"plist-watch");
    },
    immediate: true,
    deep: true
  }

  },
  data(){
    return {
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter(type, value) {
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`;
          }
          return value;
        },
        showDate:false,  //日期 组件 不需要遮罩层
        isShow:false, //遮罩层
        showType:false,  //普通选择的弹框
        showPaymask:false,//支付确认弹框
        // proname:"",//项目名称
        // speclong:"",//厚
        // specwide:"",//宽
        // spechign:"",//高
        // specnum:"",//数量
        // orderType:"",//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
        // referencePicList:"",//参考图片
        // estimateTime:"",//交付时间
        // makestatic:"",//制作材料
        // installstatic:"",//安装材料
        // remark:"",//备注说明
        // offerTotal:"",//总金额
        ContactName:"",//联系人
        Tel:"",//电话
        Addr:"",//地址
        masktitle:'设计',
        tip:0,//点击增加明细增加子订单的次数标识
        proitem:{
          orderType:"",spechign:"",speclong:"",specwide:"",specnum:"",referencePicList:"",
          estimateTime:"",remark:"",offerTotal:"",makestatic:"",installstatic:"",proname:""
        },
        prolist:[
          {
          orderType:"",spechign:"",speclong:"",specwide:"",specnum:"",referencePicList:"",
          estimateTime:"",remark:"",offerTotal:"",makestatic:"",installstatic:"",proname:""
          },
        ],//orderType类型...


    }
  },
  methods:{
      setBarTitle() {
        wx.setNavigationBarTitle({
          title: "客户下单"
        });
      },
      cancle(){
        this.isShow=false
        this.showType=false
      },
      confirm(){
        this.masktitle=0
        this.showType=false
        this.isShow=false
      },
      onInput(e,i){
          console.log(e)
          const  date= new Date(e.mp.detail)
          const year = date.getFullYear()
          let month = date.getMonth()+1
          let dd = date.getDate()
          month.toString().length<2 ? (month= "0"+month) : month
          dd.toString().length<2 ? (dd="0"+dd) : dd
          this.prolist[i].estimateTime = `${year}-${month}-${dd}`
          this.showDate = false
          console.log(this.estimateTime,"交付时间")
      },
      //增加明细（增加子订单）
      addOrder(){
          this.tip++
          if(this.tip>2){
            wx.showToast({
              title:"已超过订单添加的数量啦...",
              icon:"none",
              duration:2000,
              complete:function(){

              }
            })
            return false;
          }else{
          //console.log(this.proitem)
            this.prolist.push(this.proitem)
            this.proitem={}
            console.log(this.prolist,"1111111111111")
          }
      }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
