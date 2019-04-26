<template>
    <div class="page">
        <div class="from">
            <div class="ul-list bg_fff mb10">
                <div class="li-cell">
                    <div class="lable">姓名</div>
                    <input class="ipt" type="text" placeholder="请填写本人真实姓名">
                </div>
                 <div class="li-cell">
                    <div class="lable">身份证号</div>
                    <input class="ipt" type="text" placeholder="请输入您的身份证号">
                </div>
                 <div class="li-cell">
                    <div class="lable">开户行名称</div>
                    <input class="ipt" type="text" placeholder="请输入您的开户行名称">
                </div>
                 <div class="li-cell">
                    <div class="lable">银行卡号</div>
                    <input class="ipt" type="text" placeholder="请输入您的银行卡号">
                </div>
            </div>
        </div>
        <div class="ul-list bg_fff mb10 noborder">
            <div class="li-cell">
                <div class="lable">电工证</div>
                <div class="upbtn">
                    <img class="upimg" src="/static/images/icons/upload_1.png" alt="">
                </div>
            </div>
            <div class="li-cell">
                <div class="lable">焊工证</div>
                <div class="upbtn">
                    <img class="upimg" src="/static/images/icons/upload_1.png" alt="">
                </div>
            </div>
            <div class="li-cell">
                <div class="lable">高空证</div>
                <div class="upbtn">
                    <img class="upimg" src="/static/images/icons/upload_1.png" alt="">
                </div>
            </div>
            <div class="li-cell">
                <div class="lable">其他证件</div>
                <div class="upbtn">
                    <img class="upimg" src="/static/images/icons/upload_1.png" alt="">
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="fixd-foot">
                <button class="btn btn_org" @click="Submint">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    onLoad() {
        this.setBarTitle();
    },
    components:{
      
    },
    data() {
        return {
           
        }
    },
    methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "填写审核资料"
      });
    },
    tabclick(index){
        this.type=index;
    },
    Submint(){
        wx.showModal({
            title: '审核资料提交成功',
            content: '审核资料需要1~7个工作日才能完成，请耐心等待，审核通过会以短信方式通知您',
            showCancel: false,
            confirmColor:'#ff7e22',
            success(res) {
                if (res.confirm) {
                
                } else if (res.cancel) {
                
                }
            }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>
