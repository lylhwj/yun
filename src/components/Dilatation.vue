<template>
  <div >
    <el-alert title="扩容比例：1元＝10MB" type="error"></el-alert>
    <table class="table_2" width="500">
      <tr>
        <td>支付金额：</td>
        <td><el-input style="width:108px;" type="input" v-model="input" placeholder=""></el-input> 元，可扩容空间 1GB</td>
      </tr>
      <tr>
        <td>支付方式：</td>
        <td>
        <ul class="bank_list">
          <li class="hover">
            <input type="radio" id="js_payment_sel_weixin">
            <label for="js_payment_sel_weixin">
              <i class="pay_ipt ipt_weixin"></i>
              <b>微信支付</b>
            </label>
            <i class="check"></i>
          </li>
          <li>
            <input type="radio" id="js_payment_sel_ali">
            <label for="js_payment_sel_ali">
              <i class="pay_ipt ipt_alipay"></i>
              <b>支付宝</b>
            </label>
            <i class="check"></i>
          </li>
          <li>
            <input type="radio" id="js_payment_sel_union">
            <label for="js_payment_sel_union">
              <i class="pay_ipt ipt_unionpay"></i>
              <b>中国银联</b>
            </label>
            <i class="check"></i>
          </li>
        </ul>
        </td>
      </tr>
      <tr>
        <td>应付金额：</td>
        <td><strong class="f30 orange">0.00</strong> 元</td>
      </tr>
      <tr> 
        <td colspan="2"><el-checkbox v-model="checkbox"><a target="_blank" href="http://vip.gaibian.bianyue.cn/Agreementuser">同意服务协议</a></el-checkbox> </td>
      </tr>
    </table>
    <p class="fct mb20 pb10"><el-button type="primary" @click="submit"><span class="pad30_lr f16">马上扩容</span></el-button></p>
  </div><!-- 文件空间扩容 600px*400px -->
</template>
<script>
export default {
  name: "dilatation",
  data() {
    return {
      input: "",
      checkbox:true
    };
  },
  methods:{
    submit(){

    }
  },
  mounted() {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>