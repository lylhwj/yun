<template>
  <div v-loading="loading">
    <div class="meg_list">
      <table>
        <div class="none_warpper" v-if="isEmpty" v-loading="initLoading">
          <div class="none_bg" style="top:40%;" v-if="!initLoading">暂无消息</div>
        </div>
        <tr v-for="(msg,index) in data" :key="index">
          <td>
            <span :class="[msg.dxtype==0?'meg_type1':'meg_type2']"></span>
          </td>
          <td>
            <span class="f16">{{msg.typeName}}</span>
            <span class="gray">{{msg.time*1000|timeStamp}}</span>
            <p class="gray">
              <a href="javascript:;"   @click="readMsg(msg)">
                <span :class="{red:msg.dxstatus==0}">[{{msg.status}}]</span>{{msg.title|remove}}</a> <el-button v-if="msg.title.indexOf('【去赠送】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去赠送</el-button><el-button v-if="msg.title.indexOf('【去兑换】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去兑换</el-button><el-button v-if="msg.title.indexOf('【去绑定】')!==-1" type="primary" size="mini" @click="go(msg.url)" icon="el-icon-d-arrow-right">去绑定</el-button>
            </p>
          </td>
          <td>
            <a href="javascript:;" class="ico_del2" @click="handleDel(msg.id)"></a>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="!isEmpty">
      <a href="javascript:;" style="position:absolute; left:15px; bottom:22px;" @click="handleDelAll">
        <i class="f20 el-icon-delete"></i> 删除全部</a>
      <div class="fct pad15">
        <el-pagination background :current-page="currentPage" :page-size="5" layout="prev, pager, next" @current-change="msgPage"
          :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Message',
    data() {
      return {
        data: [],
        currentPage: 1,
        total: 1,
        loading: false,
        isEmpty: true,
        initLoading:true
      }
    },
    props: ['init'],
    filters:{
      remove(title){ 
        if(title.indexOf('【去赠送】')!==-1){
          return title.replace(/【去赠送】/,'');
        }
        if(title.indexOf('【去兑换】')!==-1){
          return title.replace(/【去兑换】/,'');
        }
        return title.replace(/【去绑定】/,'');
      }
    }, 
    methods: {
      // 获取数据
      getData(page) { 
        this.GET({
          api: `/user.php?op=info&action=duanxin&page=${page}`,
          success: (data) => {
            this.initLoading=false; 
            // 改变未读信息数量
            let unreadMessagesCount = data.total;
            this.isEmpty = parseInt(data.num) == 0;
            this.$store.commit('changeUserInfo', {
              unreadMessagesCount
            });
            this.currentPage = page;
            this.data = data.data || [];
            this.total = parseInt(data.num) == 0 ? 1 : parseInt(data.num);
            this.data.forEach(element => {
              element.status = element.dxstatus == 0 ? '未读' : '已读';
              element.typeName = element.dxtype == 0 ? '系统通知' : 'VIP服务通知';
            });
            setTimeout(() => {
              this.loading = false;
            }, 500);
          },
          errof:()=>{
            this.initLoading=false;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
        })
      },
      // 读取信息改变状态
      readMsg(row) {
        if (row.dxstatus == 1) {
          return false;
        }
        this.GET({
          api: `/user.php?op=info&action=read_info&id=${row.id}`,
          success: (data) => {
            this.loading = true;
            this.getData(this.currentPage);
          }
        })
      },
      // 有地址跳转
      go(url){
        layer.closeAll();
        this.jump(url);
      },
      // 信息分页
      msgPage(page) {
        this.getData(page);
      },
      // 删除信息
      handleDel(id) {
        this.GET({
          api: `/user.php?op=info&action=read_duanxin&id=${id}`,
          success: (data) => {
            layer.msg('删除成功', {
              time: 2000,
              icon: 1
            }, () => {
              this.loading = true;
              if (this.data.length == 1 && this.currentPage > 1) {
                this.getData(this.currentPage - 1);
                return false;
              }
              this.getData(this.currentPage);
            });
          }
        })
      },
      //删除所有
      handleDelAll() {
        layer.confirm(`您还有${this.unreadMessagesCount}条未读信息,是否确定删除？`, {
          icoc: 3
        }, () => {
          this.GET({
            api: `/user.php?op=info&action=delAll_duanxin`,
            success: (data) => {
              layer.msg('删除成功', {
                time: 2000,
                icon: 1
              }, () => {
                this.loading = true;
                this.getData(this.currentPage);
              });
            }
          })
        })
      }
    },
    mounted() {
      // if (this.init) {
      //   let unreadMessagesCount = this.init.total;
      //   this.isEmpty = parseInt(this.init.num) == 0;
      //   this.$store.commit('changeUserInfo', {
      //     unreadMessagesCount
      //   });
      //   this.currentPage = 1;
      //   this.data = this.init.data || [];
      //   this.total = parseInt(this.init.num) == 0 ? 1 : parseInt(this.init.num);
      //   this.data.forEach(element => {
      //     element.status = element.dxstatus == 0 ? '未读' : '已读';
      //     element.typeName = element.dxtype == 0 ? '系统通知' : 'VIP服务通知';
      //   });
      //   setTimeout(() => {
      //     this.loading = false;
      //   }, 500);
      // } else {
        this.getData(this.currentPage);
      // }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
