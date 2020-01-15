<template>
<div>
  <div class="jubao_header dhsf_header">
      <div class="container">
          <a href="http://yun.bianyue.cn/">违法和不良信息举报受理和处置管理办法</a>
      </div>
  </div>
  <div class="wrap mt20">
    <div class="mb10">
      <a target="_blank" href="http://yun.bianyue.cn" class="f20 fd blue" title="边乐云">边乐云</a> > 
      <span class="f16">扫黄打非中心</span>
    </div>
    <ul class="help_list">
      <li><a href="helpDetail">如何更换绑定手机号码</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">购买服务时支付遇到问题怎么办？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何增大空间？<span class="fr grayc">更新时间:2018-10-8 15:28></span></a></li>
      <li><a href="">账号被盗？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何开通VIP服务？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何管理文件档案？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何增大空间？<span class="fr grayc">更新时间:2018-10-8 15:28></span></a></li>
      <li><a href="">账号被盗？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何开通VIP服务？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何管理文件档案？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何增大空间sss？<span class="fr grayc">更新时间:2018-10-8 15:28></span></a></li>
      <li><a href="">账号被盗？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何开通VIP服务？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
      <li><a href="">如何管理文件档案？</a><span class="fr grayc">更新时间:2018-10-8 15:28></span></li>
    </ul><!-- 一页只提取10条 -->
    <div class="fct"><el-pagination background layout="prev, pager, next":total="1000"> </el-pagination></div>
    <div class="desc_contents">
      <div class="net_police"></div>
      <div class="cell cell_left">
        <h3>有害信息对社会稳定危害极大</h3>
        <p>如果任由有害信息充斥市场、非法经营，社会秩序和经济秩序将遭到严重破坏，社会道德、社会公德、社会安定，特别是未成年人的健康成长也将受到重大冲击。</p>
        <ul>
          <li><a href="http://yun.bianyue.cn/dhsf/1/" target="_blank">2017年努力营造风清气正的社会文化环境</a></li>
          <li><a href="http://yun.bianyue.cn/dhsf/2/" target="_blank">严厉打击利用网络交易淫秽色情信息行为</a></li>
          <li><a href="http://yun.bianyue.cn/dhsf/3/" target="_blank">坚决打击利用网络新技术新应用传播淫秽色情信息行为</a></li>
        </ul>
      </div>
      <div class="cell cell_right">
        <h3>公安部刑侦局提示</h3>
        <p>传播淫秽物品，图片超过250张，视频超过20条以上并以此牟利，就构成犯罪。即便没有达到以上标准，但点击量超过3万次或下载超过600次也构成犯罪。</p>
        <ul>
          <li><a href="http://yun.bianyue.cn/dhsf/6/" target="_blank">新疆十一起网上传播违法信息典型案例查处</a></li>
          <li><a href="http://yun.bianyue.cn/dhsf/7/" target="_blank">“老虎”直播平台被打，“黄鳝门”女主播被抓</a></li>
          <li><a href="http://yun.bianyue.cn/dhsf/8/" target="_blank">内蒙古微信群传播淫秽物品牟利案宣判</a></li>
        </ul>
      </div>
    </div>
    <p class="fct"><a href="javascript:;" id="js_jiu_btn" class="btn_jubao" @click="goJubao">举报有害信息</a></p>
    <div class="fct dhsf_nav">
      <a href="http://www.12377.cn/" target="_blank">向互联网举报中心举报</a>
      <a href="http://www.shdf.gov.cn/shdf/channels/740.html" target="_blank">向中国扫黄打非网举报</a>
      <a href="http://dhsf.bianyue.cn/" target="_blank">了解更多“扫黄打非 净网2019”</a>
    </div>
  </div>
  <div class="fct pad22">Copyright &copy; 边乐云. All Rights Reserved. </div>
  <div id="JubaoBox" class="disn">
    <el-alert title="我们一直努力为用户打造健康的网络环境，我们坚决反对违法、色情、暴力、反动或任何不健康的内容。欢迎广大网友积极举报违规内容，以便我们及时和精确地处理。" type="error"></el-alert>
    <el-form label-width="80px" ref="" class="demo-ruleForm pad22" status-icon>
    <el-form-item label="标题" prop="">
      <el-input placeholder="请输入标题" type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="链接(URL)" prop="">
      <el-input placeholder="请输入链接(URL)"  type="text" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="问题类型" prop="">
      <el-radio v-model="radio" label="1">色情</el-radio>
      <el-radio v-model="radio" label="2">侵权</el-radio>
      <el-radio v-model="radio" label="3">恐怖主义</el-radio>
      <el-radio v-model="radio" label="4">反动政治</el-radio>
      <el-radio v-model="radio" label="5">其他</el-radio>
    </el-form-item>
    <el-form-item label="描述" prop="">
      <el-input type="textarea":rows="5" placeholder="请详细描述投诉理由，便于我们准确处理（500个字 以内）" v-model="textarea"></el-input>
    </el-form-item>
    <p class="fct">
      <el-button type="primary" @click="submit">提交</el-button>
    </p>
    </el-form>
  </div><!-- 举报弹出框 -->
  <div id="" class="disn"> 
    <div class="jubao_success">
      <img src="@/assets/jubao/icon_hint_suc.png" alt="" width="80" class="fl">
      <div class="fl ">
          <h3 class="green f20 mb10">举报成功！</h3>
          <p>感谢你的支持，我们会尽快处理有害信息。</p>
          <p>建设积极健康的网络环境，需要你我共同参与。</p>
      </div>
    </div>
  </div><!-- 举报成功 500px*240px-->
</div>
</template>
<script>
import "@/assets/jubao/jubao.css";
export default {
  name: "jubao",
  metaInfo: {
    title: "边乐云网盘 - 扫黄打非 • 净网2019"
  },
  data() {
    return {};
  },
  methods: {
    goJubao() {
      layer.open({
        type: 1,
        title: "举报投诉",
        anim: 2,
        area: ["700px", "520px"], //宽高
        content: $("#JubaoBox")
      });
    }
  },
  mounted() { 
    $(".layout-frame").addClass("layout-new-frame");
  },
  created() {

  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>