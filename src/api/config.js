import axios from 'axios'
import qs from 'qs' 
axios.defaults.timeout = 20000; //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
// axios.defaults.baseURL = '你的接口地址';   //配置接口地址

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  layer.msg('错误的传参', {
    icon: 2
  })
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
function post(url, params, mConfig) { 
  let isReg = mConfig ? mConfig.isReg : null; 
  axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('access_token');
  if(isReg){
    axios.defaults.headers.common['Authorization']='';
  }
  return new Promise((resolve, reject) => {
    axios.post(url, params, mConfig)
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null; 
        if (response.data.code == 401) { 
          location.href = process.env.DEVURL+'/login';
          return false;
        }
        if (response.data.code !== 200) {
          if (failureCallback) {
            failureCallback(response.data);
          } 
          if (alertErr !== 'no') {
            layer.msg(response.data.msg, {
              icon: 2
            })
          }
          return false;
        }
        resolve(response.data);
      }, err => { 
        reject(err);
      })
      .catch((error) => { 
        reject(error)
      })
  })
}
//返回一个Promise(发送put请求)
function put(url, params, mConfig) {
  axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    axios.put(url, params, mConfig)
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        if (response.data.code == 401) {
          location.href = process.env.DEVURL+'/login';
          return false;
        }
        if (response.data.code !== 200) {
          if (failureCallback) {
            failureCallback(response.data);
          }
          if (alertErr !== 'no') {
            layer.msg(response.data.msg, {
              icon: 2
            })
          }
          return false;
        }
        resolve(response.data);
      }, err => { 
        reject(err);
      })
      .catch((error) => { 
        reject(error)
      })
  })
}
////返回一个Promise(发送get请求)
function get(url, param, mConfig) {
  axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
      .then(response => {
        let isJump = mConfig ? mConfig.jump : null;
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        if (response.data.code == 401) {
          if (isJump == 'no') { //判断是否登录 不跳转
            resolve(response.data);
          } else {
            location.href = process.env.DEVURL+'/login';
            return false;
          }
        }
        if (response.data.code !== 200) {
          if (alertErr !== 'no') {
            layer.msg(response.data.msg, {
              icon: 2
            })
          }
          return false;
        }
        resolve(response.data)
      }, err => { 
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
////返回一个Promise(发送delete请求)
function del(url, param,mConfig) {
  axios.defaults.headers.common['Authorization']='Bearer ' + localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    axios.delete(url, {
        params: param
      })
      .then(response => {
        let failureCallback = mConfig ? mConfig.failureCallback : null;
        let alertErr = mConfig ? mConfig.alertErr : null;
        if (response.data.code == 401) {
          location.href = process.env.DEVURL+'/login';
          return false;
        }
        if (response.data.code !== 200) {
          if (alertErr !== 'no') {
            layer.closeAll();
            layer.msg(response.data.msg, {
              icon: 2
            })
          }
          return false;
        }
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  put,
  del
}
