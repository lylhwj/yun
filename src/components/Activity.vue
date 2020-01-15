<template> 
    <div class="newyear_box"> 
      <a target="_blank" href="http://vip.bianyue.cn/vip/index?pay=true" class="pay"></a>
      <p class="check">
        <el-checkbox v-model="checkbox" @change="change">
          <span class="white">不再显示</span>
        </el-checkbox></p>
    </div>   
</template>
<script> 
export default {
  name: "Activity",
  data() {
    return {
        checkbox:false
    };
  },
  methods:{
    change(){
        if(this.checkbox){
          this.setStorage('yunActivity','true');
        }else{
          this.removeStorage('yunActivity');
        } 
    }  
  },
  mounted() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.newyear_box {
  position: absolute;
  width: 680px;
  height:430px;
  top: 50%;
  left: 50%;
  margin-top: -236px;
  margin-left: -340px;
  background: url('http://cdnres.bianyue.cn/lyl/img/ad.png') no-repeat;
  background-size:100%;
}
.newyear_box .close {
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 25px;
  height: 25px;
  background: url(../assets/icon_bt_add2@.png);
  background-size: cover;
}
.newyear_box a.pay {
  display: block;
  width: 207px;
  height: 45px;
  margin: 330px 0 0 295px;
  cursor: pointer;
}
.newyear_box p.check {
  margin: 5px 0 0 585px;
}
.newyear_box p.check .white {
  color: rgba(255, 255, 255, 0.5);
}
</style>