<template>
  <div>
    <!-- 确认订单 -->

    <van-dialog
      use-slot
      :show="confirmOrderStatus"
      show-cancel-button
      async-close
      @confirm="onConfirmOrder"
      @close="cancel"
      title="确认订单"
    >
      <div class="confirmOrder">
        <van-cell-group>
          <van-field
            :value="payFreight"
            @change="changePayFreight"
            required
            clearable
            label="邮费"
            placeholder="请输入邮费"
          />
          <van-field
            :value="payPrice"
            @change="changePayPrice"
            required
            clearable
            label="其它预计金额"
            placeholder="请输入其它预计金额"
          />
        </van-cell-group>
      </div>
    </van-dialog>
  </div>
</template>
<script>
// <!-- 确认订单 -->
// <confirmOrder
// :confirmOrderStatus.sync="confirmOrderStatus"  状态
//   :payPrice="totalPrice"   价格
// :payFreight='detail.Freight' 邮费
// @confirm="onConfirmOrder"> 完成订单事件，接收填写后的价格和邮费
// </confirmOrder>
export default {
  props: {
    payPrice: {
      type: Number,
      default: 0
    },
    payFreight: {
      type: Number,
      default: 0
    },
    confirmOrderStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    confirmOrderStatus() {
      console.log(this.confirmOrderStatus, "confirmOrderStatus");
    }
  },
  onShow() {},
  methods: {
    // 改变价格时更新数据
    changePayPrice(val) {
      this.payPrice = val.mp.detail;
    },
    // 改变邮费时更新数据
    changePayFreight(val) {
      this.payFreight = val.mp.detail;
    },
    // 点击完成确认订单
    async onConfirmOrder() {
      this.$emit("confirm", {
        offerMoney: this.payPrice * 1,
        freight: this.payFreight * 1
      });
    },
    // 点击取消
    cancel() {
        this.$emit("update:confirmOrderStatus", false);
    }
    },
  //   }
};
</script>
<style lang="scss" scoped>
// 确认订单
.confirmOrder {
  width: 650rpx;
  padding: 50rpx 0 0;
  .title {
    text-align: center;
    font-size: 35rpx;
    line-height: 100rpx;
  }
  .buttons {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    .button-class {
      width: 50%;
    }
  }
}
</style>
