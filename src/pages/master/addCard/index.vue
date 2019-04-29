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
            <p class="txt weui-input" style="color:#888">已绑定手机号：{{tel}}</p>
          </div>
        </div>
      </div>
      <div class="select__weui-cells">
        <div class="ipt flex flexAlignCenter" style="overflow:hidden;">
          <div class="flex1">
            <input type="text" placeholder="请输入手机验证码" v-model="Code" class="weui-input">
          </div>
          <span class="btnCode"  @click="getCode">{{codeMsg}}</span>
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
import { post,valPhone,toLogin,getCurrentPageUrlWithArgs} from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow(){
    //identity: 1:客服；2：客户；3：师傅
    // 会员注册0,
    //         会员登录1,
    //         会员找回密码2,
    //         会员找回支付密码3,
    //         会员修改手机号4,
    //         会员重新绑定手机号5,
    //         会员微信绑定手机号6,
    //         师傅登录7,
    //         师傅注册8,
    //         师傅绑定银行卡9,
    //         师傅微信绑定手机号10,
    //         师傅修改手机号11,
    //         师傅重新绑定手机号12,
    //         师傅找回密码13,
    //         客服登录14,
    //         客服找回密码15,
    this.curPage = getCurrentPageUrlWithArgs();
    this.mobile = wx.getStorageSync("mobile");
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    console.log(this.mobile);
    if(this.mobile){
      this.tel = this.mobile.substring(0, 3) +"****" +this.mobile.substring(this.mobile.length - 4);
    }
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
      mobile:"",
      tel:"",
      Code:"",
      codeMsg:"获取验证码",
      timer: null,
      count: "",
      TIME_COUNT: 60,
      has_click: false
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
    getCode() {
      if (valPhone(this.mobile)) {
        if (!this.has_click) {
          this.getWxBindTelCode();
        }
      }
    },
     //获取验证码
    async getWxBindTelCode() {
      let result = await post("Login/GetWxBindTelCode", {
        Mobile: this.mobile,
        CodeType: 9
      });
      if (result.code === 0) {
        this.has_click = true;
        const TIME_COUNT = 90; // 90s后重新获取验证码
        this.count = TIME_COUNT;
        wx.showToast({
          title: "发送成功，请注意查收!",
          icon: "none",
          duration: 1500
        });
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.codeMsg = this.count + "s后重新获取";
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.codeMsg = "获取验证码";
          }
        }, 1000);
      }
    },
    async addBank(){
      let result = await post("Bank/AddBank",{
        UserId:this.userId,
        Token:this.token,
        BankCardName:this.bankCardName,
        BankCardNo:this.bankCardNo,
        BankAddress:this.bankAddress,
        BankId:this.bankId,
        Mobile: this.mobile,
        VerifyCode: this.Code
      },this.curPage)
      if(result.code===0){
        wx.showToast({
          title: "新增成功!",
          icon: "none",
          duration: 1500
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>