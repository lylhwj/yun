<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="music"></LeftMenu>
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
      loginWarpper: null,
      showGuidance: false,

      tableData: [{
        
      }]

    };
  },

  computed: {
    userImg() {
      return this.$store.state.user.userAvatar;
    },
  },
  components: {
    Header: Header,
    LeftMenu: LeftMenu,
  },
  created() {
    api.getUser().then(response => {
      this.setUserInfo(response.data);
      if (!response.data.guidanceStatus||response.data.guidanceStatus=='0') {
        this.showGuidance = true;
      } else {
        if (
          this.$router.currentRoute.query.pay !== "true" &&
          !this.getStorage("yunActivity") &&
          this.$router.currentRoute.name !== "Search"
        ) {
          if ($("#JS_activity")) {
            layer.open({
              type: 1,
              anim: 1,
              title: false,
              skin: "activity-layer",
              area: ["705px", "490px"], //宽高
              content: $("#JS_activity")
            });
          }
        }
      }
    });
    // 获取未读信息
    this.GET({
      api: `/user.php?op=info&action=duanxin`,
      success: data => {
        this.initMsg = data;
        let unreadMessagesCount = data.total;
        this.$store.commit("changeUserInfo", {
          unreadMessagesCount
        });
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.upgrade_bg { position:absolute; top:20%; left:50%; width:160px; margin-left:40px; text-align:center; color:#ccc; font-size: 20px; }
.upgrade_bg:before { display:block; width:160px; height:181px; margin:0 auto 20px; background:url(../assets/bg_point_upgrade@1x.png); content:""; }
</style>