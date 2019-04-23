<template>
    <div class="page">
       <!--搜索-->
       <div class="inputbox flex">
           <input type="text" placeholder="请输入您要搜索的内容">
           <img src="/static/images/cancle.png" class="cancleimg">
       </div>
       <!--展示列表-->
       <div class="listbox">
            <radio-group @change="changes">
                <label class="flex">
                    <div>
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
                title: "客服下单"
            });
        },
    }
}
</script>
<style lang="scss" scoped>
  @import "./style";
</style>

