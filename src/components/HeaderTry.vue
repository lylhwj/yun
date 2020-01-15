<template>
  <div>
    <div class="bar_upgrade" v-if="isUpdate">
      <div class="fl">
        <p class="p1">您的浏览器过旧，可能无法使用全部功能。</p>
        <p>请更新到最新版本，发挥最大效用。</p>
      </div>
      <ul>
        <li><a target="_blank" href="https://browser.360.cn/ee/"><span class="s4"></span>360极速下载</a></li>
        <li><a target="_blank" href="https://www.google.cn/intl/zh-CN/chrome/"><span class="s1"></span>更新Chrome</a></li>
        <li><a target="_blank" href="http://www.firefox.com.cn/"><span class="s2"></span>更新Firefox</a></li>
        <li><a target="_blank" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads"><span
              class="s3"></span>更新IE</a></li>
      </ul>
    </div><!-- 提示升级 -->
    <div class="header">
      <div class="top_nav">
        <ul>
          <li>
            <a target="_blank" href="http://www.bianyue.cn/" class="nav1" title="边乐网">
              <i></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="http://yun.bianyue.cn/" class="nav2" title="边乐云">
              <i></i>
            </a>
          </li>
        </ul>
        <el-popover placement="right" trigger="hover">
          <div class="tip_nav_box">
            <dl>
              <dt>精彩相随</dt>
              <dd>
                <a target="_blank" class="tip_nav_1" href="http://yun.bianyue.cn/">边乐云</a>
                <a target="_blank" class="tip_nav_2" href="http://www.bianyue.cn/">边乐网</a>
                <a target="_blank" class="tip_nav_3" href="http://news.bianyue.cn/">边乐新闻</a>
                <a target="_blank" class="tip_nav_4" href="http://man.bianyue.cn/">边乐男性</a>
              </dd>
            </dl>
            <dl>
              <dt>边乐</dt>
              <dd>
                <a target="_blank" class="tip_nav_5" href="http://yun.bianyue.cn/file/">文件</a>
                <a target="_blank" class="tip_nav_6" href="http://yun.bianyue.cn/lixian/">云下载</a>
                <a target="_blank" class="tip_nav_7" href="http://yun.bianyue.cn/photo/">相册</a>
                <a target="_blank" class="tip_nav_8" href="http://yun.bianyue.cn/contact/">通讯录</a>
                <a target="_blank" class="tip_nav_9" href="http://yun.bianyue.cn/mp3/">我听</a>
              </dd>
            </dl>
            <dl>
              <dt>设置</dt>
              <dd>
                <a target="_blank" class="tip_nav_10" href="http://vip.bianyue.cn/vip">VIP服务</a>
                <a target="_blank" class="tip_nav_11" href="http://vip.bianyue.cn/info">个人资料</a>
                <a target="_blank" class="tip_nav_12" href="http://vip.bianyue.cn/setting">安全设置</a>
              </dd>
            </dl>
          </div>
          <a href="javascript:;" slot="reference" class="tip_nav">
            <i class="nav4"></i>
          </a>
        </el-popover>
      </div>

      <!-- 左侧 -->
      <div class="top_right">
        <div class="top_bar" @click.stop="openReg">
          <div class="top_avatar JS_avatar">
            <a href="javascript:;">
              <img src="//api.bianyue.cn/nophoto.gif">
            </a>
          </div>
          <div class="top_txt">
            <a href="javascript:;">
              <span>注册</span>
            </a>
          </div>
        </div>
        <el-popover popper-class="w-popover" placement="top-start" v-if="userInfo.vip==0||!userInfo.vip" width="200"
          trigger="hover" content=" 您还不是会员，开通会员，尊享特权。 ">
          <a href="http://vip.bianyue.cn/vip/index" target="_blank" slot="reference" class="fr cvip cvip_gray">非会员</a>
        </el-popover>
        <a href="javascript:;" class="top_a" @click="openReg">
          <i class="t_notice"></i>
        </a>
        <!-- 系统通知 -->
        <el-tooltip class="item" effect="dark" content="帮助中心" placement="bottom-end">

          <a href="http://help.bianyue.cn/" class="top_a" target="_blank">
            <i class="t_service"></i>
          </a>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下载手机端APP" placement="bottom-end">
          <a href="javascript:;" @click.stop="openApp" class="top_a"><i class="t_app"></i></a>
        </el-tooltip>
        <!-- 找客服 -->
        <a href="http://dhsf.bianyue.cn/" target="_blank" class="fl orange fd">净网2019 严打不良信息</a>
      </div>
    </div>
    <div id="JS_v_login" class="disn">
      <LoginTry v-if="loginAlert" @isLogin="isLogin" @close="closeLogin" @goBindPhone="goBindPhone"></LoginTry>
      <div style="height:464px;" v-else></div>
    </div>
    <div id="JS_v_bind_phone" class="disn">
      <NeedBindPhone v-if="phoneAlert" :info="infoData"></NeedBindPhone>
      <div style="height:550px;" v-else></div>
    </div>
    <div id="JS_down_app" class="disn">
      <ul class="mt30 fct down_list">
        <li>
          <div>
            <span>Apple</span>
            <p class="fcl mt8 mb10">当前版本2.3.88</p>
            <img src="http://api.bianyue.cn/android.php?op=qrcode&action=down_img_iphone" alt="">
          </div>
          <p class="mt8 mb4">手机扫码在App store进行安装</p>
          <p>[<a href="https://itunes.apple.com/cn/app/bian-yue-yun/id1351597102?mt=8" target="_blank" class="">点击在线访问App
              store]</a></p>
        </li>
        <li>
          <div>
            <span>Android</span>
            <p class="fcl mt8 mb10">当前版本2.4</p>
            <img src="http://api.bianyue.cn/android.php?op=qrcode&action=down_img" alt="">
          </div>
          <p class="mt8 mb4">手机扫码下载安装或其它途径：</p>
          <p>
            [<a href="http://down.bianyue.cn/bianyueyun.apk" class="">本地下载</a>]
            <!-- [<a href="http://android.myapp.com/myapp/detail.htm?apkName=com.example.ywy" target="_blank" class="">腾讯应用宝</a>] -->
            <!-- [<a href="https://shouji.baidu.com/software/25364986.html" target="_blank" class="">百度手机助手</a>] -->
          </p>
        </li>
      </ul>
    </div>
  </div>
  <!-- 头部 -->
</template>

<script>
  import LoginTry from "@/components/LoginTry.vue";
  import NeedBindPhone from "@/components/NeedBindPhone.vue";
  export default {
    name: "HeaderTry",
    data() {
      return {
        loginAlert: false,
        phoneAlert: false,
        loginWarpper: null,
        infoData: {},
        isUpdate:false
      };
    },
    components: {
      LoginTry: LoginTry,
      NeedBindPhone: NeedBindPhone
    },
    methods: {
      // 打开下载app
      openApp() {
        layer.open({
          type: 1,
          anim: 2,
          title: "下载手机端APP",
          area: ["520px", "420px"], //宽高
          content: $("#JS_down_app")
        });
      },
      // 打开注册页面
      openReg() {
        this.loginAlert = true;
        this.loginWarpper = layer.open({
          type: 1,
          title: false,
          anim: 2,
          skin: "w-layer",
          area: ["760px", ""], //宽高
          content: $("#JS_v_login"),
          cancel: () => {
            this.loginAlert = false;
          }
        });
      },
      // 关闭登录页面
      closeLogin() {
        this.loginAlert = false;
        layer.close(this.loginWarpper);
      },
      // 判断是否是登陆页面
      isLogin(data) {
        setTimeout(() => {
          $(".box-warpper .w-layer").css({
            top: "50%",
            "margin-top": -$(".w-layer").height() / 2
          });
        }, 0);
      },
      // 手机绑定
      goBindPhone(data) {
        this.infoData = data;
        this.phoneAlert = true;
        layer.open({
          type: 1,
          title: false,
          anim: 2,
          area: ["920px", ""], //宽高
          content: $("#JS_v_bind_phone"),
          cancel: () => {
            this.phoneAlert = false;
          }
        });
      }
    },
    mounted() {
      $(window).resize(() => {
        $(".box-warpper .w-layer").css({
          top: "50%",
          "margin-top": 0
        });
      });
      $(".JS_avatar img").on("error", function () {
        this.src = "//api.bianyue.cn/nophoto.gif";
      });
      let browser = navigator.appName
      let b_version = navigator.appVersion
      let version = b_version.split(";");
      let trim_Version = version[1].replace(/[ ]/g, "");
      if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
        this.isUpdate=true;
      } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
        this.isUpdate=true;
      } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
        this.isUpdate=true;
      } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
        this.isUpdate=true;
      }
    },
    created() {

    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*-- 提示升级 --*/
.bar_upgrade { position:fixed; z-index:19891019; top:0px; width:100%; padding:10px 20px; box-sizing:border-box; border:2px solid #ebd991; background:#fffae4; line-height:24px; }
.bar_upgrade .p1 { font-size:16px; font-weight:bold; }
.bar_upgrade ul { float:right; }
.bar_upgrade li { float:left; line-height:48px; }
.bar_upgrade li a span { display:inline-block; width:35px; height:35px; margin-right:8px; margin-left:14px; background:url(../assets/icon_ie.png); vertical-align:middle; } 
.bar_upgrade li a span.s2 { background-position:-70px 0; }
.bar_upgrade li a span.s3 { background-position:-35px 0; }
.bar_upgrade li a span.s4 { background-position:-105px 0; }
.el-popover {
  padding: 0;
}

</style>
