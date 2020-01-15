<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="contact"></LeftMenu>
      <div class="upgrade_bg">
        <p>维护升级中</p>
      </div>
    </div>
  </div> 
</template>

<script>
import Header from "@/components/Header.vue";
import LeftMenu from "@/components/LeftMenu.vue";
export default {
  name: "Upgrade",
  metaInfo: {
      title: "升级_边乐云" 
  },
  data() {
    return {
      
    }
  },
  components: {
    Header: Header,
    LeftMenu: LeftMenu,
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.upgrade_bg { position:absolute; top:20%; left:50%; width:160px; margin-left:40px; text-align:center; color:#ccc; font-size: 20px; }
.upgrade_bg:before { display:block; width:160px; height:181px; margin:0 auto 20px; background:url(../assets/bg_point_upgrade@1x.png); content:""; }
</style>