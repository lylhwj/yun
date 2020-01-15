<template>
  <div>
  <div class="boot_box" >
    <!-- <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="btn_know"></div> -->
  </div><!-- 引导框 -->
  <div class="boot_animation"><img src="@/assets/icon_down.png" alt=""></div><!-- 新建链接成功动画 -->
    <HeaderTry ref="mychild"></HeaderTry>
    <div class="view_wrap">
      <div class="left_menu">
        <ul>
          <li>
            <a href="javascript:;" @click="openGoReg"><i class="file"></i>文件</a>
          </li>
          <li>
            <a href="javascript:;" @click="openGoReg"><i class="album"></i>相册</a>
          </li>
          <li class="hover">
            <a href="javascript:;" ><i class="offline"></i>云下载</a>
          </li>
          <li>
            <a href="javascript:;" @click="openGoReg"><i class="music"></i>我听</a>
          </li>
          <li>
            <a href="javascript:;" @click="openGoReg"><i class="contact"></i>通讯录</a>
          </li>
        </ul>
      </div>
      <div class="view_box1">
        <div class="view_box2">
          <div class="pan_top">
            <a href="javascript:;" class="btn_pan" @click="openBT"><span class="pico_uploadBT"></span>磁力链接</a>
            <a href="javascript:;" class="btn_pan" @click="openGoReg"><span class="pico_new"></span>新建文件夹</a>
            <a href="javascript:;" @click="testTask">新建链接成功动画 </a>
            
            <a href="javascript:;" class="fr btn_pan" @click=""><span class="pico_task "></span>传输任务(0)</a><!--  -->
          </div><!-- pan头部 -->
          <div class="pan_head">
            <div class="fl">
              <el-checkbox v-model="checked" class="fl" @change="checkAll"></el-checkbox>
              <a href="javascript:;" @click="back" v-if="fileTitle.length>0" class="fl ico_return" title="返回上一级"></a>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><a href="javascript:;"><span class="fd pointer">云下载</span></a></el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="fr">
              <div class="fl pan_search">
                <input type="button" class="sear_btn" @click.prevent="openGoReg" />
                <input type="text"  @keyup.enter.prevent="openGoReg" class="sear_text" placeholder="请输入文件（夹）名" />
              </div><!-- 搜索 -->
              <el-popover placement="bottom" trigger="hover">
                <div class="progredd_box">
                  <p class="pad6">云下载容量<span class="fr f13"><span class="blue">10GB</span>/50GB</span></p>
                  <div class="progredd_bar" :title="0+'%'">
                    <div :style="{'width':0+'%'}"></div>
                  </div>
                </div>
                <a href="javascript:;" @click.prevent="openGoReg" target="_blank" slot="reference" title="扩容网盘" class="fl ico_expand mr10 mf10"></a>
              </el-popover><!-- 扩容网盘 -->
              <a href="javascript:;" @click="switchDisplay"  @click.prevent="openGoReg"  v-if="display==1" title="缩略图" class="fl ico_lists"></a>
              <a href="javascript:;" @click="switchDisplay"  @click.prevent="openGoReg"  v-else title="列表" class="fl ico_grids"></a>
            </div>
          </div><!-- pan头部2 -->
          <div class="view_scorll">
            <div class="pan_table">
              <div v-if="display==1">
                <el-table ref="multipleTable" fit stripe highlight-current-row @selection-change="selectionChange"
                  :data="tableList" row-key="id" @row-contextmenu="showMenu" :show-header="false" class="border_none w-table Trhover"
                  style="width: 100%;min-height:440px;" v-loading="loading">
                  <div slot="empty" class="none_warpper" style="height:420px;" v-loading="initLoading">
                    <div class="none_bg" v-if="!initLoading">
                      <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openBT">+文件任务</a></p>
                      <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                    </div>
                  </div>
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="" prop="type" width="60">
                    <template slot-scope="scope">
                      <span>
                        <a href="javascript:;"  v-if="scope.row.play"><span class="type_yes"></span></a>
                        <a href="javascript:;" v-else><span class="type_yes add_yes"></span></a>
                      </span>
                    </template>
                  </el-table-column><!-- 图标 -->
                  <el-table-column label="" prop="title">
                    <template slot-scope="scope">
                      <div class="cell" v-if="scope.row.play"><a href="javascript:;"@click="openPlay">{{ scope.row.title }}</a></div>
                      <div class="cell" v-else ><a href="javascript:;" @click="openGoReg2">{{ scope.row.title }}</a></div>
                      <div class="cell"><span class="time gray"></span><span class="time gray">{{new Date().getTime()|timeStamp}}</span></div>
                      <div class="cell">
                        <p class="disn opo_list">
                          <a class="nmove" @click="openGoReg">移动</a>
                          <a class="nremane" @click="openGoReg">重命名</a>
                          <a class="ndown" @click="openGoReg">下载</a>
                          <a class="ndel" @click="openGoReg">删除</a>
                          <a class="ndetail" @click="openGoReg">详细</a> 
                        </p>
                      </div>
                    </template>
                  </el-table-column><!-- 名字 -->
                  <el-table-column label="" prop="">
                    <template slot-scope="scope">
                      <div class="fr" style="margin-right: 5px;" :key="collectionData.id" v-for="collectionData in scope.row.collection">
                        <el-tag size="mini" v-if="collectionData.catalog"><span :title="collectionData.catalog.title">{{collectionData.catalog.title}}</span></el-tag>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="fcr mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-size="15" layout="prev, pager, next"
                    :total="total"></el-pagination>
                </div>
              </div><!-- 表格 -->
              <div v-else>
                <ul class="h_oflow grid_list" style="width: 100%;min-height:440px;position:relative;" v-loading="loading">
                  <div class="none_bg" v-if="tableList==0" style="height:420px;">
                    <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openBT">+文件任务</a></p>
                    <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                  </div>
                  <li v-for="(data,index) in tableList" :key="data.id" @contextmenu.prevent="showMenu(data)">
                    <el-checkbox v-model="data.checked" @change="checkedFileChange(index)"></el-checkbox> 
                    <a href="javascript:;" v-if="data.play"  @click="openPlay"> 
                      <p class="fct"><span class="type_yes"></span></p>
                      <p class="fct mt6 mb10 name">{{data.title}}</p>
                    </a>
                    <a href="javascript:;" v-else @click="openGoReg2" > 
                      <p class="fct"><span class="type_yes add_yes"></span></p>
                      <p class="fct mt6 mb10 name">{{data.title}}</p>
                    </a>
                  </li>
                </ul>
                <div class="fct mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-size="15" layout="prev, pager, next" :total="total"></el-pagination>
                </div>
              </div>
              <!-- 列表 -->
            </div>
    <div class="yun_footer fct" style="padding:30px 0 0">
      <a target="_blank" href="http://yun.bianyue.cn/aboutus/index.html">关于边乐云</a><i>|</i>
      <a target="_blank" href="http://help.bianyue.cn/">帮助中心</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/Agreementuser">服务协议</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/AgreementPrivacy">隐私政策</a><i>|</i>
      <a target="_blank" href="http://vip.bianyue.cn/Agreementcopyright">版权声明</a><i>|</i>
      <a target="_blank" href="http://www.miibeian.gov.cn/" rel="nofollow">闽ICP备16019280号-2</a><br>
      <a target="_blank" href="http://vip.bianyue.cn/PageNotice1">根据国家版权局要求：用户应遵守著作权法，尊重著作权人合法权益，不违法上传、存储并分享他人作品</a><br>
      <a target="_blank" href="http://www.12377.cn" rel="nofollow">暴恐举报中心</a><i>|</i>
      <a target="_blank" href="http://dhsf.bianyue.cn/" rel="nofollow">扫黄打非•2019</a><i>|</i>
      <a>违法和不良信息•儿童色情信息举报电话：0596-2949294</a><i>|</i>
      <a>扫黄打非举报电话：12390</a>
      <div class="yun_footer_list mt4">
        <a target="_blank" href="http://www.12377.cn"><s class="flt_center"></s>中国互联网举报中心</a>
        <a target="_blank" href="http://www.shdf.gov.cn/shdf/channels/740.html"><s class="flt_shdf"></s>中国扫黄打非网</a>
        <a target="_blank" href="http://www.12377.cn/node_548446.htm"><s class="flt_download"></s>网络举报APP下载</a>
        <a target="_blank" href="http://yun.bianyue.cn/jubao/" rel="nofollow"><s class="flt_warn"></s>举报受理和处置管理办法</a>
      </div>
    </div><!-- 底部 -->             
          </div>
          <!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_try_BT" style="display:none;">
      <el-alert title="请遵循服务协议！严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息！" type="warning"></el-alert>
      <div class="fct mt15 mb8"><textarea style="width:550px;" rows="9" v-model="tryData.hash" placeholder="支持输入磁力链或HASH值"></textarea></div>
      <p class="fct" style="padding:20px 0 20px;">
        <el-button type="primary" @click="trySubmit"><span class="pad30_lr f16">添加</span></el-button>
      </p>
    </div>
    <div id="JS_play" class="disn">
        <div id="player" style="width:600px;height:400px;"></div> 
    </div>
    <div id="JS_go_reg" class="disn">
        <div class="go-reg-warpper">
            <h3>你还没注册</h3>
            <p>请注册登录</p> 
            <el-button type="primary" @click="openReg"><span class="pad30_lr f16">立即注册</span></el-button> 
        </div>
    </div>
    <div id="JS_go_reg2" class="disn">
        <div class="go-reg-warpper">
            <h3>你还没注册</h3>
            <p>请先注册</p> 
            <el-button type="primary" @click="openReg"><span class="pad30_lr f16">立即注册</span></el-button> 
        </div>
    </div>
    <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @handleMove="openGoReg"
      @handleSign="openGoReg" @handleRename="openGoReg" @handleJm="openGoReg" @handleDel="openGoReg" class="Rclick"></vue-context-menu>
  </div>
</template> 
<script>
import HeaderTry from "@/components/HeaderTry.vue";
import BT from "@/components/BT";
import "@/assets/pan.css";
import VueContextMenu from "vue-contextmenu";
import Vue from "vue";
Vue.use(VueContextMenu);
export default {
  name: "Mypc",
  metaInfo: {
    title: "边乐云网盘功能体验"
  },
  data() {
    return {
      currentPage: 1,
      total: 1,
      loading: false,
      initLoading: true,
      checked: false,
      tableList: [
        {
          title: "[体验视频]网盘播放功能体验.mp4",
          play: true
        }
      ],
      checkedList: [],
      sortable: null,
      oldList: [],
      newList: [],
      isAlert: false,
      addForm: {
        addFlieName: ""
      },
      treeData: [],
      topid: 0,
      isAlert: false,
      isAlert: false,
      transferIndex: null,
      fileTitle: [],
      contextMenuId: "",
      contextMenuPass: "",
      contextMenuTitle: "",
      contextMenuData: {
        menuName: "demo",
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            fnHandler: "handleMove",
            icoName: "rmove",
            btnName: "移动"
          },
          {
            fnHandler: "handleSign",
            icoName: "rfav",
            btnName: "标记"
          },
          {
            fnHandler: "handleRename",
            icoName: "rremane",
            btnName: "重命名"
          }, 
          {
            fnHandler: "handleDel",
            icoName: "rdel",
            btnName: "删除"
          }
        ]
      },
      operateType: 1,
      display: 1,
      playInfo: {},
      openFileData: {},
      fileData: {},
      maskList: [],
      maskDetailList: [],
      maskIndex: "",
      inputMaskVisible: "",
      maskData: {
        show: true,
        title: "",
        catalog_id: ""
      },
      experienceId: "",
      tryData: {
        hash: ""
      },
      BTlayer: null
    };
  },
  components: {
    HeaderTry: HeaderTry,
    BT: BT
  },
  methods: {
    //打开注册
    openReg() {
      layer.closeAll();
      this.$refs.mychild.openReg();
    },
    // 打开去注册
    openGoReg() {
      layer.open({
        type: 1,
        anim: 2,
        title: false,
        area: ["402px", ""], //宽高
        content: $("#JS_go_reg")
      });
    },
    openGoReg2() {
      layer.open({
        type: 1,
        anim: 2,
        title: false,
        area: ["402px", ""], //宽高
        content: $("#JS_go_reg2")
      });
    },
    // 右键菜单
    showMenu(row) {
      this.contextMenuId = row.id;
      this.contextMenuPass = row.pass;
      this.contextMenuTitle = row.title; 
      this.transferIndex = 0; // tranfer index to child component
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = {
        x,
        y
      };
    },
    // 打开下载app
    openApp() {
      layer.open({
        type: 1,
        anim: 2,
        title: "下载手机端APP",
        area: ["520px", "420px"], //宽高
        content: $("#JS_down_app")
      });
    },
    // 切换显示方式
    switchDisplay() {
      this.checked = false;
      this.checkedList = [];
      this.tableList.forEach(el => {
        el.checked = false;
      });
      this.display == 1 ? (this.display = 2) : (this.display = 1);
    },
    // 显示方式1选择
    selectionChange(selection) {
      this.checkedList = selection;
      if (selection.length == this.tableList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    // 显示方式2选择
    checkedFileChange(index) {
      this.checkedList = [];
      this.checked = true;
      this.tableList.forEach(el => {
        if (!el.checked) {
          this.checked = false;
        } else {
          this.checkedList.push(el);
        }
      });
    },
    // 全选
    checkAll() {
      if (this.display == 1) {
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.checkedList = [];
        this.tableList.forEach(el => {
          el.checked = this.checked;
        });
        if (this.checked) {
          this.tableList.forEach(el => {
            this.checkedList.push(el);
          });
        }
      }
    },
    //打开播放
    openPlay() {
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        area: ["600px", ""], //宽高
        content: $("#JS_play")
      });
    },
    // 打开BT
    openBT() {
      this.tryData.hash = "";
      this.BTlayer = layer.open({
        type: 1, 
        anim: 1,
        title: "新建链接任务", 
        area: ["600px", "415px"], //宽高
        content: $("#JS_try_BT")
      });
    },
    //添加hash
    trySubmit() {
      if (!this.tryData.hash) {
        layer.msg("请添加任务链接!", {
          icon: 2
        });
        return false;
      }
      $.ajax({
        type: "POST",
        url: "http://api2.bianyue.cn/web/lixian/queryHash",
        data: {
          hash: this.tryData.hash
        },
        success: data => {
          if (data.code == 200) {
            this.tableList.push(data.data);
            layer.close(this.BTlayer);
          } else {
            layer.msg(data.msg, {
              icon: 2
            });
          }
        }
      });
    },
    // 体验
    experience() {
      $.ajax({
        type: "POST",
        url: "//api2.bianyue.cn/api_phpcms/get_vip_experience?type=1",
        data: {
          bt_play_hash: this.experienceId
        },
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          if (data.code == 200) {
            layer.msg("该链接任务已免费赠送", {
              icon: 1
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            layer.msg(data.msg, {
              icon: 2
            });
          }
        }
      });
    },
    //新建链接成功动画
    testTask() {
      $('.boot_animation').fadeIn('slow').addClass('boot_animation2');
      setTimeout(function () {
          $('.boot_animation').hide()
      }, 2000);
    },
  },
  mounted() {  
    var videoObject = {
      container: "#player", //容器的ID或className
      variable: "player", //播放函数名称
      autoplay: true,
      poster: "",
      video:
        "https://cdn03.bianyue.cn/huluwa/huluwa.m3u8"
    };
    var player = new ckplayer(videoObject);
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?d3137256b95731465744f5e001a45bcf";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    $.cookie("sourceHost2", document.referrer, {
      domain: "bianyue.cn",
      expires: 30,
      path: "/"
    });
    setTimeout(() => {
      this.openBT();
    }, 800);
  },
  created() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*-- 引导框 --*/
.boot_box { display:none; position:absolute; z-index:99999; top:0; left:0; width:100%; min-width:1350px; height:100%; background:url(../assets/bg_tip2.png); background-size:cover; }
.boot_box .one { width:660px; height:530px; background:url(../assets/bg_tip.png); }
.boot_box .two { position:absolute; top:50%; left:50%; width:620px; height:430px; margin-left:-310px; margin-top:-215px; background:url(../assets/bg_tip.png) 0 -540px; }
.boot_box .three { position:absolute; top:0; right:0; width:750px; height:970px; background:url(../assets/bg_tip.png) -660px 0; }
.boot_box .btn_know { position:absolute; top:50%; left:50%; width:180px; height:100px; margin-left:-90px; margin-top:250px; background:url(../assets/bg_tip.png) -1410px 0; cursor:pointer; }
/*-- 新建链接成功动画 --*/
.boot_animation {display: none; position:absolute; top:50%; right:50%; z-index:999; width:45px;height:33px; transition:all .8s ease-in-out; }
.boot_animation img { width:100%; }
.boot_animation2 { top:126px; right:100px; width:34px; height:25px; transition:all .8s ease-in-out; }

.input-new-tag input {
  padding-top: 20px;
  padding-bottom: 20px;
}

.mask-item {
  cursor: pointer;
}

.mask-item:hover {
  background-color: #ecf5ff;
}

.mask-item.active {
  background-color: #a8cbf7;
  color: #fff;
}

.mark_tip_pop {
  min-width: auto;
  padding: 0;
}

.mark_tip_pop .popper__arrow {
  display: none;
}
 

.w-table .el-table-column--selection .cell {
  padding-left: 20px;
}

.w-table .sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #0688ff !important;
}

.vue-contextmenu-listWrapper {
  border: 1px solid #ebeef5;
  border-radius: 5px;
}

.vue-contextmenu-listWrapper li {
  width: 100px !important;
}

.vue-contextmenu-listWrapper button {
  text-align: center !important;
  width: 100px !important;
  background: #fff !important;
  color: #666 !important;
}

.vue-contextmenu-listWrapper button i {
  display: none;
}

.vue-contextmenu-listWrapper button span {
  float: none !important;
}

.vue-contextmenu-listWrapper .context-menu-list button:hover {
  background: #409eff !important;
  color: #fff !important;
}

.icon-video {
  width: 64px;
  height: 64px;
  display: block;
  background: url("../assets/icon_video.svg") no-repeat;
  background-size: cover;
}

.video-title {
  width: 100px;
  overflow: hidden;
  /*超出部分隐藏*/
  white-space: nowrap;
  /*不换行*/
  text-overflow: ellipsis;
  /*超出部分文字以...显示*/
}
.go-reg-warpper {
  padding: 60px 0;
  text-align: center;
  background: #fbfbfb;
  border: 1px solid #edf0f7;
  border-radius: 8px;
}
.go-reg-warpper h3 {
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: #1a2734;
}
.go-reg-warpper p {
  padding-bottom: 20px;
  font-size: 12px;
  line-height: 18px;
  color: #979ca2;
  margin: 10px 0 10px;
}
textarea::placeholder {
  color: #999;
}
.view_wrap .add_yes {
  background: url(../assets/origin.svg) no-repeat;
  background-size: 85% 100%;
}
</style>
