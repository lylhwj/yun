<template>
<div id="page-pwd">
  <div class="header_fpwd"><div class="h_oflow w1200 m_auto">
      <span class="fico_pwd"></span>
      <span class="white f18"><a target="_blank" href="http://yun.bianyue.cn/" class="white" style=" color:#fff; cursor:pointer;">边乐云</a> | 找回密码</span>
  </div></div><!-- 头部 -->
    <div class="w970 m_auto" v-if="step==1">
        <ul class="h_oflow fct f16 process_fpwd">
          <li class="hover"><span class="s1"></span>确认账号</li>
          <li><span class="s2"></span>手机验证</li>
          <li><span class="s3"></span>重置密码</li>
          <li><span class="s4"></span>完成</li>
        </ul>
        <div class="box_fpwd">
            <el-input class="mt20 inp_pwd" @blur="submitMobile" maxlength="11" placeholder="请输入手机号码" v-model="form.mobile" @keyup.enter.native="submitMobile" ><i slot="prefix" class="el-input__icon pwd_tel"></i></el-input>
        </div>
        
    </div>
    <!--1确认账号 -->
    <div class="w970 m_auto" v-else-if="step==2">
        <ul class="h_oflow fct f16 process_fpwd">
          <li><span class="s1"></span>确认账号</li>
          <li class="hover"><span class="s2"></span>手机验证</li>
          <li><span class="s3"></span>重置密码</li>
          <li><span class="s4"></span>完成</li>
        </ul>
        <div class="box_fpwd"> 
            <p class="black f16"><span class="fico_tel"></span>手机号：{{form.mobile|secret}}</p>
            <div class="clear"></div>
            <p class="fl w200"><el-input class="inp_pwd inp_pwd_yzm" v-model="form.mobile_code" maxlength="6" placeholder="请输入验证码"></el-input></p>
            <p class="fr" style="width:155px;"> 
              <el-button :type="isCode?'primary':'info'" class="btn_pwd" :loading="loading" @click="captchaShow">{{codeMsg}}</el-button>
            </p>
            <div class="clear0"></div>
            <p class="mt20 mb20 gray lineh20">
              如手机号已停用，可尝试以下方式进行申诉：<br>
              邮箱：kefu@bianyue.cn <br>
              电话：0596-2949294
            </p>
            <el-button type="primary" class="btn_pwd"  @click="next"><span class="f16">下一步</span></el-button>
        </div>
    </div>
    <!-- 2手机验证 -->
    <div class="w970 m_auto" v-else-if="step==3">
        <ul class="h_oflow fct f16 process_fpwd">
          <li><span class="s1"></span>确认账号</li>
          <li><span class="s2"></span>手机验证</li>
          <li class="hover"><span class="s3"></span>重置密码</li>
          <li><span class="s4"></span>完成</li>
        </ul>
        <div class="box_fpwd">
            <el-input class="mt20 inp_pwd" type="password" @blur="changePwd" v-model="form.password" @keyup.enter.native="submitPwd" placeholder="请输入新密码"><i slot="prefix" class="el-input__icon pwd_pwd"></i></el-input>
            <p class="mt20 mb20 gray">请设置8位以上数字及字母组合的密码</p>   
            <el-button type="primary" class="btn_pwd" @click="submitPwd"><span class="f16">提交</span></el-button>
        </div>
    </div>
    <!--3重置密码 -->
    <div class="w970 m_auto" v-else-if="step==4">
        <ul class="h_oflow fct f16 process_fpwd">
          <li><span class="s1"></span>确认账号</li>
          <li><span class="s2"></span>手机验证</li>
          <li><span class="s3"></span>重置密码</li>
          <li class="hover"><span class="s4"></span>完成</li>
        </ul>
        <div class="box_fpwd">
          <span class="fl fico_yes"></span>
          <div class="fl mf10 mt10">
            <p class="black f20">您的新登录密码已设置成功！</p>
            <p class="mt15 f16"><router-link to="/login" class="blue">点击此处</router-link> 返回首页重新登录</p>
            <p class="mt15 gray">3秒后自动返回</p>               
          </div>
        </div>
    </div>
    <!--4完成 -->
</div> 
</template>

<script>
import HeaderLogin from "@/components/HeaderLogin.vue";
import api from "@/api/index";
export default {
  name: "FindPwd",
  metaInfo: {
      title: "找回密码_边乐云" 
  },
  data() {
    return {
      step: 1,
      form: {
        mobile: "",
        mobile_code: "",
        passwrod: ""
      },
      passwrodOk: false,
      isCode: true,
      loading: false,
      codeMsg: "发送验证码",
      captcha: null
    };
  },
  filters: {
    secret(mobile) {
      return (
        String(mobile).substring(0, 5) +
        "****" +
        String(mobile).substring(7, 11)
      );
    }
  },
  components: {
    HeaderLogin: HeaderLogin
  },
  methods: {
    // 第一步提交手机
    submitMobile() {
      if (!this.form.mobile) {
        layer.msg("请输入手机~", {
          icon: 2
        });
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        layer.msg("请输入正确格式的手机~", {
          icon: 2
        });
        return false;
      } else {
        this.captcha.show();
      }
    },
    // 图形验证码
    captchaShow() {
      if (!this.isCode) {
        layer.msg("请稍等之后发送", {
          icon: 2
        });
        return false;
      }
      this.captcha.show();
    },
    // 判断是否注册ajax
    isRegisterAjax(res) {
      api
        .isRegister(
          {
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.form.mobile,
            device_uuid: "123"
          },
          {
            alertErr: "no",
            failureCallback: response => {
              this.step = 2;
            }
          }
        )
        .then(data => {
          layer.msg(data.msg, {
            icon: 7
          });
        });
    },
    // 获取验证码
    getCode(res) {
      this.loading = true;
      api
        .regGetCode(
          {
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.form.mobile,
            device_uuid: "123"
          },
          {
            alertErr: "no",
            failureCallback: response => {
              layer.msg(response.msg, {
                icon: 2
              });
              setTimeout(() => {
                this.loading = false;
              }, 500);
            }
          }
        )
        .then(response => {
          layer.msg(response.msg, {
            icon: 1
          });
          this.timeDownReady();
          this.loading = false;
          this.timeDown(
            () => {
              this.isCode = true;
              this.codeMsg = "获取验证码";
            },
            time => {
              this.isCode = false;
              this.codeMsg = time + "秒后重新获取";
            }
          );
        });
    },
    // 下一步
    next() {
      if (!this.form.mobile_code) {
        layer.msg("请输入验证码~", {
          icon: 2
        });
        return false;
      }
      this.step = 3;
    },
    // 密码失去焦点
    changePwd() {
      this.passwrodOk = false;
      if (!this.form.password) {
        layer.msg("请输入密码~", {
          icon: 2
        });
        return false;
      } else if (this.form.password.length <= 8) {
        layer.msg("请设置8位以上数字及字母组合的密码~", {
          icon: 2
        });
        return false;
      } else if (this.form.password) {
        $.ajax({
          type: "GET",
          url: `http://api.bianyue.cn/api.php?op=password_strength_check&password=${
            this.form.password
          }`,
          data: {},
          dataType: "jsonp",
          success: data => {
            if (data.error) {
              layer.msg(data.error, {
                icon: 2
              });
            } else {
              this.passwrodOk = true;
            }
          }
        });
      }
    },
    //新密码提交
    submitPwd() {
      if (!this.form.password) {
        layer.msg("请输入密码~", {
          icon: 2
        });
        return false;
      } else if (this.form.password.length <= 8) {
        layer.msg("请设置8位以上数字及字母组合的密码~", {
          icon: 2
        });
        return false;
      }
      api
        .findPwd({
          password: this.form.password,
          mobile: this.form.mobile,
          mobile_code: this.form.mobile_code
        })
        .then(response => {
          this.step = 4;
          this.setUserInfo(response.data);
          layer.closeAll();
          this.setStorage("access_token", response.data.access_token);
          api.yunLogin().then(response => {
            setTimeout(() => {
              this.jump("/lixian");
            }, 3000);
          });
        });
    }
  },
  mounted() {
    this.captcha = new TencentCaptcha("2093771550", res => {
      if (res.ret == 0 && this.step == 1) {
        this.isRegisterAjax(res);
      } else if (res.ret == 0) {
        this.getCode(res);
      }
    });
  },
  created() {
   
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
.layout-frame body { background:#fafafa; }
#page-pwd .header_fpwd { background:#999; height:88px; line-height:88px; }
#page-pwd .fico_pwd {display:inline-block; width:30px; height:50px; background:url(../assets/ic_retrieve_password.svg) no-repeat -325px -15px; vertical-align:middle;}
#page-pwd .process_fpwd { width:720px; margin:80px auto 40px; }
#page-pwd .process_fpwd li { position:relative; float:left; padding:0 50px; }
#page-pwd .process_fpwd li span { display:block; width:80px; height:80px; margin-bottom:8px; background:url(../assets/ic_retrieve_password.svg); opacity:0.45; }
#page-pwd .process_fpwd li:after { display:block; position:absolute; z-index:-1; top:40px; left:125px; width:110px; height:2px; background:#e4e7e9; content:""; }
#page-pwd .process_fpwd li:last-child:after { display:none; }
#page-pwd .process_fpwd li .s2 { background-position:-80px 0; }
#page-pwd .process_fpwd li .s3 { background-position:-160px 0; }
#page-pwd .process_fpwd li .s4 { background-position:-240px 0; }
#page-pwd .process_fpwd li.hover span { opacity:1; } 
#page-pwd .box_fpwd { width:370px; padding-left:180px; }
#page-pwd .inp_pwd .el-input--prefix,#page-pwd .inp_pwd .el-input__inner { height:48px; padding-left:55px; line-height:48px; border-radius:5px; border:2px solid #fff; background:#fff; box-shadow:3px 3px 3px #eee; font-size:16px; }
#page-pwd .inp_pwd_yzm .el-input--prefix,#page-pwd .inp_pwd_yzm .el-input__inner { padding-left:0; text-align:center; }
#page-pwd .inp_pwd .el-input--prefix:focus,#page-pwd .inp_pwd .el-input__inner:focus { border:2px solid #409eff; }
#page-pwd .btn_pwd { width:100%; padding:16px 0; }
#page-pwd .pwd_pwd,#page-pwd .pwd_tel { width:41px; }
#page-pwd .pwd_pwd:after,#page-pwd .pwd_tel:after { display:inline-block; content:""; width:1px; height:20px; background:#dadada; }
#page-pwd .pwd_pwd:before,#page-pwd .pwd_tel:before,#page-pwd .fico_tel,#page-pwd .fico_user,#page-pwd .fico_yes { display:inline-block; content:""; width:40px; height:40px; margin:4px 0; background:url(../assets/ic_retrieve_password.svg) no-repeat -400px 0px; vertical-align:middle; }
#page-pwd .pwd_tel:before,#page-pwd .fico_tel { background-position:-360px -40px; }
#page-pwd .fico_user { background-position:-360px -0; }
#page-pwd .fico_yes { background-position:-400px -40px; }
</style>