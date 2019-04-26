<template>
  <div class="allPadd">
      <div class="bank">
        <div class="pull">推荐银行</div>
        <radio-group @change="changes($event)">
                <label class="column payitem" v-for="(item,index) in banklist" :key="item.id">
                  <div class="column card">
                    <img :src="item.img_url" class="cardpic" mode="widthFix">
                    <div class="column just">
                        <p>{{item.name}}</p>
                    </div>
                  </div>
                  <input type="radio" name="item.name" :checked="item.ischecked" :value="item.id">
                </label>
          </radio-group>
       </div>
  </div>
</template>
<script>
import "@/css/dd_style.css";
import no1 from '@/../static/images/bank/1.png'
import no2 from '@/../static/images/bank/2.png'
import no3 from '@/../static/images/bank/3.png'
import no4 from '@/../static/images/bank/4.png'
import no5 from '@/../static/images/bank/5.png'
import no6 from '@/../static/images/bank/6.png'
import no7 from '@/../static/images/bank/7.png'
import no8 from '@/../static/images/bank/8.png'
import no9 from '@/../static/images/bank/9.png'
import no10 from '@/../static/images/bank/10.png'
import no11 from '@/../static/images/bank/11.png'
import no12 from '@/../static/images/bank/12.png'
import no13 from '@/../static/images/bank/13.png'
import no14 from '@/../static/images/bank/14.png'


export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {},
  data() {
    return {
      banklist:[
        {id:1,img_url:no1,name:"中国工商银行",ischecked:true},
        {id:2,img_url:no2,name:"中国农业银行"},
        {id:3,img_url:no3,name:"浦发银行"},
        {id:4,img_url:no4,name:"中国建设银行"},
        {id:5,img_url:no5,name:"中国银行"},
        {id:6,img_url:no6,name:"交通银行"},
        {id:7,img_url:no7,name:"招商银行"},
        {id:8,img_url:no8,name:"平安银行"},
        {id:9,img_url:no9,name:"中信银行"},
        {id:10,img_url:no10,name:"兴业银行"},
        {id:11,img_url:no11,name:"民生银行"},
        {id:12,img_url:no12,name:"光大银行"},
        {id:13,img_url:no13,name:"广发银行"},
        {id:14,img_url:no14,name:"华夏银行"}
      ]
    };
  },
  methods: {
    changes(e){
      for (let i=0;i<this.banklist.length;i++){
          this.banklist[i].ischecked=false
          if(this.banklist[i].id==e.target.value){
              this.banklist[i].ischecked=true
          }else{
              this.banklist[i].ischecked=false
          }
      }
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "提现选择"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>