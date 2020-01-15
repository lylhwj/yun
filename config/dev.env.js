'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEVURL:'"http://127.0.0.1:8080"',
  APIURL:'"//api2.bianyue.cn/web"',
  QQURL:'"https://graph.qq.com/oauth2.0/authorize?client_id=101457886&redirect_uri=http%3A%2F%2Fapi.bianyue.cn%2Fqqlogin.php%3Fop%3Dcallback_n_qq&scope=get_user_info&response_type=code"',
  WXURL:'"https://open.weixin.qq.com/connect/qrconnect?appid=wxba18d15013c1c868&redirect_uri=http%3A%2F%2Fapi.bianyue.cn%2Fqqlogin.php%3Fop%3Dcallback_n_weixin_web&response_type=code&scope=snsapi_login#wechat_redirect"',
})
