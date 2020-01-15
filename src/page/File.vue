<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="file"></LeftMenu>
      <div class="view_box1">
        <div class="view_box2">
          <div class="pan_top">
            <a href="javascript:;" class="btn_pan" @click="openUpload"><span class="pico_upload"></span>上传文件</a>
           <span @click="openAddFile" > <a href="javascript:;" class="btn_pan" ><span class="pico_new"></span>新建文件夹</a></span>

          </div><!-- pan头部 -->
          <div class="pan_head">
            <div class="fl">
              <div v-if="!filterData.show">
                <el-checkbox v-model="checked" class="fl JS_checked" @change="checkAll"></el-checkbox>
                <a href="javascript:;" @click="back" v-if="fileTitle.length>0" class="fl ico_return" title="返回上一级"></a>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item><a href="javascript:;" @click="getFile(1,0)"><span
                        class="fd pointer">文件</span></a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item v-for="data in fileTitle" :key="data.id"><a href="javascript:;"
                      @click="getFile(1,data.id)"><span class="fn pointer">{{data.title}}</span></a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div v-else>
                <el-checkbox v-model="checked" class="fl JS_checked" @change="checkAll"></el-checkbox>
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
                  <p class="pad6" v-if="fileData.allsize">文件容量<span class="fr f13"><span
                        class="blue">{{fileData.userallsize}}</span>/{{fileData.allsize}}</span></p>
                  <div class="progredd_bar" :title="fileData.baifenbi+'%'">
                    <div :style="{'width':fileData.baifenbi+'%'}"></div>
                  </div>
                </div>
                <a href="http://vip.bianyue.cn/vip/coupon?type=1" target="_blank" slot="reference" title="扩容网盘"
                  class="fl ico_expand mr10 mf10"></a>
              </el-popover><!-- 扩容网盘 -->
              <a href="javascript:;" @click="switchDisplay" v-if="display==1" title="缩略图" class="fl ico_lists"></a>
              <a href="javascript:;" @click="switchDisplay" v-else title="列表" class="fl ico_grids"></a>
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
                  <p class="mt15">文件筛选</p>
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
                    @click="changeFilter(2,'en','加密')"><span class="tan_jiami"></span>加密</a>
                  <div class="clear0"></div>
                </div>
                <a slot="reference" title="筛选" class="fl ico_dots mf10 pointer"></a>
              </el-popover><!-- 筛选 -->
            </div>
            <div class="opo_bar" v-if="batchData.show">
              <span class="fl fd mr10 pr6 f16">批量管理</span>
              <p class="fl mr10 opo_list">
                <a href="javascript:;" class="nmove" @click="openTreeTable(2)">移动</a>
                <a href="javascript:;" class="ndel" @click="openDelFile(2)">删除</a>
              </p>
              <el-button size="mini" @click="cancelChecked">取消</el-button>
              <p class="fr gray">选中{{batchData.file}}个文件，{{batchData.fold}}个文件夹</p>
            </div><!-- 批量操作 -->
          </div><!-- pan头部2 -->
          <div class="view_scorll">
            <div class="pan_table">
              <div v-if="display==1">
                <el-table ref="multipleTable" @cell-mouse-enter="hoverTr" fit stripe highlight-current-row
                  @selection-change="selectionChange" :data="tableList" row-key="id" @row-contextmenu="showMenu"
                  :show-header="false" class="border_none w-table Trhover" style="width: 100%;min-height:440px;"
                  v-loading="loading">
                  <div slot="empty" class="none_warpper" style="height:420px;" v-loading="initLoading">
                    <div class="none_bg" v-if="!initLoading">
                      <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openUpload">+文件任务</a></p>
                      <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                    </div>
                  </div>
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="" prop="type" width="60">
                    <template slot-scope="scope">
                      <div v-if="scope.row.type=='dir'">
                        <a v-if="scope.row.pass" href="javascript:;" @click="openFile(scope.row)"><span
                            class="type_folder_pass"></span></a>
                        <a v-else href="javascript:;" @click="openFile(scope.row)"><span class="type_folder"></span></a>
                      </div>
                      <div v-else>
                        <a v-if="scope.row.pass" @click="openFile2(scope.row,2)" href="javascript:;"><span
                            class="type_txt_pass"></span></a>
                        <a v-else href="javascript:;" @click="openFile2(scope.row,2)"><span class="JS_type_class"
                            :type="scope.row.type"></span></a>
                      </div>
                    </template>
                  </el-table-column><!-- 图标 -->
                  <el-table-column label="" prop="title">
                    <template slot-scope="scope">
                      <div class="cell"> <a href="javascript:;" v-if="scope.row.type=='dir'"
                          @click="openFile(scope.row)">  {{scope.row.title }}</a><a href="javascript:;" v-else
                          @click="openFile2(scope.row,2)">{{ scope.row.title }}</a> <a href="javascript:;" @click="maskSubmit(scope.row)" :class="{'star_biao':true,'active':scope.row.collection.length>0?true:false}"></a></div>
                        
                      <div class="cell"><span
                          class="time gray">{{scope.row.time*1000|timeStamp}}&emsp;</span><span class="time gray"
                          v-if="scope.row.size">{{scope.row.size|formatBytes}}</span> </div>
                      <div class="cell">
                        <p class="disn opo_list">
                          <a class="nmove" @click.prevent="openTreeTable">移动</a>
                          <a class="nremane" @click.prevent="openEditFile">重命名</a>
                          <a class="nremove" v-if="scope.row.collection.length>0" @click.prevent="maskSubmit(scope.row)">取消星标</a>
                          <a class="nfav" v-else @click.prevent="maskSubmit(scope.row)">星标</a>
                          <a v-if="scope.row.type!=='dir'" class="ndown" @click.prevent="download(scope.row)">下载</a>
                          <a class="ndel" @click.prevent="openDelFile">删除</a>
                          <a class="ndetail" @click.prevent="openDetail">详细</a>
                          <a class="nencrypt" @click.prevent="openPassFile">{{scope.row.pass?'解密':'加密'}}</a>
                        </p>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="fcr mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-sizes="[20,30,40,50]" :page-size="40"
                    layout="sizes, prev, pager, next" @current-change="getFile" @size-change="sizeChange"
                    :total="total"></el-pagination>
                </div>
              </div><!-- 表格 -->
              <div v-else>
                <ul class="h_oflow grid_list border_b" style="width: 100%;min-height:440px;position:relative;"
                  v-loading="loading">
                  <div class="none_bg" v-if="tableList==0" style="height:420px;">
                    <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openUpload">+文件任务</a></p>
                    <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                  </div>
                  <li v-for="(data,index) in tableList" :key="data.id" @contextmenu.prevent="showMenu(data)">
                    <el-checkbox v-model="data.checked" @change="checkedFileChange(index)"></el-checkbox>
                    <span v-if="data.type=='dir'">
                      <a href="javascript:;" v-if="data.pass" @click="openFile(data)">
                        <p class="fct"><span class="type_folder_pass"></span></p>
                        <p class="fct mt6 mb10 name"><a href="javascript:;" @click.stop="maskSubmit(data)" :class="{'star_biao':true,'active':data.collection.length>0?true:false}"></a>&nbsp;{{data.title}}</p>
                        <p class="gray">{{data.time*1000|timeStamp}}</p>
                        <p class="gray">{{data.size|formatBytes}}</p>
                      </a>
                      <a href="javascript:;" v-else @click="openFile(data)">
                        <p class="fct"><span class="type_folder"></span></p>
                        <p class="fct mt6 mb10 name"><a href="javascript:;" @click.stop="maskSubmit(data)" :class="{'star_biao':true,'active':data.collection.length>0?true:false}"></a>&nbsp;{{data.title}}</p>
                        
                        <p class="gray">{{data.time*1000|timeStamp}}</p>
                        <p class="gray">{{data.size|formatBytes}}</p>
                      </a>
                    </span>
                    <span v-else>
                      <a href="javascript:;" v-if="data.pass" @click="openFile2(data,2)">
                        <p class="fct"><span class="type_txt_pass"></span></p>
                        <p class="fct mt6 mb10 name"><a href="javascript:;" @click.stop="maskSubmit(data)" :class="{'star_biao':true,'active':data.collection.length>0?true:false}"></a>&nbsp;{{data.title}}</p>
                        
                        <p class="gray">{{data.time*1000|timeStamp}}</p>
                        <p class="gray">{{data.size|formatBytes}}</p>
                      </a>
                      <a href="javascript:;" v-else @click="openFile2(data,2)">
                        <p class="fct">
                          <span class="JS_type_class" :type="data.type"></span>
                        </p>
                        <p class="fct mt6 mb10 name"><a href="javascript:;" @click.stop="maskSubmit(data)" :class="{'star_biao':true,'active':data.collection.length>0?true:false}"></a>&nbsp;{{data.title}}</p>
                        
                        <p class="gray">{{data.time*1000|timeStamp}}</p>
                        <p class="gray">{{data.size|formatBytes}}</p>
                      </a>
                    </span>
                  </li>
                </ul>
                <div class="fcr mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-sizes="[20,30,40,50]" :page-size="40"
                    layout="sizes, prev, pager, next" @current-change="getFile" :total="total"
                    @size-change="sizeChange"></el-pagination>
                </div>
              </div>
              <!-- 列表 -->
            </div>
          </div><!-- 滚动部分 -->
        </div>
      </div>
    </div>
    <div id="JS_tree_table" class="disn">
      <Tree :data="treeData" :id="contextMenuId" treeType="file" :checkedList="checkedList" @cancel="cancel"
        @success="success" v-if="isAlert"></Tree>
      <div style="height:435px;" v-else></div>
    </div>
    <div id="JS_add_file" class="disn">
      <AddFile v-if="isAlert" :topid="topid" type="file" @cancel="cancel" @success="success"></AddFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_edit_file" class="disn">
      <EditFile v-if="isAlert" :id="contextMenuId" :title="contextMenuTitle" @cancel="cancel" @success="success"
        type="file"></EditFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_pass_file" class="disn">
      <Security v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" @cancel="cancel" @success="success">
      </Security>
      <div style="height:292px;" v-else></div>
    </div>
    <div id="JS_pass_file2" class="disn">
      <PassFile v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" @cancel="cancel" @success="success">
      </PassFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_pass_file3" class="disn">
      <PassFile3 v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" :url="contextMenuDownUrl" @cancel="cancel"
        @success="success"></PassFile3>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_upload" class="disn">
      <Upload v-if="isAlert" :topid="topid" :data="tableList" @cancel="cancel" @success="success"></Upload>
      <div style="height:418px;" v-else></div>
    </div>
    <div id="JS_detail" class="disn">
      <Detail v-if="isAlert" :data="contextMenuData.data" @go="detailGo" :fileTitle="fileTitle" type="file"
        @cancel="cancel" @success="success"></Detail>
      <div style="height:323px;" v-else></div>
    </div>
    <div id="JS_del_file" class="disn">
      <el-form v-if="isAlert" class="pad22">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">确认删除所选文件？</p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="delSubmit">确认</el-button>
        </p>
      </el-form>
      <div style="height:276px;" v-else></div>
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

    <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @handleMove="openTreeTable"
      @handleRename="openEditFile" @handleJm="openPassFile" @handleDel="openDelFile" @handleMask="maskSubmit"
      class="Rclick">
    </vue-context-menu>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import AddFile from "@/components/AddFile";
import EditFile from "@/components/EditFile";
import PassFile from "@/components/PassFile";
import PassFile3 from "@/components/PassFile3";
import Security from "@/components/Security";
import Tree from "@/components/Tree";
import Upload from "@/components/Upload";
import Detail from "@/components/Detail";
import api from "@/api/index";
import "@/assets/pan.css";
// mount with global
import VueContextMenu from "vue-contextmenu";
import Vue from "vue";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
Vue.use(VueContextMenu);
export default {
  name: "file",
  metaInfo: {
    title: "文件_边乐云"
  },
  data() {
    return {
      /*******分页**********/
      currentPage: 1,
      total: 1,
      pageSize: 40,
      loading: false,
      initLoading: true,
      checked: false,
      tableList: [],
      /*******标记**********/
      maskList: [],
      maskIndex: "",
      maskAddShow: true,
      maskAddVlaue: "",
      checkedList: [],
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
      contextMenuDownUrl: "",
      contextMenuData: {
        menuName: "file",
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
            fnHandler: "handleJm",
            icoName: "rencrypt",
            btnName: "加密"
          },
          {
            fnHandler: "handleMask",
            icoName: "rfav",
            btnName: "星标"
          },
          {
            fnHandler: "handleDel",
            icoName: "rdel",
            btnName: "删除"
          }
        ],
        data: {}
      },
      display: 1,
      fileData: {},
      previewRow: {},
      batchData: {
        show: false,
        file: 0,
        fold: 0
      },
      operateType: 1,
      searchValue: "",
      isPreview: true,
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
    AddFile: AddFile,
    EditFile: EditFile,
    PassFile: PassFile,
    Security: Security,
    Upload: Upload,
    PassFile3: PassFile3,
    Detail: Detail
  },
  methods: {
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
      this.getFile(1, this.topid);
    },
    changeFilter2(filter) {
      if (filter == 1) {
        this.filterData.f_pass = "";
        this.getFile(1, this.topid);
        return false;
      }
      if (
        this.filterData.f_pass == filter &&
        this.filterData.f_type !== "en" &&
        this.filterData.f_type !== "de"
      ) {
        this.filterData.f_pass = "";
        this.getFile(1, this.topid);
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
      this.getFile(1, this.topid);
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
      this.getFile(1, this.topid);
    },
    // 打开文件
    openFile(row) {
      if (row.pass) {
        this.isAlert = true;
        this.contextMenuPass = row.pass;
        this.contextMenuId = row.id;
        layer.open({
          type: 1,
          title: "访问加密文件",
          anim: 2,
          area: ["380px", ""], //宽高
          content: $("#JS_pass_file2"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      } else {
        this.getFile(1, row.id);
      }
    },
    openFile2(row, type) {
      if (row.pass) {
        this.isAlert = true;
        this.contextMenuPass = row.pass;
        this.contextMenuId = row.id;
        this.contextMenuDownUrl = row.downUrl;
        if (type == 2) {
          this.contextMenuDownUrl = "";
          this.previewRow = row;
        }
        layer.open({
          type: 1,
          title: "访问加密文件",
          anim: 2,
          area: ["380px", ""], //宽高
          content: $("#JS_pass_file3"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      } else {
        this.preview(row);
      }
    },
    // 预览
    preview(row) {
      if (!this.isPreview) {
        return false;
      }
      this.isPreview = false;
      let ResponseContentType = "";
      switch (row.type) {
        case "jpg":
          ResponseContentType = "image/jpeg";
          break;
        case "jpeg":
          ResponseContentType = "image/jpeg";
          break;
        case "js":
          ResponseContentType = "text/javascript";
          break;
        case "css":
          ResponseContentType = "text/css";
          break;
        case "php":
          ResponseContentType = "text/plain";
          break;
        case "png":
          ResponseContentType = "image/png";
          break;
        case "gif":
          ResponseContentType = "image/gif";
          break;
        case "pdf":
          ResponseContentType = "application/pdf";
          break;
        case "txt":
          ResponseContentType = "text/plain";
          break;
        default:
          break;
      }

      if (ResponseContentType) {
        setTimeout(() => {
          this.isPreview = true;
        }, 1500);
        api
          .getFileStream({
            id: row.id,
            filename: row.title,
            ResponseContentDisposition: "filename=" + row.title,
            ResponseContentType: ResponseContentType
          })
          .then(response => {
            if (
              row.type == "pdf" ||
              row.type == "txt" ||
              row.type == "php" ||
              row.type == "css" ||
              row.type == "js"
            ) {
              this.isPreview = true;
              layer.open({
                type: 2,
                title: row.title,
                anim: 2,
                area: ["750px", "650px"], //宽高
                content: response.data.url
              });
            } else {
              let img = new Image();
              img.src = response.data.url;
              img.onload = () => {
                img.width =
                  img.width > $(window).width()
                    ? $(window).width() - 100
                    : img.width;
                img.height =
                  img.height > $(window).height()
                    ? $(window).height() - 100
                    : img.height;
                layer.open({
                  type: 2,
                  title: false,
                  anim: 2,
                  area: [img.width + "px", img.height + "px"], //宽高
                  content: response.data.url
                });
                this.isPreview = true;
              };
            }
          });
      } else {
        layer.msg("暂不支持该格式预览~", {
          icon: 7
        });
        this.isPreview = true;
      }
    },
    // 鼠标移入
    hoverTr(row) {
      this.contextMenuId = row.id;
      this.contextMenuPass = row.pass;
      this.contextMenuTitle = row.title;
      this.contextMenuData.data = row;
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
    // 返回上一级
    back() {
      let length = this.fileTitle.length;
      this.getFile(1, this.fileTitle[length - 1].topid);
    },
    // 请求文件列表
    getFile(page, topid) {
      let f_type = this.filterData.f_type;
      if (f_type == "all" || f_type == "de" || f_type == "en") {
        f_type = "";
      }
      if (topid || topid === 0) {
        this.topid = topid;
      }
      if (this.topid !== 0) {
        this.jump(`/file?topid=${this.topid}`);
      } else {
        this.jump(`/file`);
      }
      this.loading = true;
      api
        .getFile(
          {
            page: page,
            topid: this.topid,
            per_page: this.pageSize,
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
          this.tableList = response.data.list.data || [];
          this.currentPage = response.data.list.current_page;
          this.total = response.data.list.total || 1;
          this.fileTitle = response.data.family_tree_data;
          setTimeout(() => {
            this.typeShow();
          }, 0);
          setTimeout(() => {
            this.initLoading = false;
            this.loading = false;
          }, 500);
        });
    },
    //切换页数
    sizeChange(size) {
      this.pageSize = size;
      this.getFile();
    },
    // 切换显示方式
    switchDisplay() {
      this.checked = false;
      this.checkedList = [];
      this.tableList.forEach(el => {
        el.checked = false;
      });
      this.display == 1 ? (this.display = 2) : (this.display = 1);
      setTimeout(() => {
        this.typeShow();
      }, 0);
      setTimeout(() => {
        this.typeShow();
      }, 100);
    },
    typeShow() {
      $(".JS_type_class").each((index, el) => {
        $(el).addClass("type_" + $(el).attr("type"));
        if ($(el).height() == 0) {
          $(el).addClass("type_unknown");
        }
      });
    },
    // 显示方式1选择
    selectionChange(selection) {
      this.checkedList = selection;
      if (selection.length == this.tableList.length && selection.length !== 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.batch();
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
      this.batch();
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
      this.batch();
    },
    // 批量操作
    batch() {
      this.batchData.file = 0;
      this.batchData.fold = 0;
      this.checkedList.forEach(element => {
        if (element.type == "dir") {
          this.batchData.fold = this.batchData.fold + 1;
        } else {
          this.batchData.file = this.batchData.file + 1;
        }
      });
      this.batchData.show = this.checkedList.length > 1;
    },
    cancelChecked() {
      this.batchData.show = false;
      if (this.checked) {
        $(".JS_checked").trigger("click");
      }
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
          this.isAlert = false;
          this.success({
            type: "updateSize"
          });
        }
      });
    },
    // 打开详细
    openDetail() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "文件详情",
        anim: 2,
        area: ["500px", ""], //宽高
        content: $("#JS_detail"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 打开重命名
    openEditFile() {
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
    openDelFile(type) {
      this.operateType = type || 1;
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
    // 删除文件
    delSubmit() {
      if (this.operateType == 2) {
        let idParams = {};
        this.checkedList.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delFile(idParams).then(response => {
          this.checked = false;
          this.success({
            type: "updateSize"
          });
          layer.msg("删除成功", {
            icon: 1
          });
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
    // 打开加密文件夹
    openPassFile(type) {
      if (type == 2) {
        if (this.checkedList.length !== 1) {
          layer.msg("请选择单个文件加密或解密~", {
            icon: 7
          });
          return false;
        }
        this.contextMenuId = this.checkedList[0].id;
        this.contextMenuPass = this.checkedList[0].pass;
      }
      let title = this.contextMenuPass ? "解密文件" : "加密文件";
      this.isAlert = true;
      layer.open({
        type: 1,
        title: title,
        anim: 2,
        area: ["500px", ""], //宽高
        content: $("#JS_pass_file"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 打开数据树
    openTreeTable(type) {
      let params = {};
      if (type == 2) {
        this.checkedList.forEach((el, index) => {
          params["id[" + index + "]"] = el.id;
        });
      } else {
        params["id[0]"] = this.contextMenuId;
      }
      api.getFileTree(params).then(response => {
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
    // 详细中go
    detailGo(topid) {
      this.isAlert = false;
      layer.closeAll();
      this.getFile(1, topid);
    },
    // 搜索
    search() {
      if (!this.searchValue && this.searchValue !== "0") {
        layer.msg("搜索不能为空~");
      } else {
        this.setStorage("searchVlaue", this.searchValue);
        this.setStorage("searchFrom", "file");
        this.setStorage("searchFromTopid", `${this.topid}`);
        this.jump("/search?type=file");
      }
    },
    // 收藏
    openMaskTo(type) {
      api.getMask().then(response => {
        this.maskList = response.data;
        this.maskIndex = "";
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
      // if (!this.maskIndex) {
      //   layer.msg("请选择收藏夹~", {
      //     icon: 2
      //   });
      //   return false;
      // } 
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
             this.getFile(this.currentPage, this.topid); 
            // this.tableList.forEach((element, index) => { 
            //   if (element.id == this.contextMenuId) { 
            //     this.tableList[index].collection=[]; 
            //   }
            // });
          });
        return false;
      }
      api
        .addToMask({
          resource_type: "file",
          resource_id: this.contextMenuId
        })
        .then(data => {
          layer.msg("星标成功", {
            icon: 1
          });
          this.getFile(this.currentPage, this.topid); 
          // this.tableList.forEach((element, index) => {
          //   if (element.id == this.contextMenuId) {
          //     this.tableList[index].collection.push({
          //       catalog_id: this.userInfo.default_collection_id
          //     });
          //   }
          // });
          // setTimeout(() => {
          //   this.isAlert = false;
          //   layer.closeAll();
          // }, 1500);
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
    // 取消
    cancel() {
      this.isAlert = false;
      layer.closeAll();
    },
    // 成功
    success(param) {
      setTimeout(() => {
        if (param.id && param.type == "nodir") {
          return false;
        }
        this.isAlert = false;
        layer.closeAll();
      }, 1500);
      if (param.newId) {
        this.getFile(1, param.newId);
        return false;
      }
      if (param.id) {
        if (param.type == "nodir") {
          if (!param.url) {
            this.preview(this.previewRow);
            return false;
          }
          layer.open({
            type: 2,
            title: false,
            shadeClose: true,
            shade: 0.8,
            area: ["0", "0"],
            content: param.url
          });
          layer.closeAll();
          return false;
        }
        this.getFile(1, param.id);
      } else if (param.type == "edit") {
        this.getFile(this.currentPage, this.topid);
      } else if (param.type == "updateSize") {
        this.getSize();
        if (this.tableList.length == 1 && this.currentPage > 1) {
          this.getFile(this.currentPage - 1, this.topid);
        } else if (
          this.checkedList.length == this.tableList.length &&
          this.currentPage > 1
        ) {
          this.getFile(this.currentPage - 1, this.topid);
        } else {
          this.getFile(this.currentPage, this.topid);
        }
      } else {
        this.getFile(1, this.topid);
      }
    },
    // 获取容量
    getSize(type) {
      if (this.fileData.allsize && type == 2) {
        return false;
      }
      $.ajax({
        type: "GET",
        url: `http://api.bianyue.cn/box.php?op=file&action=allsize`,
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
    // 右键菜单
    showMenu(row) {
      this.contextMenuId = row.id;
      this.contextMenuPass = row.pass;
      this.contextMenuTitle = row.title;
      this.contextMenuData.menulists[2].btnName = this.contextMenuPass
        ? "解密"
        : "加密";
      this.contextMenuData.menulists[3].btnName =
        row.collection.length > 0 ? "取消星标" : "星标";
      this.contextMenuData.menulists[3].icoName =
        row.collection.length > 0 ? "rremove" : "rfav";
      this.transferIndex = 0; // tranfer index to child component
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = {
        x,
        y
      };
    }
  },
  created() {
    this.topid = this.$router.currentRoute.query.topid || 0;
    this.getFile(1, this.topid);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-new-tag input {
  padding-top: 20px;
  padding-bottom: 20px;
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
</style>
