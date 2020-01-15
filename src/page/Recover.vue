<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="recover"></LeftMenu>
      <div class="view_box1">
        <div class="view_box2">
          <div class="pan_top">
            <a href="javascript:;" class="btn_pan btn_pan_border" @click="back"><span class="pico_back"></span>返回</a>
            <a href="javascript:;" class="btn_pan btn_pan" @click="openClearFile"><span class="pico_empty"></span>清空</i></a>
          </div><!-- pan头部 -->
          <div class="pan_head">
            <div class="fl">
              <el-checkbox v-model="checked" class="fl JS_checked" @change="checkAll"></el-checkbox>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><a href="javascript:;"><span class="fd pointer">回收站</span>（<span
                      class="gray">文件在删除前会显示到期时间，到期回收站将自动永久删除文件。）</span></a></el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="opo_bar" v-if="batchData.show">
              <span class="fl fd mr10 pr6 f16">批量管理</span>
              <p class="fl mr10 opo_list">
                <!-- <a href="javascript:;" class="nmove" @click="returnFile(2)">还原</a> -->
                <a href="javascript:;" class="ndel" @click="openDelFile(2)">删除</a>
              </p>
              <el-button size="mini" @click="cancelChecked">取消</el-button>
              <p class="fr gray">选中{{batchData.file}}个文件，{{batchData.fold}}个文件夹</p>
            </div><!-- 批量操作 -->
          </div><!-- pan头部2 -->
          <div class="view_scorll">
            <div class="pan_table">
              <div>
                <ul class="h_oflow grid_list" style="width: 100%;min-height:440px;position:relative;"
                  v-loading="loading">
                  <div class="none_bg" v-if="!loading&&tableList==0" style="height:420px;">
                    <p class="mb20">暂无数据</p>
                  </div>
                  <li v-for="(data,index) in tableList" :key="data.id" style="height: 150px;">
                    <el-checkbox v-model="data.checked" @change="checkedFileChange(index)"></el-checkbox>
                    <el-popover placement="right" width="400" trigger="hover">
                      <div class="pad22 lineh30">
                        <p><span class="fl">名称：</span><span class="fl" style="width: 300px;">{{data.title}}</span></p>
                        <div class="clear0"></div>
                        <p v-if="data.r_type=='file'">类型：{{data.type=='dir'?'文件夹':data.type}}</p>
                        <p v-else>类型：{{data.type=='1'?'文件夹':'视频'}}</p>
                        <p>到期时间：{{data.delete_at}}</p>
                        <p><a href="javascript:;" class="diin text-over">原位置:</a>
                          <a href="javascript:;" v-if="data.r_type=='file'&&data.alum==1" style="max-width: 100px;"
                            class="diin text-over">相册</a>
                          <a href="javascript:;" v-else-if="data.r_type=='file'" style="max-width: 100px;"
                            class="diin text-over">文件</a>
                          <a href="javascript:;" v-else-if="data.r_type=='pan'" style="max-width: 100px;"
                            class="diin text-over">云下载</a>
                        </p>
                        <p class="fct mt10">
                          <el-button type="primary" size="medium" plain @click="returnFile(1,data)">还原</el-button>
                          <el-button size="medium" type="danger" plain @click="openDelFile(1,data)">删除</el-button>
                        </p>
                      </div>
                      <a href="javascript:;" slot="reference">
                        <p class="fct" v-if="data.type=='dir'||data.type=='1'"><a href="javascript:;"
                            class="type_folder"></a></p>
                        <p class="fct" v-else><a href="javascript:;" class="type_unknown"></a></p>
                        <p class="fct mt6 mb10 name">
                          {{data.title}}
                        </p>
                      </a>
                    </el-popover>
                  </li>
                </ul>
                <div class="fcr mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-sizes="[20,30,40,50]" :page-size="40"
                    layout="sizes, prev, pager, next" @current-change="getList" :total="total"
                    @size-change="sizeChange">
                  </el-pagination>
                </div>
              </div>
              <!-- 列表 -->
            </div>
          </div>
          <!-- 滚动部分 -->
        </div>
      </div>
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
    <div id="JS_clear_file" class="disn">
      <el-form v-if="isAlert" class="pad22">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">确认清空回收站？</p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="clearSubmit">确认</el-button>
        </p>
      </el-form>
      <div style="height:276px;" v-else></div>
    </div>
    <div id="JS_tree_table" class="disn">
      <RTree :data="treeData" :id="treeId" :treeType="treeType"  @cancel="cancel"
        @success="success" v-if="isAlert"></RTree>
      <div style="height:435px;" v-else></div>
    </div>
    <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @handleDel="openDelFile"
      class="Rclick">
    </vue-context-menu>
  </div>
</template>
<script>
  import Header from "@/components/Header.vue";
  import LeftMenu from "@/components/LeftMenu.vue";
  import RTree from "@/components/RTree.vue";
  import api from "@/api/index";
  import "@/assets/pan.css";
  // mount with global
  import VueContextMenu from "vue-contextmenu";
  import Vue from "vue";
  Vue.use(VueContextMenu);
  export default {
    name: "recover",
    metaInfo: {
      title: "回收站_边乐云"
    },
    data() {
      return {
        currentPage: 1,
        total: 1,
        pageSize: 40,
        loading: false,
        checked: false,
        tableList: [],
        checkedList: [],
        isAlert: false,
        transferIndex: null,
        treeData: [],
        treeType:'lixian',
        treeId:'',
        contextMenuData: {
          menuName: "demo",
          axis: {
            x: null,
            y: null
          },
          menulists: [{
              fnHandler: "handleReturn",
              icoName: "rdel",
              btnName: "恢复"
            },
            {
              fnHandler: "handleDel",
              icoName: "rdel",
              btnName: "删除"
            }
          ]
        },
        batchData: {
          show: false,
          file: 0,
          fold: 0
        },
        operateType: 1,
        operateData: {}
      };
    },
    components: {
      Header: Header,
      LeftMenu: LeftMenu,
      RTree:RTree
    },
    methods: {
      back() {
        this.$router.back();
      },
      // 右键菜单
      showMenu(row) { 
        this.transferIndex = 0; // tranfer index to child component
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        this.contextMenuData.axis = {
          x,
          y
        };
      },
      // 请求文件列表
      getList(page) {
        this.loading = true;
        api
          .getRecover({
            page: page,
            per_page: this.pageSize
          }, {
            failureCallback: () => {
              this.loading = false;
            }
          })
          .then(response => {
            this.tableList = response.data.data || [];
            this.currentPage = response.data.current_page;
            this.total = response.data.total || 1;
            this.batch();
            if (
              this.tableList.length == 0 ||
              this.tableList.length !== this.checkedList.length
            ) {
              this.checked = false;
            }
            setTimeout(() => {
              this.loading = false;
            }, 500);
          })
          .catch(error => {
            if (String(error).indexOf("timeout") !== -1) {
              layer.msg("请求超时，请刷新重试！", {
                icon: 2,
                time: 3000
              });
            }
          });
      },
      //切换页数
      sizeChange(size) {
        this.pageSize = size;
        this.getList();
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
      // 批量操作
      batch() {
        this.batchData.show = this.checkedList.length > 1;
      },

      cancelChecked() {
        this.batchData.show = false;
        if (this.checked) {
          $(".JS_checked").trigger("click");
        }
      },
      // 还原
      returnFile(type, data) { 
        let params = {};
        params["id[0]"] =data.id;
        this.treeId=data.id; 
        if (type == 1 && data.r_type == "file"&&data.alum==1) {//相册还原
          this.treeType='photo'; 
          api.getPhotoTree(params).then(response => {
            this.treeData = response.data;
            this.treeData.unshift({
              type: "1",
              id: 0,
              title: "根目录"
            });
            this.isAlert = true;
            layer.open({
              type: 1,
              title: "还原到",
              anim: 2,
              area: ["500px", ""], //宽高
              content: $("#JS_tree_table"),
              cancel: () => {
                this.isAlert = false;
              }
            });
          });
          // api
          //   .huanyuanFileRecover({
          //     "id[0]": data.id
          //   })
          //   .then(response => {
          //     layer.msg("还原成功", {
          //       icon: 1
          //     });
          //     this.success();
          //   });
        }else if(type == 1 && data.r_type == "file"&&data.alum!==1){//文件还原
          this.treeType='file'; 
          api.getFileTree(params).then(response => {
            this.treeData = response.data;
            this.treeData.unshift({
              type: "1",
              id: 0,
              title: "根目录"
            });
            this.isAlert = true;
            layer.open({
              type: 1,
              title: "还原到",
              anim: 2,
              area: ["500px", ""], //宽高
              content: $("#JS_tree_table"),
              cancel: () => {
                this.isAlert = false;
              }
            });
          });
        } else if (type == 1 && data.r_type == "pan") {//云下载还原
          this.treeType='lixian';
          api.getLoadTree(params).then(response => {
            this.treeData = response.data;
            this.treeData.unshift({
              type: "1",
              id: 0,
              title: "根目录"
            });
            this.isAlert = true;
            layer.open({
              type: 1,
              title: "还原到",
              anim: 2,
              area: ["500px", ""], //宽高
              content: $("#JS_tree_table"),
              cancel: () => {
                this.isAlert = false;
              }
            });
          });
          // api
          //   .huanyuanLixianRecover({
          //     "id[0]": data.id
          //   })
          //   .then(response => {
          //     layer.msg("还原成功", {
          //       icon: 1
          //     });
          //     this.success();
          //   });
        } else if (type == 2) {
          let fileIdParams = {};
          let fileArr = [];
          let lixianIdParams = {};
          let lixianArr = [];
          this.checkedList.forEach((el, index) => {
            if (el.r_type == "file") {
              fileArr.push(el);
            } else {
              lixianArr.push(el);
            }
          });
          fileArr.forEach((el, index) => {
            fileIdParams["id[" + index + "]"] = el.id;
          });
          lixianArr.forEach((el, index) => {
            lixianIdParams["id[" + index + "]"] = el.id;
          });
          if (fileIdParams["id[0]"]) {
            api.huanyuanFileRecover(fileIdParams).then(response => {
              layer.msg("还原成功", {
                icon: 1
              });
              this.checkedList = [];
              this.success(2);
            });
          }
          if (lixianIdParams["id[0]"]) {
            api.huanyuanLixianRecover(lixianIdParams).then(response => {
              layer.msg("还原成功", {
                icon: 1
              });
              this.checkedList = [];
              this.success(2);
            });
          }
        }
      },
      openClearFile() {
        this.isAlert = true;
        layer.open({
          type: 1,
          title: false,
          anim: 2,
          closeBtn: 0,
          area: ["380px", ""], //宽高
          content: $("#JS_clear_file"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      },
      clearSubmit() {
        api.clearRecover2().then(() => {
          layer.msg("清空成功", {
            icon: 1
          });
          this.checked = false;
          this.checkedList = [];
          this.success();
        });
      },
      // 打开删除文件
      openDelFile(type, data) {
        this.operateType = type || 1;
        this.operateData = data;
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
        if (this.operateType == 1 && this.operateData.r_type == "file") {
          api
            .clearRecover({
              "fileIds[0]": this.operateData.id
            })
            .then(response => {
              layer.msg("删除成功", {
                icon: 1
              });
              this.success();
            });
        } else if (this.operateType == 1 && this.operateData.r_type == "pan") {
          api
            .clearRecover({
              "panIds[0]": this.operateData.id
            })
            .then(response => {
              layer.msg("删除成功", {
                icon: 1
              });
              this.success();
            });
        } else if (this.operateType == 2) {
          let fileIdParams = {};
          let fileArr = [];
          let lixianArr = [];
          this.checkedList.forEach((el, index) => {
            if (el.r_type == "file") {
              fileArr.push(el);
            } else {
              lixianArr.push(el);
            }
          });
          fileArr.forEach((el, index) => {
            fileIdParams["fileIds[" + index + "]"] = el.id;
          });
          lixianArr.forEach((el, index) => {
            fileIdParams["panIds[" + index + "]"] = el.id;
          });
          api.clearRecover(fileIdParams).then(response => {
            layer.msg("删除成功", {
              icon: 1
            });
            this.checkedList = [];
            this.success(2);
          });
        }
      },
      // 取消
      cancel() {
        this.isAlert = false;
        layer.closeAll();
      },
      // 成功
      success() {
        setTimeout(() => {
          layer.closeAll();
        }, 1500);
        if (this.tableList.length == 1 && this.currentPage > 1) {
          this.getList(this.currentPage - 1);
        } else if (
          this.checkedList.length == this.tableList.length &&
          this.currentPage > 1
        ) {
          this.getList(this.currentPage - 1);
        } else {
          this.getList(this.currentPage);
        }
      }
    },
    created() {
      this.getList();
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
