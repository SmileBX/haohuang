<template>
    <div class="page">
        <div class="weui-cells" style="margin-top:1px;">
            <div class="select__weui-cells">
                <div class="weui-cells__title">客户名称</div>
                <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                        <input type="text" class="weui-input" disabled="true">
                    </div>
                   <span class="icon-arrow arrow-down"></span>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">联系人</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" class="weui-input text_r" placeholder="请输入联系人姓名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">联系电话</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" class="weui-input text_r" placeholder="请输入联系人电话">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">所在地区</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text" disabled="true" class="weui-input text_r">
                </div>
                <div class="weui-cell__ft">
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">详细地址</label>
                </div>
                <div class="weui-cell__bd">
                    <input type="text"  class="weui-input text_r" placeholder="请输入详细地址">
                </div>
            </div>
        </div>
        <!-- <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    绑定客户信息
                </div>
                <div class="weui-cell__ft">
                   <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
        </div> -->
        <div class="weui-cells"  style="padding-top:10rpx;">
            <div class="weui-cells__title bl__weui-cells__title" style="color:#000;">安装明细</div>
            <div class="select__weui-cells">
                <div class="weui-cells__title">项目名称</div>
                <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                        <input type="text" class="weui-input" placeholder="请输入（必填）">
                    </div>
                   <!-- <span class="icon-arrow arrow-down"></span> -->
                </div>
            </div>
            <div class="select__weui-cells">
                <div class="weui-cells__title">单据类型</div>
                <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                        <input type="text" disabled="true" class="weui-input">
                    </div>
                   <span class="icon-arrow arrow-down"></span>
                </div>
            </div>
            <div class="select__weui-cells">
                <div class="weui-cells__title">服务类型</div>
                <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                        <input type="text" disabled="true" class="weui-input">
                    </div>
                   <span class="icon-arrow arrow-down"></span>
                </div>
            </div>
            <div class="select__weui-cells">
                <div class="weui-cells__title">完工日期</div>
                <div class="ipt flex flexAlignCenter">
                    <div class="flex1">
                        <input type="text" disabled="true" class="weui-input" placeholder="请选择日期">
                    </div>
                   <img src="/static/images/icons/date.png" alt="" class="icon-date">
                </div>
            </div>
            <div class="weui-item">
                <div class="weui-cells__title">填写尺寸</div>
                <div class="columnGroup flex flexAlignCenter">
                    <div class="item flex flex1 flexAlignCenter">
                        <span class="lab">宽</span>
                        <div class="ipt flex">
                            <input type="text" class="flex1 weui-input">
                            <span class="txt">mm</span>
                        </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                        <span class="lab">高</span>
                        <div class="ipt flex">
                            <input type="text" class="flex1 weui-input">
                            <span class="txt">mm</span>
                        </div>
                    </div>
                    <div class="item flex flex1 flexAlignCenter">
                        <span class="lab">厚</span>
                        <div class="ipt flex">
                            <input type="text" class="flex1 weui-input">
                            <span class="txt">mm</span>
                        </div>
                    </div>
                </div>
                <div class="columnGroup flex flexAlignCenter">
                    <div class="item flex flexAlignCenter">
                        <span class="lab">数量</span>
                        <div class="ipt flex">
                            <input type="text" class="weui-input" style="width:140rpx;">
                            <span class="txt">&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-item">
                <div class="weui-cells__title">维护服务要求</div>
                <div class="eaditArea">
                    <textarea name="" class="weui-area" id="" placeholder="输入维护服务要求"></textarea>
                </div>
            </div>
            <!-- 上传图片 -->
            <div class="weui-item">
                <div class="weui-cells__title">上传现场图/环境图<span class="tips">(可添加多张图)</span></div>
                <div class="uploadImage clear">
                    <div
                        class="button-upload"
                        style="background-image:url(/static/images/icons/upload_2.png);"
                    ></div>
                    <!-- 上传展示的图片 -->
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                </div>
            </div>
            <div class="weui-item">
                <div class="weui-cells__title">上传安排指导图片和安装指导视频</div>
                <div class="uploadImage clear">
                    <div
                        class="button-upload"
                        style="background-image:url(/static/images/icons/upload_2.png);"
                    ></div>
                    <div
                        class="button-upload"
                        style="background-image:url(/static/images/icons/upload_3.png);"
                    ></div>
                    <!-- 上传展示的图片 -->
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                    <div class="upload-img img" style="background-image:url(/static/images/of/a1.png)"></div>
                </div>
            </div>
            <div style="padding-bottom:40rpx;padding-top:30rpx;"><div class="btn btn-add"><img src="/static/images/icons/add_2.png" alt="">增加明细</div></div>
            
        </div>
        <div class="ftBtn" style="height:156rpx;">
            <div class="inner fixed bm0 border-box bg_f4f7fc">
                <div class="btn btn-active fill">确认下单</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/css/dd_style.css";
export default {
    data(){
        return {
            
        }
    },
    onLoad(){
        this.setBarTitle()
    },
   components: {
    
    },
    methods:{
        setBarTitle() {
            wx.setNavigationBarTitle({
                title: "安装下单-----暂时不用啦"
            });
        },
    },
}
</script>
<style lang="scss" scoped>
@import "./style";
</style>

