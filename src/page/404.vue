<template>
  <div class="fct" style="margin-top:80px;">
    <a style="cursor: pointer" @click="goHome" title="返回首页" ><img width="600" src="@/assets/bg_404.svg"/></a>
    <p class="f26 mt30">页面失联了，闪电程序猿正在紧急寻找中....</p>
    <p class="mt30"><a @click.prevent="goHome" style="cursor: pointer" class="button btn_linear_blue"><span class="f14">返回首页</span></a></p>
  </div>
</template>

<script>

export default {
  name: 'Vip404',
  data () {
    return {
      
    }
  },
  methods:{
    goHome(){
      this.jump('/lixian');
    }
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = '404_边乐云';
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-warpper { min-width: auto;}

</style>
