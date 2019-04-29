<template>
  <div class="selectTypeShade shadeAll" v-if="show">
    <div class="mask"></div>
    <div class="shade alignBottom__shade">
      <div class="shade__bd">
        <div class="shadeContent__hd clear">
          <a class="btn btn-cancel fl" @click="shadeClose">取消</a>
          <a class="btn btn-sure fr" @click="btnSure">确定</a>
        </div>
        <div class="shadeContent__bd">
          <picker-view
            class="reasonList"
            style="width: 100%; height: 250px;"
            indicator-style="height: 50px;"
            @change="provincesChange"
          >
            <!-- 省 -->
            <picker-view-column>
              <view
                v-for="(item,index) in provinceList"
                :key="index"
                class="picker-item"
                style="line-height:50px;"
              >{{item.Name}}</view>
            </picker-view-column>
            <!-- 市 -->
            <picker-view-column>
              <view
                v-for="(item, index) in cityList"
                :key="index"
                class="picker-item"
                style="line-height:50px;"
              >{{item.Name}}</view>
            </picker-view-column>
            <!-- 区 -->
            <picker-view-column>
              <view
                v-for="(item, index) in districtList"
                :key="index"
                class="picker-item"
                style="line-height:50px;"
              >{{item.Name}}</view>
            </picker-view-column>
          </picker-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
import { post } from "@/utils";
export default {
  props: ["show"],
  onLoad() {},
  created() {
    this.getprovinces();
  },
  data() {
    return {
      provinceList: [], //省
      cityList: [], //市
      districtList: [], //区
      ProvinceCode: "",
      CityCode: "",
      districtCode: "",
      provinceName: "",
      cityName: "",
      districtName: "",
      indexArr:[],
    };
  },
  methods: {
    provincesChange(e) {
      const valIndex = e.mp.detail.value; //组件的下标索引数字例：[0,0,0,]
      this.provinceName = this.provinceList[valIndex[0]].Name;
      this.ProvinceCode = this.provinceList[valIndex[0]].Code;
      this.getcitys();
      if (valIndex[1] != 0) {
        this.CityCode = this.cityList[valIndex[1]].Code;
        this.cityName = this.cityList[valIndex[1]].Name;
        this.getQu();
      }
      if (valIndex[2] != 0) {
        this.districtName = this.districtList[valIndex[2]].Name;
        this.districtCode = this.districtList[valIndex[2]].Code;
      }
      //
    },
    btnSure() {
      //点击确认
      if (this.ProvinceCode && this.CityCode && this.districtCode) {
        let address =
          this.provinceName + "_" + this.cityName + "_" + this.districtName;
        let allCode =
          this.ProvinceCode + "_" + this.CityCode + "_" + this.districtCode;
        this.$emit("sureSelectArea", address, allCode);
      } else {
        wx.showToast({
          title: "请选择完地址",
          icon: "none",
          duration: 1500
        });
      }
    },
    shadeClose(){  //点击取消
     this.$emit("closeShade");
    },
    // 获取省
    async getprovinces() {
      let result = await post("Area/GetArea", {
        Types: "Province"
      });
      if (result.code === 0) {
        if (result.data.length > 0) {
          this.provinceList = result.data;
        }
      }
    },
    // 获取市
    async getcitys() {
      let result = await post("Area/GetArea", {
        Types: "City",
        Code: this.ProvinceCode
      });
      if (result.code === 0) {
        if (result.data.length > 0) {
          this.cityList = result.data;
        }
      }
    },
    async getQu() {
      let result = await post("Area/GetArea", {
        Types: "District",
        Code: this.CityCode
      });
      if (result.code === 0) {
        if (result.data.length > 0) {
          this.districtList = result.data;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shadeContent__hd .btn {
  font-size: 30rpx;
  padding: 0 30rpx;
}
.shadeContent__hd .btn-cancel {
  float: left;
}
.shadeContent__hd .btn-sure {
  float: right;
  color: #ff6d3e;
}
.picker-item {
  text-align: center;
}
</style>