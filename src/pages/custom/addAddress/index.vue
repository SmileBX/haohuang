<template>
  <div class="page">
    <!-- <div class="addAddress__weui-cells weui-cells mt0"> -->
      <!-- <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">收获人</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请输入收货人姓名">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号码</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请输入收货人手机号">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">所在地区</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择所在地区" disabled>
        </div>
        <div class="weui-cell__ft">
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="weui-cell flexAlignStart">
        <div class="weui-cell__hd">
          <label class="weui-label">详细地址</label>
        </div>
        <div class="weui-cell__bd">
          <textarea name="" id="" class="weui-area" placeholder="道路、门牌号、小区、楼栋号、单元、室等"></textarea>
        </div>
      </div> -->
      <van-cell-group>
        <van-field clearable label="收货人" :value="name" @change="onName" placeholder="请输入收货人姓名" title-width="70px"/>
        <van-field clearable label="手机号码" :value="phone" @change="onPhone"  placeholder="请输入手机号码" title-width="70px"/>
        <van-field clearable label="店铺地址" :value="site" @change="onSite"  placeholder="请输入店铺地址" title-width="70px"/>
        <van-field
          clearable
          label="所在地区"
          placeholder="请输入所在地区"
          title-width="70px"
          icon="arrow"
          disabled
          :input-class="area?'color333':''"
          @click="showArea = true"
          :value="area"
        />

        <van-field
          label="详细地址"
          type="textarea"
          style="height:38rpx;"
          placeholder="道路、门牌号、小区、楼栋号、单元、 室等"
          placeholder-style="height:38rpx!important"
          :border="false"
          title-width="70px"
          input-class="van-textarea-min-height"
          :value="address"
          @change="onAddress" 
        />
      </van-cell-group>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          设为默认地址
        </div>
        <div class="weui-cell__ft">
          <!-- <switch checked /> -->
          <van-switch :checked="isDefault" size="24px" @change="isDefault = !isDefault"  active-color="#ff6325" />
        </div>
      </div>
    <!-- </div> -->
    <div class="ftBtn mt30">
      <div class="inner">
        <div class="btn btn-active fill" @click="submit">{{buttonText}}</div>
      </div>
    </div>
    <!--选择地址省市遮罩层-->
    <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
      <van-area :area-list="areaList" @cancel="showArea = false" @confirm="confirmArea"/>
    </van-popup>
  </div>
</template>
<script>
import areaList from "@/utils/areaList";
import {post,toLogin, getCurrentPageUrlWithArgs} from "@/utils/index";
export default {
    onLoad() {
      this.setBarTitle();
      
      
      
  },
  onShow() {
    //编辑地址的需要
      
      this.curPage = getCurrentPageUrlWithArgs();
      this.identity = wx.getStorageSync("identity");
      this.userid = wx.getStorageSync("userId");
      this.token = wx.getStorageSync("token");
      const id = this.$root.$mp.query.id 
      console.log(id,"id")  
      if(id){
        this.editAddress(id)
      }
  },
  data() {
    return {
      curPage: "",
      areaList,
      showArea: false,
      name: "",
      phone:'',
      site:'',//店铺地址
      area:'',
      provinceCode:'',
      cityCode:'',
      districtCode:'',
      address:'',
      isDefault:false,
      // showDefault: true,
      // isshow: false,
      // index: 0,
      token: "",
      userid: "",
      buttonText:'保存'
      // provArray: ["A", "B", "C"]
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "添加新地址"
      });
      //页面加载的时候清空数据
        this.buttonText= '保存'
        this.name='';
        this.phone='';
        this.isDefault=false;
        this.area='';
        this.address='';
        this.provinceCode='';
        this.cityCode='';
        this.districtCode ='';
        this.site=''
    },
    editAddress(id){
      let that = this;
      if(toLogin(that.curPage)){
          post('Address/GetInfo',{
              Id:id,
              UserId:that.userid,
              Token: that.token
          },
            that.curPage
          ).then(res=>{
              console.log(res,"更改编辑用户信息")
              that.buttonText= '修改';
              that.name=res.data.name;
              that.phone=res.data.tel;
              that.isDefault=res.data.is_def?true:false;
              that.area=res.data.addressstr;
              that.address=res.data.address;
              that.provinceCode=res.data.province;
              that.cityCode=res.data.city;
              that.districtCode =res.data.district;
              that.site = res.data.shopname
          })
          
      }
    },
    submit(){
        console.log(this.provinceCode,"城市code")
        const toast = this.jiaoyan()
        console.log(toast)
        if(toast){
            wx.showToast({
              title:toast,
              icon: "none",
              duration: 2000
            });
            return false;
        }
        const params = {
            UserId:this.userid,
            Token: this.token,
            Consignee: this.name,
            Mobile: this.phone,
            IsDefault: this.isDefault?1:0,
            FullAddress: this.address,
            ProvinceCode: this.provinceCode,
            CityCode: this.cityCode,
            DistrictCode : this.districtCode,
            ShopName:this.site,
            StreetCode:'',
            PostCode:''
        }
        if(toLogin(this.curPage)){
            if(this.buttonText === '修改'){
                params.Id=this.$root.$mp.query.id;//修改地址
                post('/Address/UpdateAddress',params,this.curPage).then(res=>{
                    wx.showToast({
                      title: res.msg,
                      icon: "success"
                    });
                    setTimeout(()=> {
                        wx.redirectTo({ url: "/pages/custom/addressList/main" });
                      },1500)
                })
            }else{
              //新增
              post('/Address/AddAddress',params,this.curPage).then(res=>{
                  wx.showToast({
                    title: res.msg,
                    icon: "success"
                  });
                    setTimeout(()=> {
                      wx.redirectTo({ url: "/pages/custom/addressList/main" });
                    },1500)
            
              })
            }
        }
    },
    confirmArea(area){
        this.showArea = false
        let text = ''
        const areas = area.mp.detail.values
        for(let i=0;i<areas.length;i++){
          text+=areas[i].name
        }
        this.provinceCode=areas[0].code||'',
        this.cityCode=areas[1].code||'',
        this.districtCode=areas[2].code||'',
        this.area = text;

    },
    jiaoyan(){
      if(!this.name){
          return '请输入收货人'
      }if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.phone))){
          return '请输入正确的手机号码'
      }if(!this.area){
         return '请选择省份'
      }if(!this.address){
        return '请输入收货地址'
      }
      return false;
    },
    onName(e){
      this.name = e.mp.detail
    },onPhone(e){
      this.phone = e.mp.detail
    },onAddress(e){
      this.address = e.mp.detail
    },onSite(e){
      this.site = e.mp.detail
    }
   

  }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>