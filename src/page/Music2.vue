<template>
  <div class="bg_music">
    <div class="view_wrap">

      <div class="left_music">
        <ul>
          <li class="hover"><router-link to=""><i class="linshi"></i>临时听单</router-link></li>
          <li><router-link to=""><i class="my"></i>我的听单</router-link></li>
          <li><router-link to=""><i class="recent"></i>最近播放</router-link></li>
        </ul>
      </div>  
      <div class="main_music">

        <div class="">
          <a href="" class="bb1"></a>
          <a href="" class="bb2"></a>
          <a href="" class="bb3">新建听单</a>
          
        </div>

        <ul class="aa">
          <li>
            <router-link to=""><div></div></router-link>
            <p class="f15 text-over"><a href="">临时听单</a></p>
            <p class="gray">共9首 <span class="fr more"></span></p>
          </li>
          <li>
            <router-link to=""><div><img src="https://file.s3.bianyue.cn:9199/file/upload/59ce1631031c43a5dfa38598ce6c4dab?response-content-disposition=filename%3D40c09cf488cd4c575b5fb58e942fd581.jpg&response-content-type=image%2Fjpeg&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=HRX03PXAYL83ZMWUV22V%2F20190516%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190516T081645Z&X-Amz-SignedHeaders=host&X-Amz-Expires=172800&X-Amz-Signature=6d512cfb06ebe0615aa604ada8c8e9c21a20694bb17d137b948876909897347b" alt=""></div></router-link>
            <p class="f15 text-over"><a href="">抒情安静心情音乐</a></p>
            <p class="gray">共9首 <span class="fr more"></span></p>
          </li>
          <li>
            <router-link to=""><div></div></router-link>
            <p class="f15 text-over"><a href="">抒情安静心情音乐抒情安静心情音乐</a></p>
            <p class="gray">共9首 <span class="fr more"></span></p>
          </li>

          
          
        </ul>
               <div href="javascript:;" class="btn_pan" @click="openBT"><span class="pico_uploadBT"></span>+磁力链接</div>
      </div>
    

    </div><!--  -->

    <div class="bar_music">
      <div class="music_player">
          <div class="player1"></div>
          <div class="player2"></div>
          <div class="player3"></div>
      </div><!-- 小动画 -->
    </div>



     
  </div> 
</template>
<style>
.bb1,.bb2 { background:linear-gradient(to right top,#40b1ff,#409eff,#0688ff); }
.bb1:before,.bb2:before { display:block; width:80px; height:80px; margin:10px; content:""; }
.bb1:before { background:url(../assets/icon_music.svg) 0 -195px; }
.bb2:before { background:url(../assets/icon_music.svg) -80px -195px; }

.bb3 { width:100px; height:100px;  border:1px dashed #409eff; text-align:center; color:#409eff; opacity:0.8   }
.bb3:before { display:block; width:80px; height:70px; margin:0 auto; background:url(../assets/icon_music.svg) -160px -195px; content:""; }
.bb3:hover { opacity:1;  }



.aa li { float:left; width:133px; margin:20px 20px; }
.aa li div { position:relative; width:133px; height:133px; border-radius:13px; background:linear-gradient(to right top,#40b1ff,#409eff,#0688ff); transition:all .3s; }
.aa li div:after,.aa li div:before { display:block; position:absolute; top:0; left:0; width:133px; height:133px; border-radius:13px; content:""; }
.aa li div:before { background:linear-gradient(to right top,#40b1ff,#409eff,#0688ff); opacity:0.4; }
.aa li div:after { background:  url(../assets/icon_music.svg) 0 -60px;  }
.aa li div img { width:133px; height:133px; border-radius:13px; }
.aa p.f15 { margin:10px 5px 3px; height:25px; line-height:25px; }
.aa p.gray { margin:0 5px; height:25px; line-height:25px; }
.aa p.gray .more { display:inline-block; width:25px; height:25px; background:url(../assets/icon_music.svg) 0 -30px; border-radius:50%; transition:all .3s; }
.aa li:hover div { box-shadow:0 0 10px rgba(6,136,255,.4); }
.aa li:hover .more { background-color:#efefef; }


.bb1,.bb2,.bb3 { display:inline-block; width:100px; height:100px; border-radius:10px; box-sizing:border-box; }





.music_word { background:linear-gradient(to right,#40b1ff,#409eff,#0688ff); opacity:90; }



.bg_music { background:linear-gradient(to right top,#eef2f7,#fff); }
.left_music { padding-top:167px; -webkit-overflow-scrolling:touch; }
.left_music li { margin-bottom:16px; border-right:2px solid #fdfdfd; transition: all 0.2s; }
.left_music a { display:block; position:relative; width:100px; height:26px; line-height:26px; padding:0 40px 0 108px; color:#999; font-size:15px; }
.left_music i { display:inline-block; position:absolute; left:71px; bottom:1px; width:30px; height:30px; }
.left_music li.hover { border-right-color:#409eff; }
.left_music li.hover a { color:#484848; font-weight:bold; }
.left_music li.hover i { display:inline-block; width:30px; height:30px; margin:0 auto; background:url(../assets/icon_music.svg) no-repeat;}
.left_music li.hover i.linshi { background-position:0 0; }/*临时听单*/
.left_music li.hover i.my { background-position:-30px 0; }/*我的听单*/
.left_music li.hover i.recent { background-position:-60px 0; }/*最近播放*/





.main_music { width:100%; margin-bottom:140px; background:rgba(255,255,255,.66); box-shadow:0 0 15px rgba(69,161,244,.2); box-sizing:border-box; }



/*-- 底部操作栏 --*/
.bar_music { position:fixed; bottom:0; width:100%; height:80px; background:#fff; box-shadow:0 0 10px rgba(182,197,217,.2); }

.bar_music:before { display:inline-block; position:absolute; z-index:-1px; right:50px; top:-60px;    width:230px; height:60px; background: url(../assets/icon_music.svg) 0 -275px; content:""; }
/*小动画*/
.music_player { position:absolute; left:45px; top:-80px; }
.player1:after,.player1:before { display:inline-block; position:absolute; content:""; border-radius:50%; }
.player1:after { z-index:1; top:0; left: 0; width:142px; height:142px; background: url(../assets/icon_music.svg) 0 -335px; }
.player1:before { z-index:2; top:4px; left:4px; width:134px; height:134px; background: url(../assets/icon_music.svg)-142px -335px; }
.player2 { position:absolute; z-index:2; top:110px; left:80px; width:130px; height:20px; background:url(../assets/music2.png); transform-origin:111px 10px; }
.player3 { position:absolute; top:102px; left:173px; width:33px; height:33px; background:url(../assets/music3.png); }
.player1:after { animation:move_wave 3s linear infinite 1.6s; }
@keyframes move_wave
{
    0% { transform:rotate(0deg); }
    50% { transform:rotate(180deg); }
    100% { transform:rotate(360deg); }
}
.player2 { animation:move_wave2 1.5s ease; }
@keyframes move_wave2
{
    0% { transform:rotate(-30deg); }
    100% { transform:rotate(0deg); }
}
</style>


<script>
export default {
  name: "Music",
  metaInfo: {
      title: "音乐_边乐云" 
  },
  data() {
    return {
      
    }
  },
  components: {

  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
