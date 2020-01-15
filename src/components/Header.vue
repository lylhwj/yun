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
            <a target="_blank" href="http://yun.bianyue.cn" class="nav2" title="边乐云">
              <i></i>
            </a>
          </li>
        </ul>
        <el-popover placement="right" trigger="hover">
          <div class="tip_nav_box">
            <dl>
              <dt>精彩相随</dt>
              <dd>
                <a target="_blank" class="tip_nav_1" href="http://yun.bianyue.cn">边乐云</a>
                <a target="_blank" class="tip_nav_2" href="http://www.bianyue.cn/">边乐网</a>
                <a target="_blank" class="tip_nav_3" href="http://news.bianyue.cn/">边乐新闻</a>
                <a target="_blank" class="tip_nav_4" href="http://man.bianyue.cn/">边乐男性</a>
              </dd>
            </dl>
            <dl>
              <dt>边乐</dt>
              <dd>
                <a target="_blank" class="tip_nav_5" href="http://yun.bianyue.cn/file">文件</a>
                <a target="_blank" class="tip_nav_6" href="http://yun.bianyue.cn/lixian">云下载</a>
                <a target="_blank" class="tip_nav_7" href="http://yun.bianyue.cn/upgrade">相册</a>
                <a target="_blank" class="tip_nav_8" href="http://yun.bianyue.cn/upgrade">通讯录</a>
                <a target="_blank" class="tip_nav_9" href="http://yun.bianyue.cn/upgrade">我听</a>
              </dd>
            </dl>
            <dl>
              <dt>设置</dt>
              <dd>
                <a class="tip_nav_10" href="http://vip.bianyue.cn/vip" target="_blank">VIP服务</a>
                <a class="tip_nav_11" href="http://vip.bianyue.cn/info" target="_blank">个人资料</a>
                <a class="tip_nav_12" href="http://vip.bianyue.cn/setting" target="_blank">安全设置</a>
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
        <el-popover placement="bottom" trigger="click" popper-class="pad0 user_popup_box">
          <div class="user_popup">
            <div class="user_info">
              <img class="fl user_avatar" :src="userImg" onerror="this.src='//api.bianyue.cn/nophoto.gif'">
              <div class="div1">
                <p class="mb10">
                  <strong class="fn f20 vmid mr10">{{userInfo.nickname||userInfo.mobile}}</strong>
                  <span rel="vip">
                    <a href="javascript:;" class="cvip cvip_orange" v-if="userInfo.vipcart_type==2">年V</a>
                    <a href="javascript:;" class="cvip cvip_blue" v-else-if="userInfo.vipcart_type==1">月V</a>
                    <a href="javascript:;" class="fr cvip cvip_gold" v-else-if="userInfo.vip==2">VIP</a>
                    <a href="javascript:;" class="fr cvip cvip_gray" v-else>非会员</a>
                  </span>
                </p>
                <p class="f16">ID:{{userInfo.userid}}</p>
              </div>
            </div>
            <div class="user_operate fct">
              <a href="http://vip.bianyue.cn/info" target="_blank">
                <i class="i_info"></i>个人资料</a>
              <a href="http://vip.bianyue.cn/setting" target="_blank">
                <i class="i_set"></i>设置</a>
            </div>
            <a class="user_quit" target="_top" href="javascript:;" @click="logout">退出</a>
          </div><!-- 弹出框 -->
          <div class="top_bar" slot="reference">
            <div class="top_avatar" id="JS_avatar">
              <a href="javascript:;">
                <img :src="userImg">
              </a>
            </div>
            <div class="top_txt">
              <a href="javascript:;">
                <span>{{userInfo.mobile||userInfo.username}}</span>
              </a>
            </div>
          </div>
        </el-popover>
        <el-popover popper-class="w-popover" placement="top-start" v-if="userInfo.vip==0||!userInfo.vip" width="200"
          trigger="hover" content=" 您还不是会员，开通会员，尊享特权。 ">
          <a target="_blank" href="http://vip.bianyue.cn/vip/index" slot="reference" class="fr cvip cvip_gray">非会员</a>
        </el-popover>
        <a target="_black" href="http://vip.bianyue.cn/vip/index" class="fr cvip cvip_orange" v-else-if="userInfo.vipcart_type==2">年V</a>
        <a target="_blank" href="http://vip.bianyue.cn/vip/index" class="fr cvip cvip_blue" v-else-if="userInfo.vipcart_type==1">月V</a>
        <a target="_blank" href="http://vip.bianyue.cn/vip/index" class="fr cvip cvip_gold" v-else-if="userInfo.vip==2">VIP</a>
        <el-tooltip class="item" effect="dark" :content="msgTip" placement="bottom-start">
          <a href="javascript:;" class="top_a" @click="openMsg">
            <i class="t_notice"></i>
            <em v-if="msgCount!==0">{{msgCount}}</em>
          </a>
        </el-tooltip>
        <!-- 系统通知 -->
        <el-tooltip class="item" effect="dark" content="帮助中心" placement="bottom-end">
          <!-- <a href="javascript:;" class="top_a" target="_blank" @click="jump('/helpCenter?id=11')">
            <i class="t_service"></i>
          </a> -->
          <a href="http://help.bianyue.cn/" class="top_a" target="_blank">
            <i class="t_service"></i>
          </a>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下载手机端APP" placement="bottom-end">
          <a href="javascript:;" @click.stop="openApp" class="top_a"><i class="t_app"></i></a>
        </el-tooltip><!-- 下载APP -->
        <el-popover placement="bottom-start" trigger="click" popper-class="pad0">
          <Sign id="JS_sign"></Sign> 
          <a href="javascript:;" slot="reference" class="top_a"><i class="t_qian"></i></a> 
        </el-popover>
        <a href="http://dhsf.bianyue.cn/" target="_blank" class="fl orange fd">净网2019 严打不良信息</a>
      </div>
      <!-- 右侧 -->
    </div>
    <div id="JS_message" class="disn">
      <Message v-if="messageAlert" :init="initMsg"></Message>
      <div style="height:530px;" v-else></div>
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
    <Activity id="JS_activity" class="disn"></Activity>
    <div class="w-boot_box" @click="guidanceClick" v-if="showGuidance"></div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import App from "@/components/App.vue";
import Activity from "@/components/Activity.vue";
import Sign from "@/components/Sign.vue";
import api from "@/api/index";
export default {
  name: "Header",
  data() {
    return {
      loginAlert: false,
      phoneAlert: false,
      loginWarpper: null,
      messageAlert: false,
      appAlert: false,
      showGuidance: false,
      initMsg: {},
      infoData: {},
      myHref: "http://yun.bianyue.cn/", 
      isUpdate: false
    };
  },
  components: {
    Message: Message,
    App: App,
    Activity: Activity,
    Sign: Sign
  },
  computed: {
    userImg() {
      return this.$store.state.user.userAvatar;
    },
    isShowUserPop() {
      return this.$store.state.user.isShowUserPop;
    },
    msgCount() {
      return this.unreadMessagesCount < 99 ? this.unreadMessagesCount : 99;
    },
    msgTip() {
      return this.unreadMessagesCount == 0
        ? "您暂时没有系统通知"
        : `您有${this.unreadMessagesCount}条未读信息`;
    }
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
    // 显示隐藏个人用户框
    togglePop() {
      this.$store.commit("changeUserInfo", {
        isShowUserPop: !this.isShowUserPop
      });
    },
    // 打开系统信息
    openMsg() {
      this.messageAlert = true;
      layer.open({
        type: 1,
        title: "系统通知",
        anim: 2,
        area: ["700px", ""], //宽高
        content: $("#JS_message"),
        cancel: () => {
          this.messageAlert = false;
        }
      });
    },
    // 退出登录
    logout() {
      layer.confirm(
        "确定退出登录?",
        {
          icon: 3
        },
        () => {
          api.logout().then(response => {
            let domain = "bianyue.cn";
            $.cookie("btcheck", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("login_username", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("login_password", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("pan_topid", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("pan_photo_topid", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("file_file_topid", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("favorite_file_topid", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("contact_file_topid", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("pan_page", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            $.cookie("file_page", "", {
              domain: domain,
              expires: -1,
              path: "/"
            });
            layer.msg(
              "退出登录中...",
              {
                time: 2000
              },
              () => {
                this.jump("/login");
              }
            );
          });
        }
      );
    },
    // 引导
    guidanceClick() {
      api
        .guidanceMark(
          {},
          {
            failureCallback: response => {
              this.showGuidance = false;
            }
          }
        )
        .then(() => {
          this.showGuidance = false;
          if (
            this.$router.currentRoute.query.pay !== "true" &&
            !this.getStorage("yunActivity") &&
            this.$router.currentRoute.name !== "Search"
          ) {
            if ($("#JS_activity").is(":hidden")) {
              layer.open({
                type: 1,
                anim: 1,
                title: false,
                skin: "activity-layer",
                area: ["705px", "490px"], //宽高
                content: $("#JS_activity")
              });
            }
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
    $("#JS_avatar img").on("error", function() {
      this.src = "//api.bianyue.cn/nophoto.gif";
    });
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
    api.getUser().then(response => {
      this.setUserInfo(response.data); 
      if (
        !response.data.guidanceStatus ||
        response.data.guidanceStatus == "0"
      ) {
        this.showGuidance = true; 
      } else {
        if (
          this.$router.currentRoute.query.pay !== "true" &&
          !this.getStorage("yunActivity") &&
          this.$router.currentRoute.name !== "Search"
        ) {
          if ($("#JS_activity")) {
            layer.open({
              type: 1,
              anim: 1,
              title: false,
              skin: "activity-layer",
              area: ["705px", "490px"], //宽高
              content: $("#JS_activity")
            });
          }
        }
      }
    });
    // 获取未读信息
    this.GET({
      api: `/user.php?op=info&action=duanxin`,
      success: data => {
        this.initMsg = data;
        let unreadMessagesCount = data.total;
        this.$store.commit("changeUserInfo", {
          unreadMessagesCount
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.user_popup_box.el-popover {
  border: none;
  border-radius: 10px;
}
.user_popup_box.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #bfaba7;
}
.pad0.el-popover {
  padding: 0;
}
.el-popover {
  padding: 0;
}
.w-popover {
  padding: 15px;
}

.activity-layer {
  background-color: transparent;
  box-shadow: none;
}

.activity-layer .layui-layer-close2 {
  top: -20px;
  right: -15px;
}
.w-boot_box {
  display: block;
  position: absolute;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1350px;
  height: 100%;
  background: url(../assets/bg_tip2.png);
  background-size: cover;
}
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
