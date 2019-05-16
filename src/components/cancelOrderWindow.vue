<template>
  <div>
    <!-- 取消订单弹窗 -->
    <van-action-sheet
      :show="cancelOrderWindowStatus"
      title="取消原因"
      :close-on-click-overlay="true"
      :overlay="true"
      @close="closeWindow"
      @catchtouchmove="true"
    >
      <div class="bottom__modal-content">
        <!-- <div class="modal__hd bb__modal__hd">
                    <span class="close"><img src="/static/images/icons/close.png"   alt=""></span>
                    <h2 class="title">取消原因</h2>
        </div>-->
        <div class="modal__bd">
          <div class="eaditArea">
            <p class="weui-area" v-if="showP" @click="puttextatea" style="padding:29rpx;">{{refuseContent || '请备注说明原因'}}</p>
            <textarea name fixed cursor-spacing="10" v-model="refuseContent" placeholder="请备注说明原因" id class="weui-area" @blur="showP=true" auto-focus v-else @touchstart="showP=true"></textarea>
          </div>
        </div>
        <div class="modal__ft flex ftBtn" style="height:100rpx;" @click="submit">
          <div class="inner fixed bm0 border-box" style="padding:0;">
            <div class="btn btn-active fill" style="border-radius:0;">确定</div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  // 使用****************
        // <CancelOrderWindow :cancelOrderWindowStatus.sync="cancelOrderWindowStatus"
        // :refuseContent.sync="refuseContent" @success="closeContent" 
        // ></CancelOrderWindow>

        // cancelOrderWindowStatus--双向绑定的窗口展示状态
        // @success--点击确定事件
        //refuseContent--双向绑定的取消原因

  props: {
    cancelOrderWindowStatus: {
      type: Boolean,
      default: false
    },
    refuseContent:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      showP:true,
    };
  },
  watch:{
  },
  onShow() {
  },
  methods: {
    // 确认按钮
    async submit() {
      this.$emit("update:refuseContent", this.refuseContent);
      this.$emit("success", this.refuseContent);
    },
    // 关闭弹窗
    closeWindow() {
      this.$emit("update:cancelOrderWindowStatus", false);
    },
    puttextatea(){
      this.showP=false
    }
  }
};
</script>
<style lang="scss" scoped>

// 取消订单弹窗
.eaditArea {
    padding: 60rpx 26rpx;
}

.eaditArea .weui-area {
    border: 1px solid #e5e5e5;
    padding: 20rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
    height: 260rpx;
}
</style>
