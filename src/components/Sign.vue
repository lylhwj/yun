<template>
  <div class="qian_popup" style="height:500px;">
    <div class="pad15 f16">边乐签到<a href="javascript:;" @click="openRule" class="fr icon_help2"></a></div>
    <div class="qian_head">
      <div class="fl white mt20 f16 lineh20">
        <p>连续签到<span class="f38"> {{rand_info.rand_sum}}</span> 天</p>
        <p class="mt4">累计获得：{{rand_info.total}}GB</p>
      </div>
      <div class="fcr fr">
        <a href="" class="disb white f16 mb8">&nbsp;<!-- 签到提醒 --></a>
        <el-button v-if="!isTodaySign" type="primary" size="small"><span class="f14" @click="sign">签到</span></el-button>
        <el-button v-else type="primary" plain size="small"><span class="f14">已签到</span></el-button>        
      </div>
    </div>
    <div class="sign_bar">
      <p :style="{'width':20*rand_info.rand+'%'}"></p><span></span>
    </div>
    <div class="pad30_lr flex flex_between blue_light">
      <span :class="[rand_info.rand==1?'blue':'']">第1轮</span>
      <span :class="[rand_info.rand==2?'blue':'']">第2轮</span>
      <span :class="[rand_info.rand==3?'blue':'']">第3轮</span>
      <span :class="[rand_info.rand==4?'blue':'']">第4轮</span>
      <span :class="[rand_info.rand==5?'blue':'']">第5轮</span>
    </div>
    <div class="m_auto mt20 qian_count">
        <div class="Calendar">
          <div id="toyear" class="flex flex_center">
              <div id="idCalendarPre" @click="preMonth">&lt;</div>
              <div class="year-month">
                <span>{{year}}</span>年<span>{{month}}</span>月
              </div>
              <div id="idCalendarNext" @click="nextMonth">&gt;</div>
          </div>
          <table border="0" cellpadding="0" cellspacing="0">
            <thead>
              <tr class="tou blue">
                <td>日</td>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td>六</td>
              </tr>
            </thead>
            <tbody id="idCalendar">
            </tbody>
          </table>
        </div>
    </div>
    <!-- 签到 -->
    <div id="JS_result" class="disn">
      <div class="fct">
        <img class="mt30" style="width:200px;" src="@/assets/icon_qiandao_point@2x.gif" alt="" />
        <div class="fct f18">
          您已签到<p class="mt10 blue">获得{{toDayResult}}云下载空间</p>
        </div>
      </div>
    </div>
    <div id="JS_rule" class="disn">
      <div class="pad22">
        <h3 class="fct blue f18">签到规则</h3>
        <p class="mt20">1.连续签到30天为一轮，签到共分5轮；连续5轮后重新从第1轮开始；</p>
        <p class="mt6">2.每次签到至少奖励1GB空间，连续签到一整轮将获额外奖励，详见下表；</p>
        <p class="mt6">3.中途漏签一天则退回至该轮第一天；回到第一天后若再漏签则退回上一轮，以此类推。</p>
        <table class="mt20 table_sign fct">
          <tr>
            <th>轮数</th>
            <th>每日奖励</th>
            <th>额外奖励</th>
          </tr>
          <tr>
            <td>第1轮</td>
            <td>1GB</td>
            <td class="orange">1TB</td>
          </tr>
          <tr>
            <td>第2轮</td>
            <td>2GB</td>
            <td class="orange">2TB</td>
          </tr>
          <tr>
            <td>第3轮</td>
            <td>3GB</td>
            <td class="orange">3TB</td>
          </tr>
          <tr>
            <td>第4轮</td>
            <td>4GB</td>
            <td class="orange">4TB</td>
          </tr>
          <tr>
            <td>第5轮</td>
            <td>5GB</td>
            <td class="orange">5TB</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/index";
  export default {
    name: "Sign",
    data() {
      return {
        isTodaySign: false,
        dataList: [],
        rand_info: {
          rand: 1,
          rand_sum: 0,
          total: 0
        },
        toDayResult: "1GB",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        Calendar: null,
        cale: null
      };
    },
    components: {

    },
    methods: {
      sign() {
        api.sign({}).then(data => {
          this.getSignLog({});
          this.cale.SignIn();
          this.isTodaySign = true;
          this.toDayResult = data.data.ret;
          layer.open({
            type: 1,
            title: false,
            shade:false,
            anim: 2,
            area: ["500px", "320px"], //宽高
            content: $("#JS_result"),
          });
        });
      },
      getSignLog(config) {
        api
          .signLog({
            year: config.year || new Date().getFullYear(),
            mon: config.month || new Date().getMonth() + 1
          })
          .then(response => {
            this.dataList = [];
            response.data.check_in_log.forEach(element => {
              this.dataList.push(new Date(element.check_date).getTime());
              this.rand_info = response.data.rand_info;
            });
            if (config.init) {
              this.createRL(this.dataList);
            } else if (config.callback) {
              config.callback(this.dataList);
            }
          });
      },
      createRL(dataList) {
        let Calendar = this.Calendar;
        let _this = this;
        this.cale = new Calendar("idCalendar", {
          qdDay: dataList,
          onToday: function (o) {
            o.className = "onToday";
          },
          onSignIn: function () {
            _this.isTodaySign = true;
          },
          onNoSignIn: function (date, o) {
            if (
              date.year == new Date().getFullYear() &&
              date.month == new Date().getMonth() + 1 &&
              date.day == new Date().getDate() &&
              !_this.isTodaySign
            ) {
              o.className = "isToday";
            }
          },
          onFinish: function () {
            _this.year = this.Year;
            _this.month = this.Month; //表头年份
          }
        });
      },
      preMonth() {
        this.cale.PreMonth();
      },
      nextMonth() {
        this.cale.NextMonth();
      },
      // 打开规则
      openRule() {
        layer.open({
          type: 1,
          title: false,
          anim: 2,
          area: ["600px", "360px"], //宽高 
          shade:false,
          content: $("#JS_rule"),
        });
      }
    },
    mounted() {
      let _this = this;
      let $$ = function (id) {
        return "string" == typeof id ? document.getElementById(id) : id;
      };
      let Class = {
        create: function () {
          return function () {
            this.initialize.apply(this, arguments);
          };
        }
      };
      Object.extend = function (destination, source) {
        for (var property in source) {
          destination[property] = source[property];
        }
        return destination;
      };
      this.Calendar = Class.create();
      this.Calendar.prototype = {
        initialize: function (container, options) {
          this.Container = $$(container); //容器(table结构)
          this.Days = []; //日期对象列表
          this.SetOptions(options);
          this.Year = this.options.Year;
          this.Month = this.options.Month;
          this.onToday = this.options.onToday;
          this.onSignIn = this.options.onSignIn;
          this.onNoSignIn = this.options.onNoSignIn;
          this.onFinish = this.options.onFinish;
          this.qdDay = this.options.qdDay;
          this.isSignIn = false;
          this.Draw();
        },
        //设置默认属性
        SetOptions: function (options) {
          this.options = {
            //默认值
            Year: new Date().getFullYear(), //显示年
            Month: new Date().getMonth() + 1, //显示月
            qdDay: null,
            onToday: function () {}, //已签到
            onSignIn: function () {}, //今天是否签到
            onNoSignIn: function () {}, //今天是否签到
            onFinish: function () {} //日历画完后触发
          };
          Object.extend(this.options, options || {});
        },
        //上一个月
        PreMonth: function () {
          //先取得上一个月的日期对象
          var d = new Date(this.Year, this.Month - 2, 1);
          //再设置属性
          this.Year = d.getFullYear();
          this.Month = d.getMonth() + 1;
          //重新画日历
          _this.getSignLog({
            year: this.Year,
            month: this.Month,
            callback: () => {
              this.Draw();
            }
          });
        },
        //下一个月
        NextMonth: function () {
          var d = new Date(this.Year, this.Month, 1);
          this.Year = d.getFullYear();
          this.Month = d.getMonth() + 1;
          _this.getSignLog({
            year: this.Year,
            month: this.Month,
            callback: () => {
              this.Draw();
            }
          });
        },
        //画日历
        Draw: function () {
          //签到日期
          var day = _this.dataList;
          //日期列表
          var arr = [];
          //用当月第一天在一周中的日期值作为当月离第一天的天数
          for (
            var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++
          ) {
            arr.push("&nbsp;");
          }
          //用当月最后一天在一个月中的日期值作为当月的天数
          for (
            var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++
          ) {
            arr.push(i);
          }
          var frag = document.createDocumentFragment();
          this.Days = [];
          while (arr.length > 0) {
            //每个星期插入一个tr
            var row = document.createElement("tr");
            //每个星期有7天
            for (var i = 1; i <= 7; i++) {
              var cell = document.createElement("td");
              cell.innerHTML = "&nbsp;";
              if (arr.length > 0) {
                var d = arr.shift();
                cell.innerHTML = "<span>" + d + "</span>";
                if (d > 0 && day.length) {
                  for (var ii = 0; ii < day.length; ii++) {
                    this.Days[d] = cell;
                    //已签到
                    if (
                      this.IsSame({
                          year: this.Year,
                          month: this.Month,
                          day: d
                        },
                        day[ii]
                      )
                    ) {
                      this.onToday(cell);
                    }
                    //判断今天是否签到
                    if (this.checkSignIn(new Date(), day[ii])) {
                      this.onSignIn(cell);
                    }
                  }
                }
              }
              this.onNoSignIn({
                  year: this.Year,
                  month: this.Month,
                  day: d
                },
                cell
              );
              row.appendChild(cell);
            }
            frag.appendChild(row);
          }
          //先清空内容再插入(ie的table不能用innerHTML)
          while (this.Container.hasChildNodes()) {
            this.Container.removeChild(this.Container.firstChild);
          }
          this.Container.appendChild(frag);
          this.onFinish();
          if (this.isSignIn) {
            this.isSignIn = false;
            return this.SignIn();
          }
        },
        //是否签到
        IsSame: function (d1, d2) {
          d2 = new Date(d2);
          return (
            d1.year == d2.getFullYear() &&
            d1.month == parseInt(d2.getMonth()) + 1 &&
            d1.day == d2.getDate()
          );
        },
        //今天是否签到
        checkSignIn: function (d1, d2) {
          d2 = new Date(d2);
          return (
            d1.getFullYear() == d2.getFullYear() &&
            d1.getMonth() == d2.getMonth() &&
            d1.getDate() == d2.getDate()
          );
        },
        //签到
        SignIn: function () {
          var now = new Date();
          var Year = now.getFullYear();
          var Month = now.getMonth() + 1;
          if (Year != this.Year || Month != this.Month) {
            this.Year = Year;
            this.Month = Month;
            this.isSignIn = true;
            return this.Draw();
          }
          var day = now.getDate();
          var arr = new Array();
          var tb = document.getElementById("idCalendar");
          for (var i = 0; i < tb.rows.length; i++) {
            for (var j = 0; j < tb.rows[i].cells.length; j++) {
              if (
                day == tb.rows[i].cells[j].innerText &&
                Year == this.Year &&
                Month == this.Month
              ) {
                if (tb.rows[i].cells[j].className == "onToday") {
                  return 2;
                }
                tb.rows[i].cells[j].className = "onToday";
                return 1;
              }
            }
          }
        }
      };

      $("#JS_sign").height(
        $(window).height() - $("#JS_sign_header").height() - 5
      );
    },
    created() {
      this.getSignLog({
        init: true
      });
    }
  };
</script>
<style>
.qian_popup { width:429px; }
.qian_popup .pad15 { padding:10px; }
.qian_head { height:128px; padding:16px 20px 0 88px;background: url(../assets/bg_qiandao.svg) center top no-repeat; }
.qian_count { width:370px; }
.sign_bar { position:relative; height:14px; margin:0.8rem 28px; border-radius:14px; background:#e8e8e8; }
.sign_bar p { height:14px; border-radius:14px; background:linear-gradient(to right,#06dbff, #0693ff); }
.sign_bar span { display:inline-block; position:absolute; right:0; top:-10px; width:25px; height:30px; background:url(../assets/icon_qiandao.svg);
 animation:mytip 2s .15s linear infinite; }
@keyframes mytip{
10% { transform:rotate(15deg); }
20% { transform:rotate(-10deg); }
30% { transform:rotate(5deg); }
40% { transform:rotate(-5deg); }
50%,100% { transform:rotate(0deg); }
}
.Calendar{background:#fff;}
.Calendar #toyear{margin:0 auto;width:100%;height:40px; color:#000;text-align:center; }
.Calendar #toyear .year-month{height:100%;line-height:30px;}
.Calendar #toyear #idCalendarNext,.Calendar #toyear #idCalendarPre{padding:0 20px;height:100%;color:#999;text-align:center;font-size:14px;line-height:30px;cursor:pointer;}
.Calendar table,.Calendar td,.Calendar tr{border:0;font-size:12px; }
.Calendar table{margin:0 auto;width:100%;}
.Calendar table tr{height:24px;text-align:center;}
.Calendar table tr td span{display:block; position:relative; margin:2px auto;width:24px;height:24px;border-radius:100%;text-align:center;line-height:14px;}
.Calendar table tr .isToday span{background:#3f9fff;color:#fff;line-height:24px;}
.Calendar table tr .onToday span:after{ display:block; width:4px; height:4px; margin:0 auto; background:#ff9061; border-radius:50%; content:""; }
.Calendar table tr .onToday span:hover:after { position:absolute; top:0; background:#ff9061; width:24px; height:24px; color:#fff; line-height: 24px; content:"签"; }
.table_sign { width:100%; border:1px solid #ddd; }
.table_sign th { padding:5px 10px; border:1px solid #ddd; background:#fafafa; }
.table_sign td { padding:5px 10px; border:1px solid #ddd; }
</style>