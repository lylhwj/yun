<template>
  <div>
    <el-alert title="请遵循服务协议！严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息！" type="warning"></el-alert>
    <div class="fct mt15 mb8"><textarea style="width:550px;" rows="9" v-model="btData.hash" placeholder="输入磁力链接或HASH值，换行可添加多个（最大任务运行数量15个！）"></textarea></div>
    <p class="fct" style="padding:20px 0 20px;">
      <el-button type="primary" @click="submit" :loading="addLoading"><span class="pad30_lr f16">添加</span></el-button>
    </p>
    <div id="JS_bt_code" class="layui-layer layui-layer-page" v-if="codeShow" style="position:fixed;width:300px;left:50%;top:50%;background:#efefef;margin-top:-105px;margin-left:-150px;z-index:10000000000">
      <div class="layui-layer-title" style="cursor: move;">人机验证</div>
      <span @click="codeShow=false" class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:;"></a></span>
      <el-alert title="输入验证码后,可继续添加链接任务" type="warning"></el-alert>
      <div class="fct mt15 mb8 clear" style="height:40px;">
        <el-input @keyup.enter.native="codeSubmit" maxlength="4" type="text" v-model="btData.code" style="width:150px;float:left;margin:0 10px 0 20px;"></el-input>
        <div id="JS_code_img" class="fl" style="cursor:pointer;" @click="changeImg">
          <img :src="btData.codeImg" width="100" height="40" alt="">
        </div>
      </div>
      <p class="fct" style="padding:20px 0 20px;">
        <el-button type="primary" @click="codeSubmit"><span class="pad30_lr f16">确定</span></el-button>
      </p>
    </div>
    <div id="JS_vip4" class="layui-layer layui-layer-page" v-if="vipShow" style="position:fixed;width:488px;height:460px;left:50%;top:50%;margin-top:-250px;margin-left:-244px;z-index:10000000000">
      <div class="layui-layer-title" style="cursor: move;">信息</div>
      <span @click="vipShow=false" class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:;"></a></span>
      <div class="fct mt30">
        <img src="@/assets/bg_cardbag_vip_home_point@1.png" width="300" height="250" alt="">
        <p class="f16 mt20 mb20">批量添加是年V会员的专属特权，升级年V会员即可使用</p>
        <el-button type="warning" class="btn_orange w200" @click="goTo('http://vip.bianyue.cn/vip/index?pay=2')">升级VIP</el-button>
      </div>
    </div>
    <div id="JS_vip5" class="layui-layer layui-layer-page" v-if="rlShow" style="position:fixed;width:450px;height:400px;left:50%;top:50%;margin-top:-215px;margin-left:-225px;z-index:10000000000">
      <div class="layui-layer-title" style="cursor: move;">信息</div>
      <span @click="rlShow=false" class="layui-layer-setwin"><a class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:;"></a></span>
      <div class="fct mt30">
        <img src="@/assets/icon_point_ram@1.png" alt="">
        <p class="f16 mt20"><img src="@/assets/icon_error.png" width="18" class="vmid" alt="">添加失败</p>
        <p class="f16 mt20 mb20">网盘存储容量不足，请扩容</p>
        <el-button type="primary" class="w200" @click="goTo('http://vip.bianyue.cn')">{{rlMsg}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/index";
  export default {
    name: "BT",
    data() {
      return {
        btData: {
          code: "",
          codeImg: "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26"
        },
        codeShow: false,
        vipShow: false,
        rlShow: false,
        rlMsg:'马上扩容',
        addLoading:false
      };
    },
    props: ["topid"],
    methods: {
      // 打开
      goTo(url){
        window.open(url);
      },
      changeImg() {
        this.btData.codeImg =
          "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
          Math.random();
      },
      // 新建BT
      submit() {
        let topid = this.topid || 0;
        if (!this.btData.hash) {
          layer.msg("请添加任务链接!", {
            icon: 2
          });
          return false;
        } else {
          this.addLoading=true;
          $.ajax({
            type: "GET",
            url: `http://api.bianyue.cn/pan.php?op=init&action=addmagnet`,
            data: {
              topid: topid,
              hash: this.btData.hash,
              pc: true
            },
            dataType: "jsonp",
            success: data => {
              setTimeout(() => {
                this.addLoading=false;
              }, 1500);
              if (data.status == 200) {
                this.$emit("success", {type:'updateSize',bt:true});
                layer.msg(
                  "添加成功~", {
                    icon: 1,
                    time: 2000
                });
              } else if (data.status == "check_code") {
                this.btData.code = "";
                this.codeShow = true;
              } else if (
                data.status.indexOf("批量添加是年V会员的专属特权") !== -1
              ) {
                this.vipShow = true;
              } else if (data.is_vip === '1') {
                this.rlShow = true;
                this.rlMsg='马上扩容';
              } else if (data.is_vip === '0') {
                this.rlShow = true;
                this.rlMsg='马上升级';
              } else {
                layer.msg(data.status, {
                  icon: 7
                });
              }
            }
          });
        }
      },
      codeSubmit() {
        let topid = this.topid || 0;
        if (!this.btData.code) {
          layer.msg("请输入验证码", {
            icon: 2
          });
          return false;
        } else {
          $.ajax({
            type: "GET",
            url: `http://api.bianyue.cn/pan.php?op=init&action=addmagnet`,
            data: {
              topid: topid,
              hash: this.btData.hash,
              pc: true,
              code: this.btData.code
            },
            dataType: "jsonp",
            success: data => {
              if (data.status == 200) {
                layer.msg(
                  "添加成功~", {
                    icon: 1,
                    time: 2000
                  },
                  () => {
                    this.$emit("success", {type:'updateSize',bt:true});
                  }
                );
              } else {
                layer.msg(data.status, {
                  icon: 7
                });
              }
            }
          });
        }
      }
    },
    created() {}
  };

</script>
<style>
 textarea::placeholder{
      color: #999;
  }
</style>

