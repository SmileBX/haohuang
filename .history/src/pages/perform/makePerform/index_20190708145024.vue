<template>
  <div class="page " >
    <div class="bg_fff">
        <div class="list">
          <div class="list-item" v-for="(item,key) in MasterList" :key="key">
              <div class="select__weui-cells ">
                  <div class="weui-cells__title">安装师傅</div>
                  <div class="ipt flex flexAlignCenter">
                      <div class="flex1">
                          <input type="text" class="weui-input" disabled="true" placeholder="请选择" v-model="item.bindName" >
                      </div>
                      <span class="icon-arrow arrow-down" @tap="showChoice(key)"></span>
                  </div>
              </div>
              <div class="flex flex1 flexAlignCenter" style="padding:0 30rpx;">
                <span class="lab">安装价格</span>
                <div class="ipt flex">
                  <input type="number" class="flex1 my-input" v-model="item.InstallMoney" placeholder="0">
                </div>
              </div>
              <div
                style="padding-bottom:40rpx;padding-top:40rpx;"
                class="addDetail bg_fff" 
              >
                <div class="btn btn-add" style="color:#666;border-color:#e5e5e5;" @tap="delOrder(key)" v-if="MasterList.length>1&&key!=MasterList.length-1">
                  删除安装师傅
                </div>
              </div>
              <div class="maskType border-box" v-if="item.showType">
                <div class="flex">
                      <span class="size" @tap="cancle(key)">取消</span>
                      <span class="title">安装师傅</span>
                      <span class="color size" @tap="subConfirm(key)">确定</span>
                </div>
                <scroll-view :scroll-y="true" style="height:480rpx;" class="showItem" @scrolltolower="loadMore">
                  <div v-for="(item,index) in list" :key="index">
                      <p :class="index==active?'itemactive':''" @tap="chose(index)" style="margin-top:3rpx;">{{item.RealName}}
                        &nbsp;&nbsp;<span>{{item.Mobile}}</span>
                      </p>
                  </div>
                </scroll-view>
            </div>
          </div>
        </div>
        <!--按钮增加明细-->
        <div style="padding-bottom:40rpx;padding-top:40rpx;" class="addDetail bg_fff" @click="addOrder">
          <div class="btn btn-add">
            <img src="/static/images/icons/add_2.png" alt>增加安装师傅
          </div>
        </div>
    </div>
    <div class="ftBtn" style="height:156rpx;position:relative;margin-top:100rpx">
      <div class="inner fixed bm0 border-box bg_f4f7fc" style="position:relative">
        <div class="btn btn-active fill" @tap="submit">确认</div>
      </div>
    </div>

    <!--弹层-->
    <div class="mask" v-if="isShow" catchtouchmove='true'></div>

  </div>
</template>
<script>
import "@/css/common.css";
import "@/css/dd_style.css";
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
  components:{
   
  },
  data() {
    return {
    active:0,
    userId: "",
    token: "",
    curPage: "",
    identity: "",
    orderId: "",
    isShow:false,
    MasterList:[{
      bindName:"",//安装师傅名称
      MasterId:'',//..
      IsMain:0,
      InstallMoney:'',
      showType:false
    }],//安装师傅指派订单
    list:[]


    };
  },
  computed:{
   
    
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.UserId = wx.getStorageSync("userId");
    this.Token = wx.getStorageSync("token");
    this.curPage = getCurrentPageUrlWithArgs();
    this.identity = wx.getStorageSync("identity");
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId;
    }
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "指派安装师傅"
      });
    },
    showChoice(index){
      this.getMasterList()
      this.isShow = true
      this.MasterList[index].showType = true
    },
    //获取安装师傅列表
    getMasterList(){
      if(toLogin(this.curPage)){
        post('ExecuteOrder/GainMasterList',{
            ExecuteId: this.UserId,
            Token: this.Token,
        },this.curPage).then(res=>{
          if(res.code==0){
            this.list = res.data
            res.data.map(item=>{
              this.$set(item,"Mobile",item.Mobile.substring(0, 3)+'****'+item.Mobile.substring(item.Mobile.length - 4))
            })
          }
        })
      }
    },
    //增加指派
    addOrder(){
      let keys = this.MasterList[0]
      let info = {}
      Object.keys(keys).map(item=>{
        this.$set(info,item,"")
      })
      const _keys = JSON.stringify(info)
      this.MasterList.unshift(JSON.parse(_keys))
    },
    //删除指派
    delOrder(index){
      this.MasterList.splice(index,1)
    },
    cancle(index){
      this.isShow = false
      this.MasterList[index].showType = false
    },
    chose(index){
      this.active = index
    },
    subConfirm(index){
      this.MasterList[index].bindName = this.list[this.active].RealName
      this.MasterList[index].MasterId = this.list[this.active].Id
      this.isShow = false
      this.MasterList[index].showType = false
    },
    val(){
      for(let i=0;i<this.MasterList.length;i++){
        if(this.MasterList[i].MasterId === ''){
          wx.showToast({
            title:"请选择安装师傅",
            icon:"none",
            duration:1500
          })
          return false
        }
        if(this.MasterList[i].InstallMoney <= 0){
            wx.showToast({
              title:"请填写安装价格",
              icon:"none",
              duration:1500
            })
            return false
        }
      }
      return true
    },
    submit(){
      console.log(this.MasterList)
      if(this.val()){
        if(this.MasterList.length>1){
          for(let j=0;j<this.MasterList.length;j++){
            if(j == this.MasterList.length-1){
              this.$set(this.MasterList[j],"IsMain",1)
            }else{
              this.$set(this.MasterList[j],"IsMain",0)
            }
          }
          
        }else{
          this.$set(this.MasterList[0],"IsMain",1)
        }
      }
      console.log(this.MasterList,"改造后")
      const _MasterList = JSON.stringify(this.MasterList)
      this.confirmSubmit(_MasterList)
    },
    confirmSubmit(_MasterList){
      if(toLogin(this.curPage)){
        post('ExecuteOrder/ExecuteArrangeMaster',{
            ExecuteId: this.UserId,
            Token: this.Token,
            OrderNo:this.orderId,
            MasterList:_MasterList
        },this.curPage).then(res=>{
          console.log(res)
          if(res.code==0){
            wx.showToast({
              title:"指派安装师傅成功！",
              duration:1500
            })
          }
        })
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
.list-item{
  position: relative;
}
.list-item:after{
  position:absolute;
  content:"";
  bottom:0;
  width:690rpx;
  height:2rpx;
  background:#f2f2f2;
  left:30rpx;
}
.my-input{
  width: 140rpx;
  border: 1px solid #f2f2f2;
  border-radius: 8rpx;
  padding: 12rpx 20rpx;
  text-align:center;
  margin-left:20rpx
}
</style>