<template>
    <div class="installbox pad">
       <!--客户信息-->
       <div class="cusinfo">
           <p class="cusname">客户名称</p>
            <p class="flex borggray">
                <span>K1</span>
                <img src="/static/images/bottom.png" alt="" class="bottom">
            </p>
            <p class="flex">
                <span>联系人</span>
                <input type="text" placeholder="请输入联系人姓名">
            </p>
            <p class="flex">
                <span>联系电话</span>
                <input type="text" placeholder="请输入联系电话">
            </p>
            <p class="flex">
                <span>所在地区</span>
                <img src="/static/images/right.png" alt="" class="right">
            </p>
            <p class="flex">
                <span>详细地址</span>
                <input type="text" placeholder="请输入详细地址">
            </p>
            <p class="flex">
                <span>绑定客户信息</span>
                <img src="/static/images/right.png" alt="" class="right">
            </p>
       </div>
       <!--安装明细-->
       <div class="installdet ">
           <p class="cusname install">安装明细</p>
           <p class="cusname">项目名称</p>
           <input type="text" placeholder="请输入（必填）" class="borggray">
           <p class="cusname">单据类型</p>
           <p class="flex borggray">
                <span>维护服务</span>
                <img src="/static/images/bottom.png" alt="" class="bottom">
            </p>
            <p class="cusname">服务类型</p>
            <p class="flex borggray">
                <span>店面巡查</span>
                <img src="/static/images/bottom.png" alt="" class="bottom">
            </p>
            <p>完工日期</p>
            <p class="flex borggray">
                <span>请选择日期</span>
                <img src="/static/images/date.png" alt="" class="datepic">
            </p>
            <p>填写尺寸</p>
            <div class="tips flex">
                <div class="flex">
                    <span>宽</span>
                    <p class="flex sizebox">
                        <input type="text"><span>mm</span>
                    </p>
                </div>
                <div class="flex">
                    <span>高</span>
                    <p class="flex sizebox">
                        <input type="text"><span>mm</span>
                    </p>
                </div>
                <div class="flex">
                    <span>厚</span>
                    <p class="flex sizebox">
                        <input type="text"><span>mm</span>
                    </p>
                </div>
                <div class="flex">
                    <span>数量</span>
                    <p class="flex sizebox">
                        <input type="text">
                    </p>
                </div>
            </div>
            <div>维护服务要求</div>
            <textarea name="" id="" cols="30" rows="5" class="textinfo">输入维护服务要求</textarea>
            <div>
                <span>上传现场图/环境图</span><span class="point">（可添加多张图）</span>
            </div>
            <div class="flex picarr flex-start">
                <img src="/static/images/addpic.png" alt="" class="addpic">
            </div>
            <div class="addtitle">上传安排指导图片和安装指导视频</div>
            <div class="flex picarr flex-start">
                <img src="/static/images/addpic.png" alt="" class="addpic">
                <img src="/static/images/addvedio.png" alt="" class="addvedio">
            </div>
       </div>
       <div class="adddetbutton">
           <img src="/static/images/adddet.png" alt="" class="adddet">
       </div>
       <!--底部按钮-->
       <div class="botbtn">确定下单</div>
    </div>
</template>
<script>
import "../../../css/common.css";
import "../../../css/service.css";
export default {
    data(){
        return {
            
        }
    },
    onLoad(){
        this.setBarTitle()
    },
    methods:{
        setBarTitle() {
            wx.setNavigationBarTitle({
                title: "安装下单"
            });
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

