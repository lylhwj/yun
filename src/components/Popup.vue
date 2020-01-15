<template>
  <div>
    <div id="JS_w_down_list" class="box_open" :style="{'height': myHeight}" >
      <div class="h_oflow rel">
        <p class="fcr"><span class="pico_close" style="visibility: hidden;"></span></p>
        <div class="white mt4 lineh30">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <span class="white pointer">{{msg}}（{{total}}）<i class="el-icon-arrow-down el-icon--right"></i></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="select('all')">全部任务</el-dropdown-item>
              <el-dropdown-item @click.native="select('working')">转码中</el-dropdown-item>
              <el-dropdown-item @click.native="select('completed')">任务完成</el-dropdown-item>
              <el-dropdown-item @click.native="select('failed')">任务失败</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p class="fr">
            <a href="javascript:;" class="white" @click="refresh"><span class="pico_refresh"></span>刷新</a>
            <span class="f12">|</span>
            <a href="javascript:;" @click="del" class="white"><span class="pico_del"></span>清空</a>
          </p>
        </div>
      </div>
      <div class="list_down" v-loading="loading" :style="{'height': myHeight3}">
        <div class="none_bg" v-if="empty">
          <p class="mb20">暂无数据</p>
        </div>
        <div v-if="!loading&&dataList.length>0">
          <div class="down_list_warpper wave_big" :style="{'height': myHeight2}">
            <dl v-for="(data,index) in dataList" class="wave_small" :key="index">
              <dt >
                <span v-if="data.jindu?data.jindu.status==5:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.jindu?data.jindu.status==2:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.jindu?data.jindu.jindu==-1:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.jindu?data.jindu.jindu==-2:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.jindu?data.jindu.jindu==-3:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.jindu?data.jindu.jindu==-4:false&&data.type!==1" class="type_folder"
                  @click="openFile(data)"></span>
                <span v-else-if="data.pass">
                  <a href="javascript:;" v-if="data.type==1" @click="openFile(data)"><span
                      class="type_folder_pass"></span></a>
                  <a href="javascript:;" v-else-if="data.jindu?data.jindu.jindu=='100':false" @click="openFile(data)">
                    <span  class="type_folder"></span> 
                  </a>
                  <a href="javascript:;" v-else @click="openFile(data)"><span class="type_txt_pass"></span></a>
                </span>
                <span v-else>
                  <a href="javascript:;" v-if="data.type==1" @click="openFile(data)"><span
                      class="type_folder"></span></a>
                  <a href="javascript:;" v-else-if="data.jindu?data.jindu.jindu=='100':false"
                    @click="openFile(data)"><span class="type_folder"></span></a>
                  <a href="javascript:;" v-else @click="openFile(data)"><span class="type_folder"></span></a>
                </span>
              </dt>
              <dd  >
               <div @click="openFile(data)" style="width:100%;">
                  <p class="name"  >{{data.title}}</p>
                <!-- <el-progress v-if="data.jindu?data.jindu.status==5:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>
                <el-progress v-else-if="data.jindu?data.jindu.status==2:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>
                <el-progress v-else-if="data.jindu?data.jindu.jindu==-1:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>
                <el-progress v-else-if="data.jindu?data.jindu.jindu==-2:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>
                <el-progress v-else-if="data.jindu?data.jindu.jindu==-3:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>
                <el-progress v-else-if="data.jindu?data.jindu.jindu==-4:false&&data.type!==1" :percentage="0"
                  status="exception" color="#f56c6c"></el-progress>

                <el-progress v-else-if="data.jindu?data.jindu.jindu=='100':false" :title="'100%'" :percentage="100" status="exception"
                  color="#54b82a"></el-progress>

                <el-progress v-else :percentage="data|progress" :title="data,2|progress"  status="exception" color="#0688ff"></el-progress> -->
                <p class="gray f13 clear" style="height:25px;">
                  <span class="fl" >
                    <span v-if="data.jindu?data.jindu.status==5:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.status==2:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.jindu==-1:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.jindu==-2:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.jindu==-3:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.jindu==-4:false&&data.type!==1" class="pico_no">任务失败</span>
                  <span v-else-if="data.jindu?data.jindu.jindu=='100':false" class="pico_yes">任务完成</span>
                  <!-- <span v-else class="pico_down">下载中 {{data,3|progress}}</span> -->
                  <span v-else class="pico_down">{{data,2|progress}}</span>
                  </span>
                  <span class="fl" style="margin-left:5px;">{{data.size?data.size.size:''}}</span></p>
               </div>
                <a href="javascript:;"  v-clipboard:copy="'magnet:?xt=urn:btih:'+data.hash" v-clipboard:success="onCopy"  v-clipboard:error="onError" title="复制链接" class="link"></a>
                <a href="javascript:;" @click="delFile(data)" class="del"></a>
          </dd>
            </dl>
          </div>
          <div class="fct mt10 mb10" style="margin-left: -20px;">
            <el-pagination background :current-page="currentPage" :page-size="10" layout="prev, pager, next"
              @current-change="getLoad" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div><!-- 弹出下载框 -->
    <div id="JS_del_down_file" class="disn">
      <el-form class="el-form pad22" style="width: 310px;">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray">是否确认删除该下载任务？</p>
          <p class="mt10" v-if="clearData.jindu ? clearData.jindu.jindu == '100' : false">
            <span class="f14 gray">不涉及源文件</span>
          </p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="delSubmit">确认</el-button>
        </p>
      </el-form>
    </div>
    <div id="JS_del_down_file2" class="disn">
      <el-form class="el-form pad22" style="width: 310px;">
        <div class="fct">
          <span class="ico_del"></span>
          <p class="f16 gray" v-if="delFilter=='all'">清空所有任务？</p>
          <p class="f16 gray" v-if="delFilter=='completed'">清空已完成任务？</p>
          <p class="f16 gray" v-if="delFilter=='working'">清空转码中任务？</p>
          <p class="f16 gray" v-if="delFilter=='failed'">清空失败任务？</p>
          <p class="mt10" v-if="delFilter=='completed'"><span class="f14 gray">不涉及源文件</span></p>
        </div>
        <p class="fct mt30">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="delSubmit2">确认</el-button>
        </p>
      </el-form>
    </div>
    <div id="JS_lixian_error" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">{{playErr}}</span>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">取消</el-button>
        <el-button type="primary" class="w100" @click="cancel();delSubmit()">删除</el-button>
      </p>
    </div>
    <div id="JS_lixian_error2" class="disn">
      <p class="fct mt30 pad15 f16">
        <img src="@/assets/icon_error.png" width="28" class="vmid" alt="">
        <span class="play_error">该链接任务正在离线转码 </span><a style="position:relative;top:2px;left:2px;"
          href="http://help.bianyue.cn/syzn/6.html" target="_blank" class="icon_help2" title="帮助"></a>
        <p class="mt10 f14 gray fct">完成后自动导入左侧列表</p>
      </p>
      <p class="fct mt30">
        <el-button class="w100" @click="cancel">返回</el-button>
        <el-button type="primary" class="w100" @click="cancel();openBT()">继续添加</el-button>
      </p>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";
export default {
  name: "Popup",
  data() {
    return {
      show_check: false,
      show_del: false,
      total: 0,
      currentPage: 1,
      dataList: [],
      loading: false,
      filter: "all",
      msg: "全部任务",
      delFilter: "all",
      clearData: {},
      empty: false,
      myHeight: window.innerHeight - 180 + "px",
      myHeight2: window.innerHeight - 335 + "px",
      myHeight3: window.innerHeight - 282 + "px",
      checkbox: false,
      playErr: "",
      playErrList: [
        "该链接任务正离线下载",
        "该链接任务HASH值无效",
        "该链接任务无视频文件",
        "该链接任务被多次举报，已被系统屏蔽"
      ]
    };
  },
  filters: {
    progress(data, type) {
      if (data.size) {
        let size = data.size.size || "";
        if (size.indexOf("GB") !== -1) {
          size =
            parseFloat(size.substring(0, size.length - 2)) * 1024 * 1024 * 1024;
        } else if (size.indexOf("MB") !== -1) {
          size = parseFloat(size.substring(0, size.length - 2)) * 1024 * 1024;
        } else if (size.indexOf("KB") !== -1) {
          size = parseFloat(size.substring(0, size.length - 2)) * 1024;
        } else {
          if (type == 2) {
            return "50%";
          } else if (type == 3) {
            return "";
          }
          return 50;
        }
        let speed =
          350 * 1024 +
          101 *
            String(size).substring(
              String(size).length - 1,
              String(size).length
            );
        let time = parseInt((new Date().getTime() - data.time * 1000) / 1000);
        let bili = speed * time / size * 100;
        if (type == 3) {
          let random = Math.floor(Math.random() * 200) - 100;
          return parseInt(speed / 1024) + random + "KB/s";
        }
        if (bili >= 99) {
          return "任务转码中";
          if (type == 2) {
            let baifenbi =
              90 +
              parseInt(
                String(size).substring(
                  String(size).length - 1,
                  String(size).length
                )
              );
            if (baifenbi > 99) {
              return "99%";
            } else {
              return baifenbi + "%";
            }
          }
          return 98;
        } else {
          if (type == 2) {
            if (parseInt(bili) <= 0) {
              return "0%";
            }
            return parseInt(bili) + "%";
          }
          if (parseInt(bili) < 0) {
            return 0;
          } else {
            return parseInt(bili);
          }
        }
      } else {
        if (type == 2) {
          return "50%";
        }
        return 50;
      }
    }
  },
  props: ["topid"],
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
    getLoad(page) {
      this.loading = true;
      this.empty = false;
      api
        .lixianDown(
          {
            topid: this.topid,
            page: page || 1,
            f: this.filter,
            per_page: 10
          },
          {
            failureCallback: () => {
              this.loading = false;
            }
          }
        )
        .then(response => {
          this.dataList = response.data.list.data || [];
          this.currentPage = response.data.list.current_page;
          this.total = response.data.list.total || 0;
          this.$nextTick(() => {
            this.init();
          });
          switch (this.filter) {
            case "all":
              this.msg = "全部任务";
              break;
            case "working":
              this.msg = "转码中";
              break;
            case "completed":
              this.msg = "任务完成";
              break;
            case "failed":
              this.msg = "任务失败";
              break;
            default:
              break;
          }
          this.$emit("getLixianNumber", this.total);
          this.loading = false;
          if (!this.loading && this.dataList.length == 0) {
            setTimeout(() => {
              this.empty = true;
            }, 300);
          }
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
    // 打开文件
    openFile(data) { 
      let type = null;
      if (data.jindu ? data.jindu.status == 5 : false) {
        type = 2;
      } else if (data.jindu ? data.jindu.status == 2 : false) {
        type = 2;
      } else if (data.jindu ? data.jindu.jindu == -1 : false) {
        type = 2;
      } else if (data.jindu ? data.jindu.jindu == -2 : false) {
        type = 3;
      } else if (data.jindu ? data.jindu.jindu == -3 : false) {
        type = 2;
      } else if (data.jindu ? data.jindu.jindu == -4 : false) {
        type = 4;
      }
      if (type) {
        this.playErr = this.playErrList[type - 1];
        this.clearData = data;
        layer.open({
          type: 1,
          anim: 2,
          shade: false,
          area: ["450px", "270px"],
          content: $("#JS_lixian_error")
        });
        return false;
      }
      this.$emit("openFile", data);
    },
    // 删除文件
    delFile(data) {
      this.clearData = data;
      this.checkbox = false;
      layer.open({
        type: 1,
        anim: 2,
        title: false,
        shade: false,
        content: $("#JS_del_down_file")
      });
    },
    delSubmit() { 
      if (this.clearData.jindu ? this.clearData.jindu.jindu == "100" : false) {
        api
          .delLixanList({
            "clearIds[0]": this.clearData.id
          })
          .then(response => {
            layer.msg("删除成功", {
              icon: 1
            });
            if (this.dataList.length == 1 && this.currentPage > 1) {
              this.getLoad(this.currentPage - 1);
            } else {
              this.getLoad(this.currentPage);
            }
            setTimeout(() => {
              layer.closeAll();
            }, 1500);
          });
      } else {
        api
          .delLoad({
            "id[0]": this.clearData.id
          })
          .then(response => {
            layer.msg("删除成功", {
              icon: 1
            });
            if (this.dataList.length == 1 && this.currentPage > 1) {
              this.getLoad(this.currentPage - 1);
            } else {
              this.getLoad(this.currentPage);
            }
            if (
              this.clearData.jindu ? this.clearData.jindu.jindu == "100" : false
            ) {
              this.$emit("delPopupFile", true);
            }
            setTimeout(() => {
              layer.closeAll();
            }, 1500);
          });
      }
    },
    // 刷新
    refresh() {
      this.getLoad(1);
    },
    // 查看
    select(type) {
      this.filter = type;
      this.delFilter = type;
      this.getLoad(1);
    },
    // 清空
    del() {
      layer.open({
        type: 1,
        anim: 2,
        title: false,
        shade: false,
        content: $("#JS_del_down_file2")
      });
    },
    delSubmit2() {
      api
        .clearLixanList({
          f: this.delFilter
        })
        .then(response => {
          layer.msg("清除成功", {
            icon: 1
          });
          this.getLoad(1);
          setTimeout(() => {
            layer.closeAll();
          }, 1500);
        });
    },
    cancel() {
      layer.closeAll();
    },
    openBT() {
      this.$emit("openBT", true);
    },
    openApp() {
      this.$emit("openApp", true);
    },
    openLixianZhuanMa() {
      layer.open({
        type: 1,
        anim: 2,
        shade: false,
        area: ["450px", "270px"],
        content: $("#JS_lixian_error2")
      });
    },
    init() {
      $.fn.wave = function(options) {
        var defaults = {
          lineColor: "white", //默认下标线颜色
          lineHeight: 4, //默认下标线高度
          waveColor: "lightblue", //默认波浪颜色
          index: 0 //默认选中标签下标
        };
        var options = $.extend({}, defaults, options);
        this.each(function() {
          var $this = $(this);
          var $buttons = $("." + options.btnClass, $this);
          $this.append(
            `<div class="line" style="position:absolute;transition:.5s;-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;bottom:0;left:${
              $buttons[options.index].offsetLeft
            }px;width:${$buttons[options.index].clientWidth}px;height:${
              options.lineHeight
            }px;background:${options.lineColor};"><div>`
          );
          var $line = $(".line", $this); //下标线
          $buttons.each(function() {
            $(this)
              .css("overflow", "hidden")
              .unbind("click")
              .click(function(e) {
                var event = e || event;
                var $this = $(this);
                $(".wave", $this).remove();
                $this.append(
                  `<div class="wave" style="position:absolute;transform:scale(0);-webkit-transform:scale(0);border-radius:50%;background:${
                    options.waveColor
                  };opacity:0.4;"></div>`
                );
                var x = event.pageX; //鼠标位置到页面左边的距离(包括滚动距离)
                var y = event.pageY; //鼠标位置到页面顶端的距离(包括滚动距离)
                var w = this.clientWidth; //按钮的宽
                var h = this.clientHeight; //按钮的高 
                var offsetLeft = $(this).offset().left; //按钮到其父元素左边的距离
                var offsetTop = $(this).offset().top; //按钮到其父元素顶端的距离
                var left = offsetLeft;
                var top = offsetTop;
                if (w > h) {
                  h = w;
                } else {
                  w = h;
                }
                w=200;
                var left = x - w - left;
                var top = y - h - top;
                var $wave = $(".wave", $this);
                if (!$this.hasClass("active")) {
                  $this
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                  $line.css({
                    left: offsetLeft,
                    width: w 
                  });
                }
                var transition = prefixStyle("transition");
                var transform = prefixStyle("transform");
                var css_first = {
                  width: w * 2 + "px",
                  height: h * 2 + "px",
                  left: left + "px",
                  top: top + "px"
                };
                var css_second = {
                  opacity: 0
                };
                css_first[transition] = ".4s linear";
                css_second[transform] = "scale(1.5)";
                $wave
                  .css(css_first)
                  .css(css_second)
                  .animate(
                    {
                      opacity: 0
                    },
                    400,
                    function() {
                      $(this).remove();
                    }
                  );
              });
          });
        });
        return this;
      };
      $(".wave_big").wave({
        waveColor: "lightgray", //波浪颜色
        index: 0, //选中标签下标
        btnClass: "wave_small" //按钮类名(必须传)
      });
      //获取标签距离文档左边的距离：
      var elementStyle = document.createElement("div").style;
      //获取样式前缀
      var vendor = (() => {
        var transformNames = {
          webkit: "webkitTransform",
          Moz: "MozTransform",
          O: "OTransform",
          ms: "msTransform",
          standard: "transform"
        };
        for (var key in transformNames) {
          if (elementStyle[transformNames[key]] !== undefined) {
            return key;
          }
        }
        return false;
      })();
      //获取样式属性(带前缀)
      function prefixStyle(style) {
        if (vendor === false) {
          return false;
        }
        if (vendor === "standard") {
          return style;
        }
        return vendor + style.charAt(0).toUpperCase() + style.substr(1);
      }
    }
  },
  mounted() {
    //控制弹出框高度
    window.onresize = () => {
      this.myHeight = window.innerHeight - 180 + "px";
      this.myHeight2 = window.innerHeight - 335 + "px";
      this.myHeight3 = window.innerHeight - 282 + "px";
    };
  },
  created() {
    this.getLoad(1);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pupup_box.el-popover {
  border: none;
  border-radius: 10px;
  padding: 0;
}

.pupup_box.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #83d0ff;
}

/*------------------ 弹出下载框 ------------------*/
.box_open {
  position: relative;
  width: 480px;
  /*height: 545px;*/
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
}

.box_open .rel {
  height: 85px;
  padding: 0 16px;
  border-radius: 5px 5px 0 0;
  background: linear-gradient(to bottom, #83d0ff, #0095ff);
}

.box_open .rel a {
  opacity: 0.8;
}

.box_open .rel a:hover {
  opacity: 1;
  color: #fff;
}

.box_open .rel span.f12 {
  opacity: 0.6;
  padding: 0 4px;
}

.down_list_warpper {
  /*height: 380px;*/
  overflow: auto;
}

.down_list_warpper::-webkit-scrollbar {
  position: absolute;
  width: 6px;
  height: 6px;
}

.down_list_warpper::-webkit-scrollbar-thumb {
  background: #a6a6a6;
}

.down_list_warpper dl {
  position: relative;
  padding-left: 12px;
  overflow: hidden;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.down_list_warpper dl:hover {
  background: #f6f6f6;
}
.list_down {
  /*height: 435px;*/
  padding: 5px 0 0 0;
  overflow-y: auto;
}

.list_down::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.list_down::-webkit-scrollbar-thumb {
  background: #a6a6a6;
}

.list_down dt {
  float: left;
  width: 50px;
}

.list_down dd {
  position: relative;
  float: left;
  width: 325px;
  line-height: 25px;
}

.list_down dd p.name {
  cursor: pointer;
  height: 25px;
  overflow: hidden;
  line-height: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.list_down dd a.link {
  display: none;
  position: absolute;
  right: -50px;
  top: 6px;
  width: 30px;
  height: 40px;
  background: url(../assets/icon_link.svg);
  background-size: 100% 100%;
}
.list_down dd a.del {
  display: none;
  position: absolute;
  right: -75px;
  top: 17px;
  width: 20px;
  height: 20px;
  background: url(../assets/icon_new.svg) -80px 0;
}

.list_down dl:hover dd a.del {
  display: block;
}

.list_down dl:hover dd a.link {
  display: block;
}

.list_down .el-progress-bar {
  margin-right: -0;
  padding-right: 0;
}

.list_down .el-progress.is-exception .el-progress__text {
  display: none;
}

.pico_down {
  color: #409eff;
}

.pico_no {
  color: #f56c6c;
}

.pico_yes {
  color: #54b82a;
}

.pico_down:before,
.pico_no:before,
.pico_yes:before {
  display: inline-block;
  float: left;
  width: 13px;
  height: 13px;
  margin: 6px 5px 0 0;
  background: url(../assets/icon_new.svg) -163px -40px;
  vertical-align: middle;
  content: "";
}

.pico_no:before {
  background-position: -163px -55px;
}

.pico_yes:before {
  background-position: -163px -70px;
}

.pico_close {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 10px 0 0 0;
  border-radius: 3px;
  cursor: pointer;
}

.pico_close:before {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/icon_new.svg) -120px -60px;
  content: "";
}

.pico_close:hover {
  background: #f16c6c;
}

.task-popover.el-popover {
  min-width: 100px;
  z-index: 198910188;
  padding: 0;
}

.list_down .none_bg:before {
  width: 222px;
  height: 170px;
}

.list_down .none_bg {
  margin-top: -85px;
  margin-left: -200px;
}

/*查看任务*/
.task_check {
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
}

.task_check a {
  display: block;
  line-height: 30px;
  color: #999;
}

.task_check a:before {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
  content: "";
}

.task_check a:hover,
.task_check a.hover {
  color: #409cff;
}

.task_check a.hover:before {
  background: url(../assets/icon_new.svg) -120px -80px;
}

.task_del a:hover,
.task_del a.hover {
  color: #f16c6c;
}

.task_del a.hover:before {
  background: url(../assets/icon_new.svg) -120px -100px;
}

.pico_refresh,
.pico_task,
.pico_del {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 3px;
  background: url(../assets/icon_new.svg) -100px -40px;
  vertical-align: middle;
}

.pico_task {
  background-position: -120px -40px;
}

.pico_del {
  background-position: -140px -40px;
}

.box_open .type_folder {
  cursor: pointer;
}
</style>
