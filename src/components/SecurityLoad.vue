<template>
  <div>
    <el-alert title="首次设置密码原密码为空；如需要取消加密设置，输入原密码后新密码为空" type="error"></el-alert>
    <el-form ref="form" :model="form" label-width="70px" status-icon :rules="customRule" class="demo-ruleForm pad22">
      <el-form-item label="原密码">
        <el-input type="password" v-model="form.oldPwd" @keyup.enter.native="submit" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="form.newPwd" @keyup.enter.native="submit" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <p class="fct">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </p>
    </el-form>
  </div>
</template>
<script>
  import api from "@/api/index";
  export default {
    name: "SecurityLoad",
    data() {
      return {
        form: {
          oldPwd: '',
          newPwd: ''
        }
      };
    },
    props: ["id", "pass"],
    methods: {
      cancel() {
        this.$emit("cancel");
      },
      // 加密解密
      submit() {
        console.log(this.pass)
        if (this.pass) { //解密
          if (this.form.oldPwd !== this.pass) {
            layer.msg('请输入正确的原密码', {
              icon: 2
            })
            return false;
          } else {
            this.$refs.form.validate(valid => {
              if (valid) {
                api.editLoad({
                    id: this.id,
                    pass: this.form.newPwd
                  })
                  .then(response => {
                     this.$emit("success",{type:'edit'});
                    layer.msg(
                      '解密成功', {
                        icon: 1
                      } 
                    );
                  });
              }
            });
          }
        } else {
          this.$refs.form.validate(valid => {
            if (valid) {
              if(!this.form.newPwd){
                layer.msg('请输入新密码',{
                  icon:2
                })
                return false;
              }
              api.editLoad({
                  id: this.id,
                  pass: this.form.newPwd
                })
                .then(response => {
                   this.$emit("success",{type:'edit'});
                  layer.msg(
                    '加密成功', {
                      icon: 1
                    } 
                  );
                });
            }
          });
        }
      }
    },
    created() {}
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
