<template>
    <div class="page">
        <div class="memberTop">
            <img src="/static/images/icons/membertop_1.jpg" class="bg_img" mode="scaleToFill" alt="">
            <div class="conBox">
                <div class="tx_info flex flexAlignCenter">
                    <div class="tx">
                        <img src="/static/images/of/a1.png" alt="">
                    </div>
                    <div class="info flex1">
                        <p class="name">大佬啊个</p>
                        <p class="perId">135****3920</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="memberIndex__section mb10">
            <div class="section__hd weui-cell">
                <div class="weui-cell__bd">
                    <p class="title">我的订单</p>
                </div>
                <div class="weui-cell__ft">
                    <span class="more">查看全部</span>
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
            <div class="section__bd">
                <ul class="navList li_20 center">
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/daiqueren.png" alt="">
                            </div>
                            <p class="title">待确认</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/daifukuan.png" alt="">
                            </div>
                            <p class="title">待付款</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/chulizhong.png" alt="">
                                <span class="circleNum">2</span>
                            </div>
                            <p class="title">处理中</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/daipinjia.png" alt="">
                            </div>
                            <p class="title">待评价</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/shouhou.png" alt="">
                            </div>
                            <p class="title">售后</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="memberIndex__section mb10">
            <div class="section__hd weui-cell">
                <div class="weui-cell__bd">
                    <p class="title">我的服务</p>
                </div>
            </div>
            <div class="section__bd">
                <ul class="navList li_25 center navList2">
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/quyuguanli.png" alt="">
                            </div>
                            <p class="title">区域管理</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/zhuanshukefu.png" alt="">
                            </div>
                            <p class="title">专属客服</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/dizhibo.png" alt="">
                            </div>
                            <p class="title">地址薄</p>
                        </div>
                    </li>
                    <li>
                        <div class="outside">
                            <div class="icon-img">
                                <img src="/static/images/icons/yijianfankui.png" alt="">
                            </div>
                            <p class="title">意见反馈</p>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
        <foot :identity="2"></foot>
    </div>
</template>
<script>
import foot from "@/components/foot.vue";
import "@/css/dd_style.css";
export default {
    components:{
        foot
    }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
