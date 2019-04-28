<template>
  <div class="page">
    <div class="tips__txt flex">
      <img src="/static/images/icons/tips.png" alt class="icon_tips">
      <div class="txtBox flex1">
           姓名必须和身份证中的一样，务必保证银行卡信息正确，否则无法退款
      </div>
    </div>
    <div class="addCard__form bg_fff">
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="请输入持卡人姓名" v-model="bankCardName" class="weui-input">
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="请输入卡号" v-model="bankCardNo" class="weui-input">
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="选择银行名称" disabled="true" class="weui-input">
          </div>
          <span class="icon-arrow arrow-right"></span>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <input type="text" placeholder="请输入开户行名称" v-model="bankAddress" class="weui-input">
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter">
          <div class="flex1">
            <p class="txt weui-input" style="color:#888">已绑定手机号：{{mobile}}</p>
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter" style="overflow:hidden;">
          <div class="flex1">
            <input type="text" placeholder="请输入手机验证码" v-model="Code" class="weui-input">
          </div>
          <span class="btnCode">获取验证码</span>
        </div>
      </div>
    </div>
    <div class="ftBtn pt20 pb20">
      <div class="inner">
        <div class="btn btn-active fill" @click="bindCard">绑定</div>
      </div>
    </div>
  </div>
</template>
<script>
import { post,toLogin,getCurrentPageUrlWithArgs} from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow(){
    this.curPage = getCurrentPageUrlWithArgs();
    this.mobile = wx.getStorageSync("mobile");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
  },
  data() {
    return {
      curPage: "",
      userId: "",
      token: "",
      bankCardName:"", //持卡人人名字
      bankCardNo:"",  //银行卡号
      bankAddress:"",  //开户地址
      bankId:1,  //选择的银行Id
      mobile:""
    }
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "添加银行卡"
      });
    },
    valOther(){
      if(this.bankCardName==""){
        wx.showToast({
          title: '请输入持卡人姓名!',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if(this.bankCardNo == ""){
        wx.showToast({
          title: '请输入银行卡号!',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      if(!/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/.test(this.bankCardNo)){
         wx.showToast({
          title: '请输入正确的卡号格式!',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      return true;
    },
    bindCard(){
      if(this.valOther() && toLogin(this.curPage)){
        this.addBank();
      }
    },
    async addBank(){
      let result = await post("Bank/AddBank",{
        UserId:this.userId,
        Token:this.token,
        BankCardName:this.bankCardName,
        BankCardNo:this.bankCardNo,
        BankAddress:this.bankAddress,
        BankId:this.bankId
      },this.curPage)
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>