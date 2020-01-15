import Vue from 'vue'
import Router from 'vue-router'
import File from '@/page/File'
import Photo from '@/page/Photo'
import Lixian from '@/page/Lixian' 
import Lixian2 from '@/page/Lixian2' 
import Login from '@/page/Login'
import Reg from '@/page/Reg'
import App from '@/page/App'   
import TestAlert from '@/page/TestAlert'
import Yun404 from '@/page/404'
import Music from '@/page/Music'
import Contact from '@/page/Contact'
import FindPwd from '@/page/FindPwd' 
import Pay from '@/page/Pay'
import Mypc from '@/page/Mypc' 
import Jubao from '@/page/Jubao'
import Dhsf from '@/page/Dhsf'
import Search from '@/page/Search'
import Recover from '@/page/Recover'
import Favorites from '@/page/Favorites'
import FavoritesDetail  from '@/page/FavoritesDetail'
Vue.use(Router)

export default new Router({
  base: '/',
  mode: 'history',
  routes: [{
    path: '/',
    component: Login
  },{
    path: '/file',
    name: 'File',
    component: File
  },{
    path: '/photo',
    name: 'Photo',
    component: Photo
  },{
    path: '/lixian',
    name: 'Lixian',
    component: Lixian
  },{
    path: '/lixian2',
    name: 'Lixian2',
    component: Lixian
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/reg',
    name: 'Reg',
    component: Reg
  }, {
    path: '*',
    name: '404',
    component: Yun404,
    meta:{
      noLogin:true
    }
  },{
    path: '/app',
    name: 'App',
    component: App
  }, {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }, {
      path: '/music',
      name: 'Music',
      component: Music
    },{
      path: '/findPwd',
      name: 'FindPwd',
      component: FindPwd
    },{
      path: '/test',
      name: 'Test',
      component: TestAlert
    },{
      path:'/mypc',
      name:'Mypc',
      component:Mypc
    },{
      path:'/pay',
      name:'Pay',
      component:Pay
    },{
      path: '/jubao',
      name: 'Jubao',
      component: Jubao
    },{
      path: '/dhsf',
      name: 'Dhsf',
      component: Dhsf
    },{
      path: '/search',
      name: 'Search',
      component: Search
    },{
      path: '/recover',
      name: 'Recover',
      component: Recover
    },{
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    },{
      path: '/favoritesDetail',
      name: 'FavoritesDetail',
      component: FavoritesDetail
    }]
})