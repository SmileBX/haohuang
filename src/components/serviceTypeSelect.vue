<template>
  <div>
    <!-- 联系客服 -->
      <van-action-sheet
        :show="selectServiceTypeStatus"
        :actions="selectServiceType"
        overlay
        close-on-click-overlay
        cancel-text="取消"
        @select="onServiceSelect"
        @cancel="onServiceCancel"
      />
  </div>
</template>
<script>
export default {
  props: {
    selectServiceTypeStatus: {
      type: Boolean,
      default: false
    },
    servicePhone: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectServiceType: [
        { name: "电话联系", type: 1 },
        { name: "会话窗口", type: 2, openType: "contact" }
      ]
    };
  },
  methods: {
    // 选择联系客服
    onServiceSelect(e) {
      console.log(e.mp.detail, this.servicePhone, "选择客服联系类型");
      const detail = e.mp.detail;
      //   电话联系
      if (detail.type === 1) {
        if (this.servicePhone == "") {
          wx.showToast({
            title: "您还没有专属的客服电话!",
            icon: "none",
            duration: 1500
          });
        } else {
          wx.makePhoneCall({
            phoneNumber: this.servicePhone,
            success(res) {
              console.log(res);
            }
          });
        }
      }
      //   会话窗口
      else if (detail.type === 2) {
      }
    },
    onServiceCancel() {
      this.$emit("update:selectServiceTypeStatus", false);
    }
  }
};
</script>