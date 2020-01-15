<template>
  <div>
    <div v-if="type=='file'">
      <div class="pad22 lineh30">
        <p><span class="fl">名称：</span><span class="detail-title fr">{{data.title}}</span></p>
        <div class="clear0"></div>
        <p>类型：{{data.type=='dir'?'文件夹':data.type}}</p>
        <p v-if="data.size==0">大小：0KB</p>
        <p v-else>大小：{{data.size|formatBytes}}</p>
        <p>创建时间：{{data.time*1000|timeStamp}}</p>
        <p class="fd blue mt20"><a href="javascript:;"  class="diin blue text-over">位置:</a>
          <a href="javascript:;" @click="go(0)"  style="max-width: 100px;" class="diin blue text-over">文件</a><span v-for="file in fileTitle" :key="file.id"><a href="javascript:;" @click="go(file.id)"  style="max-width: 100px;" class="diin blue text-over">&nbsp;〉&nbsp;{{file.title}}</a></span>
        </p>
      </div>
    </div>
    <div v-else-if="type=='lixian'">
      <div class="pad22 lineh30">
        <p><span class="fl"></span>名称：</span><span class="detail-title fr" >{{data.title}}</span></p>
        <div class="clear0"></div>
        <p>类型：{{data.type=='1'?'文件夹':'视频'}}</p>
        <p v-if="!data.size">大小：0KB</p>
        <p v-else>大小：{{data.size.size}}</p>
        <p>创建时间：{{data.time*1000|timeStamp}}</p>
        <p class="fd blue mt20"><a href="javascript:;"  class="diin blue text-over">位置:</a>
          <a href="javascript:;" @click="go(0)"  style="max-width: 100px;" class="diin blue text-over">云下载</a><span v-for="lixian in fileTitle" :key="lixian.id"><a href="javascript:;" @click="go(lixian.id)"  style="max-width: 100px;" class="diin blue text-over">&nbsp;〉&nbsp;{{lixian.title}}</a></span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Detail",
    data() {
      return {
        form: {}
      };
    },
    props: ["data", "fileTitle", "type"],
    methods: {
      go(topid) {
        this.$emit("go", topid);
      }
    },
    created() {}
  };

</script>
<style>
  .detail-title{
    width: 400px;
  }
</style>