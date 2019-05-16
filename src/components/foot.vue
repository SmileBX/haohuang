<template>
  <div class="foot">
    <div class="inner">
      <ul class="list clear center" :class="[identity !==3 ? 'li_20':'li_25']">
        <li :class="{'active':activeIndex===0}" @click="gotoPage(0)">
          <img v-if="activeIndex===0" src="/static/images/footer/ft1_2.png" class="iconImg" alt>
          <img v-else src="/static/images/footer/ft1.png" class="iconImg" alt>
          <p class="title">首页</p>
        </li>
        <li :class="{'active':activeIndex===1}" @click="gotoPage(1)">
          <img v-if="activeIndex===1" src="/static/images/footer/ft2_2.png" class="iconImg" alt>
          <img v-else src="/static/images/footer/ft2.png" class="iconImg" alt>
          <p class="title">订单</p>
        </li>
        <li :class="{'active':activeIndex===2}" @click="gotoPage(2)" v-if="identity !==3">
          <div class="circle">
            <img src="/static/images/footer/ft3.png" alt>
            <span>下单</span>
          </div>
        </li>
        <li :class="{'active':activeIndex===3}" @click="gotoPage(3)">
          <img v-if="activeIndex===3" src="/static/images/footer/ft4_2.png" class="iconImg" alt>
          <img v-else src="/static/images/footer/ft4.png" class="iconImg" alt>
          <p class="title">消息</p>
        </li>
        <li :class="{'active':activeIndex===4}" @click="gotoPage(4)">
          <img v-if="activeIndex===4" src="/static/images/footer/ft5_2.png" class="iconImg" alt>
          <img v-else src="/static/images/footer/ft5.png" class="iconImg" alt>
          <p class="title">我的</p>
        </li>
      </ul>
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
    gotoPage(index) {
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
.list li.active {
  color: #5694fc;
}
.li_20 li {
  width: 20%;
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
  margin: 0 auto;
  position: relative;
}
.circle img {
  width: 120rpx;
  height: 120rpx;
  position: absolute;
  top: -80rpx;
  left: 0;
  // z-index: 2;
}
.circle span {
  width: 120rpx;
  height: 120rpx;
  line-height: 120rpx;
  position: absolute;
  top: -80rpx;
  // z-index: 2;
  left: 0;
  color: #fff;
  font-size: 30rpx;
}
</style>