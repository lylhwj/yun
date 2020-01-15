<template>
  <div>
    <HeaderLogin></HeaderLogin>
    <div class="bg_linear">
      <div class="bg_login">
        <div class="rel w-login" style="width: auto;">
          <!-- <a href="javascript:;" v-if="isLogin" :class="{qr_btn:true,pc_btn:loginIsQr}" @click="isQr"></a> -->
          <div v-if="isLogin&&!loginIsQr">
            <div v-if="!loginPhoneMethod" class="login_box">
              <h3>账号登录<a href="javascript:;" @click="loginPhoneMethod=true">手机快捷登录</a></h3>
              <p class="tip_error" v-if="error">{{errorMsg}}</p>
              <el-input class="mt20 inp_login" v-model="loginForm.username" @keyup.enter.native="login" @change="error=false"
                placeholder="手机/邮箱/边乐云账号"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
                <p class="rel">
              <el-input class="mt20 inp_login" :type="passwordType" v-model="loginForm.password" @keyup.enter.native="login"
                @change="error=false" placeholder="8个以上(字母、数字和符号的组合)密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i></el-input>
                <span v-if="passwordType=='password'" @click="passwordType='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
                <span v-else @click="passwordType='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
                </p>
              <div class="mt20 mb20">
                <el-checkbox v-model="checked" check="false">记住我 </el-checkbox>
                <span class="fr"><a target="_blank" href="http://yun.bianyue.cn/findpwd/">忘记密码</a></span>
              </div>
              <el-button type="primary" class="btn_login" @click="login">登录</el-button>
              <p class="mt20">其它方式：<a href="javascript:;" @click="thirdPartyLogin(1)" class="icon_qq"></a><a href="javascript:;"
                  @click="thirdPartyLogin(2)" class="icon_wx"></a> <a href="javascript:;" class="fr f16 btn_reg" @click="jump('/reg')">注册</a>
              </p> 
            </div><!-- 账号登录 -->
            <div v-if="loginPhoneMethod" class="login_box">
              <h3>手机快捷登录<a @click="loginPhoneMethod=false">账号登录</a></h3>
              <p class="tip_error" v-if="phoneError">{{phoneErrorMsg}}</p>
              <el-input placeholder="手机号码" @input="enterPhone" v-model="loginForm.loginPhone" maxlength="11" class="input-with-select mt20 select_login">
                <el-select v-model="selectValue" slot="prepend" placeholder="+86">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-input>
              <div class="mt20 inp_yzm">
                <el-input placeholder="验证码" v-model="loginForm.loginCode"></el-input>
                <el-button :type="isSendCode?'primary':'info'" :loading="codeLoading" @click="getCode">获取验证码</el-button>
              </div>
              <div class="mt20 mb20">
                <div v-if="isRegister">
                  <el-checkbox v-model="phoneChecked"></el-checkbox> 已阅读并同意
                  <a target="_blank" href="http://vip.gaibian.bianyue.cn/Agreementuser">《用户协议》</a><a target="_blank" href="http://vip.gaibian.bianyue.cn/AgreementPrivacy">《隐私政策》</a>
                </div>
                <div v-else>&nbsp;</div>
              </div>
              <el-button :type="phoneChecked?'primary':'info'" v-if="isRegister" class="btn_login" @click="registerLogin">注册并登录</el-button>
              <el-button type="primary" v-else class="btn_login" @click="phoneLogin">登录</el-button>
              <p class="mt20">其它方式：<a href="javascript:;" class="icon_qq"></a><a href="javascript:;" class="icon_wx"></a>
                <a href="javascript:;" class="fr f16 btn_reg" @click="jump('/reg')">注册</a> </p>
            </div><!-- 手机快捷登录 -->
          </div> 
          <div v-if="isLogin&loginIsQr" class="login_box">
            <h3>扫码登录</h3>
            <div class="fct qrcode">
              <div class="img-warpper">
                <QRcode :text="qrcode" v-if="isQRcode"></QRcode>
                <img @click="getCodeUrl" v-if="!isQRcode&&isRefresh" src="http://img.bianyue.cn/new/login/gq-error.png"
                  alt="">
              </div> 
              <div class="m_auto qrcode_bar" v-if="qrStatus=='SCANED'">
                <p class="f16"><span class="qrcode_yes"></span> 扫描成功</p>
                <p>请在边乐云APP中点击确认即可登录</p>
              </div> 
              <div class="m_auto qrcode_bar" v-else>
                <p class="f16"><span class="qrcode_tel"></span></p>
                <p>请使用边乐云APP扫码登录</p>
              </div>
              <!-- 
                         
              <div class="m_auto qrcode_bar">
                <p class="f16"><span class="qrcode_renew"></span></p>
                <p>重新刷新</p>
              </div> -->
            </div>
          </div><!-- 扫码登录 -->
        </div>
      </div>
    </div>
    <div class="clear0"></div>
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
    <div id="JS_bind_phone" class="disn">
      <NeedBindPhone v-if="bindPhoneAlert"></NeedBindPhone>
      <div style="height:550px;" v-else></div>
    </div>
  </div>
</template>
<script>
import HeaderLogin from "@/components/HeaderLogin.vue";
import QRcode from "@/components/QRcode.vue";
import NeedBindPhone from "@/components/NeedBindPhone.vue";
import api from "@/api/index";
import "@/assets/login.css";
export default {
  name: "login",
  data() {
    return {
      loginPhoneMethod: false,
      loginIsQr: false,
      isLogin: true,
      isRegister: false,
      checked: false,
      phoneChecked: true,
      options: [
        {
          value: "+86",
          label: "+86"
        }
      ],
      selectValue: "",
      loginForm: {
        username: "",
        password: "",
        loginPhone: "",
        loginCode: "",
        loginCode: "",
        pwd: "",
        comfirmPassword: ""
      },
      error: false,
      errorMsg: "",
      phoneError: false,
      phoneErrorMsg: "",
      isSendCode: false,
      codeLoading: false,
      isQRcode: false,
      isRefresh: false,
      qrcode: "",
      getQRcodeLoginInterval: null,
      getQRcodeLoginTimeout: null,
      captcha: null,
      accountCaptcha: false,
      regIndex: 0,
      phoneAlert: false,
      bindPhoneAlert: false,
      timer: null,
      passwordType:'password',
      qrStatus:''
    };
  },
  components: {
    HeaderLogin: HeaderLogin,
    QRcode: QRcode,
    NeedBindPhone: NeedBindPhone
  },
  methods: {
    // 登录
    login() {
      this.error = false;
      if (!this.loginForm.username) {
        this.error = true;
        this.errorMsg = "请输入账号~";
        return false;
      } else if (!this.loginForm.password) {
        this.error = true;
        this.errorMsg = "请输入密码~";
        return false;
      }
      //  else if (this.loginForm.password.length < 8) {
      //   this.error = true;
      //   this.errorMsg = "请输入正确格式的密码~";
      //   return false;
      // } 
      else {
        api
          .login(
            {
              login: this.loginForm.username,
              password: this.loginForm.password
            },
            {
              alertErr: "no",
              failureCallback: response => {
                this.error = true;
                this.errorMsg = response.msg;
              }
            }
          )
          .then(response => {
            layer.msg(
              response.msg,
              {
                icon: 1
              },
              () => {
                this.setUserInfo(response.data);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  this.jump("/file");
                });
              }
            );
          });
      }
    },
    // 手机绑定
    goBindPhone() {
      this.bindPhoneAlert = true;
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        area: ["920px", ""], //宽高
        content: $("#JS_bind_phone"),
        cancel: () => {
          this.bindPhoneAlert = false;
        }
      });
    },
    // 获取验证码
    getCode() {
      this.phoneError = false;
      if (!this.loginForm.loginPhone) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入手机~";
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.loginForm.loginPhone)) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入正确格式的手机~";
        return false;
      } else if (!this.isSendCode) {
        return false;
      } else {
        this.accountCaptcha = false;
        api
          .isCaptcha({
            mobile: this.loginForm.loginPhone,
            device_uuid: "123"
          })
          .then(response => {
            if (response.data.result) {
              this.captcha.show();
            } else {
              this.getPhoneCode({});
            }
          })
          .catch(() => {
            this.captcha.show();
          });
      }
    },
    // 输入手机号
    enterPhone() {
      this.phoneError = false;
      this.isRegister = false;
      this.isSendCode = /^1[0-9]{10}$/.test(this.loginForm.loginPhone);
    },
    // 手机快捷登陆
    phoneLogin() {
      this.phoneError = false;
      if (!this.isSendCode) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入正确格式的手机~";
        return false;
      } else if (!this.loginForm.loginCode) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入验证码~";
        return false;
      } else {
        api
          .phoneLogin(
            {
              mobile: this.loginForm.loginPhone,
              mobile_code: this.loginForm.loginCode,
              device_uuid: "123",
              device_model: "123"
            },
            {
              alertErr: "no",
              failureCallback: response => {
                this.phoneError = true;
                this.phoneErrorMsg = response.msg;
              }
            }
          )
          .then(response => {
            layer.msg(
              response.msg,
              {
                icon: 1
              },
              () => {
                this.setUserInfo(response.data);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  this.jump("/file");
                });
              }
            );
          });
      }
    },
    // 获取扫码地址
    getCodeUrl() {
      api
        .getNonce(
          { t: new Date().getTime() },
          {
            alertErr: "no"
          }
        )
        .then(response => { 
          this.qrcode = response.data.nonce;
          this.isQRcode = true;
          clearInterval(this.getQRcodeLoginInterval);
          clearTimeout(this.getQRcodeLoginTimeout);
          this.getQRcodeLoginInterval = setInterval(() => {
            api.nonceIsSuccess({ nonce: response.data.nonce }).then(data => {
              if (data.data.qr_code_status == "Granted") {
                this.isRefresh = true;
                this.isQRcode = false;
              }else if(data.data.qr_code_status=='SCANED'){
                this.qrStatus='SCANED';
              } else if (data.data.qr_code_status == "CONFIRMED") {
                api
                  .confirmNonce(
                    { nonce: response.data.nonce },
                    {
                      alertErr: "no",
                      failureCallback: response => {
                        clearInterval(this.getQRcodeLoginInterval);
                        clearTimeout(this.getQRcodeLoginTimeout);
                      }
                    }
                  )
                  .then(response => { 
                    layer.msg(
                      "登录成功",
                      {
                        icon: 1,
                        time: 2000
                      },
                      () => {
                        clearInterval(this.getQRcodeLoginInterval);
                        clearTimeout(this.getQRcodeLoginTimeout);
                        this.setUserInfo(response.data);
                        layer.closeAll();
                        this.setStorage(
                          "access_token",
                          response.data.access_token
                        );
                        api.yunLogin().then(response => {
                          this.jump("/file");
                        });
                      }
                    );
                  });
              }
            });
          }, 2000);
        });
    },
    // 是否扫码登录
    isQr() {
      this.loginIsQr = !this.loginIsQr;
      clearInterval(this.getQRcodeLoginInterval);
      clearTimeout(this.getQRcodeLoginTimeout);
      if (this.loginIsQr == true) {
        this.qrStatus='';
        this.getCodeUrl();
      }
    },
    openThirdPartyLogin(url) {
      this.authWin = window.open(
        url,
        "_blank",
        "width=800,height=500,menubar=no,toolbar=no,location=no"
      );
    },
    // 第三方登录
    thirdPartyLogin(type) {
      if (type == 1) {
        this.openThirdPartyLogin( process.env.QQURL );
        this.timer = setInterval(() => {
          if (this.authWin.closed) {
            clearInterval(this.timer);
          }
          api.qqLoginIsSuccess({}, { alertErr: "no" }).then(response => {
            if (this.authWin.closed) {
              clearInterval(this.timer);
              return false;
            }
            if (response.code == 200) {
              clearInterval(this.timer);
              this.authWin.close();
              if (response.oauth_status == "UnBindMobile") {
                this.goBindPhone();
              } else {
                this.setUserInfo(response.data.user);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  this.jump("/file");
                });
              }
            }
          });
        }, 1000);
      } else {
        this.openThirdPartyLogin( process.env.WXURL);
        this.timer = setInterval(() => {
          if (this.authWin.closed) {
            clearInterval(this.timer);
          }
          api.wxLoginIsSuccess({}, { alertErr: "no" }).then(response => {
            if (this.authWin.closed) {
              clearInterval(this.timer);
              return false;
            }
            if (response.code == 200) {
              clearInterval(this.timer);
              this.authWin.close();
              if (response.oauth_status == "UnBindMobile") {
                this.goBindPhone();
              } else {
                this.setUserInfo(response.data);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  this.jump("/file");
                });
              }
            }
          });
        }, 1000);
      }
    },
    // 关闭
    closeLogin() {
      clearInterval(this.getQRcodeLoginInterval);
      clearTimeout(this.getQRcodeLoginTimeout);
      this.$emit("close", true);
    },
    // 登录发送手机验证码
    getPhoneCode(res) {
      this.codeLoading = true;
      api
        .phoneGetCode(
          {
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.loginForm.loginPhone,
            device_uuid: "123"
          },
          {
            alertErr: "no",
            failureCallback: response => {
              this.phoneError = true;
              this.phoneErrorMsg = response.msg;
              setTimeout(() => {
                this.codeLoading = false;
              }, 500);
            }
          }
        )
        .then(response => {
          layer.msg(
            response.msg,
            {
              icon: 1
            },
            () => {
              this.codeLoading = false;
            }
          );
        });
    }
  },
  mounted() {
    this.captcha = new TencentCaptcha("2093771550", res => {
      if (res.ret == 0 && this.isLogin) {
        //手机快捷登录
        this.getPhoneCode(res);
      }
    });
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "边乐云，存知己，若比邻";
    api
      .getUser(
        {},
        {
          jump: "no"
        }
      )
      .then(response => {
        if (response.code == 200) {
          this.jump("/file");
        }
      });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
