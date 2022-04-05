import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/soti',
    name: 'soti',
    component: ()=>import('../views/soti.vue')
  },
  {
    path: '/add-article',
    name: 'AddArticle',
    component: () => import('../views/AddArticle.vue'),
    //路由守卫
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {
        next()
      }
      else {
        next('/login')
      }
    }
  },
  {
    //登陆
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    //注册
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    //文章列表
    path: '/article-list',
    name: 'ArticleList',
    component: () => import('../views/AtricleList.vue'),
    //路由首位
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {
        next()
      }
      else {
        next('/login')
      }
    }
  },
  {
    //文章归档
    path: '/article-Pigeonhole',
    name: 'ArticlePigeonhole',
    component: () => import('../views/guidang.vue'),
    //路由首位
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {
        next()
      }
      else {
        next('/login')
      }
    }
  },
  {
    //文章内容
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue'),
    //路由守卫
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {
        next()
      }
      else {
        next('/login')
      }
    }
  },
  {
    //3D展示
    path: '/3dshow',
    name: '3dshow',
    component: () => import('../views/threeDshow.vue'),
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {

        let checkInfo = {
          contentType: 'api_wave_article',
          permissons: ['view']
        }
        store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res == true) {
            next()
          }
        })
      }
      else {
        next('/login')
      }
    },
  },

  {
    //用户管理
    path: '/UserPerm',
    name: 'UserPerm',
    component: () => import('../views/UserPerm.vue'),
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {

        let checkInfo = {
          contentType: 'auth_user',
          permissons: ['add', 'change', 'delete', 'view']
        }
        // 用户权限鉴定
        store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res == true) {
            next()
          }
        })
      }
      else {
        next('/login')
      }
    },
  },

  {
    //栏目管理
    path: '/Lanmuadmin',
    name: 'Lanmuadmin',
    component: () => import('../views/Lanmuadmin.vue'),
    beforeEnter: (to, from, next) => {
      // 判断用户是否登陆
      if (store.state.userinfo.token) {

        let checkInfo = {
          contentType: 'api_wave_Lanmu',
          permissons: ['add', 'change', 'delete', 'view']
        }
        // 用户权限鉴定
        store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res == true) {
            next()
          }
        })
      }
      else {
        next('/login')
      }
    },
  },

]

const router = new VueRouter({
  routes
})



export default router
