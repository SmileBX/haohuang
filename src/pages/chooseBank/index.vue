<template>
  <div class="page">
      <chooseBank></chooseBank>
  </div>
</template>
<script>
import "@/css/dd_style.css";
import chooseBank from "@/components/chooseBank.vue";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {},
  data() {
    return {
    
    };
  },
  components:{
   chooseBank
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "选择银行名称"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>