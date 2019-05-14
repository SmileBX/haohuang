<template>
  <div class="page">
    <div class="from">
      <div class="ul-list bg_fff mb10">
        <div class="li-cell">
          <div class="lable">姓名</div>
          <input class="ipt" type="text" v-model="realName" placeholder="请填写本人真实姓名">
        </div>
        <div class="li-cell">
          <div class="lable">身份证号</div>
          <input class="ipt" type="text" v-model="IdentifyNumber" placeholder="请输入您的身份证号">
        </div>
        <div class="li-cell" style="border-bottom:none;">
          <div class="lable">银行名称</div>
          <div class="selectBox flex flexAlignCenter" @click="selectCardName">
            <div class="iptBox">
              <input
                class="ipt"
                disabled="true"
                :value="bankName"
                type="text"
                placeholder="请选择银行名称"
              >
            </div>
            <span class="icon-arrow arrow-down"></span>
          </div>
        </div>
        <div class="li-cell">
          <div class="lable">开户行名称</div>
          <input class="ipt" type="text" v-model="BankAddress" placeholder="请输入您的开户行名称">
        </div>
        <div class="li-cell">
          <div class="lable">银行卡号</div>
          <input class="ipt" type="text" v-model="BankNo" placeholder="请输入您的银行卡号">
        </div>
        <div class="li-cell">
          <div class="lable">区域绑定</div>
          <div class="selectBox flex flexAlignCenter" @click="selectArea">
            <div class="iptBox">
              <input class="ipt" disabled="true" type="text" :value="area" placeholder="请选择区域选择">
            </div>
            <span class="icon-arrow arrow-down"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="ul-list bg_fff mb10 noborder">
      <div class="li-cell">
        <div class="lable">电工证</div>
        <div class="upbtn" v-if="ElectricianImgSrc">
          <img class="upimg" :src="ElectricianImgSrc" alt>
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(1)" alt>
        </div>
        <div class="upbtn" v-if="ElectricianImgSrc==''" @click="upLoadImg(1)">
          <img class="upimg" src="/static/images/icons/upload_1.png" alt>
        </div>
      </div>
      <div class="li-cell">
        <div class="lable">焊工证</div>
        <div class="upbtn" v-if="WelderImgSrc">
          <img class="upimg" :src="WelderImgSrc" alt>
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(2)" alt>
        </div>
        <div class="upbtn" v-if="WelderImgSrc==''" @click="upLoadImg(2)">
          <img class="upimg" src="/static/images/icons/upload_1.png" alt>
        </div>
      </div>
      <div class="li-cell">
        <div class="lable">高空证</div>
        <div class="upbtn" v-if="HighAltitudeImgSrc">
          <img class="upimg" :src="HighAltitudeImgSrc" alt>
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(3)" alt>
        </div>
        <div class="upbtn" v-if="HighAltitudeImgSrc==''" @click="upLoadImg(3)">
          <img class="upimg" src="/static/images/icons/upload_1.png" alt>
        </div>
      </div>
      <div class="li-cell">
        <div class="lable">其他证件</div>
        <div class="upbtn" v-if="OtherImgSrc">
          <img class="upimg" :src="OtherImgSrc" alt>
          <img src="/static/images/icons/cancle.png" class="close" @click="delImg(4)" alt>
        </div>
        <div class="upbtn" v-if="OtherImgSrc==''" @click="upLoadImg(4)">
          <img class="upimg" src="/static/images/icons/upload_1.png" alt>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="fixd-foot">
        <button class="btn btn_org" @click="Submint">提交</button>
      </div>
    </div>

    <!--选择地址省市遮罩层-->
    <div style="z-index:20000;position:relative;">
      <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
        <van-area :area-list="areaList" @cancel="showArea = false" @confirm="confirmArea"/>
      </van-popup>
    </div>
    <!-- //选择省市区 -->
    <!-- <selectArea :show="isShowShade" @sureSelectArea="sureSelectArea" @closeShade="closeShade"></selectArea> -->
  </div>
</template>
<script>
import "@/css/dd_style.css";
import areaList from "@/utils/areaList";
import { post, valPhone, toLogin, getCurrentPageUrlWithArgs } from "@/utils";
import { pathToBase64 } from "@/utils/image-tools";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.BankId = this.$store.state.cardInfo.id;
    this.bankName = this.$store.state.cardInfo.bankName;
    console.log("BankId:" + this.BankId);
    console.log("bankName:" + this.bankName);
    this.curPage = getCurrentPageUrlWithArgs();
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    if (toLogin(this.curPage)) {
      this.getMasterAuditInfo();
    }
  },
  components: {},
  data() {
    return {
      curPage: "",
      areaList,
      showArea: false,
      userId: "",
      token: "",
      realName: "", //师傅真实姓名
      IdentifyNumber: "", //师傅的身份证号
      BankId: "", //选择的银行
      BankAddress: "", //开户行名称
      BankNo: "", //银行卡卡号
      ElectricianImg: "", //电工证书
      ElectricianImgSrc: "",
      WelderImg: "", //焊工证书
      WelderImgSrc: "",
      HighAltitudeImg: "", //高空证书
      HighAltitudeImgSrc: "",
      OtherImg: "", //其他证书图片,非必填的
      OtherImgSrc: "",
      ProvinceCode: "", //所属省份
      CityCode: "", //	所属市区
      AreaCode: "", //所属区县
      area: "",
      bankName: ""
    };
  },
  methods: {
    initData() {
      this.curPage = "";
      this.areaList;
      this.showArea = false;
      this.userId = "";
      this.token = "";
      this.realName = ""; //师傅真实姓名
      this.IdentifyNumber = ""; //师傅的身份证号
      this.BankId = ""; //选择的银行
      this.BankAddress = ""; //开户行名称
      this.BankNo = ""; //银行卡卡号
      this.ElectricianImg = ""; //电工证书
      this.ElectricianImgSrc = "";
      this.WelderImg = ""; //焊工证书
      this.WelderImgSrc = "";
      this.HighAltitudeImg = ""; //高空证书
      this.HighAltitudeImgSrc = "";
      this.OtherImg = ""; //其他证书图片非必填的
      this.OtherImgSrc = "";
      this.ProvinceCode = ""; //所属省份
      this.CityCode = ""; //	所属市区
      this.AreaCode = ""; //所属区县
      this.area = "";
      this.bankName = "";
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写审核资料"
      });
    },
    valOther() {
      if (this.realName == "") {
        wx.showToast({
          title: "请输入本人姓名!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.IdentifyNumber == "") {
        wx.showToast({
          title: "请输入身份证号!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdentifyNumber)
      ) {
        wx.showToast({
          title: "请输入正确的身份证号格式!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.BankId == "") {
        wx.showToast({
          title: "请选择银行名称!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.BankAddress == "") {
        wx.showToast({
          title: "请输入开户行名称!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.BankNo == "") {
        wx.showToast({
          title: "请输入银行卡号!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (
        !/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/.test(
          this.BankNo
        )
      ) {
        wx.showToast({
          title: "请输入正确的银行卡号!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.area == "") {
        wx.showToast({
          title: "请选择区域!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.ElectricianImg == "") {
        wx.showToast({
          title: "请上传电工证!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.WelderImg == "") {
        wx.showToast({
          title: "请上传焊工证!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.HighAltitudeImg == "") {
        wx.showToast({
          title: "请上传高空证!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      return true;
    },
    Submint() {
      if (this.valOther()) {
        this.sumbitMasterApplication();
      }
    },
    selectArea() {
      this.showArea = true;
    },
    confirmArea(area) {
      this.showArea = false;
      let text = "";
      const areas = area.mp.detail.values;
      for (let i = 0; i < areas.length; i++) {
        text += areas[i].name;
      }
      (this.provinceCode = areas[0].code || ""),
        (this.cityCode = areas[1].code || ""),
        (this.districtCode = areas[2].code || ""),
        (this.area = text);
    },
    selectCardName() {
      //选择银行名称
      this.$store.commit("setSelectCard", {
        url: "/pages/FillInfp/main",
        status: true
      });
      wx.navigateTo({ url: "/pages/chooseBank/main" });
    },
    upLoadImg(index) {
      //上传图片
      let _this = this;
      wx.chooseImage({
        //进入这里面的时候this发生了改变
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          let imgPathArr = res.tempFilePaths[0];
          if (index === 1) {
            _this.ElectricianImgSrc = imgPathArr;
          }
          if (index === 2) {
            _this.WelderImgSrc = imgPathArr;
          }
          if (index === 3) {
            _this.HighAltitudeImgSrc = imgPathArr;
          }
          if (index === 4) {
            _this.OtherImgSrc = imgPathArr;
          }
          //   _this.imgPathArr = _this.imgPathArr.concat(res.tempFilePaths);
          // wx.getFileSystemManager().readFile({
          //   filePath: imgPathArr, //选择图片返回的相对路径.
          //   encoding: "base64", //编码格式
          //   success: res => {
          //     //成功的回调
          //     let imgBase64Str = "data:image/jpg;base64," + res.data;
          //     if (index === 1) {
          //       // ElectricianImg: "", //电工证书
          //       // WelderImg: "", //焊工证书
          //       // HighAltitudeImg: "", //高空证书
          //       // OtherImg: "", //其他证书图片,非必填的
          //       _this.ElectricianImg = imgBase64Str;
          //     }
          //     if (index === 2) {
          //       // ElectricianImg: "", //电工证书
          //       // WelderImg: "", //焊工证书
          //       // HighAltitudeImg: "", //高空证书
          //       // OtherImg: "", //其他证书图片,非必填的
          //       _this.WelderImg = imgBase64Str;
          //     }
          //     if (index === 3) {
          //       // ElectricianImg: "", //电工证书
          //       // WelderImg: "", //焊工证书
          //       // HighAltitudeImg: "", //高空证书
          //       // OtherImg: "", //其他证书图片,非必填的
          //       _this.HighAltitudeImg = imgBase64Str;
          //     }
          //     if (index === 4) {
          //       // ElectricianImg: "", //电工证书
          //       // WelderImg: "", //焊工证书
          //       // HighAltitudeImg: "", //高空证书
          //       // OtherImg: "", //其他证书图片,非必填的
          //       _this.OtherImg = imgBase64Str;
          //     }
          //     console.log("图片" + _this.ElectricianImg);
          //   }
          // });
        }
      });
    },
    delImg(index) {
      if (index === 1) {
        this.ElectricianImgSrc = "";
        this.ElectricianImg = "";
      }
      if (index === 2) {
        this.WelderImgSrc = "";
        this.WelderImg = "";
      }
      if (index === 3) {
        this.HighAltitudeImgSrc = "";
        this.HighAltitudeImg = "";
      }
      if (index === 4) {
        this.OtherImgSrc = "";
        this.OtherImg = "";
      }
    },
    async base64Img(path) {
      const base64Arr = await pathToBase64(path);
      return base64Arr;
    },
    async sumbitMasterApplication() {
      let that = this;
      let ElectricianImg = await base64Img();
      post("InstalMaster/SumbitMasterApplication", {
        MasterId: that.userId,
        MasterToken: that.token,
        ProvinceCode: that.provinceCode,
        CityCode: that.cityCode,
        AreaCode: that.districtCode,
        RealName: that.realName,
        IdentifyNumber: that.IdentifyNumber,
        BankId: that.BankId,
        BankAddress: that.BankAddress,
        BankNo: that.BankNo,
        ElectricianImg: that.ElectricianImg,
        WelderImg: that.WelderImg,
        HighAltitudeImg: that.HighAltitudeImg,
        OtherImg: that.OtherImg
      }).then(result => {
        if (result.code === 0) {
          this.$store.commit("setSelectCard", {
            url: "",
            status: false
          });
          wx.showModal({
            title: "审核资料提交成功",
            content:
              "审核资料需要1~7个工作日才能完成，请耐心等待，审核通过会以短信方式通知您",
            showCancel: false,
            confirmColor: "#ff7e22",
            success(res) {
              if (res.confirm) {
                that.initData();
                wx.reLaunch({
                  url: "/pages/login2/main"
                });
              } else if (res.cancel) {
                that.initData();
                wx.reLaunch({
                  url: "/pages/login2/main"
                });
              }
            }
          });
        }
      });
    },
    getMasterAuditInfo() {
      //审核不通过的时候，重新填写提交
      let that = this;
      post(
        "InstalMaster/GetMasterAuditInfo",
        {
          MasterId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          that.realName = res.data.RealName; //师傅真实姓名
          that.IdentifyNumber = ""; //师傅的身份证号
          //that.BankId =; //选择的银行
          that.BankAddress = res.data.BankAddress; //开户行名称
          that.BankNo = res.data.BankCardNo; //银行卡卡号
          that.ElectricianImgSrc = res.data.ElectricianCertificate;//电工证书
          that.WelderImgSrc = res.data.WelderCertificate;//焊工证书
          that.HighAltitudeImgSrc = res.data.HighAltitudeCertificate;//高空证书
          that.OtherImgSrc = res.data.OtherCertificate;//其他证书图片非必填的
          that.ProvinceCode = res.data.ProvinceCode; //所属省份
          that.CityCode = res.data.CityCode; //	所属市区
          that.AreaCode = res.data.AreaCode; //所属区县
          that.area = "";
          that.bankName = res.data.BankName;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
.van-popup--bottom {
  width: 102% !important;
}
</style>
