<template>
    <div class="page">
        <div class="cardList">
            <div class="item flex">
                <img src="/static/images/card/jianshe.png" class="bg" alt="">
                <div class="cardImg">
                    <img src="/static/images/card/card1.png" alt="">
                </div>
                <div class="txtBox">
                    <p class="title">中国建设银行</p> 
                    <p class="type">储蓄卡</p>
                    <p class="number"><span class="xing">****</span><span class="xing">****</span><span class="xing">****</span><span class="num">6925</span></p>
                </div>
            </div>
            <div class="item flex">
                <img src="/static/images/card/zhaoshang.png" class="bg" alt="">
                <div class="cardImg">
                    <img src="/static/images/card/card2.png" alt="">
                </div>
                <div class="txtBox">
                    <p class="title">招商银行</p> 
                    <p class="type">储蓄卡</p>
                    <p class="number"><span class="xing">****</span><span class="xing">****</span><span class="xing">****</span><span class="num">6925</span></p>
                </div>
            </div>
        </div>
        <div class="ftBtn">
            <div class="inner fixed bm0 border-box">
               <div class="btn btn-active fill"><img src="/static/images/icons/add.png" class="addImg ">添加银行卡</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    onLoad(){
      this.setBarTitle();
    },
    methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的银行卡"
      });
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./style";
</style>