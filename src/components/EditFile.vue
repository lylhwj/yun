<template>
  <el-form ref="editForm" :model="editForm" status-icon :rules="customRule" class="demo-ruleForm pad22">
    <el-input v-show="false" type="text"></el-input>
    <el-form-item prop="editFlieName">
      <el-input type="text" @keyup.enter.native="submit" v-model="editForm.editFlieName" placeholder="输入新文件名" ></el-input>
    </el-form-item>
    <p class="fct mt20">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认修改</el-button>
    </p>
  </el-form>
</template>
<script>
import api from "@/api/index";
export default {
  name: "EditFile",
  data() {
    return {
      editForm: {
        editFlieName: ""
      }
    };
  },
  props: ["id", "title", "type"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    // 文件夹重命名
    submit() {
      let id = this.id || 0;
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.type == "file") {
            api
              .editFile({
                id: id,
                title: this.editForm.editFlieName
              })
              .then(response => {
                this.$emit("success", { type: "edit" });
                layer.msg("文件修改成功", {
                  icon: 1
                });
              });
          } else if (this.type == "lixian") {
            api
              .editLoad({
                id: id,
                title: this.editForm.editFlieName
              })
              .then(response => {
                this.$emit("success", { type: "edit" });
                layer.msg("文件修改成功", {
                  icon: 1
                });
              });
          }else if(this.type=='favorites'){
            api
              .editMask({
                id: id,
                title: this.editForm.editFlieName
              })
              .then(response => {
                this.$emit("success", { type: "edit" });
                layer.msg("文件夹修改成功", {
                  icon: 1
                });
              });
          }
        }
      });
    }
  },
  created() {
    this.editForm.editFlieName = this.title || "";
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
