<template>
  <div class="page">
    <!-- 订单的 -->
    <div class="column levelPanel">
      <div class="item">
        <div class="item__bd">
          <div class="box">
            <div class="outside">
              <div class="pictrueAll">
                <div class="pictrue img" style="background-image:url(/static/images/of/a1.png)"></div>
              </div>
              <div class="txtBox">
                <p class="title text-line2">龙华展涛科技大厦灯箱安装</p>
                <p class="price">￥1888.00</p>
                <p class="time">完成时间：2018-04-28 18:30:15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传图片 -->
    <div class="uploadSection">
      <div class="item">
        <h2 class="uploadTitle">安装前照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">内部结构照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">安装后照片</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="item">
        <h2 class="uploadTitle">客户验收单</h2>
        <div class="uploadImage clear">
          <div
            class="button-upload"
            style="background-image:url(/static/images/icons/upload_1.png);"
          ></div>
          <!-- 上传展示的图片 -->
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
          <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        </div>
      </div>
      <div class="eaditFrom weui-cells noBorder__weui-cells mt0 pb20">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">交通费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的交通费用">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">餐费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的餐费">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">材料费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的材料费">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">住宿费</label>
          </div>
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" placeholder="请输入安装所需的费用">
          </div>
        </div>
      </div>
    </div>
    <div class="ftBtn" style="height:154rpx;">
      <div class="inner fixed bm0 border-box bg_f4f7fc">
        <a class="btn btn-active fill">提交</a>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {},
  data() {
    return {};
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提交审核"
      });
    }
  }
};
</script>