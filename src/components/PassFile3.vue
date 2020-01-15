<template>
  <el-form ref="fileForm" :model="fileForm" status-icon :rules="customRule" label-width="50px" class="demo-ruleForm pad22">
    <el-input v-show="false" type="text" style="position: absolute;top: 100%;"></el-input>
    <span class="fl mr10 type_folder_pass"></span>
    <el-form-item prop="passFile">
      <el-input @keyup.enter.native="submit" type="password" v-model="fileForm.passFile"
        placeholder="请输入文件密码"></el-input>
    </el-form-item>
    <p class="fct">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </p>
  </el-form>
</template>
<script>
  import api from "@/api/index";
  export default {
    name: "PassFile",
    data() {
      return {
        fileForm: {
          passFile: ""
        }
      };
    },
    props: ['id', 'pass','url'],
    methods: {
      cancel() {
        this.$emit("cancel");
      },
      // 加密文件夹
      submit() { 
        this.$refs.fileForm.validate(valid => {
          if (valid) { 
            if (this.pass == this.fileForm.passFile) {
              this.$emit('success', {
                id: this.id,
                type:'nodir',
                url:this.url
              })
            } else {
              layer.msg('请输入正确的密码', {
                icon: 2
              })
            }
          }
        });
      }
    },
    created() {}
  };

</script>