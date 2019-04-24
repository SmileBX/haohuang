<template>
    <div class="page content">
       <!--搜索-->
       <div class="inputbox flex flexAlignCenter">
           <img src="/static/images/icons/search.png" class="searhimg">
           <input type="text" placeholder="请输入客户名称或手机号码">
           <img src="/static/images/cancle.png" class="cancleimg">
       </div>
       <!--展示列表-->
       <div class="listbox">
            <radio-group @change="changes">
                <label class="flex">
                    <div class="flex1">
                        <div class="name flex flex-start">
                            <p><span class="active">张</span>三</p><p>13526889966</p>
                        </div>
                        <p class="address">店铺地址：罗湖万象城店 </p>
                        <p class="address">详细地址：广东省 深圳市 华民治沙元埔5</p>
                    </div>
                    <input type="radio" name="payType" checked value="0">
                </label>
            </radio-group>
       </div>
       <!--底部按钮-->
       <div class="botbtn">确定</div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
    onLoad(){
        this.setBarTitle()
    },
    methods:{
        setBarTitle() {
            wx.setNavigationBarTitle({
                title: "绑定客户信息"
            });
        },
    }
}
</script>
<style lang="scss" scoped>
  @import "./style";
</style>

