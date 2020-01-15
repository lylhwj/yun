<template>
  <div>
    <Header></Header>
    <div class="view_wrap">
      <LeftMenu page="favorites"></LeftMenu>
      <div class="view_box1">
        <div class="view_box2"> 
          <div class="pan_top">
            <p class="flex" style=" height:36px;">
              <!-- <a href="javascript:;" @click="back" class="btn_pan btn_pan_border"><span class="pico_back"></span>收藏夹</a> -->
              <i class="icon_fav"></i><span class="lineh30 f16 gray">星标</span>
            </p>
          </div><!-- pan头部 -->
          <div class="pan_head">
            <!-- <div class="fl">
              <el-checkbox v-model="checked" class="fl" @change="checkAll"></el-checkbox>
            </div> -->
            <!-- <div class="fr">
              <div class="fl pan_search" style="margin-right:88px;">
                <input type="button" class="sear_btn" @click.prevent="submit" />
                <input type="text" v-model="value" class="sear_text" placeholder="请输入文件（夹）名"
                  @keyup.enter.prevent="submit" />
                <a href="javascript:;" v-if="value" @click="value=''" class="sear_clear">清空</a>
              </div>
            </div> -->
          </div><!-- pan头部2 -->
          <div class="view_scorll" style="overflow:visible">
            <div class="pan_table">
              <div class="search_tab search_tab_fav" v-loading="loading">
                <el-tabs v-model="activeName">
                  <!-- 所有 -->
                  <el-tab-pane :label="'所有('+result.total+')'" name="all">
                    <el-table :data="allList" @cell-mouse-enter="hoverTr" stripe
                      class="JS_table scrollbar border_none w-table Trhover" :show-header="false"
                      style="min-height:440px; max-height:600px; overflow:auto;">
                      <div slot="empty" class="none_warpper" v-show="!loading" style="height:420px;">
                        <div class="none_bg">
                          <p class="mb20">{{searchMsg}}</p>
                        </div>
                      </div>
                      <el-table-column type="" width="55"></el-table-column>
                      <el-table-column label="" prop="type" width="60">
                        <template slot-scope="scope">
                          <div v-if="scope.row.resource.source==1">
                            <span v-if="scope.row.resource.jindu?scope.row.resource.jindu.status==5:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                            <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==2:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                            <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-1:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                            <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-2:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,3)"></span>
                            <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-3:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                            <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-4:false&&scope.row.resource.type!==1"
                              class="type_error" @click="openLixian2(scope.row.resource,4)"></span>
                            <span v-else-if="scope.row.resource.pass">
                              <a href="javascript:;" v-if="scope.row.resource.type==1" @click="openLixian(scope.row.resource)"><span
                                  class="type_folder_pass"></span></a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                                @click="openLixian2(scope.row.resource)">
                                <span  class="type_folder_pass"></span> 
                              </a>
                              <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)"><span
                                  class="type_txt_pass"></span></a>
                            </span>
                            <span v-else>
                              <a href="javascript:;" v-if="scope.row.resource.type==1" @click="openLixian(scope.row.resource)"><span
                                  class="type_folder"></span></a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                                @click="openLixian2(scope.row.resource)"><span class="type_folder"></span></a>
                              <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)"><span
                                  class="type_down"></span></a>
                            </span>
                          </div>
                          <div v-else>
                            <div v-if="scope.row.resource.type=='dir'">
                              <a v-if="scope.row.resource.pass" href="javascript:;" @click="openFile(scope.row.resource)"><span
                                  class="type_folder_pass"></span></a>
                              <a v-else href="javascript:;" @click="openFile(scope.row.resource)"><span
                                  class="type_folder"></span></a>
                            </div>
                            <div v-else>
                              <a v-if="scope.row.resource.pass" @click="openFile2(scope.row.resource,2)" href="javascript:;"><span
                                  class="type_txt_pass"></span></a>
                              <a v-else href="javascript:;" @click="openFile2(scope.row.resource,2)"><span class="JS_type_class"
                                  :type="scope.row.resource.type"></span></a>
                            </div>
                          </div>
                        </template>
                      </el-table-column><!-- 图标 -->
                      <el-table-column label="" prop="title">
                        <template slot-scope="scope">
                          <div v-if="scope.row.resource.source==1">
                            <div class="cell">
                              <a href="javascript:;" v-if="scope.row.resource.type==1"
                                @click="openLixian(scope.row.resource)">{{ scope.row.resource.title}}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==5:false"
                                @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==2:false"
                                @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-1:false"
                                @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-2:false"
                                @click="openLixian2(scope.row.resource,3)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-3:false"
                                @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-4:false"
                                @click="openLixian2(scope.row.resource,4)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                                @click="openLixian2(scope.row.resource)">{{scope.row.resource.title }}</a>
                              <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)">{{ scope.row.resource.title }}</a>
                              <img class="JS_img" v-if="scope.row.resource.experience"
                                src="http://img.bianyue.cn/new/pan/icon_free.gif"
                                style="position:relative;top:3px;left:8px;width:30px;">
                            </div>
                            <div class="cell"><span class="time gray"
                                v-if="scope.row.resource.size">{{scope.row.resource.size?scope.row.resource.size.size:''}}&emsp;</span><span
                                class="time gray">{{scope.row.resource.time*1000|timeStamp}}</span> </div>
                            <div class="cell">
                              <p class="disn opo_list">
                                <a class="nremove" @click.prevent="openRemoveFile">移除</a>
                                <a class="nremane" @click.prevent="openEditFile">重命名</a>
                                <a v-if="scope.row.resource.type=='0'&&userInfo.vip =='2'" class="ndown"
                                  @click.prevent="handleLoad()">下载</a>
                                <a class="ndel" @click.prevent="openDelFile">删除</a>
                              </p>
                            </div>
                          </div>
                          <div v-else>
                            <div class="cell"> <a href="javascript:;" v-if="scope.row.resource.type=='dir'"
                                @click="openFile(scope.row.resource)">{{scope.row.resource.title }}</a><a href="javascript:;" v-else
                                @click="openFile2(scope.row.resource,2)">{{ scope.row.resource.title }}</a> </div>
                            <div class="cell"><span class="time gray"
                                v-if="scope.row.resource.size">{{scope.row.resource.size|formatBytes}}&emsp;</span><span
                                class="time gray">{{scope.row.resource.time*1000|timeStamp}}</span> </div>
                            <div class="cell">
                              <p class="disn opo_list">
                                <a class="nremove" @click.prevent="openRemoveFile">移除</a>
                                <a class="nremane" @click.prevent="openEditFile">重命名</a>
                                <a v-if="scope.row.resource.type!=='dir'" class="ndown"
                                  @click.prevent="download(scope.row.resource)">下载</a>
                                <a class="ndel" @click.prevent="openDelFile">删除</a>
                              </p>
                            </div>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <!-- 云下载 -->
                  <el-tab-pane :label="'云下载('+panList.length+')'" name="lixian">
                    <el-table :data="panList" @cell-mouse-enter="hoverTr" stripe
                      class="JS_table scrollbar border_none w-table Trhover" :show-header="false"
                      style="min-height:440px; max-height:600px; overflow:auto;">
                      <div slot="empty" class="none_warpper" v-show="!loading" style="height:420px;">
                        <div class="none_bg">
                          <p class="mb20">{{searchMsg}}</p>
                        </div>
                      </div>
                      <el-table-column type="" width="55"></el-table-column>
                      <el-table-column label="" prop="type" width="60">
                        <template slot-scope="scope">
                          <span v-if="scope.row.resource.jindu?scope.row.resource.jindu.status==5:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                          <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==2:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                          <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-1:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                          <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-2:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,3)"></span>
                          <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-3:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,2)"></span>
                          <span v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-4:false&&scope.row.resource.type!==1"
                            class="type_error" @click="openLixian2(scope.row.resource,4)"></span>
                          <span v-else-if="scope.row.resource.pass">
                            <a href="javascript:;" v-if="scope.row.resource.type==1" @click="openLixian(scope.row.resource)"><span
                                class="type_folder_pass"></span></a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                              @click="openLixian2(scope.row.resource)">
                              <span  class="type_folder_pass"></span> 
                            </a>
                            <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)"><span
                                class="type_txt_pass"></span></a>
                          </span>
                          <span v-else>
                            <a href="javascript:;" v-if="scope.row.resource.type==1" @click="openLixian(scope.row.resource)"><span
                                class="type_folder"></span></a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                              @click="openLixian2(scope.row.resource)"><span class="type_folder"></span></a>
                            <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)"><span
                                class="type_down"></span></a>
                          </span>
                        </template>
                      </el-table-column><!-- 图标 -->
                      <el-table-column label="" prop="title">
                        <template slot-scope="scope">
                          <div class="cell">
                            <a href="javascript:;" v-if="scope.row.resource.type==1"
                              @click="openLixian(scope.row.resource)">{{ scope.row.resource.title}}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==5:false"
                              @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.status==2:false"
                              @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-1:false"
                              @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-2:false"
                              @click="openLixian2(scope.row.resource,3)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-3:false"
                              @click="openLixian2(scope.row.resource,2)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu==-4:false"
                              @click="openLixian2(scope.row.resource,4)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else-if="scope.row.resource.jindu?scope.row.resource.jindu.jindu=='100':false"
                              @click="openLixian2(scope.row.resource)">{{scope.row.resource.title }}</a>
                            <a href="javascript:;" v-else @click="openLixian2(scope.row.resource)">{{ scope.row.resource.title }}</a>
                            <img class="JS_img" v-if="scope.row.resource.experience"
                              src="http://img.bianyue.cn/new/pan/icon_free.gif"
                              style="position:relative;top:3px;left:8px;width:30px;">
                          </div>
                          <div class="cell"><span class="time gray"
                              v-if="scope.row.resource.size">{{scope.row.resource.size?scope.row.resource.size.size:''}}&emsp;</span><span
                              class="time gray">{{scope.row.resource.time*1000|timeStamp}}</span> </div>
                          <div class="cell">
                            <p class="disn opo_list">
                              <a class="nremove" @click.prevent="openRemoveFile">移除</a>
                              <a class="nremane" @click.prevent="openEditFile">重命名</a>
                              <a v-if="scope.row.resource.type=='0'&&userInfo.vip =='2'" class="ndown"
                                @click.prevent="handleLoad()">下载</a>
                              <a class="ndel" @click.prevent="openDelFile">删除</a>
                            </p>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="'文件('+fileList.length+')'" name="file">
                    <el-table :data="fileList" @cell-mouse-enter="hoverTr" stripe
                      class="JS_table scrollbar border_none w-table Trhover" :show-header="false"
                      style="min-height:440px; max-height:600px; overflow:auto;">
                      <div slot="empty" class="none_warpper" style="height:420px;">
                        <div class="none_bg">
                          <p class="mb20">{{searchMsg}}</p>
                        </div>
                      </div>
                      <el-table-column type="" width="55"></el-table-column>
                      <el-table-column label="" prop="type" width="60">
                        <template slot-scope="scope">
                          <div v-if="scope.row.resource.type=='dir'">
                            <a v-if="scope.row.resource.pass" href="javascript:;" @click="openFile(scope.row.resource)"><span
                                class="type_folder_pass"></span></a>
                            <a v-else href="javascript:;" @click="openFile(scope.row.resource)"><span
                                class="type_folder"></span></a>
                          </div>
                          <div v-else>
                            <a v-if="scope.row.resource.pass" @click="openFile2(scope.row.resource,2)" href="javascript:;"><span
                                class="type_txt_pass"></span></a>
                            <a v-else href="javascript:;" @click="openFile2(scope.row.resource,2)"><span class="JS_type_class"
                                :type="scope.row.resource.type"></span></a>
                          </div>
                        </template>
                      </el-table-column><!-- 图标 -->
                      <el-table-column label="" prop="title">
                        <template slot-scope="scope">
                          <div class="cell"> <a href="javascript:;" v-if="scope.row.resource.type=='dir'"
                              @click="openFile(scope.row.resource)">{{scope.row.resource.title }}</a><a href="javascript:;" v-else
                              @click="openFile2(scope.row.resource,2)">{{ scope.row.resource.title }}</a> </div>
                          <div class="cell"><span class="time gray"
                              v-if="scope.row.resource.size">{{scope.row.resource.size|formatBytes}}&emsp;</span><span
                              class="time gray">{{scope.row.resource.time*1000|timeStamp}}</span> </div>
                          <div class="cell">
                            <p class="disn opo_list">
                              <a class="nremove" @click.prevent="openRemoveFile">移除</a>
                              <a class="nremane" @click.prevent="openEditFile">重命名</a>
                              <a v-if="scope.row.resource.type!=='dir'" class="ndown" @click.prevent="download(scope.row.resource)">下载</a>
                              <a class="ndel" @click.prevent="openDelFile">删除</a>
                            </p>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="'相册('+photoList.length+')'" name="photo">
                    <el-table :data="photoList" @cell-mouse-enter="hoverTr" stripe
                      class="JS_table scrollbar border_none w-table Trhover" :show-header="false"
                      style="min-height:440px; max-height:600px; overflow:auto;">
                      <div slot="empty" class="none_warpper" style="height:420px;">
                        <div class="none_bg">
                          <p class="mb20">{{searchMsg}}</p>
                        </div>
                      </div>
                      <el-table-column type="" width="55"></el-table-column>
                      <el-table-column label="" prop="type" width="60">
                        <template slot-scope="scope">
                          <div v-if="scope.row.resource.type=='dir'">
                            <a v-if="scope.row.resource.pass" href="javascript:;" @click="openFile(scope.row.resource)"><span
                                class="type_folder_pass"></span></a>
                            <a v-else href="javascript:;" @click="openFile(scope.row.resource)"><span
                                class="type_folder"></span></a>
                          </div>
                          <div v-else>
                            <a v-if="scope.row.resource.pass" @click="openFile2(scope.row.resource,2)" href="javascript:;"><span
                                class="type_txt_pass"></span></a>
                            <a v-else href="javascript:;" @click="openFile2(scope.row.resource,2)"><span class="JS_type_class"
                                :type="scope.row.resource.type"></span></a>
                          </div>
                        </template>
                      </el-table-column><!-- 图标 -->
                      <el-table-column label="" prop="title">
                        <template slot-scope="scope">
                          <div class="cell"> <a href="javascript:;" v-if="scope.row.resource.type=='dir'"
                              @click="openFile(scope.row.resource)">{{scope.row.resource.title }}</a><a href="javascript:;" v-else
                              @click="openFile2(scope.row.resource,2)">{{ scope.row.resource.title }}</a> </div>
                          <div class="cell"><span class="time gray"
                              v-if="scope.row.resource.size">{{scope.row.resource.size|formatBytes}}&emsp;</span><span
                              class="time gray">{{scope.row.resource.time*1000|timeStamp}}</span> </div>
                          <div class="cell">
                            <p class="disn opo_list">
                              <a class="nremove" @click.prevent="openRemoveFile">移除</a>
                              <a class="nremane" @click.prevent="openEditFile">重命名</a>
                              <a v-if="scope.row.resource.type!=='dir'" class="ndown" @click.prevent="download(scope.row.resource)">下载</a>
                              <a class="ndel" @click.prevent="openDelFile">删除</a>
                            </p>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </div>
        <!-- 滚动部分 -->
      </div>
    </div>
    <div id="JS_edit_file" class="disn">
      <EditFile v-if="isAlert" :id="contextMenuId" :type="editType" :title="contextMenuTitle" @cancel="cancel"
        @success="success"></EditFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_search_pass_file" class="disn">
      <PassFile v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" @cancel="cancel" @success="success">
      </PassFile>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_search_pass_file2" class="disn">
      <PassFile3 v-if="isAlert" :id="contextMenuId" :pass="contextMenuPass" :url="contextMenuDownUrl" @cancel="cancel"
        @success="success"></PassFile3>
      <div style="height:195px;" v-else></div>
    </div>
    <div id="JS_del_file" class="disn">
      <el-form v-if="isAlert" class="pad22">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">确认删除所选文件？<span class="red">（对应文件会被删除）</span></p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="delSubmit">确认</el-button>
        </p>
      </el-form>
      <div style="height:276px;" v-else></div>
    </div>
    <div id="JS_remove_file" class="disn">
      <el-form v-if="isAlert" class="pad22">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">确认移除所选文件？</p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="removeSubmit">确认</el-button>
        </p>
      </el-form>
      <div style="height:276px;" v-else></div>
    </div>
    <div id="JS_search_play_list" class="disn">
      <div class="meg_list">
        <table>
          <tr v-for="data in playList" :key="data.id" @click="goTo(data.playUrl)" style="cursor:pointer;">
            <td><i class="icon-video" style="margin:0 auto;"></i></td>
            <td>{{data.title}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="JS_search_error" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">{{playErr}}</span>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">取消</el-button>
        <el-button type="primary" class="w100" @click="cancel();openDelFile()">删除</el-button>
      </p>
    </div>
    <div id="JS_search_error2" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">该链接任务正在离线转码 </span><a style="position:relative;top:2px;left:2px;" href="http://help.bianyue.cn/syzn/6.html" target="_blank" class="icon_help2" title="帮助"></a>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">取消</el-button>
        <el-button type="primary" class="w100" @click="cancel();jump('/lixian?openBT=true')">继续添加</el-button>
      </p>
    </div>
    <!-- 升级vip -->
    <div id="JS_search_vip" class="disn">
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
    <div id="JS_search_vip2" class="disn">
      <div class="fct mt30">
        <img src="@/assets/bg_cardbag_vip_home_point@1.png" alt="">
        <p class="f16">没有平衡的盈利和支出就没有长久的服务</p>
        <p class="f16 mt6 mb20">升级VIP才可享有在线预览特权</p>
        <el-button type="warning" @click="goTo('http://vip.bianyue.cn/vip/index?pay=true')" class="btn_orange w200">
          升级VIP</el-button>
      </div>
    </div>
    <div id="JS_search_vip3" class="disn">
      <div class="fct mt30">
        <img src="@/assets/bg_vip_expired@1.png" width="300" height="250" alt="">
        <p class="f16 mt20 mb20" id="JS_vip_title"></p>
        <el-button type="warning" @click="goTo('http://vip.bianyue.cn/vip/index?pay=true')" class="btn_orange w200">马上续费
        </el-button>
      </div>
    </div>
    <div id="JS_search_go_bind_phone" class="disn">
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
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import EditFile from "@/components/EditFile";
import PassFile from "@/components/PassFile";
import PassFile3 from "@/components/PassFile3";
import api from "@/api/index.js";
import "@/assets/pan.css";
export default {
  name: "search",
  metaInfo: {
    title: "收藏_边乐云"
  },
  data() {
    return {
      activeName: "all",
      loading: false,
      isAlert: false,
      searchMsg: "暂无数据",
      value: "",
      panList: [],
      fileList: [],
      photoList: [],
      allList: [],
      contextMenuId: "",
      contextMenuTitle: "",
      contextMenuHash: "",
      contextMenuPass: "",
      contextMenuDownUrl: "",
      openFileData: {},
      playList: [],
      experienceId: "",
      playErr: "",
      playErrList: [
        "该链接任务正离线下载",
        "该链接任务HASH值无效",
        "该链接任务无视频文件",
        "该链接任务被多次举报，已被系统屏蔽"
      ],
      playInfo: {},
      previewRow: {},
      result: {
        total: 0,
        lixian: 0,
        file: 0,
        photo: 0
      },
      favoritesTitlte: ""
    };
  },
  components: {
    Header: Header,
    LeftMenu: LeftMenu,
    EditFile: EditFile,
    PassFile: PassFile,
    PassFile3: PassFile3
  },
  methods: {
    back() {
      this.jump("/favorites");
    },
    // 离线
    openLixian(row) {
      this.openFileData = row;
      if (row.pass) {
        this.isAlert = true;
        layer.open({
          type: 1,
          title: "访问加密文件",
          anim: 2,
          area: ["380px", ""], //宽高
          content: $("#JS_search_pass_file"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      } else {
        this.jump(`/lixian?topid=${row.id}`);
      }
    },
    openLixian2(row, type) {
      if (type) {
        this.playErr = this.playErrList[type - 1];
        this.contextMenuId = row.id;
        layer.open({
          type: 1,
          anim: 2,
          area: ["450px", "270px"],
          content: $("#JS_search_error")
        });
        return false;
      }
      this.openFileData = row;
      api
        .getFamily({
          topid: row.topid
        })
        .then(response => {
          let familyData = response.data.family_tree_data || [];
          this.setStorage("myYunPlayData", JSON.stringify(row));
          this.setStorage("myYunFamilyData", JSON.stringify(familyData));
          this.jump(`/lixian?yunid=${row.id}`);
        });
      // if (row.pass) {
      //   this.isAlert = true;
      //   this.contextMenuPass = row.pass;
      //   this.contextMenuId = row.id;
      //   layer.open({
      //     type: 1,
      //     title: "访问加密文件",
      //     anim: 2,
      //     area: ["380px", ""], //宽高
      //     content: $("#JS_search_pass_file"),
      //     cancel: () => {
      //       this.isAlert = false;
      //     }
      //   });
      // } else {
      //   this.openPlayList(row);
      // }
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
                content: $("#JS_search_go_bind_phone")
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
              title: "播放列表",
              anim: 2,
              area: ["600px", "520px"], //宽高
              content: $("#JS_search_play_list"),
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
              content: $("#JS_search_vip")
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
                content: $("#JS_search_vip3")
              });
              return false;
            }
            layer.open({
              type: 1,
              title: false,
              anim: 2,
              area: ["450px", "410px"], //宽高
              content: $("#JS_search_vip2")
            });
          } else if (data.status == "该资源正在离线转码") {
            layer.open({
              type: 1,
              anim: 2,
              area: ["450px", "270px"],
              content: $("#JS_search_error2")
            });
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
    // 文件
    openFile(row) {
      this.openFileData = row;
      if (row.pass) {
        this.isAlert = true;
        this.contextMenuPass = row.pass;
        this.contextMenuId = row.id;
        layer.open({
          type: 1,
          title: "访问加密文件",
          anim: 2,
          area: ["380px", ""], //宽高
          content: $("#JS_search_pass_file"),
          cancel: () => {
            this.isAlert = false;
          }
        });
      } else if (row.source == 2) {
        this.jump(`/file?topid=${row.id}`);
      } else {
        this.jump(`/photo?topid=${row.id}`);
      }
    },
    openFile2(row, type) {
      this.openFileData = row;
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
          content: $("#JS_search_pass_file2"),
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
              layer.open({
                type: 2,
                title: row.title,
                anim: 2,
                area: ["750px", "650px"], //宽高
                content: response.data.url
              });
            } else {
              var img = new Image();
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
              };
            }
          });
      } else {
        layer.msg("暂不支持该格式预览~", {
          icon: 7
        });
      }
    },
    typeShow() {
      $(".JS_type_class").each((index, el) => {
        $(el).addClass("type_" + $(el).attr("type"));
        if ($(el).height() == 0) {
          $(el).addClass("type_unknown");
        }
      });
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
    // 打开
    goTo(url) {
      window.open(url);
    },
    // 下载
    handleLoad() {
      window.location.href = "magnet:?xt=urn:btih:" + this.contextMenuHash;
    },
    // 鼠标移入
    hoverTr(row) {
      this.contextMenuId = row.resource.id;
      this.contextMenuCId = row.resource.cid;
      this.contextMenuTitle = row.resource.title;
      this.contextMenuPass = row.resource.pass;
      this.contextMenuHash = row.resource.hash;
      this.contextMenuSource = row.resource.source;
      this.editType = row.resource.source == "1" ? "lixian" : "file";
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
    // 删除文件
    delSubmit() {
      if (this.contextMenuSource == "1") {
        api
          .delLoad({
            "id[0]": this.contextMenuId
          })
          .then(response => {
            this.success({});
            layer.msg("删除成功", {
              icon: 1
            });
          });
      } else if (this.contextMenuSource == "2") {
        api
          .delFile({
            "id[0]": this.contextMenuId
          })
          .then(response => {
            this.success({});
            layer.msg("删除成功", {
              icon: 1
            });
          });
      } else if (this.contextMenuSource == "3") {
        api
          .delPhoto({
            "id[0]": this.contextMenuId
          })
          .then(response => {
            this.success({});
            layer.msg("删除成功", {
              icon: 1
            });
          });
      }
    },
    // 打开移除文件
    openRemoveFile() {
      this.isAlert = true;
      layer.open({
        type: 1,
        title: false,
        anim: 2,
        closeBtn: 0,
        area: ["380px", ""], //宽高
        content: $("#JS_remove_file"),
        cancel: () => {
          this.isAlert = false;
        }
      });
    },
    // 移除
    removeSubmit() {
      api
        .removeMask({
          id: this.contextMenuCId
        })
        .then(response => {
          this.success({});
          layer.msg("移除成功", {
            icon: 1
          });
        });
    },
    // 取消
    cancel() {
      this.isAlert = false;
      layer.closeAll();
    },
    success(param) {
      setTimeout(() => {
        if (param.id) {
          return false;
        }
        this.isAlert = false;
        layer.closeAll();
      }, 1500);
      if (param.id && this.openFileData.source == "1") {
        if (this.openFileData.type == 1) {
          this.isAlert = false;
          layer.closeAll();
          this.jump(`/lixian?topid=${param.id}`);
        } else {
          this.openPlayList(this.openFileData);
        }
      } else if (param.id && this.openFileData.source == "2") {
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
        this.isAlert = false;
        layer.closeAll();
        this.jump(`/file?topid=${param.id}`);
      }
      this.submit();
    },
    submit() {
      this.loading = true;
      api
        .getDetailMask(
          {
            // catalog_id: this.favoritesId
          },
          {
            failureCallback: () => {
              this.loading = false;
            }
          }
        )
        .then(res => {
          this.panList = res.data.pan || [];
          this.fileList = res.data.file || [];
          this.photoList = res.data.alum || [];
          this.allList = [];
          let panArr = [];
          let fileArr = [];
          let photoArr = [];
          this.panList.forEach(el => {
            el.resource.source = 1;
            el.resource.cid = el.id;
            el.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            panArr.push(el); 
          });
          this.fileList.forEach(el => {
            el.resource.source = 2;
            el.resource.cid = el.id;
            el.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            fileArr.push(el); 
          });
          this.photoList.forEach(el => {
            el.resource.source = 3;
            el.resource.cid = el.id;
            el.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            photoArr.push(el); 
          });
          function sortBy(field) {
            return function(a, b) {
              return b[field] - a[field];
            };
          } 
          this.allList = this.allList.concat(panArr);
          this.allList = this.allList.concat(fileArr);
          this.allList = this.allList.concat(photoArr);
          this.$nextTick(() => {
            this.allList = this.allList.sort(sortBy("creatSort"));  
            this.panList = panArr.sort(sortBy("creatSort"));  
            this.fileList = fileArr.sort(sortBy("creatSort"));  
            this.photoList = photoArr.sort(sortBy("creatSort"));  
          })
          this.result.lixian = this.panList.length;
          this.result.file = this.fileList.length;
          this.result.photo = this.photoList.length;
          this.result.total =
            parseInt(this.result.lixian) +
            parseInt(this.result.file) +
            parseInt(this.result.photo);
          setTimeout(() => { 
            this.typeShow();
          }, 0);
          setTimeout(() => { 
            this.loading = false;
          }, 500);
        });
    }
  },
  mounted() {
    $(".JS_table").css({
      "max-height": $(window).height() - 250
    });
    $(window).resize(() => {
      $(".JS_table").css({
        "max-height": $(window).height() - 250
      });
    });
  },
  created() {
    // this.favoritesId = this.$router.currentRoute.query.id || "";
    // this.favoritesTitlte = this.getStorage("favoritesTitlte") || "";
    // if (this.favoritesId) {
    //   this.submit();
    // }
    this.submit();
  }
};
</script>
<style>
.search_tab.search_tab_fav .el-tabs__item.is-active:before {
  background: url(../assets/icon_new.svg) no-repeat -140px -60px;
}
.icon_fav {
  display: inline-block;
  width: 20px;
  height: 30px;
  margin: 1px 10px 1px 15px;
  background: url(../assets/icon_new.svg) -140px -100px;
}
.icon-video {
  width: 64px;
  height: 64px;
  display: block;
  background: url("../assets/icon_video.svg") no-repeat;
  background-size: cover;
}

.favorites-detail-title {
  position: absolute;
  top: 10px;
  width: 200px;
  margin-left: -100px;
  left: 50%;
  text-align: center;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
