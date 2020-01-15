<template>
  <div>
    <Header></Header>   
      <div id="test">
    <ul class="f16 order_box">
      <li><a href=""><span class="order_all"></span>全部(50)</a></li>
      <li class="border_tb">
        <a href=""><span class="order_new"></span>最近(0)</a>
        <a href=""><span class="order_text"></span>文档(0)</a>
        <a href=""><span class="order_rar"></span>压缩包(2)</a>
        <a href=""><span class="order_encrypt"></span>加密(15)</a>
      </li>
      <li>
        <a href=""><span class="order_photo"></span>照片(5)</a>
        <a href=""><span class="order_video"></span>视频(8)</a>
        <a href=""><span class="order_audio"></span>音频(10)</a>
        <a href=""><span class="order_other"></span>其它(10)</a>     
      </li>
    </ul>
  </div><!-- 筛选文件 580px*225px -->
  <div id="test">
    <el-alert title="首次设置密码原密码为空；如需要取消加密设置，输入原密码后新密码为空" type="error"></el-alert>
    <el-form ref="form" :model="form" label-width="70px" class="demo-ruleForm pad22">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" v-model="input" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="input" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <p class="fct">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </p>
    </el-form>
  </div><!-- 文件加/解密 500px*295px -->
  <div id="test">
    <el-form ref="form" :model="form" label-width="70px" class="demo-ruleForm pad22">
      <span class="fl mr10 type_rar"></span>
      <el-input style="width:405px;" type="password" v-model="input" placeholder="请输入文件密码"></el-input>
      <div class="clear2"></div>
      <p class="fct">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </p>
    </el-form>
  </div><!-- 请输入文件密码 500px*195px -->
  <div id="test">
    <el-form ref="form" :model="form" class="demo-ruleForm pad22">
      <div class="w300 m_auto mt10">
        <el-radio v-model="radio" label="1"><span class="f16">删除该标记及标记下所有文件</span></el-radio>
        <p class="yellow mt4" style="margin-left:23px;">(删除后文件将不可恢复，谨慎操作哦)</p>
      </div>
      <div class="w300 m_auto mt30">
        <el-radio v-model="radio" label="2"><span class="f16">仅移除标记，保留原标记下所有文件</span></el-radio>
      </div>
      <p class="fct mt30">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认删除<!-- 确认移除 --></el-button>
      </p>
    </el-form>
  </div><!-- 删除标记 400px*270px -->
  <div id="test">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pad15">
      <el-breadcrumb-item :to="{ path: '/' }"><span class="fn">标记分类</span></el-breadcrumb-item>
      <el-breadcrumb-item>电影（125）</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pad15 border_t">
      <el-tag class="file_tag" closable><a>电影(125)</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag>
      <el-tag class="file_tag" closable type="success"><a>工作任务(95)</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag>
      <el-tag class="file_tag" closable type="info"><a>我的书籍(5)</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag>
      <el-tag class="file_tag" closable type="warning"><a>我的收藏(0)</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag>
      <el-tag class="file_tag" closable type="danger"><a>文档(25)</a><i class="el-icon-edit-outline el-icon-close el-tag__close"></i></el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm"@blur="handleInputConfirm"> </el-input> 
      <el-button v-else class="button-new-tag" @click="showInput">+ 新建标记</el-button>
    </div>
    <!--<div class="border_t">
      <el-table :data="tableData" stripe :show-header="false" style="width: 100%" height="336" class="el-table_pad5 scrollbar">
        <el-table-column label="" prop="type" width="70" align="center">
          <template slot-scope="scope">
              <span class="type_rar"></span>
          </template>
        </el-table-column>图标
        <el-table-column label="" prop="name">
        </el-table-column>名字
        <el-table-column label="" prop="" width="60">
          <template slot-scope="scope">
              <a href="" class="gray">移除</a>
          </template>
        </el-table-column>
      </el-table>
      <p class="fcr pad mt10">
        <a href="" class="mark_add"></a>
        <a href="" class="mark_del"></a>
      </p>
    </div> 表格 最多显示6行，多余的以滚动条显示,移除只在点击“减号”时出现 -->
  </div><!-- 文件标记 700px*490px -->
  <div id="test">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pad15">
      <el-breadcrumb-item :to="{ path: '/' }"><span class="fn">文件</span></el-breadcrumb-item>
      <el-breadcrumb-item>时光穿梭机</el-breadcrumb-item>
      <el-breadcrumb-item>新建文件夹</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="border_t">
      <el-table :data="tableData" stripe :show-header="false" style="width: 100%" height="336" class="el-table_pad5 scrollbar">
        <el-table-column label="" prop="type" width="70" align="center">
          <template slot-scope="scope">
              <span class="type_rar"></span>
          </template>
        </el-table-column><!-- 图标 -->
        <el-table-column label="" prop="name">
        </el-table-column><!-- 名字 -->
        <el-table-column label="" prop="" width="60">
          <template slot-scope="scope">
              <el-checkbox v-model="checked" class="fl"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <p class="fcr pad mt10">
        <el-button type="primary" plain @click="submit">确认添加(2)</el-button>
      </p>
    </div><!-- 表格 最多显示6行，多余的以滚动条显示 -->
  </div><!-- 选择要添加标记的文件 700px*490px -->
  <div id="test">
    <div class="border_t">
      <el-table :data="tableData" :show-header="false" style="width: 100%" height="240" class="scrollbar">
        <el-table-column label="" prop="name">
        </el-table-column>
      </el-table>
      <p class="pad15 border_b mb15"><a href="" class="blue">+新建标记</a></p>
      <p class="fct">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </p>
    </div>
  </div><!-- 将文件标记至 450px*410px -->
  <div id="test">
    <el-form ref="form" :model="form" label-width="70px" class="demo-ruleForm pad22">
      <el-input type="password" v-model="input" placeholder="输入新文件名"  style="width:300px;"></el-input>
      <el-input type="password" v-model="input" placeholder="输入起始数字(如01，001)" style="width:200px;"></el-input>
      <p class="fct mt20">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认修改</el-button>
      </p>
    </el-form>
  </div><!-- 批量命名 550px*200px -->
  <div id="test">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="pad15">
      <el-breadcrumb-item :to="{ path: '/' }"><span class="fn">文件</span></el-breadcrumb-item>
      <el-breadcrumb-item>时光穿梭机</el-breadcrumb-item>
      <el-breadcrumb-item>新建文件夹</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="border_t">
      <el-table :data="tableData" stripe :show-header="false" style="width: 100%" height="336" class="el-table_pad5 scrollbar">
        <el-table-column label="" prop="type" width="70" align="center">
          <template slot-scope="scope">
              <span class="type_rar"></span>
          </template>
        </el-table-column> 
        <el-table-column label="" prop="name">
        </el-table-column> 
      </el-table>
      <p class="fcr pad mt10">
        <a href="" class="fl mark_add_folder"></a>
        <el-button type="primary" plain @click="submit">确认移动(粘贴)</el-button>
      </p> 
    </div>
    
  </div><!-- 选择移动位置 700px*490px -->
  <div id="test">
    <el-alert title="警告：严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息。并积极配合展开“扫黄打非”净网行动。" type="warning"></el-alert>
    <el-form ref="form" :model="form">
      <div class="border fct upload_box">
        <span class="ico_upload"></span>
        <p class="f16 gray">拖拽文件或点击此处进行文件上传</p>
      </div>
      <p class="fct mt30">
        <el-button type="primary" plain @click="submit"><span class="pad30_lr f16">开始上传</span></el-button>
      </p>
    </el-form>
  </div><!-- 上传文件 580px*410px -->
  <div id="test">
    <el-form ref="form" :model="form" class="pad22">
      <div class="fct">
        <span class="ico_del"></span>
        <p class="f16 gray">确认删除所选文件？</p>      
      </div>
      <p class="fct mt30">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </p>
    </el-form>
  </div><!-- 提示 430px*290px -->
  <div id="test">
    <el-form ref="form" :model="form" class="pad22">
      <div class="fct">
        <span class="ico_yes"></span>
        <p class="f16 gray mt20">您已添加至传输列表下载任务</p>      
      </div>
    </el-form>
  </div><!-- 提示成功 350px*240px -->
  </div> 
</template>
<script>
import Header from "@/components/Header.vue";  
export default {
  name: "Home",
  data() {
    return {
       
    };
  },
  components: {
    Header: Header 
  },
  methods:{
    
  },
  created() {
    document.getElementsByTagName("title")[0].innerHTML = "文件_边乐云";
    //重新获取用户信息 
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 

</style>