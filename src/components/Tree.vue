<template>
  <div>
    <div class="pad15" style="padding-bottom:0px;">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <div class="scrollbar mt10" style="height:250px; overflow:scroll ">
      <el-tree class="filter-tree folder_tree" :data="data" :highlight-current="true" @node-click="select" :props="defaultProps" :filter-node-method="filterNode" ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }" >
          <span v-if="data.type=='dir'||data.type==1" >
            <span v-if="data.pass" class="type_folder_pass vmid" style="transform:scale(0.5);"></span>
            <span v-else class="type_folder vmid" style="transform:scale(0.5);"></span>
          </span> 
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
      </div>
    </div>
    <p class="fct pad15 border_t">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </p>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  name: "Tree",
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "title",
        type: "type"
      },
      t_id: "",
      t_type: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  props: ["data", "id", "checkedList", "treeType"],
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    select(data) {
      this.t_id = data.id;
      this.t_type = data.type;
    },
    cancel() {
      this.$emit("cancel", true);
    },
    submit() {
      if (!this.t_id && this.t_id !== 0) {
        layer.msg("请选择移动到的文件夹~", {
          icon: 2
        });
        return false;
      }
      if (this.treeType == "photo") {
        api
          .dragPhoto({
            id: this.id,
            t_id: this.t_id
          })
          .then(response => {
            this.$emit("success", {t_id:this.t_id});
            layer.msg(response.msg, {
              icon: 1
            }); 
          });
      } else if (this.treeType == "lixian" && this.checkedList.length > 0) {
        let param = {
          t_id: this.t_id
        };
        this.checkedList.forEach((element, index) => {
          param["id[" + index + "]"] = element.id;
        });
        api.dragBatLoad(param).then(response => {
          this.$emit("success", {t_id:this.t_id});
          layer.msg(
            response.msg,
            {
              icon: 1
            }); 
        });
      } else if (this.treeType == "lixian") {
        api
          .dragLoad({
            id: this.id,
            t_id: this.t_id
          })
          .then(response => {
            this.$emit("success", {t_id:this.t_id});
            layer.msg(
              response.msg,
              {
                icon: 1
              }); 
          });
      } else if (this.checkedList.length > 0 && this.treeType == "file") {
        let param = {
          t_id: this.t_id
        };
        this.checkedList.forEach((element, index) => {
          param["id[" + index + "]"] = element.id;
        });
        api.dragBatFile(param).then(response => {
          this.$emit("success", {t_id:this.t_id});
          layer.msg(response.msg, {
            icon: 1
          }); 
        });
      } else {
        api
          .dragFile({
            id: this.id,
            t_id: this.t_id
          })
          .then(response => {
            this.$emit("success", {t_id:this.t_id});
            layer.msg(response.msg, {
              icon: 1
            }); 
          });
      }
    }
  },
  created() {}
};
</script>
<style>
.folder_tree .el-tree-node__content {
  height: 35px;
}
</style>