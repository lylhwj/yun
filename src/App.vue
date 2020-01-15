<template>
  <div id="app" @click="closeUserPop">
    <router-view class="box-warpper"></router-view> 
  </div>
</template>

<script> 
  import '@/assets/layer/layer.css';
  import '@/assets/public.css'; 
  import '@/assets/animate.css'; 
  import '@/assets/app.css';
  
  export default {
    name: 'App', 
    data() {
      return {
        
      }
    },
    components: {
      
    },
    methods: {
      // 关闭用户弹窗
      closeUserPop() {
        this.$store.commit('changeUserInfo', {
          isShowUserPop: false
        });
      } 
    },
    mounted() {
      $("#layuicss-layer").remove();
    },
    created() {
      
    }
  }

</script>
<style>


</style>
