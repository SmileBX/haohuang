<template>
  <div class="page">
    <div class="eaditBox bg_fff">
      <div class="areBox">
        <textarea name class="weui-area" placeholder="请输入您的反馈问题及建议..."></textarea>
        <p class="text_r num_tips">0/200</p>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p class="txt">相关截图（选填）</p>
        </div>
        <div class="weui-cell__ft">
          <span class="num_tips">0/4</span>
        </div>
      </div>
      <div class="uploadImage clear">
        <div class="button-upload" style="background-image:url(/static/images/icons/upload_1.png);"></div>
        <!-- 上传展示的图片 -->
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
        <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
      </div>
    </div>
     <div class="ftBtn pt20 pb20">
        <div class="inner">
            <div class="btn btn-active fill">提交</div>
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
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "意见反馈"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
