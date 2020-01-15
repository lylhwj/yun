<template>
  <el-form ref="addForm" :model="addForm" status-icon :rules="customRule" label-width="50px" class="demo-ruleForm pad22">
    <el-input v-show="false" type="text"></el-input>
    <span class="fl mr10 type_folder"></span>
    <el-form-item prop="addFlieName">
      <el-input @keyup.enter.native="addFileSubmit"  type="text" v-model="addForm.addFlieName"
        placeholder="请输入文件夹名"></el-input>
    </el-form-item>
    <p class="fct">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="addFileSubmit">确认</el-button>
    </p>
  </el-form>
</template>
<script>
import api from "@/api/index";
export default {
  name: "AddFile",
  data() {
    return {
      addForm: {
        addFlieName: ""
      }
    };
  },
  props: ["topid", "type"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    // 新建文件夹
    addFileSubmit() {
      if (this.addForm.addFlieName.length > 30) {
        layer.msg("文件名过长~", {
          icon: 2
        });
        return false;
      }
      let topid = this.topid || 0;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if (this.type == "file") {
            api
              .addFile({
                title: this.addForm.addFlieName,
                topid: topid
              })
              .then(response => {
                setTimeout(() => {
                   this.$emit("success", {newId:response.data.id});
                }, 1000);  
                layer.msg("创建文件夹成功", {
                  icon: 1
                });
              });
          } else if (this.type == "lixian") {
            api
              .addLoad({
                title: this.addForm.addFlieName,
                topid: topid
              })
              .then(response => {   
                layer.msg("创建文件夹成功", {
                  icon: 1
                });
                setTimeout(() => {
                   this.$emit("success", {newId:response.data.id});
                }, 1000);  
              });
          } else if (this.type == "favorites") {
            api
              .addMask({
                title: this.addForm.addFlieName
              })
              .then(response => {
                this.$emit("success", {});
                layer.msg("创建文件夹成功", {
                  icon: 1
                });
              });
          }
        }
      });
    }
  },
  created() {}
};
</script>