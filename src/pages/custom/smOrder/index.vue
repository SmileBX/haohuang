<template>
  <div class="page">
    <movable-area class="movearea">
      <div class="main">
        <div class="tipsList flex" style="margin-top:1px;">
          <div class="item">
            <span class="num">1</span>客户下单
          </div>
          <div class="item">
            <span class="num">2</span>选择类型
          </div>
          <div class="item">
            <span class="num">3</span>客服确认信息及价格
          </div>
          <div class="item">
            <span class="num">4</span>完成支付
          </div>
          <div class="item">
            <span class="num">5</span>好评售后
          </div>
        </div>
        <div class="weui-cells smDetail__weui-cells" style="padding-top:10rpx;">
          <div class="select__weui-cells">
            <div class="weui-cells__title">选择类型</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
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
          <div class="select__weui-cells">
            <div class="weui-cells__title">制作材料</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
            </div>
          </div>
          <div class="select__weui-cells">
            <div class="weui-cells__title">安装材料</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
            </div>
          </div>

          <!-- 上传图片 -->
          <div class="weui-item">
            <div class="weui-cells__title">
              参考图片
              <span class="tips">(可添加多张图)</span>
            </div>
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
          <div class="select__weui-cells">
            <div class="weui-cells__title">交付时间</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" disabled="true" class="weui-input" placeholder="请选择日期">
              </div>
              <img src="/static/images/icons/date.png" alt class="icon-date">
            </div>
          </div>
          <div class="weui-item">
            <div class="weui-cells__title">备注说明</div>
            <div class="eaditArea">
              <textarea name class="weui-area" id placeholder="输入维护服务要求"></textarea>
            </div>
          </div>
          <div class="priceBox flex">
            <div class="flex1">金额</div>
            <div>
              <span class="price">￥200</span>
            </div>
          </div>
        </div>
        <div class="weui-cells smDetail__weui-cells" style="padding-top:10rpx;">
          <div class="select__weui-cells">
            <div class="weui-cells__title">选择类型</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
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
          <div class="select__weui-cells">
            <div class="weui-cells__title">制作材料</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
            </div>
          </div>
          <div class="select__weui-cells">
            <div class="weui-cells__title">安装材料</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
            </div>
          </div>

          <!-- 上传图片 -->
          <div class="weui-item">
            <div class="weui-cells__title">
              参考图片
              <span class="tips">(可添加多张图)</span>
            </div>
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
          <div class="select__weui-cells">
            <div class="weui-cells__title">交付时间</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" disabled="true" class="weui-input" placeholder="请选择日期">
              </div>
              <img src="/static/images/icons/date.png" alt class="icon-date">
            </div>
          </div>
          <div class="weui-item">
            <div class="weui-cells__title">备注说明</div>
            <div class="eaditArea">
              <textarea name class="weui-area" id placeholder="输入维护服务要求"></textarea>
            </div>
          </div>
          <div class="priceBox flex">
            <div class="flex1">金额</div>
            <div>
              <span class="price">￥200</span>
            </div>
          </div>
        </div>
        <div style="padding-bottom:40rpx;padding-top:40rpx;" class="addDetail bg_fff">
          <div class="btn btn-add">
            <img src="/static/images/icons/add_2.png" alt>增加明细
          </div>
        </div>
        <!-- 总金额 -->
        <div class="flex allPriceBox bg_fff mt10">总金额(员)：500</div>
        <!-- 快递选择 -->
        <div class="weui-cells smDetail__weui-cells">
          <div class="select__weui-cells">
            <div class="weui-cells__title">快递选择</div>
            <div class="ipt flex flexAlignCenter">
              <div class="flex1">
                <input type="text" class="weui-input" placeholder="请输入（必填）">
              </div>
              <span class="icon-arrow arrow-down"></span>
            </div>
          </div>
        </div>
        <!-- 地址选择 -->
        <div class="weui-cells smDetail__weui-cells">
            <div class="weui-cells__title">快递选择</div>
            <div class="addressList">
                <div class="item flex flexAlignCenter">
                    <img src="/static/images/icons/address.png" class="addrIcon" alt>
                    <div class="item__bd flex1">
                        <p class="remarks">
                        <span class="name">张三</span>
                        <span class="tel">0755-23105899</span>
                        </p>
                        <p class="address">店铺地址：挖个点个反对</p>
                        <p class="address">详细地址：深圳市龙华区民治大道展涛科技大厦</p>
                    </div>
                    <span class="icon-arrow arrow-right"></span>
                </div>
            </div>
        </div>
        <div class="ftBtn" style="height:156rpx;">
          <div class="inner fixed bm0 border-box bg_f4f7fc">
            <div class="btn btn-active fill">确认下单</div>
          </div>
        </div>
        <!-- 客服 -->
        <movable-view style="z-index:11;" x="300" y="460" direction="all" out-of-bounds="false">
          <div class="fixed__kf">
            <img src="/static/images/icons/fixed__kf.png" alt>
          </div>
        </movable-view>
      </div>
    </movable-area>
  </div>
</template>
<script>
import "@/css/dd_style.css";
export default {};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
