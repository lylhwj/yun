<template>
  <div class="left_menu">
    <ul>
      <li :class="{hover:page=='file'}"><router-link to="/file"><i class="file"></i>文件</router-link></li>
      <li :class="{hover:page=='photo'}"><router-link to="/photo"><i class="album"></i>相册</router-link></li>
      <li :class="{hover:page=='lixian'}"><router-link to="/lixian"><i class="offline"></i>云下载</router-link></li>
      <li :class="{hover:page=='music'}"><router-link to="/music"><i class="music"></i>我听</router-link></li>
      <li :class="{hover:page=='contact'}"><router-link to="/contact"><i class="contact"></i>通讯录</router-link></li>
      <li :class="{hover:page=='favorites'}" class="mtop" ><router-link to="/favorites" class="menu2"><i class="fav"></i>星标</router-link></li>
      <li :class="{hover:page=='recover'}"><router-link to="/recover" class="menu2"><i class="recover"></i>回收站</router-link></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Left',
    data() {
      return {

      }
    },
    props: ['page']
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>