<template>
  <div class="page">
    <div class="addressList">
      <radio-group class="radio-group" @change="radioChange">
          <div v-for="(item,index) in sitelist" :key="item.id">
            <div class="item">
              <div class="item__bd"  @click="choseAddress(index)">
                <div class="remarks">
                  <span class="name">{{item.name}}</span>
                  <span class="tel">{{item.phone}}</span>
                </div>
                <p class="address">{{item.site}}</p>
              </div>
              <div class="item__ft flex">
                  <label class="radio flex-container choose" @click="changeDefault(index)">
                    <radio :value="item.id" :checked="item.checked"/>
                    <span class="chosetitle" v-if="!item.checked">默认地址</span>
                    <span class="chosetitle2" v-else>设为默认地址</span>
                </label>
                <!-- <div class="flexItem checked">
                  <img src="/static/images/icons/radio_2.png" class="IconsCK" alt="">
                  默认地址
                </div> -->
                <div class="flexItem flex1 text_r">
                  <div class="iconText inline-block" @click="editAddress(item.id)"><img src="/static/images/icons/eadit.png" class="icon" alt=""> 编辑</div>
                  <div class="iconText inline-block" @click="Delete(item.id,index)"><img src="/static/images/icons/del.png" class="icon" alt="">删除</div>
                </div>
              </div>
            </div>
          </div>
      </radio-group>
    </div>
    <div class="ftBtn" style="heigth:100rpx;" @click="addNewSite">
      <div class="inner fixed bm0 border-box pd0">
        <div class="btn btn-active fill radius0"><img src="/static/images/icons/add.png" class="addImg" alt="">添加新增地址</div>
      </div>
    </div>
    <!--遮罩层-->
    <!-- <div class="mask" v-if="isshow"></div>
    <div class="delmask flex" v-if="isshow">
      <p class="btntitle">您确定删除该收货地址吗？</p>
      <p class="flex buttontbn">
        <text @click="cancle">取消</text>
        <text>确定</text>
      </p>
    </div> -->
    <van-dialog id="van-dialog"/>
  </div>
</template>
<script>
import { get,post, toLogin, getCurrentPageUrlWithArgs, valPhone } from "@/utils";
import Dialog from "../../../../static/vant/dialog/dialog";
export default {
    onLoad() {
      this.setBarTitle();
  },
  onShow() {
      this.page=1;
      this.sitelist=[]
      this.curPage = getCurrentPageUrlWithArgs();
      this.identity = wx.getStorageSync("identity");
      this.userid=wx.getStorageSync("userId")
      this.token=wx.getStorageSync("token")
      this.geSiteList()
      

     
  },
  data() {
    return {
        curPage: "",
        identity:'',
        userid:'',
        token:'',
        isshow: true,
        data: 0,
        sitelist: [],
        page:1,
        pageSize:10
    };
  },
  watch:{
    
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "地址管理"
      });
    },
    async geSiteList(){
      if(toLogin(this.curPage)){
          const res = await post("/Address/AddressList", {
              UserId: this.userid,
              Token: this.token,
              Page: this.page,

              PageSize: this.pageSize
          },
            this.curPage
          );
          if(this.page===1){
          this.sitelist= []
          }
          for (let i = 0; i < res.data.length; i += 1) {
            const list = res.data[i];
            this.sitelist.push({
              id: list.id,
              name: list.name,
              phone: list.tel,
              shopname:list.shopname,
              site: list.addressinfo,
              checked: list.is_def
            });
          }
          console.log(this.sitelist,"列表数组")
      }
    },
    changeDefault(i){ //设置默认
        const params={
            Id: this.sitelist[i].id,
            UserId: this.userid,
            Token: this.token
        }
        post("Address/SetDefaultaddress",params,this.curPage)
    },
    radioChange(e){  //设置选中样式
      var arrs = this.sitelist;
      var that = this;
      for (const x in arrs) {
        if (arrs[x].id == e.target.value) {
          arrs[x].checked = true;
        } else {
          arrs[x].checked = false;
        }
      }
    },
    addNewSite(){  //新增地址
        wx.redirectTo({ url: "/pages/custom/addAddress/main" });
    },
    editAddress(id){  //编辑地址
        wx.redirectTo({ url: "/pages/custom/addAddress/main?id="+id});
    },
    Delete(id,index){  //删除地址
      const that = this
      Dialog.confirm({
        title: "您确定删除该收货地址吗？",
        message: ""
      }).then(
        ()=>{
            post("Address/DeleteAddress",{
                Id: id,
                UserId: that.userid,
                Token: that.token
            },that.curPage).then(res=>{
                that.sitelist.spilce(index,1)
                that.$router.go(0)
            })
            //on confirm
        }
      ).catch(()=>{
        //on cancle
      })
    },
    //选择地址
    choseAddress(e){
        console.log(e,this.sitelist[e])
        wx.setStorageSync("addressinfo",this.sitelist[e])
        // wx.navigateBack()
        wx.redirectTo({url:'/pages/custom/smOrder/main?url=addresslist'})

    }

  },
    // 下拉刷新
    onPullDownRefresh(){
      console.log('aaa')
      this.page=1;
      this.geSiteList()
      // 关闭下拉刷新
      wx.stopPullDownRefresh()
    },
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>