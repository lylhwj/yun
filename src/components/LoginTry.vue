<template>
  <div id="page-try">
    <div class="w-login">
      <div class="movie_random">
        <el-carousel :interval="15000" height="175px" trigger="click" indicator-position="none" arrow="never">
          <el-carousel-item>
            <img :src="imgUrl">
          </el-carousel-item>
        </el-carousel>      
      </div><!-- 随机影片 --> 
      <a href="javascript:;" v-if="isLogin" :class="{qr_btn:true,pc_btn:loginIsQr}" @click="isQr"></a>
      <div v-if="isLogin&&!loginIsQr">
        <div v-if="!loginPhoneMethod" class="login_box">
          <h3>账号登录<a href="javascript:;" @click="loginPhoneMethod=true">手机快捷登录&nbsp;</a></h3>
          <p class="tip_error" v-if="error">{{errorMsg}}</p>
          <el-input class="mt20 inp_login" v-model="loginForm.username" @keyup.enter.native="enterLogin" @change="error=false"
            placeholder="手机/边乐云账号"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
          <p style="position:relative;">
            <el-input class="mt20 inp_login" :type="passwordType4" v-model="loginForm.password" @keyup.enter.native="enterLogin"
            @change="error=false" placeholder="登录密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i></el-input>
             <span v-if="passwordType4=='password'" @click="passwordType4='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
            <span v-else @click="passwordType4='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
          </p>
          <div class="mt20 mb20">
            <el-checkbox v-model="checked" check="false">记住我 </el-checkbox>
            <span class="fr"><a target="_blank" href="http://yun.bianyue.cn/findPwd">忘记密码</a></span>
          </div>
          <a href="javascript:;"  @click="login"><el-button type="primary" class="btn_login">登录</el-button></a>
          <p class="mt20">其它方式：<a href="javascript:;" @click="thirdPartyLogin(1)" class="icon_qq"></a><a href="javascript:;" @click="thirdPartyLogin(2)" class="icon_wx"></a> <a href="javascript:;" class="fr f16 btn_reg" @click="switchLogin">注册</a>
          </p>
        </div><!-- 账号登录 -->
        <div v-if="loginPhoneMethod" class="login_box">
          <h3>手机快捷登录<a @click="loginPhoneMethod=false">账号登录&nbsp;</a></h3>
          <p class="tip_error" v-if="phoneError">{{phoneErrorMsg}}</p>
          <el-input placeholder="手机号码" @input="enterPhone" v-model="loginForm.loginPhone" maxlength="11" class="input-with-select mt20 select_login">
            <el-select v-model="selectValue" slot="prepend" placeholder="+86">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-input>
          <div class="mt20 inp_yzm">
            <el-input placeholder="动态密码" v-model="loginForm.loginCode"></el-input>
            <el-button :type="isSendCode?'primary':'info'" style="padding:12px 0;" :loading="codeLoading" @click="getCode">{{loginCodeMsg}}</el-button>
          </div>
          <div class="mt20 mb20">
            <div v-if="isRegister">
              <el-checkbox v-model="phoneChecked"></el-checkbox> 已阅读并同意
              <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">《用户协议》</a><a target="_blank" href="http://vip.bianyue.cn/AgreementPrivacy">《隐私政策》</a>
            </div>
            <div v-else>&nbsp;</div>
          </div>
          <el-button :type="phoneChecked?'primary':'info'" v-if="isRegister" class="btn_login" @click="registerLogin">注册并登录</el-button>
          <el-button type="primary" v-else class="btn_login" @click="phoneLogin">登录</el-button>
          <p class="mt20">其它方式：<a href="javascript:;" class="icon_qq"></a><a href="javascript:;" class="icon_wx"></a>
            <a href="javascript:;" class="fr f16 btn_reg" @click="switchLogin">注册</a> </p>
        </div><!-- 手机快捷登录 -->
      </div>
      <div v-if="!isLogin" class="login_box reg_pc">
        <h3>
          <!-- <p><a href="javascript:;" @click="regMethods(0)" :class="[regIndex==0?'hover':'']">手机注册</a><a href="javascript:;"
              @click="regMethods(1)" :class="[regIndex==1?'hover':'']">邮箱注册</a></p> -->
          <p><a href="javascript:;" @click="regMethods(0)" :class="[regIndex==0?'hover':'']">手机注册</a>
          
          <!-- <a href="javascript:;" v-if="isShowUsernameReg" @click="regMethods(2)" :class="[regIndex==2?'hover':'']">快速注册</a> -->
          </p>
        </h3>
        <p class="tip_error" v-if="registerError">{{registerErrorMsg=='该手机号已有人注册或者使用'?'该手机号已注册':registerErrorMsg}}<a v-if="registerErrorMsg=='该手机号已注册'" class="fr" href="javascript:;" style="color:#00a8ff;" @click="switchLogin();loginPhoneMethod=true">点击切换到手机快捷登录</a></p>
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
        <el-input v-if="regIndex==2" class="mt20 inp_login" v-model="loginForm.registerAccount" @keyup.enter.native="register" @blur="blurRegisterAccount"
            placeholder="4-16位以字母开头及数字组合的账号"><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
        <p class="rel">
        <p style="position:relative;" v-if="regIndex==0">
          <el-input class="mt20 inp_login" :type="passwordType" @keyup.enter.native="register" v-model="loginForm.pwd" @blur="changePwd(1)"
              placeholder="8位以上数字及字母组合的密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i>
          </el-input> 
          <span v-if="passwordType=='password'" @click="passwordType='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
            <span v-else @click="passwordType='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
        </p>
        <p style="position:relative;" v-else>
          <el-input class="mt20 inp_login" :type="passwordType2" @keyup.enter.native="register" v-model="loginForm.pwd" @blur="changePwd(1)"
              placeholder="8位以上数字及字母组合的密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i>
          </el-input> 
          <span v-if="passwordType2=='password'" @click="passwordType2='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
            <span v-else @click="passwordType2='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
        </p>
        <p style="position:relative;" v-if="regIndex==2">
          <el-input class="mt20 mb20 inp_login" :type="passwordType3" @keyup.enter.native="register" v-model="loginForm.confirmPassword"   @blur="changePwd(2)"
              placeholder="请输入确认密码"><i slot="prefix" class="el-input__icon el-icon-pass"></i>
          </el-input> 
          <span v-if="passwordType3=='password'" @click="passwordType3='text'" class="eye_close" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
            <span v-else @click="passwordType3='password'" class="eye_open" style="cursor:pointer;"></span><!-- 睁眼eye_open -->
        </p> 
        <div class="mt20 mb20 inp_yzm" v-if="regIndex!==2">
          <el-input v-if="regIndex==0" placeholder="验证码" @keyup.enter.native="register" v-model="loginForm.registerCode"></el-input>
          <el-button v-if="regIndex==0" :type="isSendRegisterCode?'primary':'info'" style="padding:12px 0;" :loading="registerCodeLoading"
            @click="getRegisterCode">{{registerCodeMsg}}</el-button>
          <el-input v-if="regIndex==1" placeholder="验证码" @keyup.enter.native="register" v-model="loginForm.registerEmailCode"></el-input>
          <el-button v-if="regIndex==1" :type="isSendRegisterEmailCode?'primary':'info'" :loading="registerEmailCodeLoading"
            @click="getRegisterEmailCode">获取验证码</el-button>
        </div>
        <el-button id="shouji_reg" v-if="regIndex==0" :type="registerChecked?'primary':'info'" @click="register" class="btn_login">注册</el-button>
        <el-button id="kuaisu_reg" v-else :type="registerChecked?'primary':'info'" @click="register" class="btn_login">注册</el-button>
        <div class="mt20 mb20  ">
          <el-checkbox v-model="registerChecked" check="false"></el-checkbox> 已阅读并同意
          <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">《用户协议》</a><a target="_blank" href="http://vip.bianyue.cn/AgreementPrivacy">《隐私政策》</a>
          <a href="javascript:;" class="fr btn_log" @click="switchLogin">登录</a>
        </div>
      </div><!-- 手机注册 -->
      <div v-if="isLogin&loginIsQr" class="login_box">
        <h3>扫码登录</h3>
        <div class="fct qrcode">
          <div class="img-warpper">
            <QRcode :text="qrcode" v-if="isQRcode"></QRcode>
            <img @click="getCodeUrl" v-if="!isQRcode&&isRefresh" src="http://img.bianyue.cn/new/login/gq-error.png" alt="">
          </div>
          请使用边乐云APP扫码登录
        </div>
      </div><!-- 扫码登录 -->
    </div>

  </div>
</template>
<script>
import QRcode from "@/components/QRcode.vue";
import api from "@/api/index"; 
export default {
  name: "Login",
  data() {
    return {
      isShowUsernameReg:true,
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
        loginPhone: "",
        loginCode: "",
        loginCode: "",
        registerPhone: "",
        pwd: "",
        registerCode: "",
        registerEmail: "",
        registerAccount: "",
        registerEmailCode: "",
        confirmPassword:""
      },
      error: false,
      errorMsg: "",
      phoneError: false,
      phoneErrorMsg: "",
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
      qrcode: "",
      getQRcodeLoginInterval: null,
      getQRcodeLoginTimeout: null,
      captcha: null,
      accountCaptcha: false,
      regIndex: 0,
      phoneAlert: false,
      loginCodeMsg: "获取动态密码",
      registerCodeMsg: "获取验证码",
      isPwdOk: true,
      passwordType:'password',
      passwordType2:'password',
      passwordType3:'password',
      passwordType4:'password', 
      movie_random:[
        {url:require('../assets/login/movie_1.png')},
        {url:require('../assets/login/movie_2.png')},
        {url:require('../assets/login/movie_3.png')},
        {url:require('../assets/login/movie_4.png')},
        {url:require('../assets/login/movie_5.png')},
        {url:require('../assets/login/movie_6.png')},
      ] 
    };
  },
  computed:{
     imgUrl(){
       var random = Math.floor(Math.random()*6+1);  
       return this.movie_random[random-1].url;
     }
  },
  components: {
    QRcode: QRcode
  },
  props: ["init"],
  
  methods: {
    // 回车登录
    enterLogin() {
      this.login();
    },
    // 登录ajax
    loginAjax(username, password, callback,isAccount) {  
      this.GET({
        api: `/user.php?op=info&action=login&username=${username}&password=${password}&pc=true`,
        alertErr: "no", 
        success: data => {
          let domain = "bianyue.cn";
          if (data.status !== 200) { 
            this.error = true;
            this.errorMsg = data.status;
            if (data.status.indexOf("请绑定手机号") !== -1) {
              $.cookie("btcheck", "1", {
                domain: domain,
                expires: 30,
                path: "/"
              });
              $.cookie("login_username", data.u, {
                domain: domain,
                expires: 30,
                path: "/"
              });
              $.cookie("login_password", data.p, {
                domain: domain,
                expires: 30,
                path: "/"
              });
              this.$emit("goBindPhone", {
                username,
                password
              });
            }
          } else {
            $.cookie("btcheck", "1", {
              domain: domain,
              expires: 30,
              path: "/"
            });
            $.cookie("login_username", data.u, {
              domain: domain,
              expires: 30,
              path: "/"
            });
            $.cookie("login_password", data.p, {
              domain: domain,
              expires: 30,
              path: "/"
            }); 
            layer.msg(
                "登录成功",
                {
                  icon: 1
                } 
             ); 
            if(!isAccount){
              location.href='http://yun.bianyue.cn/lixian'
            } 
          }
        }
      });
    },
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
      } else { 
        this.loginAjax(
          this.loginForm.username,
          encodeURIComponent(this.loginForm.password),
          () => {
            layer.msg(
              "登录成功",
              {
                icon: 1
              },
              () => {
                layer.closeAll();
                if (this.init === 1) {
                  window.location.reload();
                }  
                 location.href='http://yun.bianyue.cn/lixian' 
              }
            );
          }
        );
      }
    },
    // 注册
    register() { 
      this.registerError = false;
      if (!this.loginForm.registerPhone && this.regIndex == 0) {
        this.registerError = true;
        this.registerErrorMsg = "请输入手机号~"; 
      } else if (!this.loginForm.registerEmail && this.regIndex == 1) {
        this.registerError = true;
        this.registerErrorMsg = "请输入邮箱~"; 
      } else if (!this.loginForm.registerAccount && this.regIndex == 2) {
        this.registerError = true;
        this.registerErrorMsg = "请输入账号~"; 
      } else if (!this.loginForm.pwd) {
        this.registerError = true;
        this.registerErrorMsg = "请输入密码~"; 
      } else if (this.loginForm.pwd.length <= 8) {
        this.registerError = true;
        this.registerErrorMsg = "8位以上数字及字母组合的密码"; 
      }else if(this.regIndex == 2&&!this.loginForm.confirmPassword){
        this.registerError = true;
        this.registerErrorMsg = "请输入确认密码"; 
      }else if(this.regIndex == 2&&this.loginForm.confirmPassword!==this.loginForm.pwd){
        this.registerError = true;
        this.registerErrorMsg = "两次密码不一致"; 
      }  else if (!this.loginForm.registerCode && this.regIndex == 0) {
        this.registerError = true;
        this.registerErrorMsg = "请输入验证码~";
        return false;
      } else if (!this.registerChecked) {
        layer.msg("请同意协议~", {
          icon: 7
        }); 
      } else if (this.regIndex == 2) {
        this.accountCaptcha = true;
        this.captcha.show(); 
      } else { 
        api
          .register(
            {
              mobile: this.loginForm.registerPhone,
              mobile_code: this.loginForm.registerCode,
              device_uuid: "123",
              device_model: "123",
              password: this.loginForm.pwd,
              password_confirmation: this.loginForm.pwd,
              t:new Date().getTime()
            },
            {
              alertErr: "no",
              failureCallback: response => { 
                this.registerError = true;
                this.registerErrorMsg = response.msg;
              }
            }
          )
          .then(response => {
            this.setUserInfo(response.data);
            layer.closeAll();
            layer.msg(
                "注册成功",
                {
                  icon: 1
                } 
             ); 
              location.href='http://yun.bianyue.cn/lixian'
          });
      }
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
      }else if(type==2&&this.loginForm.pwd!==this.loginForm.confirmPassword){
        this.registerError = true;
        this.registerErrorMsg = "两次密码不一致";
      }
    },
    // 注册方式切换
    regMethods(type) {
      this.regIndex = type;
      this.registerError = false;
      this.loginForm.registerPhone = "";
      this.loginForm.pwd = "";
      this.loginForm.confirmPassword = "";
      this.loginForm.registerCode = "";
      this.loginForm.registerEmail = "";
      this.loginForm.registerAccount = "";
    },
    // 切换注册或者登陆
    switchLogin() {
      this.isLogin = !this.isLogin;
      this.$emit("isLogin", this.isLogin);
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
        layer.msg("请稍等之后发送", {
          icon: 2
        });
        this.isSendCode = false;
        return false;
      } else {
        this.accountCaptcha = false;
        this.captcha.show();
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
    // 获取注册邮箱验证码
    getRegisterEmailCode() {
      this.registerError = false;
      if (!this.loginForm.registerEmail) {
        this.registerError = true;
        this.registerErrorMsg = "请输入邮箱~";
        return false;
      } else if (
        this.loginForm.registerEmail.length < 4 &&
        !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(this.loginForm.registerEmail)
      ) {
        this.registerError = true;
        this.registerErrorMsg = "请输入正确格式的邮箱~";
        return false;
      } else if (!this.isSendRegisterEmailCode) {
        return false;
      } else {
        this.accountCaptcha = false;
        this.captcha.show();
      }
    },
    // 输入手机号
    enterPhone() {
      this.phoneError = false;
      this.isRegister = false;
      this.isSendCode = /^1[0-9]{10}$/.test(this.loginForm.loginPhone);
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
    // 注册输入邮箱
    enterRegisterEmail() {
      this.registerError = false;
      this.isSendRegisterEmailCode =
        !this.loginForm.registerEmail.length < 4 &&
        /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(this.loginForm.registerEmail);
    },
    // 注册输入账号
    blurRegisterAccount() {
      this.registerError = false;
      if (!this.loginForm.registerAccount) {
        this.registerError = true;
        this.registerErrorMsg = "请输入账号~";
      } else {
        this.GET({
          api: `/user.php?op=regcheck&action=username&key=${
            this.loginForm.registerAccount
          }`,
          alertErr: "no",
          success: data => {
            if (data.status !== 200) {
              this.registerError = true;
              this.registerErrorMsg = data.status;
            }
          }
        });
      }
    },
    // 第三方登录
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
        this.openThirdPartyLogin(process.env.QQURL);
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
                this.$emit("goBindPhone", {});
              } else {
                this.setUserInfo(response.data);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  clearTimeout(this.scrollMSGTimeOut);
                  location.href='http://yun.bianyue.cn/lixian';
                });
              }
            }
          });
        }, 1000);
      } else {
        this.openThirdPartyLogin(process.env.WXURL);
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
                this.$emit("goBindPhone", {});
              } else {
                this.setUserInfo(response.data);
                layer.closeAll();
                this.setStorage("access_token", response.data.access_token);
                api.yunLogin().then(response => {
                  clearTimeout(this.scrollMSGTimeOut);
                  location.href='http://yun.bianyue.cn/lixian';
                });
              }
            }
          });
        }, 1000);
      }
    },
    // 手机快捷登陆
    phoneLogin() {
      this.phoneError = false;
      if (!this.isSendCode && !/^1[0-9]{10}$/.test(this.loginForm.loginPhone)) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入正确格式的手机~";
        return false;
      } else if (!this.loginForm.loginCode) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入动态密码~";
        return false;
      } else { 
        this.GET({
          api: `/user.php?op=entry&action=login_mobile&mobile=${
            this.loginForm.loginPhone
          }&code=${this.loginForm.loginCode}`,
          alertErr: "no",
          success: data => {
            let domain = "bianyue.cn";
            if (data.status !== 200) {
              this.phoneError = true;
              this.phoneErrorMsg = data.status;
            } else {
              $.cookie("btcheck", "1", {
                domain: domain,
                expires: 30,
                path: "/"
              });
              $.cookie("login_username", data.u, {
                domain: domain,
                expires: 30,
                path: "/"
              });
              $.cookie("login_password", data.p, {
                domain: domain,
                expires: 30,
                path: "/"
              });
               location.href='http://yun.bianyue.cn/lixian'
            }
          }
        });
      }
    },
    // 注册并登陆
    registerLogin() {
      this.phoneError = false;
      if (!this.phoneChecked) {
        layer.msg("请同意协议~", {
          icon: 7
        });
        return false;
      } else if (!this.isSendCode) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入正确格式的手机~";
        return false;
      } else if (!this.loginForm.loginCode) {
        this.phoneError = true;
        this.phoneErrorMsg = "请输入验证码~";
        return false;
      } else {
        this.GET({
          api: `/user.php?op=entry&action=login_mobile&mobile=${
            this.loginForm.loginPhone
          }&code=${this.loginForm.loginCode}`,
          alertErr: "no",
          success: data => {
            let domain = "bianyue.cn";
            if (data.status !== 200) {
              this.phoneError = true;
              this.phoneErrorMsg = data.status;
            } else {
              this.GET({
                api: `/user.php?op=info&action=login&username=${
                  data.data.username
                }&password=${data.data.password}`,
                alertErr: "no",
                success: loginData => {
                  if (loginData.status !== 200) {
                    this.error = true;
                    this.errorMsg = loginData.status;
                  } else {
                    $.cookie("btcheck", "1", {
                      domain: domain,
                      expires: 30,
                      path: "/"
                    });
                    $.cookie("login_username", data.u, {
                      domain: domain,
                      expires: 30,
                      path: "/"
                    });
                    $.cookie("login_password", data.p, {
                      domain: domain,
                      expires: 30,
                      path: "/"
                    });
                    layer.msg(
                      "登录成功",
                      {
                        icon: 1
                      },
                      () => {
                        layer.closeAll();
                        if (this.init === 1) {
                          window.location.reload();
                        }
                        location.href='http://yun.bianyue.cn/lixian';
                      }
                    );
                  }
                }
              });
            }
          }
        });
      }
    },
    getCodeUrl() {
      this.GET({
        api: `/android.php?op=qrcode&action=qrcode_url`,
        success: data => {
          this.qrcode = data.url;
          this.isQRcode = true;
          clearInterval(this.getQRcodeLoginInterval);
          clearTimeout(this.getQRcodeLoginTimeout);
           this.getQRcodeLoginInterval = setInterval(() => {
            this.GET({
              api: `/android.php?op=qrcode&action=get_username`,
              alertErr: "no",
              success: data => {
                if (data.status == 200) {
                  clearInterval(this.getQRcodeLoginInterval);
                  clearTimeout(this.getQRcodeLoginTimeout);
                  this.GET({
                    api: `/user.php?op=info&action=login&username=${
                      data.data.username
                    }&password=${data.data.password}`,
                    alertErr: "no",
                    success: data => {
                      layer.msg(
                        "登录成功",
                        {
                          icon: 1,
                          time: 2000
                        },
                        () => {
                          layer.closeAll(); 
                          location.href="http://yun.bianyue.cn/lixian";
                        }
                      );
                    }
                  });
                }
              },
              error: data => {
                clearInterval(this.getQRcodeLoginInterval);
                clearTimeout(this.getQRcodeLoginTimeout);
              }
            });
          }, 2000);
          this.getQRcodeLoginTimeout = setTimeout(() => {
            this.isRefresh = true;
            this.isQRcode = false;
          }, 10000);
        }
      });
    },
    // 是否扫码登录
    isQr() {
      this.loginIsQr = !this.loginIsQr;
      if (this.loginIsQr == true) {
        this.getCodeUrl();
      } else {
        clearInterval(this.getQRcodeLoginInterval);
        clearTimeout(this.getQRcodeLoginTimeout);
      }
    },
    // 关闭
    closeLogin() {
      clearInterval(this.getQRcodeLoginInterval);
      clearTimeout(this.getQRcodeLoginTimeout);
      this.$emit("close", true);
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
              this.registerCodeMsg = "获取验证码";
            },
            time => {
              this.isSendRegisterCode = false;
              this.registerCodeMsg = time + "秒后重新获取";
            }
          );
        });
    }
  },
  mounted() { 
    if (this.init === 1) {
      this.isLogin = true;
    }
    this.captcha = new TencentCaptcha("2026300646", res => {
      if (res.ret == 0 && this.accountCaptcha) {
        this.GET({
          api: `/user.php?op=entry&action=register&username=${
            this.loginForm.registerAccount
          }&password=${encodeURIComponent(this.loginForm.pwd)}&ticket=${
            res.ticket
          }&randstr=${res.randstr}`,
          alertErr: "no",
          success: data => {
            if (data.status == 200) {
              layer.msg(
                "注册成功",
                {
                  icon: 1
                },
                () => {
                  this.loginAjax(
                    this.loginForm.registerAccount,
                    encodeURIComponent(this.loginForm.pwd),
                    () => {
                      layer.closeAll();
                      if (this.init === 1) {
                        window.location.reload();
                        return false;
                      }
                      window.location.href = "http://vip.bianyue.cn";
                    },
                    true
                  );
                }
              );
            } else {
              this.registerError = true;
              this.registerErrorMsg = data.status;
            }
          }
        });
      } else if (res.ret == 0 && this.isLogin) {
        this.codeLoading = true;
        this.GET({
          api: `/user.php?op=message&action=login_mobile&mobile=${
            this.loginForm.loginPhone
          }&ticket=${res.ticket}&randstr=${res.randstr}`,
          alertErr: "no",
          success: data => {
            if (data.status == 200) {
              layer.msg("发送成功", {
                icon: 1
              });
            } else {
              if (data.status == "该手机号未注册或者绑定!") {
                this.isRegister = true;
              }
              this.phoneError = true;
              this.phoneErrorMsg = data.status;
            }
            this.timeDownReady();
            this.codeLoading = false;
            this.timeDown(
              () => {
                this.isSendCode = true;
                this.loginCodeMsg = "获取动态密码";
              },
              time => {
                this.isSendCode = false;
                this.loginCodeMsg = time + "秒后重新获取";
              }
            );
          },
          error: () => {
            this.codeLoading = false;
          }
        });
      } else if (res.ret == 0 && !this.isLogin && this.regIndex == 1) {
        this.registerEmailCodeLoading = true;
        this.GET({
          api: `/user.php?op=entry&action=register_email&email=${
            this.loginForm.registerEmail
          }&ticket=${res.ticket}&randstr=${res.randstr}`,
          alertErr: "no",
          success: data => {
            if (data.status == 200) {
              layer.msg("发送成功", {
                icon: 1
              });
            } else {
              this.registerError = true;
              this.registerErrorMsg = data.status;
            }
            setTimeout(() => {
              this.registerEmailCodeLoading = false;
            }, 500);
          },
          error: () => {
            this.registerEmailCodeLoading = false;
          }
        });
      } else if (res.ret == 0 && !this.isLogin) {
        this.registerCodeLoading = true;
        this.GET({
          api: `/user.php?op=message&action=reg_phone&mobile=${
            this.loginForm.registerPhone
          }&ticket=${res.ticket}&randstr=${res.randstr}`,
          alertErr: "no",
          success: data => {
            if (data.status == 200) {
              layer.msg("发送成功", {
                icon: 1
              });
            } else {
              this.registerError = true;
              this.registerErrorMsg = data.status;
            }
            this.timeDownReady();
            this.registerCodeLoading = false;
            this.timeDown(
              () => {
                this.isSendRegisterCode = true;
                this.registerCodeMsg = "获取验证码";
              },
              time => {
                this.isSendRegisterCode = false;
                this.registerCodeMsg = time + "秒后重新获取";
              }
            );
          },
          error: () => {
            this.registerCodeLoading = false;
          }
        });
      }
    });
  } ,
  created(){
    $.getJSON("http://yun.bianyue.cn/config/config.json",(result)=>{
     this.isShowUsernameReg=result.username_register; 
    });
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#page-try .w-login {
  position: relative;
  width: 760px;
  margin: 0 auto;
  background-image: url(../assets/login/bg.png);
}

#page-try .login_close {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 14px;
  height: 14px;
  background: url(../assets/login/icon.png) -110px -60px;
  cursor: pointer;
}

#page-try .pc_btn,
#page-try .qr_btn {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: url(../assets/login/icon.png) 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

#page-try .pc_btn {
  background-position: -50px -50px;
}

#page-try .login_box {
  min-height: 294px;
  padding: 30px 30px 30px 410px;
  background: transparent;
}

#page-try .login_box h3 {
  position: relative;
  z-index: 2;
  font-size: 18px;
  font-weight: 400;
}

#page-try .login_box h3 p a {
  font-size: 18px;
  font-weight: 400;
}

#page-try .login_box h3 > a {
  float: right;
  margin-top: 4px;
  font-size: 14px;
  cursor: pointer;
}

#page-try .login_box h3 > a:after {
  display: inline-block;
  width: 9px;
  height: 12px;
  background: url(../assets/login/icon.png) -130px -60px;
  content: "";
}

#page-try .login_box h3 p a {
  float: none;
}

#page-try .login_box h3 p a:after {
  background: none;
}

#page-try.tip_error:before {
  display: inline-block;
  width: 15px;
  height: 14px;
  margin-right: 3px;
  background: url(../assets/login/icon.png) -110px -75px;
  vertical-align: middle;
  content: "";
}

#page-try .login_box h3 p {
  border-bottom: 1px solid #409eff;
}

#page-try .login_box h3 p a {
  display: inline-block;
  padding: 0 8px;
  line-height: 30px;
  cursor: pointer;
}

#page-try .login_box h3 p a.hover {
  background: #409eff;
  color: #fff;
}

#page-try .tip_error {
  position: absolute;
  top: 53px;
  color: #ef4123;
}

#page-try .reg_pc .tip_error {
  top: 61px;
}

#page-try .btn_login {
  width: 100%;
  border-radius: 0;
}

#page-try .inp_login .el-input__inner {
  padding-left: 35px;
  border-radius: 0;
  border-color: #c9c9c9;
}

#page-try .el-icon-pass:before,
#page-try .el-icon-user:before {
  display: inline-block;
  content: "";
  width: 18px;
  height: 20px;
  margin: 0 7px;
  background: url(../assets/login/icon.png) -150px -60px;
  vertical-align: middle;
}

#page-try .el-icon-pass:before {
  background-position: -170px -60px;
}

#page-try .select_login .el-select .el-input {
  width: 70px;
}

#page-try .select_login .el-input-group__prepend {
  border-radius: 0;
  border-color: #c9c9c9;
  background-color: #fff;
}

#page-try .select_login .el-input--suffix .el-input__inner {
  padding-right: 20px;
  padding-left: 0;
  text-align: center;
}

#page-try .select_login .el-input__inner {
  border-radius: 0;
  border-color: #c9c9c9;
}

#page-try .inp_yzm {
  overflow: hidden;
}

#page-try .inp_yzm .el-input {
  float: left;
  width: 184px;
}

#page-try .inp_yzm .el-input__inner {
  border-radius: 0;
  border-color: #c9c9c9;
}

#page-try .inp_yzm .el-button--info {
  float: right;
  width: 126px;
  border-radius: 0;
}

#page-try .inp_yzm .el-button--primary {
  float: right;
  width: 126px;
  border-radius: 0;
}

#page-try .icon_qq,
#page-try .icon_wx {
  display: inline-block;
  width: 26px;
  height: 26px;
  margin: 0 10px 5px 0;
  background: url(../assets/login/icon.png) -110px 0;
  vertical-align: middle;
}

#page-try .icon_wx {
  background-position: -140px 0;
}

#page-try .icon_qq:hover {
  background-position: -110px -30px;
}

#page-try .icon_wx:hover {
  background-position: -140px -30px;
}

#page-try .qrcode .img-warpper {
  display: block;
  width: 178px;
  height: 178px;
  margin: 30px auto 15px;
  border: 1px solid #e9e9e9;
}

#page-try .qrcode .img-warpper img {
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0;
}
#page-try .w-login .movie_random { position:absolute; top:165px; left:50px; width:310px; height:175px; overflow:hidden; }
#page-try .w-login .movie_random img { display:block; width:310px; height:175px; }
</style>
