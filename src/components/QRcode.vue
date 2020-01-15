<template>
  <div id="qrcode"></div>
</template>

<script>
  import QRcode from 'qrcodejs2'
  export default {
    name: 'QRcode',
    data() {
      return {

      }
    },
    props:['text'],
    methods: {
      getQR() {
        let qrcode = new QRcode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: this.text, // 二维码内容
          image: ''
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'  
        })
      }
    },
    mounted() {
      this.getQR();
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
