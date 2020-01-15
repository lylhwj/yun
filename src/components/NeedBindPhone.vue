<template>
  <div class="rel Binding_box">
    <div class="fr Bind_left">
      <div class="Bind_left_bg"></div>
      <div class="Bind_bar">
        <p><input type="text" @input="enterPhone" v-model="formData.phone" class="Bind_inp" maxlength="11" placeholder="请输入手机号"></p>
        <p class="mt20"><input type="text" @input="enterCode" maxlength="6" v-model="formData.code" class="fl Bind_inp"
            style="width:195px;" placeholder="请输入验证码"><a href="javascript:;" :class="['fr','Bind_yzm',isCode?'':'Bind_yzm_gray']"
            @click="getCode" ref="timeDown">{{msg}}</a></p>
        <p class="fct"><input type="submit" @click="submit" :class="[isGo?'Bind_submit2':'Bind_submit']" value="绑定手机"></p>
      </div>
    </div>
    <div class="fl Bind_right">
      <div class="Bind_tip">
        <p class="f16">应<a href="https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E6%B3%95/16843044 " target="_blank" class="blue">《中华人民共和国网络安全法》</a>要求，使用互联网服务需进行账号实名，为保障<span class="blue">边乐云</span>账号的正常使用，请绑定手机。</p>
        <p class="fct" v-if="this.info.username"><el-button @click="nextLogin" type="primary" plain style="width:214px; margin-top:66px;">下次再绑定</el-button></p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  name: "NeedBindPhone",
  data() {
    return {
      formData: {
        phone: "",
        code: ""
      },
      msg: "获取验证码",
      isCode: false,
      isGetCode: true,
      isGo: false,
      captcha: null,
      openWin: null
    };
  },
  props: ["info"],
  methods: {
    isMyPc() {
      return location.href.indexOf("mypc") !== -1;
    },
    enterPhone() {
      if (!this.formData.phone) {
        this.isCode = false;
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
        this.isCode = false;
        return false;
      } else {
        this.isCode = true;
        if (this.formData.phone && this.formData.code) {
          this.isGo = true;
        } else {
          this.isGo = false;
        }
        if (!this.isGetCode) {
          this.isCode = false;
        }
      }
    },
    enterCode() {
      if (this.formData.phone && this.formData.code) {
        this.isGo = true;
      } else {
        this.isGo = false;
      }
    },
    getCode() {
      if (!this.isGetCode) {
        layer.msg("请稍等之后发送", {
          icon: 2
        });
        this.isCode = false;
        return false;
      } else if (!this.formData.phone) {
        layer.msg("请输入手机号", {
          icon: 2
        });
        this.isCode = false;
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
        layer.msg("请输入正确格式的手机号", {
          icon: 2
        });
        this.isCode = false;
        return false;
      } else {
        api
          .isCaptcha({
            mobile: this.formData.phone,
            device_uuid: "123"
          })
          .then(response => {
            if (response.data.result) {
              this.captcha.show();
            } else {
              this.getCodeAjax({});
            }
          })
          .catch(() => {
            this.captcha.show();
          });
      }
    },
    // 发送验证码ajax
    getCodeAjax(res) {
      api
        .phoneGetCode({
          tencent_captcha_ticket: res.ticket,
          tencent_captcha_randstr: res.randstr,
          mobile: this.formData.phone,
          device_uuid: "123"
        })
        .then(response => {
          layer.msg("发送成功", {
            icon: 1
          });
          this.timeDownReady();
          this.timeDown(
            () => {
              this.isGetCode = true;
              this.isCode = true;
              this.msg = "获取验证码";
            },
            time => {
              this.isGetCode = false;
              this.isCode = false;
              this.msg = time + "秒后重新获取";
            }
          );
        });
    },
    // 绑定手机
    submit() {
      if (!this.formData.phone) {
        layer.msg("请输入手机号", {
          icon: 2
        });
        return false;
      } else if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
        layer.msg("请输入正确格式的手机号", {
          icon: 2
        });
        return false;
      } else if (!this.formData.code) {
        layer.msg("请输入验证码", {
          icon: 2
        });
        return false;
      } else if (this.info.username) { 
        api
          .bindphone2(
            {
              login: this.info.username,
              password: this.info.password,
              mobile: this.formData.phone,
              mobile_code: this.formData.code,
              device_uuid: "123",
              device_model: "123"
            },
            {
              failureCallback: response => {
                if (this.isMyPc()) {
                  
                }
              }
            }
          )
          .then(response => {
            this.setUserInfo(response.data);
            layer.closeAll();
            this.jump("/lixian"); 
          });
      } else { 
        api
          .bindphone(
            {
              mobile: this.formData.phone,
              mobile_code: this.formData.code,
              device_uuid: "123",
              device_model: "123"
            },
            {
              failureCallback: response => { 

              }
            }
          )
          .then(response => {
            this.setUserInfo(response.data);
            layer.closeAll();
            this.jump("/lixian"); 
          });
      }
    },
    // 下次再绑定
    nextLogin() { 
      if (!this.info.username) { 
          layer.closeAll();
          this.jump("/lixian"); 
      }
      this.GET({
        api: `/user.php?op=info&action=login&username=${
          this.info.username
        }&password=${this.info.password}&pc=true&usernameLoginFlag=1`,
        alertErr: "no",
        success: data => {
          let domain = "bianyue.cn";
          if (data.status !== 200) { 
            layer.msg(data.status, {
              icon: 2
            });
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
            layer.closeAll();
            this.jump("/lixian"); 
          }
        }
      });
    }
  },
  mounted() {
    this.captcha = new TencentCaptcha("2026300646", res => {
      if (res.ret == 0) {
        this.getCodeAjax(res);
      }
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Binding_box {
  width: 920px;
  height: 550px;
  box-shadow: 0 0 2px #ccc;
}

.Bind_left {
  width: 460px;
}

.Bind_left_bg {
  width: 368px;
  height: 107px;
  margin: 108px auto 57px;
  background: url(../assets/bind_bg_left.png);
}

.Bind_right {
  width: 460px;
  height: 550px;
  background: #f3fcff;
}

.Bind_tip {
  height: 190px;
  padding: 300px 0 0;
  background: #f3fcff url(../assets/bind_bg.png) no-repeat center 60px;
}

.Bind_tip p {
  width: 350px;
  margin: 0 auto;
  line-height: 28px;
}

.Bind_bar {
  width: 368px;
  margin: 0 auto;
}

.Bind_bar p {
  height: 43px;
}

.Bind_bar p.mt20 {
  margin: 53px 0 40px;
}

.Bind_inp {
  width: 368px;
  height: 42px;
  border: 0;
  border-bottom: 1px solid #d1d1d1;
  line-height: 42px;
  text-indent: 5px;
  font-size: 16px;
}

.Bind_inp:focus {
  border-bottom: 2px solid #c1e1ff;
}

.Bind_yzm,
.Bind_yzm_gray,
.Bind_submit,
.Bind_submit2 {
  width: 155px;
  border: 0;
  background: #0e8dfd;
  border-radius: 5px;
  line-height: 42px;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.Bind_yzm:hover {
  color: #fff;
}

.Bind_yzm_gray:hover {
  color: #999;
}

.Bind_yzm_gray {
  background: #f4f4f4;
  color: #999;
}

.Bind_submit {
  width: 214px;
  background: #f2f9ff;
  color: #0d8dfe;
}
</style>