<template>
    <div class="page">
        <div class="cardList">
            <div class="item flex">
                <div class="cardImg">
                    <img src="" alt="">
                </div>
                <div class="txtBox">
                    <p class="title">中国建设银行<img src="" class="msg" alt=""></p> 
                    <p class="type">储蓄卡</p>
                    <p class="number"><span class="xing">****</span><span class="xing">****</span><span class="xing">****</span><span class="num">6925</span></p>
                </div>
            </div>
        </div>
        <div class="ftBtn">
            <div class="inner">
               <div class="btn btn-active fill">添加银行卡</div>
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