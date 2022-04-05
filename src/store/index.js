import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Qs from 'qs'
import router from '../router'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //用户信息存储
    userinfo: {},
    //路由限制
  },
  getters: {
    //读取状态数据内容
    //查询登陆状态
    //1、返回值为token 2、得到token
    isnotUserlogin (state) {
      return state.userinfo.token
    }
  },
  mutations: {
    //保存注册登陆用户信息
    saveUserinfo (state, userinfo) {
      state.userinfo = userinfo
    },
    //清空用户登陆状态
    clearUserinfo (state) {
      state.userinfo = {}
    }
  },

  actions: {
    //异步请求
    //登陆
    gcLogin ({ commit }, formData) {
      axios({
        url: 'http://180.76.116.149:9999/api/gc-login/',
        method: 'POST',
        data: Qs.stringify(formData)
      }).then((res) => {
        if (res.data == 'none') {
          alert('账户不存在')
          return
        }
        else {
          if (res.data == 'pwderr') {
            alert('密码错误')
          }
          else {
            console.log('登陆成功')
          }
        }
        console.log(res.data)
        commit('saveUserinfo', res.data)
        //将token存入缓存
        localStorage.setItem('token', res.data.token)
        router.push({ path: '/' })
      })
    },
    //注册
    gcRegister ({ commit }, formData) {
      axios({
        url: 'http://180.76.116.149:9999/api/gc-register/',
        method: 'POST',
        data: Qs.stringify(formData)
      }).then((res) => {
        if (res.data == 'repeat') {
          alert('用户名已存在')
          return
        }
        else {
          console.log(res.data)
          this.$store.commit('saveUserinfo', res.data)
          commit('saveUserinfo', formData)
          localStorage.setItem('token', res.data.token)
        }
      })
    },
    //自动登陆
    tryAutoLogin ({ commit }) {
      let token = localStorage.getItem('token')
      if (token) {
        axios({
          url: 'http://180.76.116.149:9999/api/auto-login/',
          method: 'POST',
          data: Qs.stringify({ token })
        }).then((res) => {
          if (res.data == 'tokentimeout') {
            alert('登陆信息过期')
            return
          }
          else {
            commit('saveUserinfo', res.data)
            //将token存入缓存
            localStorage.setItem('token', res.data.token)
            router.push({ path: '/' })
          }
        })
      }
    },
    //登出
    gcLogout ({ commit }, token) {
      commit('clearUserinfo')
      localStorage.removeItem('token')
      //退出登陆的那一刻使得token失效
      axios({
        url: "http://180.76.116.149:9999/api/gc-logout/",
        method: 'POST',
        data: Qs.stringify({ token })
      }).then((res) => {
        console.log(res)
      })
    },

    //权限鉴定
    async checkUserPerm ({ getters }, checkInfo) {
      //用户的token
      let token = getters.isnotUserlogin
      let contentType = checkInfo.contentType
      //权限
      let permissons = checkInfo.permissons
      //鉴权结果
      let perm_data;
      await axios({
        url: 'http://180.76.116.149:9999/api/check-perm/',
        method: 'POST',
        data: Qs.stringify({
          token,
          contentType,
          permissons: JSON.stringify(permissons)
        })
      }).then((res) => {
        if (res.data == 'nologin') {
          perm_data = false
          alert('登陆信息过期')
          return
        }
        if (res.data == 'noprem') {
          perm_data = false
          alert('权限不足')
          return
        }
        if (res.data == 'ok') {
          perm_data = true
        }
      })
      return perm_data
    }
  },
  modules: {
  }
})
