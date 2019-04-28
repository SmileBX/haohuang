<template>
    <div class="allPadd">
      <div class="bank" v-if="banklist.length>0">
        <div class="pull">推荐银行</div>
        <radio-group @change="changes($event)">
                <label class="column payitem" v-for="(item,index) in banklist" :key="index">
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
import { post, get } from "../utils"
import "@/css/dd_style.css";
export default {
  onLoad() {
    this.setBarTitle();
  },
  created() {
   this.banklist = [];
   this.userId =wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.getBankinfoList();
  },
  data() {
    return {
        userId:"",
        token:"",
        banklist:[]
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
    },
    async getBankinfoList(){
      let result = await get("Bank/GetBankinfoList",{
          // UserId:this.userId,
          // Token:this.token
      });
      if(result.code===0){
          if(result.data.length>0){
          this.banklist = result.data;
         }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
    .payimg{
    width:64rpx;
    height:52rpx;
}
.pull{
    padding:10rpx 0;
}
.cardpic{
    width:56rpx;
}
.payitem{
    justify-content: space-between;
    box-sizing: border-box;
    height:100rpx;
    .card .column{
        flex-direction: column;
    }
    .just{
        align-items: flex-start;
        margin-left:20rpx;
    }
    .cardnum{
        font-size:24rpx;
    }
}
.bank{
    border-top:1rpx solid #eee;
}
.addcard{
    // position:relative;
    // bottom:0;
    align-items: center;
}
</style>