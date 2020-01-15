<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="photo"></LeftMenu>
      <div class="view_box1">
        <div class="view_box2">
          <div class="pan_top">
            <a href="javascript:;" class="btn_pan" @click="openUpload"><span class="pico_upload"></span><span
                class="txt">上传相册</span>
            </a>
            <span @click="openAddFile"><a href="javascript:;" class="btn_pan"><span class="pico_new"></span><span
                  class="txt">新建文件夹</span></a></span>
          </div><!-- pan头部 -->
          <div class="pan_head">
            <div class="fl"> 
              <div v-if="!filterData.show">
                <a href="javascript:;" @click="back" v-if="fileTitle.length>0" class="fl ico_return" title="返回上一级"></a>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item><a href="javascript:;" @click="getPhoto(1,0)"><span
                        class="fd pointer">相册</span></a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item v-for="data in fileTitle" :key="data.id"><a href="javascript:;"
                      @click="getPhoto(1,data.id)"><span class="fn pointer">{{data.title}}</span></a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div v-else> 
                <a href="javascript:;" @click="filterBack" class="fl ico_return" title="退出筛选"></a>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item> 
                    <a class="btn_tan2"><span class="fd pointer"  @click="changeFilter2(1)">{{filterData.title}}</span></a>
                    <a style="cursor: pointer" @click="changeFilter2('en')" :class="{btn_tan2:true,fn:true,pointer:true,hover:filterData.f_pass=='en'}"><span
                        class="tan_jiami2"></span>加密</a>
                    <a style="cursor: pointer" @click="changeFilter2('de')" :class="{btn_tan2:true,pointer:true,hover:filterData.f_pass=='de'}"><span
                        class="tan_nojiami2"></span>不加密</a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div class="fr">
              <div class="fl pan_search">
                <input type="button" class="sear_btn" @click.prevent="search" />
                <input type="text" class="sear_text" v-model="searchValue" @keyup.enter.prevent="search"
                  placeholder="请输入文件（夹）名" />
                <a href="javascript:;" v-if="searchValue" @click="searchValue=''" class="sear_clear">清空</a>
              </div><!-- 搜索 -->
              <el-popover placement="bottom" trigger="hover" @show="getSize(2)">
                <div class="progredd_box">
                  <p class="pad6" v-if="fileData.allsize">相册容量<span class="fr f13"><span
                        class="blue">{{fileData.userallsize}}</span>/{{fileData.allsize}}</span></p>
                  <div class="progredd_bar" :title="fileData.baifenbi+'%'">
                    <div :style="{'width':fileData.baifenbi+'%'}"></div>
                  </div>
                </div>
                <a href="http://vip.bianyue.cn/vip/coupon?type=1" target="_blank" slot="reference" title="扩容网盘"
                  class="fl ico_expand mr10 mf10"></a>
              </el-popover><!-- 扩容网盘 -->
              <a href="javascript:;" style="visibility: hidden;" title="缩略图" class="fl ico_lists"></a>
              <el-popover placement="bottom" trigger="hover">
                <div class="tan_popup">
                  <p>文件排序</p>
                  <div class="mt15 box">
                    <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_time=='new'}"
                      @click="changeFilter(1,'new')">最新</a>
                    <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_time=='old'}"
                      @click="changeFilter(1,'old')">最早</a>
                    <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_size=='max'}"
                      @click="changeFilter(1,'max')">最大</a>
                    <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_size=='min'}"
                      @click="changeFilter(1,'min')">最小</a>
                  </div>
                  <!-- <p class="mt15">文件筛选</p>
                  <div class="clear2"></div>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='all'}"
                    @click="changeFilter(2,'all')"><span class="tan_all"></span>全部</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='video'}"
                    @click="changeFilter(2,'video','视频')"><span class="tan_play"></span>视频</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='document'}"
                    @click="changeFilter(2,'document','文档')"><span class="tan_file"></span>文档</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='music'}"
                    @click="changeFilter(2,'music','音频')"><span class="tan_audio"></span>音频</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='image'}"
                    @click="changeFilter(2,'image','图片')"><span class="tan_pic"></span>图片</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='com'}"
                    @click="changeFilter(2,'com','压缩包')"><span class="tan_rar"></span>压缩包</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='de'}"
                    @click="changeFilter(2,'de','不加密')"><span class="tan_nojiami"></span>不加密</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='en'}"
                    @click="changeFilter(2,'en','加密')"><span class="tan_jiami"></span>加密</a> -->
                  <div class="clear0"></div>
                </div>
                <a slot="reference" title="筛选" class="fl ico_dots mf10 pointer"></a>
              </el-popover><!-- 筛选 -->
            </div>
          </div><!-- pan头部2 -->
          <div class="view_scorll">
            <div class="pan_table" style="min-height:440px;" v-loading="loading">
              <div class="none_bg" v-if="tableList==0&&!initLoading" style="height:420px;">
                <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openUpload">+文件任务</a></p>
                <el-button type="primary" @click="openApp">下载手机端APP</el-button>
              </div>
              <div v-else>
                <div class="waterfull clearfix" id="waterfull" v-if="isWaterFull">
                  <ul>
                    <li class="item animate-box" v-for="(data, index) in tableList" :key="index"
                      @contextmenu="showMenu(data)">
                      <div class="rel">
                        <a v-if="data.type!=='dir'" class="a-img">
                          <img :src="data.streamUrl" :data-original="data.streamUrl" :alt="data.title"
                            onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'">
                        </a>
                        <a v-else href="javascript:;" @click.prevent="getPhoto(1,data.id)">
                          <div class="img-warpper"></div>
                        </a>
                        <p class="disn fcl white qianm">
                          <span class="fr">{{data.size|formatBytes}}</span>
                          {{data.time*1000|timeStamp}}
                        </p>
                      </div>
                      <p class="description text-over"><a href="javascript:;" @click.stop="maskSubmit(data)" :class="{'star_biao':true,'active':data.collection.length>0?true:false}"></a>&nbsp;{{data.title}}</p>
                      <div class="flex flex_around bar_more">
                        <p v-if="data.streamUrl" @click.prevent="download(data)"><a href="javascript:;"><span
                              class="pdown"></span></a></p>
                        <p><span class="pmark" style="visibility: hidden;"></span></p>
                        <p></p>
                        <p></p>
                        <p><span class="pmore" @click.prevent="showMenu(data)"></span></p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="fcr mt30 mb20" v-if="pageShow">
                  <el-pagination background :current-page="currentPage" :page-size="15" layout="prev, pager, next"
                    @current-change="getPhoto" :total="total"></el-pagination>
                </div>
              </div>
            </div>
          </div>

          <!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_tree_table" class="disn">
      <Tree :data="treeData" :id="contextMenuId" treeType="photo" :checkedList="checkedList" @cancel="cancel"
        @success="success" v-if="isAlert"></Tree>
      <div style="height:435px;" v-else></div>
    </div>
    <div id="JS_add_file" class="disn">
      <AddPhoto v-if="isAlert" :topid="topid" @cancel="cancel" @success="success"></AddPhoto>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_edit_file" class="disn">
      <EditPhoto v-if="isAlert" :id="contextMenuId" :title="contextMenuTitle" @cancel="cancel" @success="success">
      </EditPhoto>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_del_file" class="disn">
      <el-form v-if="isAlert" class="pad22">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">确认删除{{contextMenuTitle}}？</p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="delSubmit">确认</el-button>
        </p>
      </el-form>
      <div style="height:276px;" v-else></div>
    </div>
    <div id="JS_upload" class="disn">
      <Upload v-if="isAlert" :topid="topid" :data="tableList" uploadType="image" @cancel="cancel" @success="success">
      </Upload>
      <div style="height:418px;" v-else></div>
    </div>
    <div id="JS_maskTo" class="disn border_t">
      <div class="scrollbar marke_list" v-if="maskList.length>=0" :data="maskList">
        <ul>
          <li v-for="(item, index) in maskList" @click="maskIndex=index+1" :key="index"
            :class="['mask-item',maskIndex==index+1?'active':'']">{{item.title}}（{{item.collection_count}}）</li>
          <li>
            <a href="javascript:;" v-if="maskAddShow" @click="maskAddShow=false;maskAddVlaue=''" class="blue">+新建收藏夹</a>
            <div v-else>
              <el-input size="mini" v-model="maskAddVlaue" @keyup.enter.native="maskAddSubmit"
                style="width:150px;margin-right:20px;" maxlength="20" :clearable="true"></el-input>
              <el-button @click="maskAddShow=true" size="mini">取消</el-button>
              <el-button @click="maskAddSubmit" type="primary" size="mini">确定</el-button>
            </div>
          </li>
        </ul>
      </div>
      <p class="fct" style="padding-bottom: 20px;padding-top: 20px;">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="maskSubmit">确认</el-button>
      </p>
    </div>
    <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @handleMove="handleMove"
      @handleRename="handleRename" @handleMask="maskSubmit" @handleJm="handleJm" class="Rclick" @handleDel="handleDel">
    </vue-context-menu>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import AddPhoto from "@/components/AddPhoto";
import EditPhoto from "@/components/EditPhoto";
import Tree from "@/components/Tree";
import Upload from "@/components/Upload";
import api from "@/api/index";
import "@/assets/pan.css";
import "@/libs/water/magnific-popup.css";
import "@/libs/water/jquery.magnific-popup.min.js";
import "@/libs/water/jquery.waypoints.min.js";
import "@/libs/water/jquery.masonry.min.js";
import "@/libs/water/jQeasing.js";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
// mount with global
import VueContextMenu from "vue-contextmenu";
import Vue from "vue";
Vue.use(VueContextMenu);
export default {
  name: "photo",
  metaInfo: {
    title: "相册_边乐云"
  },
  data() {
    return {
      fileData: {},
      isAlert: false,
      tableList: [],
      loading: false,
      initLoading: true,
      loadingMore: false,
      isWaterFull: false,
      pageShow: false,
      currentPage: 1,
      lastPage: 1,
      total: 0,
      init: true,
      // 右键菜单
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
            fnHandler: "handleRename",
            icoName: "rremane",
            btnName: "重命名"
          },
          {
            fnHandler: "handleMask",
            icoName: "rfav",
            btnName: "收藏"
          },
          {
            fnHandler: "handleDel",
            icoName: "rdel",
            btnName: "删除"
          }
        ]
      },
      transferIndex: null,
      contextMenuId: "",
      contextMenuType: "",
      contextMenuTitle: "",
      contextMenuHref: "",
      checkedList: [],
      treeData: [],
      fileTitle: [],
      searchValue: "",
      // 收藏
      maskList: [],
      maskIndex: "",
      maskAddShow: true,
      maskAddVlaue: "",
      filterData: {
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      }
    };
  },
  components: {
    Header: Header,
    LeftMenu: LeftMenu,
    Tree: Tree,
    AddPhoto: AddPhoto,
    EditPhoto: EditPhoto,
    Upload: Upload
  },
  methods: {
    // 右键菜单
    showMenu(row) {
      this.contextMenuData.data = row;
      this.contextMenuId = row.id;
      this.contextMenuTitle = row.title;
      this.contextMenuType = row.type;
      this.contextMenuHref = row.streamUrl;
      this.contextMenuData.menulists[2].btnName =
        row.collection.length > 0 ? "取消星标" : "星标";
      this.contextMenuData.menulists[2].icoName =
        row.collection.length > 0 ? "rremove" : "rfav";
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
    // 打开文件
    openFile(row) {
      this.getPhoto(1, row.id);
    },
    // 返回上一级
    back() {
      let length = this.fileTitle.length;
      this.getPhoto(1, this.fileTitle[length - 1].topid);
    },
    // 文件排序/筛选
    changeFilter(type, filter, title) {
      if (type == 1) {
        if (filter == "max" || filter == "min") {
          this.filterData.f_time = "";
          this.filterData.f_size = filter;
        } else {
          this.filterData.f_size = "";
          this.filterData.f_time = filter;
        }
      } else if (type == 2) {
        this.filterData.f_pass = "";
        this.filterData.f_type = filter;
        this.filterData.title = title + "筛选";
        if (filter == "de") {
          this.filterData.f_pass = "de";
        } else if (filter == "en") {
          this.filterData.f_pass = "en";
        }
      }
      this.filterData.show = false;
      if (this.filterData.f_type !== "all") {
        this.filterData.show = true;
      }
      this.getPhoto(1, this.topid);
    },
    changeFilter2(filter) {
      if (filter == 1) {
        this.filterData.f_pass = "";
        this.getPhoto(1, this.topid);
        return false;
      }
      if (
        this.filterData.f_pass == filter &&
        this.filterData.f_type !== "en" &&
        this.filterData.f_type !== "de"
      ) {
        this.filterData.f_pass = "";
        this.getPhoto(1, this.topid);
        return false;
      } else if (this.filterData.f_pass == filter) {
        return false;
      }
      this.filterData.f_pass = filter;
      if (this.filterData.f_type == "en") {
        this.filterData.f_type = "de";
        this.filterData.title = "不加密筛选";
      } else if (this.filterData.f_type == "de") {
        this.filterData.f_type = "en";
        this.filterData.title = "加密筛选";
      }
      this.getPhoto(1, this.topid);
    },
    filterBack() {
      this.filterData = {
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      };
      this.getPhoto(1, this.topid);
    },
    // 请求文件列表
    getPhoto(page, topid) {
      let f_type = this.filterData.f_type;
      if (f_type == "all" || f_type == "de" || f_type == "en") {
        f_type = "";
      }
      if (topid || topid === 0) {
        this.topid = topid;
      }
      if (this.topid !== 0) {
        this.jump(`/photo?topid=${this.topid}`);
      } else {
        this.jump(`/photo`);
      }
      this.loading = true;
      this.isWaterFull = false;
      this.pageShow = false;
      api
        .getPhoto(
          {
            page: page,
            topid: this.topid,
            per_page: 15,
            f_time: this.filterData.f_time,
            f_size: this.filterData.f_size,
            f_type: f_type,
            f_pass: this.filterData.f_pass
          },
          {
            failureCallback: () => {
              this.initLoading = false;
              this.loading = false;
            }
          }
        )
        .then(response => {
          this.isWaterFull = true;
          this.tableList = response.data.list.data;
          this.currentPage = response.data.list.current_page;
          this.lastPage = response.data.list.last_page;
          this.total = response.data.list.total || 1;
          this.fileTitle = response.data.family_tree_data;
          this.loadingMore = this.currentPage !== this.lastPage;
          this.$nextTick(() => {
            setTimeout(() => {
              this.waterFall();
              this.loading = false;
              this.initLoading = false;
            }, 200);
          });
        });
    },
    // 打开上传文件
    openUpload() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "上传文件",
        anim: 2,
        area: ["500px", ""], //宽高
        content: $("#JS_upload"),
        cancel: () => {
          this.success({
            type: "updateSize"
          });
        }
      });
    },
    // 重命名
    openEditFile(type) {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "重命名文件",
        anim: 2,
        area: ["380px", ""], //宽高
        content: $("#JS_edit_file"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 打开删除文件
    openDelFile() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        closeBtn: 0,
        area: ["380px", ""], //宽高
        content: $("#JS_del_file"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 批量删除
    batchDel() {
      this.operateType = 2;
      if (this.checkedList.length == 0) {
        layer.msg("请选择删除的文件", {
          icon: 0
        });
        return false;
      }
      this.openDelFile();
    },
    // 删除文件
    delSubmit() {
      if (this.operateType == 2) {
        let idParams = {};
        this.checkedList.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delFile(idParams).then(response => {
          layer.msg(
            "删除成功",
            {
              icon: 1
            },
            () => {
              this.checked = false;
              this.success({
                type: "updateSize"
              });
            }
          );
        });
      } else {
        api
          .delFile({
            "id[0]": this.contextMenuId
          })
          .then(response => {
            this.success({
              type: "updateSize"
            });
            layer.msg("删除成功", {
              icon: 1
            });
          });
      }
    },
    // 打开新建文件夹
    openAddFile() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "新建文件夹",
        anim: 2,
        area: ["380px", ""], //宽高
        content: $("#JS_add_file"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },

    // 打开数据树
    openTreeTable(type) {
      if (type == 2) {
        this.contextMenuId = "";
        if (this.checkedList.length == 0) {
          layer.msg("请选择要移动的文件~", {
            icon: 7
          });
          return false;
        }
      }
      let params = {};
      if (!this.contextMenuId) {
        this.checkedList.forEach((el, index) => {
          params["id[" + index + "]"] = el.id;
        });
      } else {
        params["id[0]"] = this.contextMenuId;
      }
      api.getPhotoTree(params).then(response => {
        this.treeData = response.data;
        this.treeData.unshift({
          type: "dir",
          id: 0,
          title: "根目录"
        });
        this.isAlert = true;
        layer.open({
          type: 1,
          title: "移动到",
          anim: 2,
          area: ["500px", ""], //宽高
          content: $("#JS_tree_table"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      });
    },

    // 取消
    cancel(type) {
      this.isAlert = false;
      layer.closeAll();
    },
    // 成功
    success(param) {
      setTimeout(() => {
        this.isAlert = false;
        layer.closeAll();
      }, 1500);
      if (param.newId) {
        this.getPhoto(1, param.newId);
        return false;
      }
      if (param.type == "edit") {
        this.tableList.forEach(el => {
          if (el.id == param.id) {
            el.title = param.title;
          }
        });
      } else if (param.type == "updateSize") {
        this.getSize();
        if (this.tableList.length == 1 && this.currentPage > 1) {
          this.getPhoto(this.currentPage - 1, this.topid);
        } else {
          this.getPhoto(this.currentPage, this.topid);
        }
      } else {
        this.getPhoto(this.currentPage, this.topid);
      }
    },
    // 获取容量
    getSize(type) {
      if (this.fileData.allsize && type == 2) {
        return false;
      }
      $.ajax({
        type: "GET",
        url: `http://api.bianyue.cn/box.php?op=photo&action=allsize`,
        data: {},
        dataType: "jsonp",
        success: data => {
          if (data.status == 200) {
            this.fileData = data.data;
          } else {
            layer.msg(data.status, {
              icon: 7
            });
          }
        }
      });
    },

    waterFall() {
      let container = $(".waterfull ul");
      let _this = this;
      if (container.find(".item").length == 0) {
        return false;
      }
      _this.init = false;
      container.imagesLoaded(function() {
        container.masonry({
          columnWidth: 320,
          itemSelector: ".item",
          isFitWidth: true, //是否根据浏览器窗口大小自动适应默认false
          isAnimated: true, //是否采用jquery动画进行重拍版
          isRTL: false, //设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
          isResizable: true, //是否自动布局默认true
          animationOptions: {
            duration: 800,
            easing: "easeInOutBack", //如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
            queue: false //是否队列，从一点填充瀑布流
          }
        });

        const gallery = new Viewer(document.getElementById("waterfull"), {});
        _this.pageShow = true;
      });
    },
    // 收藏
    openMaskTo(type) {
      api.getMask().then(response => {
        this.maskList = response.data;
        this.maskIndex = "";
        this.maskAddShow = true;
        this.isAlert = true;
        layer.open({
          type: 1,
          title: "文件收藏",
          anim: 2,
          area: ["400px", "360px"], //宽高
          content: $("#JS_maskTo"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      });
    },
    maskSubmit(myData) {
      if(myData){
        this.contextMenuData.data=myData;
        this.contextMenuId=myData.id;
      }
       if (this.contextMenuData.data.collection.length > 0) {
        api
          .removeMask({
            id: this.contextMenuData.data.collection[0].id
          })
          .then(response => {
            layer.msg("取消星标成功", {
              icon: 1
            });
             this.getPhoto(this.currentPage, this.topid); 
            // this.tableList.forEach((element, index) => { 
            //   if (element.id == this.contextMenuId) { 
            //     this.tableList[index].collection=[]; 
            //   }
            // });
          });
        return false;
      }
      // if (!this.maskIndex) {
      //   layer.msg("请选择收藏夹~", {
      //     icon: 2
      //   });
      //   return false;
      // }
      api
        .addToMask({
          resource_type: "alum",
          alum: "1",
          resource_id: this.contextMenuId,
          // catalog_id: this.maskList[parseInt(this.maskIndex) - 1].id
        })
        .then(data => {
          layer.msg("星标成功", {
            icon: 1
          });
          this.getPhoto(this.currentPage, this.topid); 
        });
    },
    maskAddSubmit() {
      if (!this.maskAddVlaue) {
        layer.msg("新建收藏夹不能为空~");
        return false;
      }
      api
        .addMask({
          title: this.maskAddVlaue
        })
        .then(response => {
          api.getMask().then(response => {
            this.maskAddShow = true;
            this.maskList = response.data;
            this.maskIndex = "";
          });
          layer.msg("创建收藏夹成功", {
            icon: 1
          });
        });
    },
    // 搜索
    search() {
      if (!this.searchValue && this.searchValue !== "0") {
        layer.msg("搜索不能为空~");
      } else {
        this.setStorage("searchVlaue", this.searchValue);
        this.setStorage("searchFrom", "photo");
        this.setStorage("searchFromTopid", `${this.topid}`);
        this.jump("/search?type=photo");
      }
    },
    // 下载
    download(row) {
      api
        .getFileStream({
          id: row.id
        })
        .then(response => {
          let a = document.createElement("a");
          let event = new MouseEvent("click");
          a.download = "";
          a.href = response.data.url;
          a.dispatchEvent(event);
        });
    },
    // 操作
    handleMove() {
      this.openTreeTable();
    },
    handleSign() {
      this.openMaskTo();
    },
    handleRename() {
      this.openEditFile();
    },
    handleJm() {
      this.openPassFile();
    },
    handleDel() {
      this.openDelFile();
    }
  },
  created() {
    this.topid = this.$router.currentRoute.query.topid || 0;
    this.getPhoto(1, this.topid);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.waterfull {
  margin: 0 auto;
}

.waterfull ul li {
  position: relative;
  float: left;
  overflow: hidden;
  margin: 0 6px 10px;
  margin-top: 10px;
  width: 302px;
  padding-bottom: 13px;
  border-radius: 13px;
  background: #fcfcfc;
  text-align: center;
  cursor: pointer;
}

.waterfull ul li div.rel {
  padding: 13px;
}

.waterfull ul li .a-img {
  position: relative;
  display: block;
  max-width: 100%;
}

.waterfull ul li .a-img img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 6px;
}

.waterfull ul li .description {
  padding: 10px 13px;
  color: #484848;
  line-height: 18px;
  text-align: left;
}

.waterfull ul li .qianm {
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 20px;
  height: 28px;
  line-height: 28px;
  padding: 0 13px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.waterfull .img-warpper {
  margin: 0 auto;
  width: 90px;
  height: 90px;
  background: url(http://cdnres.bianyue.cn/lyl/img/type/icon_files39@2x.png)
    no-repeat;
  background-size: 100% 100%;
}

.waterfull ul li:hover .qianm {
  display: block;
}

.waterfull ul li:hover div.rel {
  background: #f7f7f7;
}

.pdown,
.pmark,
.pmore {
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
}

.pdown:before,
.pmark:before,
.pmore:before {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 5px auto;
  background: url(../assets/icon_photo.svg) 0 -30px;
  content: "";
}

.pmark:before {
  background-position: -30px -30px;
}

.pmore:before {
  background-position: -180px 0;
}

.pdown:hover,
.pmark:hover,
.pmore:hover {
  background-color: #e8e8e8;
}

.waterfull ul li:hover .pmark {
  display: block;
}

.waterfull ul li:hover .pdown {
  display: block;
}

.bar_more p {
  width: 33%;
  height: 40px;
}

.waterfull ul li .bar_more p span {
  display: none;
}

.waterfull ul li .bar_more p span.pmore {
  display: block;
}

.waterfull ul li:hover .bar_more p span {
  display: block;
}
</style>
