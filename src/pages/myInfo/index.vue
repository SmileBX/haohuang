<template>
    <div class="page">
        <div class="userhead">
            <div class="tx">
                <img src="/static/images/of/a1.png"  alt="">
                <p class="txt">点击更换头像</p>
            </div>
        </div>
        <div class="weui-cells infoForm">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">身份</label>
                </div>
                <div class="weui-cell__bd">
                    <p class="txt">普通用户</p>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">昵称</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" value="打仗的">
                </div>
            </div>
            <div class="weui-cell sex__weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">性别</label>
                </div>
                <div class="weui-cell__bd">
                    <radio-group class="radio-group">
                        <label class="radio">
                            <radio value="" checked="true" />
                            男
                        </label>
                        <label class="radio">
                            <radio value=""/>
                            女
                        </label>
                    </radio-group>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">手机号</label>
                </div>
                <div class="weui-cell__bd">
                    <p class="txt">16620854521</p>
                </div>
                <div class="weui-cell__ft">
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="ftBtn pt30">
            <div class="inner">
                <div class="btn btn-active fill">保存</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
    onLoad(){
      this.setBarTitle();
    },
    methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "个人信息"
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
