<template>
  <div class="foot">
    <div class="inner">
      <div class="list clear center" :class="[identity !==3 ? 'wd':'w25']">
        <div :class="{'active':activeIndex===0}" @click="gotoPage(0)" class="w20">
          <img v-if="activeIndex===0" src="/static/images/footer/ft1_2.png" class="iconImg" alt/>
          <img v-else src="/static/images/footer/ft1.png" class="iconImg" alt/>
          <div class="title">首页</div>
        </div>
        <div :class="{'active':activeIndex===1}" @click="gotoPage(1)" class="w20">
          <img v-if="activeIndex===1" src="/static/images/footer/ft2_2.png" class="iconImg" alt/>
          <img v-else src="/static/images/footer/ft2.png" class="iconImg" alt/>
          <div class="title">订单</div>
        </div>
        <div :class="{'active':activeIndex===2}" @click="gotoPage(2)" v-if="identity !==3" class="w20">
          
        </div>
        <div :class="{'active':activeIndex===3}" @click="gotoPage(3)" class="w20">
          <img v-if="activeIndex===3" src="/static/images/footer/ft4_2.png" class="iconImg" alt/>
          <img v-else src="/static/images/footer/ft4.png" class="iconImg" alt/>
          <div class="title">消息</div>
        </div>
        <div :class="{'active':activeIndex===4}" @click="gotoPage(4)" class="w20">
          <img v-if="activeIndex===4" src="/static/images/footer/ft5_2.png" class="iconImg" alt/>
          <img v-else src="/static/images/footer/ft5.png" class="iconImg" alt/>
          <div class="title">我的</div>
        </div>
      </div>
    </div>
      <div class="circle" @click="gotoPage(2)" v-if="identity !==3">
            <img src="/static/images/footer/ft3.png" alt/>
            <div class="downOrder">下单</div>
          </div>
  </div>
</template>
<script>
import { getCurrentPageUrlWithArgs } from "@/utils";
export default {
  props: ["identity"], //identity: 1:客服；2：客户；3：师傅
  onLoad() {},
  created() {
    console.log("dddddddddddddddd");
    this.curPage = getCurrentPageUrlWithArgs();
    console.log("当前的页面：" + this.curPage);
    let that = this;
    that.page.forEach(element => {
      let num = 0;
      element.url.forEach(item => {
        if (that.curPage.split("?")[0] == item) {
          num++;
        }
      });
      if (num === 1) {
        that.activeIndex = element.index;
      }
    });
    console.log("activeIndex:" + that.activeIndex);
  },
  data() {
    return {
      activeIndex: "",
      curPage: "",
      page: [
        {
          //首页
          index: 0,
          url: ["/pages/index/main"]
        },
        {
          //订单
          index: 1,
          url: [
            "/pages/servicemenu/myOrder/main",
            "/pages/custom/order/main",
            "/pages/master/myOrder/main"
          ]
        },
        {
          //下单
          index: 2,
          url: [
            "/pages/servicemenu/makeOrder/main",
            "/pages/custom/smOrder/main"
          ]
        },
        {
          //消息
          index: 3,
          url: ["/pages/news/main"]
        },
        {
          //我的
          index: 4,
          url: ["/pages/my/main"]
        }
      ]
    };
  },
  methods: {
    //0 1 2 3 4
    gotoPage(index) {
      console.log(index,this.identity,"foot++++++++++++++++++++++")
      let that = this;
      let gotoUrl = "";
      if (that.identity == 1) {
        //客服
        gotoUrl = that.page[index].url[0];
      }
      if (that.identity == 2) {
        //客户
        console.log(index);
        if (index === 1 || index === 2) {
          //gotoUrl = that.page[index].url[1];
          gotoUrl = that.page[index].url[1];
          console.log(that.page[index], "客户身份");
        } else {
          gotoUrl = that.page[index].url[0];
        }
      }
      if (that.identity == 3) {
        //师傅
        if (index === 1 || index === 2) {
          gotoUrl = that.page[index].url[2];
        } else {
          gotoUrl = that.page[index].url[0];
        }
      }
      if (that.curPage == gotoUrl) {
        return false;
      } else {
        wx.redirectTo({
          url: gotoUrl
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.foot {
  font-size: 24rpx;
  color: #a1a1a1;
  height: 120rpx;
}
.foot .inner {
  height: 100rpx;
  background: #fff;
  position: fixed;
  z-index: 50;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dddddd;
}
.foot .iconImg {
  width: 46rpx;
  height: 46rpx;
  margin: 0 auto 8rpx;
  display: block;
}
.foot .title {
  line-height: 1;
}
.list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  height: 100rpx;

  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  align-items: center;
}
.w20.active {
  color: #5694fc;
}
.wd .w20 {
  width: 20%;
}
.w25 .w20{
  width:25%;
}
.clear::before,
.clear::after {
  display: block;
  content: "";
  clear: both;
}
.center {
  text-align: center;
}
.circle {
  width: 120rpx;
  height:120rpx;
  margin-left: -60rpx;
  position: fixed;
  bottom:10rpx;
  left:50%;
  z-index:51;
}
.circle img {
  width: 120rpx;
  height: 120rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.circle .downOrder {
  width: 120rpx;
  line-height: 120rpx;
  position: absolute;
  top: 0;
  z-index: 3;
  text-align:center;
  left: 0;
  color: #fff;
  font-size: 30rpx;
}
</style>