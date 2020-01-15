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
            <a target="_blank" :href="myHref" class="nav2" title="边乐云">
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
                <a class="tip_nav_10" href="http://vip.bianyue.cn/vip"  target="_blank">VIP服务</a>
                <a class="tip_nav_11" href="http://vip.bianyue.cn/info"  target="_blank">个人资料</a>
                <a class="tip_nav_12" href="http://vip.bianyue.cn/setting"  target="_blank">安全设置</a>
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
        <a target="_blank" href="http://help.bianyue.cn/" class="mr10"><span class="icon_help"></span> 帮助中心</a>
        <a target="_blank" href="http://yun.bianyue.cn/app"><span class="icon_app_down"></span> 下载手机APP</a>
      </div>
      <!-- 右侧 -->
    </div>
  <!-- 头部 -->
  </div>
</template>

<script> 
  export default {
    name: 'Header',
    data() {
      return {
        loginAlert: false,
        phoneAlert: false,
        loginWarpper: null,
        messageAlert: false,
        initMsg: {},
        infoData: {},
        myHref: 'http://yun.bianyue.cn/',
        isUpdate: false
      }
    }, 
    mounted(){
     let browser = navigator.appName;
    let b_version = navigator.appVersion;
    let version = b_version.split(";");
    let trim_Version = version[1].replace(/[ ]/g, "");
    if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
      this.isUpdate = true;
    } else if (
      browser == "Microsoft Internet Explorer" &&
      trim_Version == "MSIE7.0"
    ) {
      this.isUpdate = true;
    } else if (
      browser == "Microsoft Internet Explorer" &&
      trim_Version == "MSIE8.0"
    ) {
      this.isUpdate = true;
    } else if (
      browser == "Microsoft Internet Explorer" &&
      trim_Version == "MSIE9.0"
    ) {
      this.isUpdate = true;
    }
    },
    created() {
       
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-popover { padding:0; }
.w-popover { padding:15px; }
/*-- 提示升级 --*/
.bar_upgrade { position:fixed; z-index:19891019; top:0px; width:100%; padding:10px 20px; box-sizing:border-box; border:2px solid #ebd991; background:#fffae4; line-height:24px; }
.bar_upgrade .p1 { font-size:16px; font-weight:bold; }
.bar_upgrade ul { float:right; }
.bar_upgrade li { float:left; line-height:48px; }
.bar_upgrade li a span { display:inline-block; width:35px; height:35px; margin-right:8px; margin-left:14px; background:url(../assets/icon_ie.png); vertical-align:middle; } 
.bar_upgrade li a span.s2 { background-position:-70px 0; }
.bar_upgrade li a span.s3 { background-position:-35px 0; }
.bar_upgrade li a span.s4 { background-position:-105px 0; }
</style>
