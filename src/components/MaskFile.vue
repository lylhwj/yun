<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pad15">
      <el-breadcrumb-item :to="{ path: '/' }"><span class="fn">标记分类</span></el-breadcrumb-item>
      <el-breadcrumb-item>电影（125）</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pad15 border_t scrollbar marke_list">
      <div v-if="maskList.length==0">
         暂无数据
      </div>
      <el-tag v-for="(mask,index) in maskList" :key="index" class="file_tag" style="cursor:pointer;" closable><a>{{mask.title}}</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag> 
    </div>
    <div class="border_t">
      <el-table :data="[]" stripe :show-header="false" style="width: 100%" height="336" class="el-table_pad5 scrollbar">
        <el-table-column label="" prop="type" width="70" align="center">
          <template slot-scope="scope">
            <span class="type_rar"></span>
          </template>
        </el-table-column>图标
        <el-table-column label="" prop="name">
        </el-table-column>名字
        <el-table-column label="" prop="" width="60">
          <template slot-scope="scope">
            <a href="" class="gray">移除</a>
          </template>
        </el-table-column>
      </el-table>
      <p class="fcr pad mt10">
        <a href="javascript:;" style="margin:10px;" title="新建标记" @click="addMask" class="mark_add"></a> 
      </p>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  name: "MaskFile",
  data() {
    return {
      maskList: []
    };
  },
  props: ["data"],
  methods: {
    addMask() {
      this.$emit("add", true);
    },
    submit() {}
  },
  created() { 
    api.getMask().then(response => {
      this.maskList = response.data;   
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
