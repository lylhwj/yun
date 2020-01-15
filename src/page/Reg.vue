<template>
  <div>
    <HeaderLogin></HeaderLogin>
    <div class="bg_linear">
      <div class="bg_reg" style="margin:0 auto;width:1200px;">
        <div class="rel w-login" style="width:auto;"> 
          <a href="javascript:;" v-if="isLogin" :class="{qr_btn:true,pc_btn:loginIsQr}" @click="isQr"></a>
          <div v-if="!isLogin" class="login_box reg_pc">
            <h3>
              <p><a href="javascript:;" @click="regMethods(0)" :class="[regIndex==0?'hover':'']">手机注册</a></p>
              <div class="abs f14" style="right:0; top:3px">已有账号？<a href="javascript:;" class="blue" @click="jump('/login')">请登录</a></div>
            </h3>
            <p class="tip_error" style="width:320px;" v-if="registerError">{{registerErrorMsg}}<a v-if="registerErrorMsg=='该手机号已注册'" class="fr" style="color:#00a8ff;" href="http://yun.bianyue.cn/login?type=phone">点击切换到手机快捷登录</a></p>
            <el-input v-if="regIndex==0" placeholder="手机号码" @keyup.enter.native="register" @blur="blurRegisterPhone" @input="enterRegisterPhone"
              v-model="loginForm.registerPhone" maxlength="11" class="input-with-select mt20 select_login">
              <el-select v-model="selectValue" slot="prepend" placeholder="+86">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-input>
            <el-input v-if="regIndex==1" placeholder="请输入邮箱" @keyup.enter.native="register" @input="enterRegisterEmail"
              v-model="loginForm.registerEmail" class="input-with-select mt20 select_login">

            </el-input>
            <el-input v-if="regIndex==2" placeholder="请输入账号" @keyup.enter.native="register" @blur="blurRegisterAccount"
              v-model="loginForm.registerAccount" class="input-with-select mt20 select_login">

            </el-input>
            <p style="position:relative;">
              <el-input class="mt20 inp_login"  @keyup.enter.native="register" v-model="loginForm.pwd"
              @blur="changePwd(1)" :type="passwordType" placeholder="8位以上数字及字母组合的密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i></el-input>
              <span v-if="passwordType=='password'" @click="passwordType='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
              <span v-else @click="passwordType='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
            </p>


            <div class="mt20 mb20 inp_yzm">
              <el-input v-if="regIndex==0" placeholder="验证码" @keyup.enter.native="register" v-model="loginForm.registerCode"></el-input>
              <el-button v-if="regIndex==0" ref="timeDown" :type="isSendRegisterCode?'primary':'info'" :loading="registerCodeLoading"
                @click="getRegisterCode" style="padding:12px 0;">{{codeMsg}}</el-button>

              <el-input v-if="regIndex==1" placeholder="验证码" @keyup.enter.native="register" v-model="loginForm.registerEmailCode"></el-input>
              <el-button v-if="regIndex==1" :type="isSendRegisterEmailCode?'primary':'info'" :loading="registerEmailCodeLoading"
                @click="getRegisterEmailCode">获取验证码</el-button>
            </div>
            <el-button :type="registerChecked?'primary':'info'" @click="register" class="btn_login">注册</el-button>
            <div class="mt20 mb20  ">
              <el-checkbox v-model="registerChecked" check="false"></el-checkbox> 已阅读并同意
               <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">《用户协议》</a><a target="_blank" href="http://vip.bianyue.cn/AgreementPrivacy">《隐私政策》</a>
            </div>
          </div><!-- 手机注册 -->
          <div v-if="isLogin&loginIsQr" class="login_box">
            <h3>扫码登录</h3>
            <div class="fct qrcode">
              <div class="img-warpper">
                <QRcode :text="qrcode" v-if="isQRcode"></QRcode>
                <img @click="getCodeUrl" v-if="!isQRcode&&isRefresh" src="http://img.bianyue.cn/new/login/gq-error.png"
                  alt="">
              </div>
              请使用边乐云APP扫码登录
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
      <a target="_blank" href="http://www.12377.cn" rel="nofollow">暴恐举报中心</a><i>|</i>
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
import NeedBindPhone from "@/components/NeedBindPhone.vue";
import api from "@/api/index";
import "@/assets/login.css";
export default {
  name: "reg",
  metaInfo: {
      title: "注册_边乐云" 
  },
  data() {
    return {
      loginPhoneMethod: false,
      loginIsQr: false,
      isLogin: false,
      isRegister: false,
      checked: false,
      phoneChecked: true,
      registerChecked: true,
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
        registerPhone: "",
        pwd: "",
        comfirmPassword: "",
        registerCode: "",
        registerEmail: "",
        registerAccount: "",
        registerEmailCode: ""
      },
      registerError: false,
      registerErrorMsg: "",
      isSendCode: false,
      isSendRegisterCode: false,
      isSendRegisterEmailCode: false,
      registerEmailCodeLoading: false,
      codeLoading: false,
      registerCodeLoading: false,
      isQRcode: false,
      isRefresh: false,
      captcha: null,
      accountCaptcha: false,
      regIndex: 0,
      phoneAlert: false,
      bindPhoneAlert: false,
      isRegisterOK: false,
      timer: null,
      passwordType: "password",
      codeMsg: "获取验证码",
      isPwdOk: true
    };
  },
  components: {
    HeaderLogin: HeaderLogin,
    NeedBindPhone: NeedBindPhone
  },
  methods: {
    // 注册
    register() {
      this.registerError = false;
      if (!this.loginForm.registerPhone && this.regIndex == 0) {
        this.registerError = true;
        this.registerErrorMsg = "请输入手机号~";
        return false;
      } else if (!this.loginForm.registerEmail && this.regIndex == 1) {
        this.registerError = true;
        this.registerErrorMsg = "请输入邮箱~";
        return false;
      } else if (!this.loginForm.registerAccount && this.regIndex == 2) {
        this.registerError = true;
        this.registerErrorMsg = "请输入账号~";
        return false;
      } else if (!this.loginForm.pwd) {
        this.registerError = true;
        this.registerErrorMsg = "请输入密码~";
        return false;
      } else if (this.loginForm.pwd.length < 8) {
        this.registerError = true;
        this.registerErrorMsg = "8位以上数字及字母组合的密码";
        return false;
      } else if (!this.loginForm.registerCode && this.regIndex == 0) { 
        this.registerError = true;
        this.registerErrorMsg = "请输入验证码~";
        return false;
      } else if (!this.registerChecked) {
        layer.msg("请同意协议~", {
          icon: 7
        });
        return false;
      } else {
        api
          .register(
            {
              mobile: this.loginForm.registerPhone,
              mobile_code: this.loginForm.registerCode,
              device_uuid: "123",
              device_model: "123",
              password: this.loginForm.pwd,
              password_confirmation: this.loginForm.pwd
            },
            {
              alertErr: "no",
              isReg:true,
              failureCallback: response => {
                this.registerError = true;
                this.registerErrorMsg = response.msg;
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
                this.jump("/lixian");
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
    // 注册密码失去焦点
    changePwd(type) {
      this.registerError = false;
      if (type == 1 && !this.loginForm.pwd) {
        this.registerError = true;
        this.registerErrorMsg = "请输入密码~";
      } else if (type == 1 && this.loginForm.pwd.length < 8) {
        this.registerError = true;
        this.registerErrorMsg = "请设置8位以上数字及字母组合的密码";
      } else if (type == 1 && this.loginForm.pwd) { 
        $.ajax({
          type: "GET",
          url: `http://api.bianyue.cn/api.php?op=password_strength_check&password=${
            this.loginForm.pwd
          }`,
          data: {},
          dataType: "jsonp",
          success: data => {
            if (data.error) {
              this.registerError = true;
              this.registerErrorMsg = data.error;
              this.isSendRegisterCode = false;
              this.isPwdOk = false;
            } else {
              this.isSendRegisterCode =
                /^1[0-9]{10}$/.test(this.loginForm.registerPhone) &&
                this.loginForm.pwd;
              this.isPwdOk = true;
            }
          }
        });
      }
    },
    // 获取注册验证码
    getRegisterCode() {
      if (!this.isPwdOk) {
        return false;
      }
      this.registerError = false;
      if (!this.loginForm.registerPhone) {
        this.registerError = true;
        this.registerErrorMsg = "请输入手机~";
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.loginForm.registerPhone)) {
        this.registerError = true;
        this.registerErrorMsg = "请输入正确格式的手机~";
        return false;
      } else if (!this.loginForm.pwd) {
        this.registerError = true;
        this.registerErrorMsg = "请输入密码~";
        return false;
      } else if (this.loginForm.pwd.length < 8) {
        this.registerError = true;
        this.registerErrorMsg = "请设置8位以上数字及字母组合的密码";
        return false;
      } else if (!this.isSendRegisterCode) { 
        layer.msg("请稍等之后发送", {
          icon: 2
        });
        this.isSendRegisterCode = false;
        return false;
      } else {
        this.accountCaptcha = false;
        api
          .isCaptcha({
            mobile: this.loginForm.registerPhone,
            device_uuid: "123"
          })
          .then(response => {
            if (response.data.result) {
              this.isRegisterOK = false;
              this.captcha.show();
            } else {
              this.isRegisterAjax({});
            }
          })
          .catch(() => {
            this.isRegisterOK = false;
            this.captcha.show();
          });
      }
    },
    // 注册输入手机号
    enterRegisterPhone() {
      this.registerError = false;
      this.isSendRegisterCode =
        /^1[0-9]{10}$/.test(this.loginForm.registerPhone) && this.loginForm.pwd;
    },
    blurRegisterPhone() {
      this.registerError = false;
      if (!this.loginForm.registerPhone) {
        this.registerError = true;
        this.registerErrorMsg = "请输入手机~";
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.loginForm.registerPhone)) {
        this.registerError = true;
        this.registerErrorMsg = "请输入正确格式的手机~";
        return false;
      }
      this.isSendRegisterCode =
        /^1[0-9]{10}$/.test(this.loginForm.registerPhone) && this.loginForm.pwd;
    },
    // 判断是否注册ajax
    isRegisterAjax(res) {
      api
        .isRegister(
          {
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.loginForm.registerPhone,
            device_uuid: "123"
          },
          {
            alertErr: "no",
            failureCallback: response => {
              this.registerError = true;
              this.registerErrorMsg = response.msg;
            }
          }
        )
        .then(data => {
          api
            .isCaptcha({
              mobile: this.loginForm.registerPhone,
              device_uuid: "123"
            })
            .then(response => {
              if (response.data.result) {
                this.isRegisterOK = true;
                this.captcha.show();
              } else {
                this.getRegCode({});
              }
            })
            .catch(() => {
              this.isRegisterOK = true;
              this.captcha.show();
            });
        });
    },
    // 注册发送手机验证码ajax
    getRegCode(res) {
      this.registerCodeLoading = true;
      api
        .regGetCode(
          {
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.loginForm.registerPhone,
            device_uuid: "123"
          },
          {
            alertErr: "no",
            failureCallback: response => {
              this.registerError = true;
              this.registerErrorMsg = response.msg;
              setTimeout(() => {
                this.registerCodeLoading = false;
              }, 500);
            }
          }
        )
        .then(response => {
          layer.msg(response.msg, {
            icon: 1
          });
          this.timeDownReady();
          this.registerCodeLoading = false;
          this.timeDown(
            () => {
              this.isSendRegisterCode = true;
              this.codeMsg = "获取验证码";
            },
            time => {
              this.isSendRegisterCode = false;
              this.codeMsg = time + "秒后重新获取";
            }
          );
        });
    }
  },
  mounted() {
    this.captcha = new TencentCaptcha("2093771550", res => {
      if (res.ret == 0 && this.isRegisterOK) {
        this.getRegCode(res); //注册发送验证码
      } else if (res.ret == 0 && !this.isRegisterOK) {
        this.isRegisterAjax(res); //先判断是否注册
      }
    });
  },
  created() {
    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-height:800px){
.yun_footer { padding:10px 0; }
.bg_login, .bg_reg { height:500px; }
.bg_reg .w-login { margin-top:28px; }
.w-login { margin-top:43px;  }
.layout-frame{overflow-y:auto !important;}
.layout-frame body{overflow-y:auto !important;}
.layout-frame body.scrollx-hidden{overflow-y:hidden;}
}
</style>
