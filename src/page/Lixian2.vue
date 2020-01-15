<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="lixian"></LeftMenu>
      <div class="view_box1">
        <div class="view_box2">
          <div class="pan_top">
            <a href="javascript:;" class="btn_pan" @click="openBT"><span class="pico_uploadBT"></span>链接任务</a>
            <span @click="openAddLoad" v-if="!yunData.show"><a href="javascript:;" class="btn_pan"><span
                  class="pico_new"></span>新建文件夹</a></span>

            <el-popover placement="bottom" trigger="click" @show="cancel" v-model="showPopup" popper-class="pupup_box">
              <Popup ref="popup" @openBT="openBT" @openApp="openApp" @getLixianNumber="getLixianNumber"
                @openFile="popupOpenFile" @delPopupFile="delPopupFile"></Popup>
              <!-- <div v-else style="width:450px;height:200px;"></div> -->
              <a href="javascript:;" slot="reference" style="overflow:unset;" class="fr btn_pan">
                <el-badge :value="lixianNumber"><span class="pico_task"></span>传输任务</el-badge>
              </a>
            </el-popover>
          </div><!-- pan头部 -->
          <div class="pan_head">
            <div class="fl">
              <div v-if="!filterData.show">
                <el-checkbox v-model="checked" class="fl JS_checked" @change="checkAll"></el-checkbox>
                <a href="javascript:;" @click="back" v-if="fileTitle.length>0" class="fl ico_return" title="返回上一级"></a>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item><a href="javascript:;" @click="getLoad(1,0)"><span class="fd pointer">云下载</span></a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item v-for="data in fileTitle" :key="data.id"><a href="javascript:;"
                      @click="getLoad(1,data.id)"><span class="fn">{{data.title}}</span></a></el-breadcrumb-item>
                    <el-breadcrumb-item  v-if="yunData.show"><a href="javascript:;"><span class="fn">{{yunData.data.title|myTitle}}</span></a></el-breadcrumb-item>   
                </el-breadcrumb>
              </div>
              <div v-else>
                <el-checkbox v-model="checked" class="fl JS_checked" @change="checkAll"></el-checkbox>
                <a href="javascript:;" @click="filterBack" class="fl ico_return" title="退出筛选"></a>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>
                    <a class="btn_tan2"><span class="fd pointer"
                        @click="changeFilter2(1)">{{filterData.title}}</span></a>
                    <a style="cursor: pointer" @click="changeFilter2('en')"
                      :class="{btn_tan2:true,fn:true,pointer:true,hover:filterData.f_pass=='en'}"><span
                        class="tan_jiami2"></span>加密</a>
                    <a style="cursor: pointer" @click="changeFilter2('de')"
                      :class="{btn_tan2:true,pointer:true,hover:filterData.f_pass=='de'}"><span
                        class="tan_nojiami2"></span>不加密</a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </div>
            <div class="fr">
              <div class="fl pan_search">
                <input type="button" class="sear_btn" @click.prevent="search" />
                <input type="text" v-model="searchValue" @keyup.enter.prevent="search" class="sear_text"
                  placeholder="请输入文件（夹）名" />
                <a href="javascript:;" v-if="searchValue" @click="searchValue=''" class="sear_clear">清空</a>
              </div><!-- 搜索 -->
              <el-popover placement="bottom" trigger="hover" @show="getSize(2)">
                <div class="progredd_box">
                  <p class="pad6" v-if="fileData.allsize">云下载容量<span class="fr f13"><span
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
                    <a href="javascript:;" style="visibility: hidden;"
                      :class="{btn_tan:true,hover:filterData.f_size=='max'}">最大</a>
                    <a href="javascript:;" style="visibility: hidden;"
                      :class="{btn_tan:true,hover:filterData.f_size=='min'}">最小</a>
                  </div>
                  <!-- <p class="mt15">文件筛选</p>
                  <div class="clear2"></div>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='all'}"
                    @click="changeFilter(2,'all')"><span class="tan_all"></span>全部</a> -->
                  <!-- <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='video'}"
                    @click="changeFilter(2,'video','视频')"><span class="tan_play"></span>视频</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='document'}"
                    @click="changeFilter(2,'document','文档')"><span class="tan_file"></span>文档</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='music'}"
                    @click="changeFilter(2,'music','音频')"><span class="tan_audio"></span>音频</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='image'}"
                    @click="changeFilter(2,'image','图片')"><span class="tan_pic"></span>图片</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='com'}"
                    @click="changeFilter(2,'com','压缩包')"><span class="tan_rar"></span>压缩包</a> -->
                  <!-- <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='de'}"
                    @click="changeFilter(2,'de','不加密')"><span class="tan_nojiami"></span>不加密</a>
                  <a href="javascript:;" :class="{btn_tan:true,hover:filterData.f_type=='en'}"
                    @click="changeFilter(2,'en','加密')"><span class="tan_jiami"></span>加密</a>-->
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
                      <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openBT">+文件任务</a></p>
                      <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                    </div>
                  </div>
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="" prop="type" width="60">
                    <template slot-scope="scope">
                      <span v-if="scope.row.jindu?scope.row.jindu.status==5:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,2)"></span>
                      <span v-else-if="scope.row.jindu?scope.row.jindu.status==2:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,2)"></span>
                      <span v-else-if="scope.row.jindu?scope.row.jindu.jindu==-1:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,2)"></span>
                      <span v-else-if="scope.row.jindu?scope.row.jindu.jindu==-2:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,3)"></span>
                      <span v-else-if="scope.row.jindu?scope.row.jindu.jindu==-3:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,2)"></span>
                      <span v-else-if="scope.row.jindu?scope.row.jindu.jindu==-4:false&&scope.row.type!==1"
                        class="type_error" @click="openFile2(scope.row,4)"></span>
                      <span v-else-if="scope.row.pass">
                        <a href="javascript:;" v-if="scope.row.type==1" @click="openFile(scope.row)"><span
                            class="type_folder_pass"></span></a> 
                        <a href="javascript:;" v-else-if="yunData.show"
                          @click="openFile2(scope.row)">
                          <span class="type_yes_pass"></span> 
                        </a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu=='100':false"
                          @click="openFile2(scope.row)">
                          <span class="type_folder_pass"></span> 
                        </a>
                        <a href="javascript:;" v-else @click="openFile2(scope.row)"><span
                            class="type_yes_pass"></span></a>
                      </span> 
                      <span v-else>
                        <a href="javascript:;" v-if="scope.row.type==1" @click="openFile(scope.row)"><span
                            class="type_folder"></span></a> 
                        <a href="javascript:;" v-else-if="yunData.show"
                          @click="openFile2(scope.row)"><span class="type_yes"></span></a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu=='100':false"
                          @click="openFile2(scope.row)"><span class="type_folder"></span></a>
                        <a href="javascript:;" v-else @click="openFile2(scope.row)"><span class="type_down"></span></a>
                      </span>
                    </template>
                  </el-table-column><!-- 图标 -->
                  <el-table-column label="" prop="title">
                    <template slot-scope="scope">
                      <div class="cell">
                        <a href="javascript:;" v-if="scope.row.type==1"
                          @click="openFile(scope.row)">{{ scope.row.title}}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.status==5:false"
                          @click="openFile2(scope.row,2)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.status==2:false"
                          @click="openFile2(scope.row,2)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu==-1:false"
                          @click="openFile2(scope.row,2)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu==-2:false"
                          @click="openFile2(scope.row,3)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu==-3:false"
                          @click="openFile2(scope.row,2)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu==-4:false"
                          @click="openFile2(scope.row,4)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else-if="scope.row.jindu?scope.row.jindu.jindu=='100':false"
                          @click="openFile2(scope.row)">{{scope.row.title }}</a>
                        <a href="javascript:;" v-else @click="openFile2(scope.row)">{{ scope.row.title }}</a>
                        <img class="JS_img" v-if="scope.row.experience"
                          src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </div>
                      <div class="cell"><span class="time gray"
                          v-if="scope.row.size">{{scope.row.size?scope.row.size.size:''}}&emsp;</span><span
                          class="time gray">{{scope.row.time*1000|timeStamp}}</span> </div>
                      <div class="cell">
                        <p class="disn opo_list">
                          <a class="nmove" @click.prevent="openTreeTable">移动</a>
                          <a class="nremane" @click.prevent="openEditFile">重命名</a>
                          <a class="nfav" @click.prevent="openMaskTo">收藏</a>
                          <a v-if="scope.row.type=='0'&&userInfo.vip =='2'" class="ndown"
                            @click.prevent="handleLoad()">下载</a>
                          <a class="ndel" @click.prevent="openDelFile">删除</a>
                          <a class="nopen" v-clipboard:copy="'magnet:?xt=urn:btih:'+scope.row.hash" v-clipboard:success="onCopy"  v-clipboard:error="onError">链接</a>
                          <a class="ndetail" @click.prevent="openDetail">详细</a>
                          <a class="nencrypt" @click.prevent="openPassFile">{{scope.row.pass?'解密':'加密'}}</a>
                        </p>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="fcr mt30 mb20">
                  <el-pagination background :current-page="currentPage" :page-sizes="[20,30,40,50]" :page-size="40"
                    layout="sizes, prev, pager, next" @current-change="getLoad" :total="total"
                    @size-change="sizeChange">
                  </el-pagination>
                </div>
              </div><!-- 表格 -->
              <div v-else>
                <ul class="h_oflow grid_list" style="width: 100%;min-height:440px;position:relative;"
                  v-loading="loading">
                  <div class="none_bg" v-if="tableList==0" style="height:420px;">
                    <p class="mb20">点击左上方、单击此处<a href="javascript:;" class="blue" @click="openBT">+文件任务</a></p>
                    <el-button type="primary" @click="openApp">下载手机端APP</el-button>
                  </div>
                  <li v-for="(data,index) in tableList" :key="data.id" @contextmenu.prevent="showMenu(data)">
                    <el-checkbox v-model="data.checked" @change="checkedFileChange(index)"></el-checkbox>
                    <a href="javascript:;" v-if="data.type==1" @click="openFile(data)">
                      <p class="fct" v-if="data.pass"><span class="type_folder_pass"></span></p>
                      <p class="fct" v-else><span class="type_folder"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;"
                      v-else-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false||data.jindu?data.jindu.jindu==-3:false"
                      @click="openFile2(data,2)">
                      <p class="fct"><span class="type_error"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;" v-else-if="data.jindu?data.jindu.jindu==-2:false" @click="openFile2(data,3)">
                      <p class="fct"><span class="type_error"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;" v-else-if="data.jindu?data.jindu.jindu==-4:false" @click="openFile2(data,4)">
                      <p class="fct"><span class="type_error"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;" v-else-if="yunData.show"
                      @click="openFile2(data)">
                      <p class="fct" v-if="data.pass"><span class="type_yes_pass"
                          style="width:40px;height:40px;background-size:cover;"></span></p>
                      <p class="fct" v-else><span class="type_yes"
                          style="width:40px;height:40px;background-size:cover;"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}  
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;" v-else-if="data.jindu?data.jindu.jindu=='100':false"
                      @click="openFile2(data)">
                      <p class="fct" v-if="data.pass"><span class="type_folder_pass" ></span></p>
                      <p class="fct" v-else><span class="type_folder" ></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}}  
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;">
                      </p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                    <a href="javascript:;" v-else @click="openFile2(data)">
                      <p class="fct" v-if="data.pass"><span class="type_yes_pass"></span></p>
                      <p class="fct" v-else><span class="type_down"></span></p>
                      <p class="fct mt6 mb10 name">
                        {{data.title}} 
                        <img class="JS_img" v-if="data.experience" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                          style="position:relative;top:3px;left:8px;width:30px;"></p>
                      <p class="gray">{{data.size?data.size.size:''}}</p>
                      <p class="gray">{{data.time*1000|timeStamp}}</p>
                    </a>
                  </li>
                </ul>
                <div class="fcr mt30 mb20" v-if="!yunData.show">
                  <el-pagination background :current-page="currentPage" :page-sizes="[20,30,40,50]" :page-size="40"
                    layout="sizes, prev, pager, next" @current-change="getLoad" :total="total"
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
    <div id="JS_tree_table" class="disn">
      <Tree :data="treeData" :id="contextMenuId" treeType="lixian" :checkedList="checkedList" @cancel="cancel"
        @success="success" v-if="isAlert"></Tree>
      <div style="height:435px;" v-else></div>
    </div>
    <div id="JS_add_file" class="disn">
      <AddFile v-if="isAlert" :topid="topid" type="lixian" @cancel="cancel" @success="success"></AddFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_edit_file" class="disn">
      <EditFile v-if="isAlert" :id="contextMenuId" type="lixian" :title="contextMenuTitle" @cancel="cancel"
        @success="success"></EditFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_pass_file" class="disn">
      <SecurityLoad v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" @cancel="cancel" @success="success">
      </SecurityLoad>
      <div style="height:292px;" v-else></div>
    </div>
    <div id="JS_pass_file2" class="disn">
      <PassFile v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" @cancel="cancel" @success="success">
      </PassFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_upload" class="disn">
      <Upload v-if="isAlert" :topid="topid" @cancel="cancel" @success="success"></Upload>
      <div style="height:418px;" v-else></div>
    </div>
    <div id="JS_BT" class="disn">
      <BT v-if="isAlert" @success="success" :topid="topid"></BT>
      <div style="height:410px;" v-else></div>
    </div>
    <div id="JS_popup" class="disn">
      <Popup v-if="isAlert" :topid="topid"></Popup>
      <div style="height:520px;" v-else></div>
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
    <div id="JS_play_list" class="disn">
      <div class="meg_list">
        <table>
          <tr v-for="data in playList" :key="data.id" @click="goTo(data.playUrl)" style="cursor:pointer;">
            <td><i class="icon-video" style="margin:0 auto;"></i></td>
            <td>{{data.title}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 升级vip -->
    <div id="JS_vip" class="disn">
      <div class="fct mt30">
        <img src="@/assets/bg_point_experience@1.png" alt="">
        <ul class="fcl m_auto">
          <li class="fl w200 pad22">
            <p class="mb15">普通用户随机赠送1次在线预览特权，该链接任务系统已释放为免费资源</p>
            <el-button type="primary" class="w200" @click="experience">免费体验</el-button>
          </li>
          <li class="fl w200 pad22">
            <p class="mb15">没有平衡的盈利和支出就没有长久的服务 升级VIP才可享有在线预览特权</p>
            <el-button type="warning" @click="goTo('http://vip.bianyue.cn/vip/index?pay=2')" class="btn_orange w200">
              升级VIP</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div id="JS_vip2" class="disn">
      <div class="fct mt30">
        <img src="@/assets/bg_cardbag_vip_home_point@1.png" alt="">
        <p class="f16">没有平衡的盈利和支出就没有长久的服务</p>
        <p class="f16 mt6 mb20">升级VIP才可享有在线预览特权</p>
        <el-button type="warning" @click="goTo('http://vip.bianyue.cn/vip/index?pay=2')" class="btn_orange w200">
          升级VIP</el-button>
      </div>
    </div>
    <div id="JS_vip3" class="disn">
      <div class="fct mt30">
        <img src="@/assets/bg_vip_expired@1.png" width="300" height="250" alt="">
        <p class="f16 mt20 mb20" id="JS_vip_title"></p>
        <el-button type="warning" @click="goTo('http://vip.bianyue.cn/vip/index?pay=2')" class="btn_orange w200">马上续费
        </el-button>
      </div>
    </div>
    <div id="JS_error" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">{{playErr}}</span>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">取消</el-button>
        <el-button type="primary" class="w100" @click="cancel();delSubmit()">删除</el-button>
      </p>
    </div>
    <div id="JS_error2" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">该链接任务正在离线转码 </span><a style="position:relative;top:2px;left:2px;"
          href="http://help.bianyue.cn/syzn/6.html" target="_blank" class="icon_help2" title="帮助"></a>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">返回</el-button>
        <el-button type="primary" class="w100" @click="cancel();openBT()">继续添加</el-button>
      </p>
    </div>
    <div id="JS_go_bind_phone" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">请先绑定手机后再来领取</span>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">取消</el-button>
        <el-button type="primary" class="w100" @click="goTo('http://vip.bianyue.cn/setting?type=mobile')">去绑定
        </el-button>
      </p>
    </div>
    <div id="JS_detail" class="disn">
      <Detail v-if="isAlert" :data="contextMenuData.data" @go="detailGo" :fileTitle="fileTitle" type="lixian"
        @cancel="cancel" @success="success"></Detail>
      <div style="height:323px;" v-else></div>
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
    <div class="boot_animation"><img src="@/assets/icon_down.png" alt=""></div><!-- 新建链接成功动画 -->
    <vue-context-menu :contextMenuData="contextMenuData" :transferIndex="transferIndex" @handleMove="openTreeTable"
      @handleRename="openEditFile" @handleLoad="handleLoad" @handleMask="openMaskTo" @handleJm="openPassFile"
      @handleDel="openDelFile" class="Rclick">
    </vue-context-menu>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import AddFile from "@/components/AddFile";
import EditFile from "@/components/EditFile";
import PassFile from "@/components/PassFile";
import SecurityLoad from "@/components/SecurityLoad";
import Tree from "@/components/Tree";
import Upload from "@/components/Upload";
import BT from "@/components/BT";
import Popup from "@/components/Popup";
import Detail from "@/components/Detail";
import api from "@/api/index";
import "@/assets/pan.css";
// mount with global
import VueContextMenu from "vue-contextmenu";
import Vue from "vue";
Vue.use(VueContextMenu);
export default {
  name: "Lixian",
  metaInfo: {
    title: "云下载_边乐云"
  },
  data() {
    return {
      currentPage: 1,
      total: 1,
      pageSize: 40,
      loading: false,
      initLoading: true,
      checked: false,
      tableList: [],
      checkedList: [],
      isAlert: false,
      addForm: {
        addFlieName: ""
      },
      treeData: [],
      topid: 0,
      isAlert: false,
      transferIndex: null,
      fileTitle: [],
      contextMenuId: "",
      contextMenuPass: "",
      contextMenuTitle: "",
      contextMenuHash: "",
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
            fnHandler: "handleJm",
            icoName: "rencrypt",
            btnName: "加密"
          },
          {
            fnHandler: "handleLoad",
            icoName: "rdown",
            btnName: "下载"
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
        ],
        menulists2: [
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
            btnName: "收藏"
          },
          {
            fnHandler: "handleDel",
            icoName: "rdel",
            btnName: "删除"
          }
        ],
        data: {}
      },
      operateType: 1,
      display: 1,
      playInfo: {},
      playList: [],
      openFileData: {},
      fileData: {},
      experienceId: "",
      playErr: "",
      playErrList: [
        "该链接任务正离线下载",
        "该链接任务HASH值无效",
        "该链接任务无视频文件",
        "该链接任务被多次举报，已被系统屏蔽"
      ],
      batchData: {
        show: false,
        file: 0,
        fold: 0
      },
      searchValue: "",
      // 收藏
      maskList: [],
      maskIndex: "",
      maskAddShow: true,
      maskAddVlaue: "",

      showPopup: false,
      lixianNumber: 0,

      filterData: {
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      },
      // yunid
      yunData: {
        show: false,
        data: {}
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
    SecurityLoad: SecurityLoad,
    Upload: Upload,
    BT: BT,
    Popup: Popup,
    Detail: Detail
  },
  filters: {
    myTitle(title) {
      var myTitle = title;
      if (title.length > 10) {
        myTitle = myTitle.substring(0, 9) + "...";
      }
      return myTitle;
    }
  },
  methods: {
    // 复制链接
    onCopy() {
      layer.msg("复制成功~", {
        icon: 1,
        time: 2000
      });
    },
    // 复制失败
    onError() {
      layer.msg("复制失败~", {
        icon: 1,
        time: 2000
      });
    },
    // 打开
    goTo(url) {
      window.open(url);
    },
    // 鼠标移入
    hoverTr(row) {
      this.contextMenuId = row.id;
      this.contextMenuPass = row.pass;
      this.contextMenuTitle = row.title;
      this.contextMenuHash = row.hash;
      this.contextMenuData.data = row;
    },
    // 右键菜单
    showMenu(row) {
      this.contextMenuId = row.id;
      this.contextMenuPass = row.pass;
      this.contextMenuTitle = row.title;
      this.contextMenuHash = row.hash;
      if (this.userInfo.vip == "0" || row.type == "1") {
        this.contextMenuData.menulists = this.contextMenuData.menulists2;
      } else {
        this.contextMenuData.menulists = [
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
            fnHandler: "handleLoad",
            icoName: "rdown",
            btnName: "下载"
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
        ];
      }
      this.contextMenuData.menulists[2].btnName = this.contextMenuPass
        ? "解密"
        : "加密";
      this.transferIndex = 0; // tranfer index to child component
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData.axis = {
        x,
        y
      };
    },
    // 详细中go
    detailGo(topid) {
      this.isAlert = false;
      layer.closeAll();
      this.getLoad(1, topid);
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
      this.getLoad(1, this.topid);
    },
    changeFilter2(filter) {
      if (filter == 1) {
        this.filterData.f_pass = "";
        this.getLoad(1, this.topid);
        return false;
      }
      if (
        this.filterData.f_pass == filter &&
        this.filterData.f_type !== "en" &&
        this.filterData.f_type !== "de"
      ) {
        this.filterData.f_pass = "";
        this.getLoad(1, this.topid);
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
      this.getLoad(1, this.topid);
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
      this.getLoad(1, this.topid);
    },
    // 打开文件
    openFile(row) {
      this.openFileData = {};
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
        this.getLoad(1, row.id);
      }
    },
    openFile2(row, type, isPopup) {
      if (type) {
        this.playErr = this.playErrList[type - 1];
        this.contextMenuId = row.id;
        layer.open({
          type: 1,
          anim: 2,
          area: ["450px", "270px"],
          content: $("#JS_error")
        });
        return false;
      }
      this.showPopup = false;
      this.openFileData = {};
      if (row.pass) {
        if (this.yunData.show && !isPopup) {
          this.openFileData = row;
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
              this.openFileData = {};
            }
          });
        } else {
          this.yunData.show = true;
          this.yunData.data = row;
          let arr = [row];
          this.tableList = arr;
        }
      } else {
        if (this.yunData.show && !isPopup) {
          this.openPlayList(row);
        } else {
          this.yunData.show = true;
          this.yunData.data = row;
          let arr = [row];
          this.tableList = arr;
        }
      }
    },
    popupOpenFile(data) {
      let type = null;
      if (data.jindu ? data.jindu.status == 5 : false) {
        type = 2;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.status == 2 : false) {
        type = 2;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.jindu == -1 : false) {
        type = 2;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.jindu == -2 : false) {
        type = 3;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.jindu == -3 : false) {
        type = 2;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.jindu == -4 : false) {
        type = 4;
        this.openFile2(data, type, true);
      } else if (data.jindu ? data.jindu.jindu == 100 : false) {
        this.loading = true;
        api
          .getFamily({
            topid: data.topid
          })
          .then(response => {
            this.fileTitle = response.data.family_tree_data || [];
            this.openFile2(data, type, true);
          });
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        type = 5;
        this.$refs.popup.openLixianZhuanMa();
      }
    },
    delPopupFile(data) {
      this.getLoad(1, this.topid);
    },
    getLixianNumber(data) {
      this.lixianNumber = data;
    },
    // 返回上一级
    back() {
      let length = this.fileTitle.length;
      this.getLoad(1, this.fileTitle[length - 1].topid);
    },
    // 请求文件列表
    getLoad(page, topid) {
      this.yunData.show = false;
      let f_type = this.filterData.f_type;
      if (f_type == "all" || f_type == "de" || f_type == "en") {
        f_type = "";
      }
      if (topid || topid === 0) {
        this.topid = topid;
      }
      if (this.topid !== 0) {
        this.jump(`/lixian?topid=${this.topid}`);
      } else {
        if (this.$router.currentRoute.query.openBT == "true") {
          this.jump(`/lixian?openBT=true`);
          return false;
        }
        this.jump(`/lixian`);
      }
      this.loading = true;
      api
        .getLixianList(
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
            this.initLoading = false;
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
      this.getLoad();
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
        if (element.type == "1") {
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
      }else{
        this.checkedList = [];
        this.tableList.forEach(el => {
         el.checked = false;
        });
      }
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
        }
      });
    },
    // 打开下载弹框
    openLoadPopup() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        area: ["450px", ""], //宽高
        content: $("#JS_popup"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 打开BT
    openBT() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: "新建链接任务",
        anim: 2,
        area: ["600px", ""], //宽高
        content: $("#JS_BT"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 重命名
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
        api.delLoad(idParams).then(response => {
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
          .delLoad({
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
    openAddLoad() {
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
    openPassFile() {
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
    maskSubmit() {
      if (!this.maskIndex) {
        layer.msg("请选择收藏夹~", {
          icon: 2
        });
        return false;
      }
      api
        .addToMask({
          resource_type: "pan",
          resource_id: this.contextMenuId,
          catalog_id: this.maskList[parseInt(this.maskIndex) - 1].id
        })
        .then(data => {
          layer.msg("收藏成功", {
            icon: 1
          });
          setTimeout(() => {
            this.isAlert = false;
            layer.closeAll();
          }, 1500);
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
        this.setStorage("searchFrom", "lixian");
        this.setStorage("searchFromTopid", `${this.topid}`);
        this.jump("/search?type=lixian");
      }
    },

    // 取消
    cancel() {
      this.isAlert = false;
      layer.closeAll();
    },
    // 成功
    success(param) {
      setTimeout(() => {
        if (param.id && this.openFileData.id) {
          return false;
        }
        this.isAlert = false;
        layer.closeAll();
        if (param.bt) {
          this.addTask();
        }
      }, 1500);
      if (param.newId) {
        this.getLoad(1, param.newId);
        return false;
      }
      if (param.id) {
        if (this.openFileData.id) {
          this.openPlayList(this.openFileData);
          return false;
        }
        this.getLoad(1, param.id);
      } else if (param.type == "edit") {
        this.getLoad(this.currentPage, this.topid);
      } else if (param.type == "updateSize") {
        this.getSize();
        if (this.tableList.length == 1 && this.currentPage > 1) {
          this.getLoad(this.currentPage - 1, this.topid);
        } else if (
          this.checkedList.length == this.tableList.length &&
          this.currentPage > 1
        ) {
          this.getLoad(this.currentPage - 1, this.topid);
        } else {
          this.getLoad(this.currentPage, this.topid);
        }
      } else {
        this.getLoad(1, this.topid);
      }
      this.$refs.popup.getLoad();
    },
    //新建链接成功动画
    addTask() {
      let _this = this;
      $(".boot_animation")
        .fadeIn("slow")
        .addClass("boot_animation2");
      setTimeout(function() {
        $(".boot_animation")
          .hide()
          .removeClass("boot_animation2");
      }, 1000);
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
            }, 2000);
          } else {
            if (data.msg == "请先绑定手机后再来领取") {
              layer.open({
                type: 1,
                anim: 2,
                area: ["450px", "270px"],
                content: $("#JS_go_bind_phone")
              });
              return false;
            }
            layer.msg(data.msg, {
              icon: 2
            });
          }
        }
      });
    },
    //百分百的打开播放列表
    openPlayList(data) {
      this.playInfo = data;
      this.loading = true;
      $.ajax({
        type: "GET",
        url: `http://api.bianyue.cn/pan.php?op=init&action=playlist&id=${
          this.playInfo.hash
        }`,
        data: {},
        dataType: "jsonp",
        success: data => {
          this.loading = false;
          if (data.status == 200) {
            if (data.data.length == 1) {
              let url =
                "http://yun.bianyue.cn/old/index.php?m=lixian&c=play&bf=" +
                this.playInfo.fid +
                "|" +
                data.data[0].id +
                "&hash=" +
                this.playInfo.hash;
              this.goTo(url);
              return false;
            }
            this.playList = [];
            data.data.forEach((el, indx) => {
              let id = el.id;
              el.playUrl =
                "http://yun.bianyue.cn/old/index.php?m=lixian&c=play&bf=" +
                this.playInfo.fid +
                "|" +
                id +
                "&hash=" +
                this.playInfo.hash;
              this.playList.push(el);
            });
            this.isAlert = true;
            layer.open({
              type: 1,
              title: "文件列表",
              anim: 2,
              area: ["600px", "520px"], //宽高
              content: $("#JS_play_list"),
              cancel: () => {
                this.isAlert = false;
                layer.closeAll();
              }
            });
          } else if (data.try == "try_allow") {
            this.experienceId = this.playInfo.hash || "";
            layer.open({
              type: 1,
              title: false,
              anim: 2,
              area: ["488px", "460px"], //宽高
              content: $("#JS_vip")
            });
          } else if (
            data.try == "try_forbid_exists" ||
            data.try == "try_end" ||
            data.try == "try_forbid_unsupported"
          ) {
            let myOverTime = this.userInfo.overduedate;
            if (parseInt(myOverTime) > 0) {
              var date = new Date(parseInt(myOverTime) * 1000);
              var y = date.getFullYear() + "年";
              var m =
                date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1) + "月"
                  : date.getMonth() + 1 + "月";
              var d =
                date.getDate() < 10
                  ? "0" + date.getDate() + "日"
                  : date.getDate() + "日";
              $("#JS_vip_title").html("VIP过期时间：" + y + m + d);
              layer.open({
                type: 1,
                title: false,
                anim: 2,
                area: ["450px", "410px"], //宽高
                content: $("#JS_vip3")
              });
              return false;
            }
            layer.open({
              type: 1,
              title: false,
              anim: 2,
              area: ["450px", "410px"], //宽高
              content: $("#JS_vip2")
            });
          } else if (data.status == "该资源正在离线转码") {
            // layer.open({
            //   type: 1,
            //   anim: 2,
            //   area: ["450px", "270px"],
            //   content: $("#JS_error2")
            // });
            this.$refs.popup.openLixianZhuanMa();
          } else {
            layer.msg(data.status, {
              icon: 7
            });
          }
        },
        error: data => {
          this.loading = false;
        }
      });
    },
    //获取容量
    getSize(type) {
      if (this.fileData.allsize && type == 2) {
        return false;
      }
      $.ajax({
        type: "GET",
        url: `http://api.bianyue.cn/pan.php?op=init&action=allsize`,
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
    // 下载
    handleLoad() {
      window.location.href = "magnet:?xt=urn:btih:" + this.contextMenuHash;
    }
  },
  mounted() {
    if (this.$router.currentRoute.query.openBT == "true") {
      this.openBT();
    }
  },
  created() {
    this.topid = this.$router.currentRoute.query.topid || 0;
    this.getLoad(1, this.topid);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.icon-video {
  width: 64px;
  height: 64px;
  display: block;
  background: url("../assets/icon_video.svg") no-repeat;
  background-size: cover;
}

.play_error {
  display: inline-block;
  margin-left: 10px;
  position: relative;
  top: 3px;
}

/*-- 新建链接成功动画 --*/
.boot_animation {
  display: none;
  position: absolute;
  top: 50%;
  right: 50%;
  z-index: 999;
  width: 45px;
  height: 33px;
  transition: all 0.8s ease-in-out;
}

.boot_animation img {
  width: 100%;
}

.boot_animation2 {
  top: 126px;
  right: 100px;
  width: 34px;
  height: 25px;
  transition: all 0.8s ease-in-out;
}
.opo_list .ncopy:before {
  width: 20px;
  height: 28x;
  background: url(../assets/icon_link.svg);
  background-size: 100% 100%;
}
.opo_list .ncopy:hover:before {
  background-position-y: 0;
}
</style>
