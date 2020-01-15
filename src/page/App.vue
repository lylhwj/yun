<template>
  <div>
    <HeaderLogin></HeaderLogin>
<div class="view_box2"><div class="view_scorll">
    <div class="bg_linear">
       <div class="app_banner1">
        <div class="w1200 m_auto">
          <span class="f20">下载手机APP</span>
          <ul class="white fct down_list">
            <li>
              <div>
                <span>Apple</span>
                <p class="fcl mt8 mb10">当前版本2.3.88</p>
                <img src="http://api.bianyue.cn/android.php?op=qrcode&action=down_img_iphone" alt="">
              </div>
              <p class="mt8 mb4">手机扫码在App store进行安装</p>
              <p>[<a href="https://itunes.apple.com/cn/app/bian-yue-yun/id1351597102?mt=8" target="_blank" class="white">点击在线访问App store]</a></p>
            </li>
            <li>
              <div>
                <span>Android</span>
                <p class="fcl mt8 mb10">当前版本2.4</p>
                <img src="http://api.bianyue.cn/android.php?op=qrcode&action=down_img" alt="">
              </div>
              <p class="mt8 mb4">手机扫码下载安装或其它途径：</p>
              <p>
                [<a href="http://down.bianyue.cn/bianyueyun.apk" class="white">本地下载</a>]
                <!-- [<a href="http://android.myapp.com/myapp/detail.htm?apkName=com.example.ywy" target="_blank" class="white">腾讯应用宝</a>] -->
                <!--  [<a href="https://shouji.baidu.com/software/25364986.html" target="_blank" class="white">百度手机助手</a>]-->
              </p>
            </li>
          </ul>
        </div>
       </div>
    </div>
    <div class="m_auto w1200 app_banner2">
      <div style="padding:190px 0 0 610px;">
        <h3 class="blue f20 fn">一站式的文件存储、备份、同步，相册无损储存</h3>
        <p class="f18 mt20">持续稳定的存储服务</p>
        <p class="f18 mt10">安全可靠的文件传输、储存和隐私保护</p>   
      </div>
      <div style="padding:300px 0 0 65px;">
        <h3 class="blue f20 fn">拥有无限容量的存储空间</h3>
        <p class="f18 mt20">多端同步，支持各类文件，永久保存</p>
      </div>
    </div><!-- banner2 -->
    <div class="mt20 app_banner3">
      <ul class="m_auto w1200 white fct f16">
        <li>
          <span></span>
          <h3>文件</h3>
          <p>跨平台文件备份、同步<br>让您的文件随身携带，随时随地移动办公</p>
        </li>
        <li class="rel">
          <span></span>
          <h3>相册</h3>
          <p>支持原图无损上传<br>高保真不压缩，完美保留每一个图像细节</p>
        </li>
        <li>
          <span></span>
          <h3>云下载</h3>
          <p>执行您的下载指令<br>在线存储下载资源和挂机下载说再见</p>
        </li>
      </ul>
    </div><!-- banner3 -->
    <div class="clear2"></div>
    <h3 class="blue f26 fn fct pt30 mt30">界面一目了然、操作更顺畅</h3>
    <div class="w1200 app_banner4"></div><!-- banner4 -->
    <div class="app_banner5_bg">
      <h3 class="blue f26 fn fct">高清视频极速加载 流畅云播爽翻天</h3>
      <p class="fct f20 mt20">移动随时随地，边乐随行</p>      
    </div>
    <div class="app_banner5">
    <div class="yun_footer fct">
      <a target="_blank" href="http://yun.bianyue.cn/aboutus/index.html">关于边乐云</a><i>|</i>
      <a target="_blank" href="http://help.bianyue.cn/">帮助中心</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">服务协议</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/AgreementPrivacy">隐私政策</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/Agreementcopyright">版权声明</a><i>|</i>
      <a target="_blank" href="http://www.miibeian.gov.cn/" rel="nofollow">闽ICP备16019280号-2</a><br>
      <a target="_blank" href="http://vip.bianyue.cn/PageNotice1">根据国家版权局要求：用户应遵守著作权法，尊重著作权人合法权益，不违法上传、存储并分享他人作品</a><br>
      <a target="_blank" href="http://yun.bianyue.cn/bkjb/" rel="nofollow">暴恐举报中心</a><i>|</i>
      <a target="_blank" href="http://dhsf.bianyue.cn/" rel="nofollow">扫黄打非•2019</a><i>|</i>
      <a>违法和不良信息•儿童色情信息举报电话：0596-2949294</a><i>|</i>
      <a>扫黄打非举报电话：12390</a>
      <div class="yun_footer_list mt4">
        <a target="_blank" href="http://www.12377.cn"><s class="flt_center"></s>中国互联网举报中心</a>
        <a target="_blank" href="http://www.shdf.gov.cn/shdf/channels/740.html"><s class="flt_shdf"></s>中国扫黄打非网</a>
        <a target="_blank" href="http://www.12377.cn/node_548446.htm"><s class="flt_download"></s>网络举报APP下载</a>
        <a target="_blank" href="http://yun.bianyue.cn/jubao/" rel="nofollow"><s class="flt_warn"></s>举报受理和处置管理办法</a>
      </div>
    </div><!-- 底部 -->
</div></div>
    </div><!-- 底部 -->
  </div> 
</template>
<script>
import HeaderLogin from "@/components/HeaderLogin.vue";
import "@/assets/login.css";
export default {
  name: "App",
  metaInfo: {
    title: "手机APP_客户端下载_边乐云"
  },
  data() {
    return {};
  },
  components: {
    HeaderLogin: HeaderLogin
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view_scorll {
  padding: 0;
}
.app_banner1 {
  position: relative;
  height: 818px;
  background: url(../assets/app/app_banner1.png) no-repeat center 16px;
}
.app_banner1:before {
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  background: url(../assets/app/app_banner1_bg.png) center;
  content: "";
}
.app_banner1 > div > span {
  display: inline-block;
  height: 38px;
  padding: 0 17px;
  border-radius: 19px;
  background: #fff;
  line-height: 38px;
  color: #0680ff;
  margin: 113px 0 180px 78px;
}
.down_list li {
  float: left;
  width: 260px;
}
.down_list div {
  width: 145px;
  margin: 0 auto;
}
.down_list img {
  background: #fff;
  width: 135px;
  height: 135px;
  padding: 5px;
  border-radius: 5px;
}
.down_list div span {
  display: inline-block;
  width: 145px;
  height: 48px;
  background: #fff;
  border-radius: 5px;
  color: #0680ff;
  line-height: 48px;
  font-size: 18px;
}
.down_list div span:before {
  display: inline-block;
  width: 38px;
  height: 44px;
  line-height: 38px;
  margin-right: 14px;
  background: url(../assets/app/icon.jpg) no-repeat;
  vertical-align: middle;
  content: "";
}
.down_list li:nth-child(2) div span:before {
  margin-right: 10px;
  background-position: -40px 0;
}
.down_list a:hover {
  color: #b4d5f9;
}
.app_banner2 {
  height: 840px;
  background: url(../assets/app/app_banner2.jpg);
}
.app_banner3 {
  background: linear-gradient(to right, #87c7ff, #2ca0ed);
  overflow: hidden;
}
.app_banner3 li {
  float: left;
  width: 400px;
  padding: 58px 0 50px;
}
.app_banner3 li span {
  display: inline-block;
  width: 90px;
  height: 70px;
  background: url(../assets/app/app_banner3.svg);
}
.app_banner3 li:nth-child(2) span {
  background-position: -90px 0;
}
.app_banner3 li:nth-child(3) span {
  background-position: -180px 0;
}
.app_banner3 li h3 {
  font-weight: normal;
  margin: 10px 0;
}
.app_banner3 li:nth-child(2):before,
.app_banner3 li:nth-child(2):after {
  display: inline-block;
  position: absolute;
  top: 88px;
  width: 1px;
  height: 100px;
  background: rgba(255, 255, 255, 0.5);
  content: "";
}
.app_banner3 li:nth-child(2):before {
  left: 0;
}
.app_banner3 li:nth-child(2):after {
  right: 0;
}
.app_banner4 {
  height: 700px;
  margin: 60px auto 0;
  background: url(../assets/app/app_banner4.jpg) no-repeat center;
}
.app_banner5 {
  position: relative;
  height: 300px;
  padding-top: 410px;
  background: #fafafa url(../assets/app/app_banner5.png) no-repeat center -80px;
}
.app_banner5_bg {
  display: block;
  width: 100%;
  height: 116px;
  padding-top: 280px;
  background: url(../assets/app/app_banner5_bg.png) center top;
}
@media (max-height: 800px) {
  .yun_footer {
    padding: 10px 0;
  }
  .bg_login,
  .bg_reg {
    height: 500px;
  }
  .bg_reg .w-login {
    margin-top: 28px;
  }
  .w-login {
    margin-top: 43px;
  }
  .layout-frame {
    overflow-y: auto !important;
  }
  .layout-frame body {
    overflow-y: auto !important;
  }
  .layout-frame body.scrollx-hidden {
    overflow-y: hidden;
  }
}
</style>