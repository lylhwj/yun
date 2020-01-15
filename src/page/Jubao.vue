<template>
<div>
  <div class="jubao_header">
      <div class="container">
          <a href="http://yun.bianyue.cn/">违法和不良信息举报受理和处置管理办法</a>
      </div>
  </div>
  <div class="wrap mt20">
    <div class="article">
      <h2>告广大用户：</h2>
      <p>为保障广大用户的合法权益，营造文明健康的网络环境，树立良好的社会形象，边乐云本着切实履行网站主体责任，畅通举报受理渠道、及时处理举报信息的原则，结合网站实际情况特制订并公布本网相关管理办法。</p>
      <div class="pad">
        <h3>一、机构设置</h3>
        <p> 边乐云信息安全小组为本网违法和不良信息举报受理部门，网站政务部、客服部、宣传部、法务部、技术中心等部门协助完成举报信息处置工作。</p>
        <h3>二、举报信息受理范畴</h3>
        <p>在本网刊载的，具有如下性质的违法和不良信息：</p>
        <p>反对宪法所确定的基本原则的；</p>
        <p>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
        <p>损害国家荣誉和利益的；</p>
        <p>煽动民族仇恨、民族歧视，破坏民族团结的；</p>
        <p>破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
        <p>散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
        <p>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
        <p>侮辱或者诽谤他人，侵害他人合法权益的；</p>
        <p>涉及他人隐私、个人信息或资料的；</p>
        <p>侵害他人名誉权、荣誉权、肖像权、知识产权、商业秘密等合法权利的；</p>
        <p>含有法律、行政法规禁止的其他内容的。</p>
        <h3>三、举报信息受理流程</h3>
        <p>网站设置举报电话，值班人员负责接听举报电话并做好电话记录；</p>
        <p>网站设置举报邮箱，值班人员定期查看邮箱并整理记录；</p>
        <p>值班人员每日登录相关举报业务处理系统，查收转给本网站的举报信息并整理记录；</p>
        <p>以上记录均报送边乐云信息安全小组，由该组统筹受理。</p>
        <h3>四、举报信息处置流程。</h3>
        <p>即日起，本网在首页显著位置设置“举报受理和处置管理办法”专区入口，充分发挥社会公众的参与监督作用。</p>
        <p> 网站客服部根据举报信息，对举报内容进行细化分类、甄别核实。</p>
        <p>边乐云信息安全小组根据举报信息，对举报内容进行核实。</p>
        <p>对于属实的举报信息，立即上报相关领导，第一时间做出处理。处理完成后，网站将及时向举报者反馈处理情况，如出现联系不到举报者的情况将予以注明。</p>
        <p>不属于本网站受理的举报信息，应当及时告知举报人并引导其在相应的渠道反映情况。</p>
        <p>涉及危害国家安全、扰乱社会秩序等内容的重要举报信息，本网将及时上报相关主管部门。</p>
        <p>本网将严格保护举报人的个人隐私，不向第三方机构或个人透露举报人的任何信息。对于举报受理及处置过程中所形成的资料，网站会及时整理归档并做好保密工作。</p>
        <p>边乐云违法和不良信息举报电话：0596-2949294</p>
        <p>违法和不良信息举报邮箱：<a href="mailto:jubao@bianyue.cn" target="_blank" style="color: #333;">jubao@bianyue.cn</a></p>
      </div>
      <p class="fcr gray"> 边乐云网盘<br>2019年1月22日</p>
      <p class="fct"><a href="javascript:;" id="js_jiu_btn" class="btn_jubao" @click="goJubao">举报有害信息</a></p>
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
    title: "违法和不良信息举报受理和处置管理办法_边乐网"
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
  created() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>