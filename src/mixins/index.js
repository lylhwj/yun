 export default {
   data() {
     // 表单验证规则
     let validatorEmail = (rule, value, callback) => {
       if (!value) {
         callback(new Error('请输入邮箱'));
       } else if (value.length < 4 || !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(value)) {
         callback(new Error('邮箱格式错误'));
       } else {
         this.GET({
           api: `/user.php?op=regcheck&action=email&key=${value}`,
           alertErr: 'no',
           success: (data) => {
             if (data.status !== 200) {
               callback(new Error(data.status));
             } else {
               callback();
             }
           }
         })
       }
     }
     let validatorPhone = (rule, value, callback) => {
       if (!value) {
         callback(new Error('请输入手机号'));
       } else if (!/^1[0-9]{10}$/.test(value)) {
         callback(new Error('手机格式错误'));
       } else {
         this.GET({
           api: `/user.php?op=regcheck&action=mobile&key=${value}`,
           alertErr: 'no',
           success: (data) => {
             if (data.status !== 200) {
               callback(new Error(data.status));
             } else {
               callback();
             }
           }
         })
       }
     }
     let validatorRequire = (rule, value, callback) => {
       let ruleMsg = '';
       switch (rule.field) {
         case 'phoneCode':
           ruleMsg = '请输入验证码';
           break;
         case 'oldPwd':
           ruleMsg = '请输入原密码';
           break;
         case 'newPwd':
           ruleMsg = '请输入新密码';
           break;
         case 'newSecurityCode':
           ruleMsg = '请输入新安全码';
           break;
         case 'addFlieName':
           ruleMsg = '请输入文件夹名';
           break;
         case 'addMaskName':
           ruleMsg = '请输入标记名';
           break;
         case 'editFlieName':
           ruleMsg = '请输入文件夹名';
           break;
         case 'passFile':
           ruleMsg = '请输入密码';
           break;
       }
       if (!value) {
         callback(new Error(ruleMsg));
       } else {
         callback();
       }
     }
     return {
       customRule: {
         email: [{
           validator: validatorEmail,
           trigger: 'blur'
         }],
         phone: [{
           validator: validatorPhone,
           trigger: 'blur'
         }],
         phoneCode: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         oldPwd: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         newPwd: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         newSecurityCode: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         addFlieName: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         editFlieName: [{
           validator: validatorRequire,
           trigger: 'blur'
         }],
         passFile: [{
           validator: validatorRequire,
           trigger: 'blur'
         }]
       }
     }
   },
   computed: {
     // 用户信息
     userInfo() {
       return this.$store.state.user.userInfo;
     },
     //未读信息
     unreadMessagesCount() {
       return this.$store.state.user.unreadMessagesCount;
     }
   },
   methods: {
     //路由跳转
     jump(to) {
       if (this.$router) {
         this.$router.push(to);
       }
     },
     //ajax请求
     GET(config) {
       let api = config.api || '';
       let reqData = config.data || {}; 
       $.ajax({
         type: "GET",
         url: '//api.bianyue.cn' + config.api,
         data: reqData, 
         dataType: "jsonp",
         success: (data) => {
           if (data.status == '请先登录') {
             layer.msg('请先登录', {
               icon: '7',
               time: 3000
             }, () => {
               $.ajax({
                 type: "POST",
                 headers: {
                   'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                 },
                 url: process.env.APIURL + '/auth/logout',
                 success: (data) => {
                   if (data.code == 200) {
                     let domain = 'bianyue.cn';
                     $.cookie("btcheck", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("login_username", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("login_password", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("pan_topid", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("pan_photo_topid", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("file_file_topid", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("favorite_file_topid", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("contact_file_topid", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("pan_page", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("file_page", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("login_username", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     $.cookie("login_password", "", {
                       domain: domain,
                       expires: -1,
                       path: "/"
                     });
                     setTimeout(() => {
                       this.jump('/login');
                       this.removeStorage("vipUserInfo");
                     }, 0);
                   } else {
                     layer.msg(data.msg, {
                       icon: 2
                     })
                   }
                 }
               })

             })
           } else if (data.status == 200 || config.alertErr === 'no') {
             config.success ? config.success(data) : null;
           } else if (data.status.indexOf('如非本人操作，请及时修改密码') !== -1) {
             layer.msg(data.status, {
               icon: 2,
               time: 2000
             }, () => {
               window.location.reload();
             });
           } else {
             layer.msg(data.status, {
               icon: 2
             });
           }
         },
         error: (data) => {
           layer.msg(data, {
             icon: 2
           });
           config.error ? config.error(data) : null;
         }
       })
     },
     setUserInfo(userInfo) {
       let userAvatar = `//api.bianyue.cn/uploadfile/user_avatar/origin/${
        userInfo.userid
      }.jpg`;
       this.$store.commit("changeUserInfo", {
         userInfo
       });
       this.$store.commit("changeUserInfo", {
         userAvatar
       });
     },
     setStorage(key, value) {
       if (!window.localStorage) {
         layer.alert("浏览器不支持");
         return false;
       }
       localStorage.setItem(key, value);
     },
     getStorage(key) {
       if (!window.localStorage) {
         layer.alert("浏览器不支持");
         return false;
       }
       return localStorage.getItem(key);
     },
     removeStorage(key) {
       localStorage.removeItem(key);
     },
     timeDownReady() {
       this.countdown = 60;
       clearTimeout(this.timeDownTimeOut);
       this.timeDownTimeOut = null;
     },
     timeDown(callback, callback2) {
       if (this.countdown <= 0) {
         callback();
         this.countdown = 60;
         return;
       } else {
         callback2(this.countdown);
         this.countdown--;
       }
       this.timeDownTimeOut = setTimeout(() => {
         this.timeDown(callback, callback2);
       }, 1000)
     }
   },

 }
