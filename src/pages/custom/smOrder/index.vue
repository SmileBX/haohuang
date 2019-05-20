<template>
  <div class="page" @touchstart="showP=true">
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
        <div v-for="(item,lindex) in prolist" :key="lindex">
              <!--子no1-->
              <div class="weui-cells smDetail__weui-cells" style="padding-top:10rpx;">
                <!-- <div class="select__weui-cells flex  flexAlignCenter">
                  <div class="weui-cells__title">项目名称:</div>
                  <div class="flex1">
                    <input type="text" class="weui-input" placeholder="请输入（必填）" style="margin-left:20rpx;" v-model="item.orderName">
                  </div>
                </div> -->
                <div class="select__weui-cells" >
                  <div class="weui-cells__title">项目名称</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text"  class="weui-input" placeholder="请输入（必填）" v-model="item.orderName">
                    </div>
                  </div>
                </div>
                <div class="select__weui-cells" @click="choseType(lindex) ">
                  <div class="weui-cells__title">选择类型</div>
                  <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                      <input type="text" disabled class="weui-input" placeholder="请选择（必填）" v-model="item.orderTypeName">
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
                        <input type="number" class="flex1 weui-input" v-model="item.specwide" @focus="trimWide(lindex,11)" @blur="getWide(lindex)">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                      <span class="lab">高</span>
                      <div class="ipt flex">
                        <input type="number" class="flex1 weui-input" v-model="item.spechign" @focus="trimWide(lindex,22)" @blur="getWide(lindex)">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                      <span class="lab">厚</span>
                      <div class="ipt flex">
                        <input type="number" class="flex1 weui-input" v-model="item.speclong" @focus="trimWide(lindex,33)" @blur="getWide(lindex)">
                        <span class="txt">mm</span>
                      </div>
                    </div>
                  </div>
                  <div class="columnGroup flex flexAlignCenter">
                    <div class="item flex flexAlignCenter">
                      <span class="lab">数量</span>
                      <div class="ipt flex">
                        <input type="number" class="weui-input" style="width:140rpx;" v-model="item.specnum" @focus="trimWide(lindex,44)" @blur="getWide(lindex)">
                        <span class="txt">&nbsp;</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="select__weui-cells" v-show="item.orderType!=0 && item.orderType!=2">
                  <div class="weui-cells__title">制作材料</div>
                  <div class="ipt flex flexAlignCenter" @click="choseMartic(1,lindex)">
                    <div class="flex1">
                      <input type="text"  disabled class="weui-input" placeholder="请选择（必填）" v-model="item.makestatic">
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                  </div>
                </div>
                <div class="select__weui-cells" v-show="item.orderType!=0 && item.orderType!=1 && item.orderType!=3">
                  <div class="weui-cells__title">安装材料</div>
                  <div class="ipt flex flexAlignCenter" @click="choseMartic(2,lindex)">
                    <div class="flex1">
                      <input type="text" disabled class="weui-input" placeholder="请选择（必填）" v-model="item.installstatic">
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                  </div>
                </div>
                <!-- 上传图片 -->
                <div class="weui-item">
                  <div class="weui-cells__title">
                    参考图片
                    <span class="tips">({{item.referencePicList.length}}/{{imgLenght}})</span>
                  </div>
                  <div class="uploadImage clear">
                    <!-- 上传展示的图片 -->
                    <div class="upload-img img" style="width:160rpx;height:160rpx;" v-for="(img,sindex) in item.referencePicList" :key="sindex">
                        <div class="delete" @click="deleteImg(sindex,lindex)">×</div>
                        <img :src="img"  style="width:160rpx;height:160rpx;" alt>
                    </div>
                    <img
                      class="button-upload"
                       src="/static/images/icons/upload_2.png" v-show="item.isShowBtnUpload" @click="chosseImg(lindex)">
                  
                  </div>
                </div>
                <div class="select__weui-cells">
                  <div class="weui-cells__title">交付时间</div>
                  <div class="ipt flex flexAlignCenter"  @click="choseDate(lindex)">
                    <div class="flex1" >
                      <input type="text" disabled="true" class="weui-input" placeholder="请选择日期" v-model="item.estimateTime">
                    </div>
                    <img src="/static/images/icons/date.png" alt class="icon-date">
                  </div>
                </div>
                <div class="weui-item tetbox">
                  <div class="weui-cells__title">备注说明</div>
                  <div class="eaditArea">
                    <!-- <p class="weui-area" v-if="item.showDate">{{item.remark || '请输入备注内容'}}</p>
                    <textarea  class="weui-area" placeholder="请输入备注内容111111111" v-model="item.remark" v-else></textarea> -->
                    <p class="weui-area" v-if="showP" @click="puttextatea" style="padding:29rpx;">{{item.remark || '请输入备注内容'}}</p>
                    <textarea  style="resize:none" class="weui-area" :placeholder="signtext" v-model="item.remark" @blur="showP=true" autofocus="autofocus" v-else></textarea>
                  </div>
                </div>
                <!--小计-->
                <div class="priceBox flex ppt" v-if="item.orderType!=0">
                  <div class="flex1">金额</div>
                  <div>
                    <span class="price">￥{{item.offerTotal}}</span>
                  </div>
                </div>
              </div>
              <!--子no2-->
              
              <!--子no3-->

              <!--时间选择 不需要弹框-->
              <van-action-sheet :show="item.showDate" @close="item.showDate=false" @select="item.showDate=false">
                  <van-datetime-picker
                  type="date"
                  :value="currentDate"
                  @confirm="onInput($event,lindex)"
                  @cancel="item.showDate=false"
                  :min-date="minDate"
                  :formatter="formatter"
                  title="请选择时间"
                  />
              </van-action-sheet>  
               <!--选择类型--> 
                <div class="maskType border-box" v-if="item.showType || showKuaidiType">
                    <div class="flex">
                          <span class="size" @click="cancle(lindex)">取消</span>
                          <span class="title">{{masktitle}}</span>
                          <span class="color size" @click="subConfirm(lindex)">确定</span>
                    </div>
                    <scroll-view :scroll-y="true" style="height:480rpx;" class="showItem" @scrolltolower="loadMore">
                      <div v-for="(item,index) in list" :key="index">
                          <!-- <p :class="{'itemactive':item.statu}" @click="chose(index)" style="margin-top:3rpx;">{{item.name}}
                            &nbsp;&nbsp;<span v-if="item.Price">￥{{item.Price}}</span>
                          </p> -->
                          <p :class="{'itemactive':item.statu}" @click="chose(index)" style="margin-top:3rpx;" v-if="masktitle=='请选择制作材料' || masktitle=='请选择安装材料'">{{item.name}}
                            &nbsp;&nbsp;<span v-if="item.Price">￥{{item.Price}}</span>
                          </p>
                          <p :class="index==active?'itemactive':''" @click="chose(index)" style="margin-top:3rpx;" v-else>{{item.name}}
                            &nbsp;&nbsp;<span v-if="item.Price">￥{{item.Price}}</span>
                          </p>
                          <!-- <p>设计</p>
                          <p>设计+制作</p>
                          <p>制作</p>
                          <p>安装</p>
                          <p>制作+安装</p> -->  
                      </div>
                    </scroll-view>
                </div>      
         </div>
        <!--下面是订单的汇总金额以及用户信息选择-->
        <!--按钮增加明细-->
        <div style="padding-bottom:40rpx;padding-top:40rpx;" class="addDetail bg_fff" @click="addOrder">
          <div class="btn btn-add">
            <img src="/static/images/icons/add_2.png" alt>增加明细
          </div>
        </div>
        <!-- 总金额 -->
        <div class="flex allPriceBox bg_fff mt10"  v-if="latShow && prolist.length>1">总金额(元)：￥{{Total || 0}}</div>
        <!-- 快递选择 -->
        <div class="weui-cells smDetail__weui-cells" style="padding-bottom:5rpx;" v-if="latShow">
          <div class="select__weui-cells">
            <div class="weui-cells__title">快递选择</div>
            <div class="ipt flex flexAlignCenter" @click="chosePost">
              <div class="flex1">
                <span class="weui-input">{{postMsg}}</span>
              </div>
              <span class="icon-arrow arrow-right"></span>
            </div>
          </div>
        </div>
        <!-- 地址选择 -->
        <div class="weui-cells smDetail__weui-cells" v-if="latShow">
            <div class="weui-cells__title">选择地址</div>
            <div class="addressList" @click="toAddress">
                <div class="item flex flexAlignCenter" v-if="addressinfo.length>0">
                    <img src="/static/images/icons/address.png" class="addrIcon" alt>
                    <div class="item__bd flex1">
                        <p class="remarks">
                        <span class="name">{{addressinfo[0].name}}</span>
                        <span class="tel">{{addressinfo[0].tel}}</span>
                        </p>
                        <p class="address">店铺名称：{{addressinfo[0].address}}</p>
                        <p class="address">详细地址：{{addressinfo[0].addressinfo}}</p>
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                </div>
                <div class="item flex flexAlignCenter nosite" v-else >
                      <img src="/static/images/icons/addsite.png" class="site" alt>
                      <div class="item__bd flex1" style="padding-left:20rpx;">新增收货地址</div>
                      <span class="icon-arrow arrow-right"></span> 
                </div>
            </div>
        </div>
        <div class="ftBtn" style="height:156rpx;position:relative">
          <div class="inner fixed bm0 border-box bg_f4f7fc" style="background:#ffffff!important;position:relative">
            <div class="btn btn-active fill" @click="submit">确认下单</div>
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
    <div class="mask" v-if="isShow" catchtouchmove='true'></div>
    <!--支付成功弹框-->
    <div class="paySuccess border-box column" v-if="showPaymask">
        <div class="title">{{orderTypeName}}订单</div>
        <img src="/static/images/icons/task.png" alt="" class="task">
        <div class="paymaskinfo">
            <p>订单提交成功，<span style="color:#ff6325">未付款</span></p>
            <p class="replay">稍后客服确认订单回复您</p>
        </div>
        <div class="flex btn">
            <p class="backindex" @click="backIndex">返回首页</p>
            <p class="sure" @click="closeMask">确认</p>
        </div>
    </div>
    <foot :identity="identity"></foot>
  </div>
</template>
<script>
//orderType 0-设计 1-制作" 2-安装 3-设计_制作 4-制作_安装 5-设计_制作_安装
import { get,post, toLogin, getCurrentPageUrlWithArgs, valPhone } from "@/utils";
import "@/css/dd_style.css";
import {pathToBase64} from "@/utils/image-tools";
import foot from "@/components/foot.vue";
export default {
  onLoad(){
    this.setBarTitle();
    this.imgBase= []
    this.imgPathArr= []
    this.postMsg = '选择快递'
    this.signtext = '请输入备注内容'
    this.proitem={
      orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],imgBase:[],isShowBtnUpload:true,
      estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",showDate:false,showType:false,  //日期 组件 不需要遮罩层
    }
    this.prolist=[
      {
      orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],imgBase:[],
      estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",isShowBtnUpload:true,showDate:false, showType:false,  //日期 组件 不需要遮罩层
      },
    ]
    this.latShow=false//设计的时候隐藏地址 金额 快递
    
  },
  components: {
    foot,
    // serviceTypeSelect
  },
  onShow(){
        this.curPage = getCurrentPageUrlWithArgs();
        this.identity = wx.getStorageSync("identity");
        this.userId = wx.getStorageSync("userId");
        this.token = wx.getStorageSync("token");
        this.page=1
        this.list=[],
        this.typelist=[],//orderTypeName类型...
        this.kuaidiList=[],//快递种类
        this.addressinfo=[],//默认的收货地址
        this.pageSize=10,//制作材料 安装材料
        this.allPage=0,//总页数
        this.count=0,//总数
        this.isLoad=false,
        // this.isShowBtnUpload= true,//显示上传按钮的状态
        this.imgLenght=8,
        this.adressId='', //地址编号
        this.logisticsType=''   //物流类型 0-快递 1-物流 2-自提
        this.tip=0
        this.active = 0
        this.addressinfo=[]
        this.showPaymask=false
        this.isShow=false
        this.showKuaidiType=false
       

        //获取收货地址
        if(this.$root.$mp.query.url){
            console.log(wx.getStorageSync('addressinfo'))
            const _address=wx.getStorageSync('addressinfo')
            this.addressinfo.push({
                  name:_address.name,
                  tel:_address.phone,
                  address:_address.shopname,
                  addressinfo:_address.site

            })
            this.adressId=_address.id
            console.log( this.addressinfo.length,"收货地址长度--选择")
        }else{
            this.getDefaultAddress()
            
        }
        // wx.setStorageSync("addressinfo",' ')
       console.log( this.addressinfo.length,"默认收货地址长度")
       
  },
  computed:{
      Total(){  //总计
        console.log(this.prolist,"this.prolist[i]")
        let count=0
        for(let i=0;i<this.prolist.length;i++){
           count+=this.prolist[i].offerTotal
        }
        return count
      },
  },
  watch:{
    //小计
    prolist: {
      handler(offerTotal,specnum) {
        for(let i=0;i<this.prolist.length;i++){
          if(this.prolist[i].makestatic.length>0 || this.prolist[i].installstatic.length>0){
            let subtotal1=0
            let subtotal2=0
            for(let m of this.prolist[i].makestatic){
                // console.log(m,"item")
                // console.log(m.split('￥')[1]*1)
                subtotal1+=m.split('￥')[1]*1
                //console.log(subtotal1,"小计111111111")
            }
            for(let k of this.prolist[i].installstatic){
                // console.log(m,"item")
                // console.log(m.split('￥')[1]*1)
                subtotal2+=k.split('￥')[1]*1

            }
              this.prolist[i].offerTotal=subtotal1+subtotal2
              //console.log(this.prolist[i].offerTotal,"小计")
              //console.log(this.prolist,"++++++++++++++++++++++++++++")
            }else{
              this.prolist[i].offerTotal=0
            }
            for(let m=0;m<this.prolist[i].proMastic.length;m++){
              this.prolist[i].proMastic[m].Num = this.prolist[i].specnum
            }
            for(let n=0;n<this.prolist[i].proIns.length;n++){
                this.prolist[i].proIns[n].Num = this.prolist[i].specnum
            }
            console.log(this.prolist,"++++++++++++++++++++++++++++")
            }
      },
      immediate: true,
      deep: true
    },
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
        signtext:'请输入备注内容',
        latShow:false, //设计的时候隐藏地址  快递
        priceShow:false,//显示总价格
        showP:true,
        userId: "",
        token: "",
        curPage: "",
        identity: "",
        active:0,//选中的标记
        showKuaidiType:false,
        postMsg:'选择快递',//快递选择
        // showDate:false,  //日期 组件 不需要遮罩层
        isShow:false, //遮罩层
        // showType:false,  //普通选择的弹框
        showPaymask:false,//支付确认弹框
        // orderName:"",//项目名称
        // speclong:"",//厚
        // specwide:"",//宽
        // spechign:"",//高
        // specnum:"",//数量
        // orderTypeName:"",//订单类型 --0:设计,1:制作,2:安装,3:设计-制作,4:制作-安装,5:设计-制作-安装
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
        // proitem:{
        //   orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],imgBase:[],
        //   estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",isShowBtnUpload:true
        // },
        // prolist:[
        //   {
        //  orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],imgBase:[],
        //   estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",
        //   isShowBtnUpload:true
        //   },
        proitem:{
          orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],
          estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",isShowBtnUpload:true,showType:false, 
        },
        prolist:[
          {
         orderType:'',orderTypeName:"",spechign:0,speclong:0,specwide:0,specnum:1,referencePicList:[],
          estimateTime:"",remark:"",offerTotal:"",makestatic:[],installstatic:[],proMastic:[],proIns:[],orderName:"",
          isShowBtnUpload:true,showType:false, 
          },
        ],
        list:[],
        typelist:[],//orderTypeName类型...
        kuaidiList:[],//快递种类
        addressinfo:[],//默认的收货地址
        pageSize:8,//制作材料 安装材料
        page:1,
        allPage:0,//总页数
        count:0,//总数
        isLoad:false,
        // isShowBtnUpload: true,//显示上传按钮的状态
        // imgPathArr: [],
        // imgBase: [],
        imgLenght:8,
        adressId:'', //地址编号
        // proLists:[],//材料--制作材料 安装材料
        // proMastic:[],//制作材料集合
        // proIns:[],  //安装材料集合
        logisticsType:''   //物流类型 0-快递 1-物流 2-自提
    }
  },
  methods:{
      setBarTitle() {
        wx.setNavigationBarTitle({
          title: "客户下单"
        });
      },
      cancle(n){
        this.isShow=false
        this.showKuaidiType=false
        this.prolist[n].showType=false
      },
      subConfirm(n){
       // console.log(this.masktitle,"3333333")
        for(let i in this.list){
          if(i*1==this.active){
            // console.log(i)
            if(this.masktitle=="请选择快递类型"){
              this.postMsg = this.list[i].name
              this.logisticsType = this.list[i].Id
            //  if( this.postMsg.indexOf('物流')!=-1){
            //     this.logisticsType=1
            //  }else{
            //     this.logisticsType=0
            //  }
            }
            if(this.masktitle=="请选择订单类型"){
              this.prolist[n].orderTypeName=this.list[i].name
              this.prolist[n].orderType=this.list[i].Id
               //遍历订单  如果订单类型都是设计 隐藏
               for(let i=0;i<this.prolist.length;i++){
                  if(this.prolist[i].orderType!=0){
                      this.latShow = true;
                  }else{
                      this.latShow = false;
                  }
               }
            }
            
          }
         // console.log(typeof this.list[i].statu,"背景")
          if(this.list[i].statu){
              if(this.masktitle=="请选择制作材料"){
                  this.prolist[n].makestatic.push(this.list[i].name+"  "+"￥"+this.list[i].Price +"   ")
                  //this.prolist[n].makestatic+=this.list[i].name+"  "+"￥"+this.list[i].Price +"   "
                  //选中的材料--制作材料 安装材料
                  //console.log(this.prolist[n].specnum,"specnum+++++++++++")
                  let item1={
                      Id:this.list[i].Id,
                      Num:this.prolist[n].specnum,
                      pType:0
                    }
                    console.log(item1)
                   this.prolist[n].proMastic.push(item1)
                  // this.proLists=this.proLists.concat(this.proMastic)
                  console.log(this.prolist[n].proMastic,"zhizuo材料集合")
                  //console.log(this.prolist[n].makestatic,"arr制作材料list")
              }
              if(this.masktitle=="请选择安装材料"){
                  this.prolist[n].installstatic.push(this.list[i].name +"  "+"￥"+ this.list[i].Price+"   ")
                   //选中的材料--制作材料 安装材料
                  let  item2={
                      Id:this.list[i].Id,
                      Num:this.prolist[n].specnum,
                      pType:0
                    }
                     this.prolist[n].proIns.push(item2)
                  //  this.proLists=this.proLists.concat(this.proIns)
                  console.log(this.prolist[n].proIns,"anzhuang材料集合")
              } 
              
           console.log(this.list[i].statu,"材料选择p标识选择背景")

          }
        }
      
        //  this.masktitle=0
        this.showKuaidiType=false
        this.prolist[n].showType=false
        this.isShow=false
      },
      onInput(e,i){
          console.log(e,"时间")
          const  date= new Date(e.mp.detail)
          const year = date.getFullYear()
          let month = date.getMonth()+1
          let dd = date.getDate()
          month.toString().length<2 ? (month= "0"+month) : month
          dd.toString().length<2 ? (dd="0"+dd) : dd
          this.prolist[i].estimateTime = `${year}-${month}-${dd}`
          this.prolist[i].showDate = false
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
            const proitem = JSON.stringify(this.proitem)
            this.prolist.push(JSON.parse(proitem))
            console.log(this.prolist,"1111111111111")
          }
      },
      //选择快递
      chosePost(){
        this.active=0
        this.list=[]
        this.isShow=true;
        this.showKuaidiType=true;
        this.masktitle="请选择快递类型"
        if(toLogin(this.curPage)){
            const res = get('Address/KuaiDiList',this.curPage).then(res=>{
              console.log(res)
              this.kuaidiList = res.data
               let info={}
              for(let i=0;i<this.kuaidiList.length;i++){
                info={
                  name:this.kuaidiList[i].Company,
                  Id:this.kuaidiList[i].Id,
                  Code:this.kuaidiList[i].Code,
                  IsDel:this.kuaidiList[i].IsDel,
                  Price:this.kuaidiList[i].Price
              }
              this.list.push(info)
              }
            
            console.log(this.list,"快递")
              
            })
            
        }
        
      },
      chose(e){
        this.active=e
        if(this.list[e].statu){
          this.$set(this.list[e],'statu',false);
        }else{
          this.$set(this.list[e],'statu',true);
        }

      },
      //日期
      choseDate(n){
        this.prolist[n].showDate=true
      },
      //选择订单类型
      choseType(n){
        this.active=0
        this.list=[]
        this.isShow=true;
        this.prolist[n].showType=true;
        this.prolist[n].makestatic=[] 
        this.prolist[n].proMastic=[]
        this.prolist[n].proIns=[]
        this.prolist[n].installstatic=[]
        this.masktitle="请选择订单类型"
        //console.log(n,"type")
        if(toLogin(this.curPage)){
            get('/Order/GetorderType',this.curPage).then(res=>{
              console.log(res,"订单类型")
              this.typelist=res.data
              let info={}
              for(let i=0;i<this.typelist.length;i++){
                info={
                  name:this.typelist[i].EnumText,
                  Id:this.typelist[i].EnumId,
              }
              this.list.push(info)
              }
              //遍历订单  如果订单类型都是设计 隐藏
              console.log(this.list,"订单类型")
            })
        }
      },
      //制作材料////安装材料
      choseMartic(e,n){ 
        this.page=1
        this.list=[]
        this.active=0
        this.isShow=true;
        this.prolist[n].showType=true;
        if(e==1){
             this.masktitle="请选择制作材料"
            //  this.prolist[n].makestatic='' 
              this.prolist[n].makestatic=[] 
             this.prolist[n].proMastic=[]
              //this.prolist[n].installstatic=''
        }else{
            this.masktitle="请选择安装材料"
            //this.prolist[n].makestatic='' 
            this.prolist[n].installstatic=[]
            this.prolist[n].proIns=[]
             // this.prolist[n].installstatic=''
        }
        if(toLogin(this.curPage)){
          post('/Product/ProductList',{
              UserId:this.userId,
              Token:this.token,
              page:this.page,
              pageSize: this.pageSize
          },this.curPage).then(res=>{
            this.count=res.count
            if (parseInt(this.count) % this.pageSize === 0) {
                this.allPage = this.count / this.pageSize;
            } else {
              this.allPage = parseInt(this.count / this.pageSize) + 1;
            }
           let _list=[]
           _list=_list.concat(res.data)
            console.log(res,"制作材料 安装材料")
            let info={}
            for(let i=0;i<_list.length;i++){
              info={
                name:_list[i].Name,
                Id:_list[i].Id,
                Price:_list[i].Price,
                statu:false
              }
              this.list.push(info)
              
            }
             if (this.allPage > this.page) {
                this.isLoad = true;
              } else {
                this.isLoad = false;
              }
            
          })
        }
      },
      //上传参考图片
      chosseImg(n) {
      const that = this;
      console.log(n)
      let num = 0;
      if (that.prolist[n].referencePicList.length < that.imgLenght) {
        num = that.imgLenght - that.prolist[n].referencePicList.length;
        console.log(num,"最大图片数量")
        wx.chooseImage({
          count: num, //最大图片数量=最大数量-临时路径的数量
          sizeType: ["compressed"], //图片尺寸 original--原图；compressed--压缩图
          sourceType: ["album", "camera"], //选择图片的位置 album--相册选择, 'camera--使用相机
          success: res => {
            const imgPathArr = that.prolist[n].referencePicList
            that.prolist[n].referencePicList = []
            that.prolist[n].referencePicList = imgPathArr.concat(res.tempFilePaths);
                    console.log(res.tempFilePaths,'base')
                    console.log(that.prolist[n].referencePicList,'that.prolist[n].referencePicList')
            that.updateImg(n)
          }
        });
      }
    },
    // 更新图片数据
    updateImg(n){
      const that = this;
      console.log(that.prolist[n].referencePicList.length,'that.prolist[n].referencePicList1111111111')
        // 判断是否大于图片最大数量
        if (that.prolist[n].referencePicList.length === that.imgLenght*1) {
          that.prolist[n].isShowBtnUpload = false;
        }else{
          that.prolist[n].isShowBtnUpload = true;
        }
        // let imgBase =[]
        // // 根据临时路径数组imgPathArr获取base64图片
        // for (let i = 0; i < that.prolist[n].referencePicList.length; i++) {
        //   pathToBase64(that.prolist[n].referencePicList[i]).then(res => {
        //    that.prolist[n].imgBase.push({
        //       PicUrl: res
        //     });
        //     console.log("gffffffffff");
        //     console.log(that.prolist[n].imgBase);
        // })
        //   // wx.getFileSystemManager().readFile({
        //   //   filePath: (this.prolist[n].referencePicList)[i], //选择图片返回的相对路径
        //   //   encoding: "base64", //编码格式
        //   //   success: res => {
        //   //     //成功的回调
        //   //     imgBase.push({
        //   //       PicUrl: "data:image/png;base64," + res.data.toString()
        //   //     });
          
        //   //   }
        //   // });
        // }
        // that.prolist[n].imgBase = imgBase
    },
    deleteImg(i,n) {
      // this.prolist[n].imgBase.splice(i, 1);
      this.prolist[n].referencePicList.splice(i, 1);
      if (this.prolist[n].referencePicList.length < this.imgLenght*1) {
        this.prolist[n].isShowBtnUpload = null;
        this.prolist[n].isShowBtnUpload = true;
      }
      this.updateImg(n)
    },
    //获取用户默认的收货地址
    getDefaultAddress(){
        this.addressinfo=[]
        if(toLogin(this.curPage)){
          const res = post('Address/defaultaddress_New',{
            UserId:this.userId,
            Token:this.token,
            IsDefault:1
          },this.curPage).then(res=>{
            console.log(res.data,"地址相关")
            if(res.data.name.length>0){
                this.addressinfo.push({
                    name:res.data.name,
                    tel:res.data.tel,
                    address:res.data.shopname,
                    addressinfo:res.data.addressinfo
                })
                this.adressId=res.data.id
                console.log(this.addressinfo,"默认收货地址")
                console.log( this.addressinfo.length,"默认收货地址长度")
            }else{
                this.addressinfo=[]
            }
            
          })
        } 
    },
    //去往我的地址页面
    toAddress(){
        wx.navigateTo({url:'/pages/custom/addressList/main?url=smOrder'})
    },
    //返回首页
    backIndex(){
      wx.redirectTo({url:'/pages/index/main'})
    },
    loadMore(){
      if (this.isLoad) {
          this.page++;
          this.choseMartic();
        }
    },
    submit(){
        if(this.adressId.toString().length<1){
          wx.showToast({
              title:"请选择地址！"
            })
          return false
        }
        if(this.logisticsType.toString().length<1){
          wx.showToast({
              title:"请选择快递！"
            })
          return false
        }

        //console.log(this.prolist,"this.prolist")
        let _OrderInsertList=[]
        for(let i=0;i<this.prolist.length;i++){
          let info={}
          let _referencePicList=[]
          //材料集合
          let _proLists=this.prolist[i].proMastic.concat(this.prolist[i].proIns)
          _proLists=JSON.stringify(_proLists)
          //更新图片
          for(let j=0;j<this.prolist[i].referencePicList.length;j++){
            console.log(this.prolist[i].referencePicList[j],'this.prolist[i].referencePicList.length')
              pathToBase64(this.prolist[i].referencePicList[j]).then(res=>{
                // console.log("____________");
                // console.log(info.referencePicList);
                _referencePicList.push({
                  PicUrl:res
                })
              })
          }
          //console.log(JSON.stringify(_proLists),"材料集合提交")
          info={
              adressId:this.adressId,  //地址编号
              orderName:this.prolist[i].orderName,//项目名称
              orderType:this.prolist[i].orderType,  //订单类型
              speclong:this.prolist[i].speclong,    //厚
              specwide:this.prolist[i].specwide,  //宽 
              spechign:this.prolist[i].spechign,      //高
              specnum:this.prolist[i].specnum,        //数量   
              remark:this.prolist[i].remark,      //备注
              referencePicList:JSON.stringify(_referencePicList),    //图片集合 
              estimateTime:this.prolist[i].estimateTime,    //完成时间
              offerTotal:0,     //总金额
              proLists:_proLists, //材料集合
              logisticsName:this.logisticsType,//快递类型
          }                 
          
          console.log(info,"referencePicList999999999999++++++++++++++++++++++++++++++++++")

          //console.log(typeof this.prolist[i].estimateTime,"提交时间")
          // if(this.prolist[i].estimateTime.length==0　|| this.prolist[i].offerTotal.toString().length==0 || this.prolist[i].orderName.length==0){
          if(this.prolist[i].estimateTime.length==0　||  this.prolist[i].orderName.length==0){
            wx.showToast({
              title:"必选项不能为空！",
              icon:'none'
            })
            return false
          } else if( this.prolist[i].specnum<1){
            wx.showToast({
                title: "数量不能小于1",
                icon: "none"
            });
              return false;
          }else{
                _OrderInsertList.push(info);//JSON.stringify(info)
            }
          
        }
       
         let _OrderInsertList2=JSON.stringify(_OrderInsertList)
         console.log(JSON.parse(_OrderInsertList2),"JSON.parse(_OrderInsertList2),")
        if(toLogin(this.curPage)){
          post('/Order/PlaceAnOrder',{
              UserId:this.userId,
              Token:this.token,
              OrderInsertList:_OrderInsertList2
          },this.curPage).then(res=>{
            console.log(res,'提交订单')
            if(res.code==0){
                wx.showToast({
                  title:res.msg,
                  duration:1500,
                })
                setTimeout(()=>{
                  this.isShow=true
                  this.showPaymask=true
                },1500)
                // wx.setStorageSync("address",this.addressinfo[0].addressinfo)
                // console.log(wx.getStorageSync("address"))
            }
          })
        }
        

    },
    jiaoyan() {
      if (!this.name) {
        return "请输入联系人";
      }
      if (!/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.phone)) {
        return "请输入正确的手机号码";
      }
      if (!this.area) {
        return "请选择省份";
      }

      if(latShow){
          if (!this.address) {
            return "请输入地址";
          }
          if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/ .test(this.address)){
            return "请输入正确的地址"
          }
      }
      if(!/^[A-Za-z\u4e00-\u9fa5]+$/ .test(this.name)){
         return "包含非法字符"
      }
      return false;
    },
    closeMask(){
      wx.redirectTo({url:"/pages/custom/order/main"})
    },
    trimWide(n,m){
        if(m==11){
          this.prolist[n].specwide=''
        }else if(m==22){
            this.prolist[n].spechign=''
        }else if(m==33){
            this.prolist[n].speclong=''
        }else if(m==44){
            this.prolist[n].specnum=''
        }
        
    },
    getWide(n){
      console.log(this.prolist[n].specwide.length)
      if(this.prolist[n].specwide.length==0){
          this.prolist[n].specwide=0
      }else if(this.prolist[n].specwide.length>4){
          this.showTips()
          this.prolist[n].specwide=0
      }else if(this.prolist[n].spechign.length==0){
          this.prolist[n].spechign=0
      }else if(this.prolist[n].spechign.length>4){
          this.showTips()
          this.prolist[n].spechign=0
      }else if(this.prolist[n].speclong.length==0){
          this.prolist[n].speclong=0
      }else if(this.prolist[n].speclong.length>4){
          this.showTips()
          this.prolist[n].speclong=0
      }else if(this.prolist[n].specnum.length==0){
          wx.showToast({
            title:'数量不能小于1',
            duration:1500
          })
          this.prolist[n].specnum=1
      }else if(this.prolist[n].specnum.length>4){
          this.showTips()
          this.prolist[n].specnum=1
      }
    },
    puttextatea(){
      this.showP=false
    },
    showTips(){
      wx.showToast({
        title:'长度超过尺寸！'
      })
      return false
    },
    
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
