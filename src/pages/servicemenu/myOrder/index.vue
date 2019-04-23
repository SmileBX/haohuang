<template>
    <div class="installbox box">
       <!--菜单-->
       <div class="flex flex-around">
           <p class="flex">
               <span>选择区域</span>
               <img src="/static/images/down.png" alt="" class="down">
           </p>
           <p class="flex">
               <span>订单状态</span>
               <img src="/static/images/down.png" alt="" class="down">
           </p>
       </div>
       <!--订单列表-->
       <div class="orderlist">
           <div class="item">
               <div class="flex ordertitle">
                   <p class="itemname">设计+制作+安装</p>
                   <p class="active">已指派</p>
               </div>
               <p>订单编号 TH53316886</p>
               <p>下单日期 03/25-20:20</p>
               <p>完成时间 04/02-12:20</p>
           </div>
           <div class="item">
               <div class="flex ordertitle">
                   <p class="itemname">设计+制作+安装</p>
                   <p class="blue">已完成</p>
               </div>
               <p>订单编号 TH53316886</p>
               <p>下单日期 03/25-20:20</p>
               <p>完成时间 04/02-12:20</p>
           </div>
       </div>
       <!--订单状态弹框-->
       <div></div>
    </div>
</template>
<script>
import "../../../css/common.css";
import "../../../css/service.css";
export default {
    onLoad(){
        this.setBarTitle()
    },
    methods:{
        setBarTitle() {
            wx.setNavigationBarTitle({
                title: "客户订单"
            });
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

