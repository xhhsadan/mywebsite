<template>
  <div id="app">
    <!-- 视频背景 -->
    <div class="video-contaient">
      <!-- <video autoplay
      width="100%"
      style="min-width:1800px;"
             muted
             loop
             src="./assets/images/video.mp4"></video> -->
    </div>

    <!--头部导航-->
    <div id="top-menu"
         class="gcweb">

         <div v-if="this.$store.state.userinfo.token" style="float:right;display:flex;margin-right:40px;margin-top:10px; display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;">
           <span style="font-size:12px;color:gray;margin-left:10px">{{this.$store.state.userinfo.nickName}}</span>
         </div>
    </div>
    <!-- 侧边栏左侧导航 -->
    <div id="left-menu"
         :class="'gcweb '+mobile_left">
      <i @click="showHideLeftMenu ()"
         id="left-button"
         class="el-icon-menu"></i>
      <!-- 导航栏 -->

      <el-col :span="24"
              style="margin-top:80px">

         
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 background-color="#00000000"
                 text-color="gray"
                 active-text-color="#33a3dc"

                 style="font-size:14px"
                 router>
          <el-menu-item index="/">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">TOP</span>
          </el-menu-item>
          
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>Article</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/add-article">ADD</el-menu-item>
              <el-menu-item index="/article-list">CHECK NEW</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/UserPerm">
            <i class="el-icon-s-custom"></i>
            <span slot="title">USERS</span>
          </el-menu-item>
          <el-menu-item index="/Lanmuadmin">
            <i class="el-icon-s-operation"></i>
            <span slot="title">Column</span>
          </el-menu-item>
           <el-menu-item index="/article-Pigeonhole">
            <i class="el-icon-collection"></i>
            <span slot="title">
              Pigeonhole</span>
          </el-menu-item>
          <el-menu-item index="/soti">
            <i class="el-icon-search"></i>
            <span slot="title">SoTi</span>
          </el-menu-item>
          <!-- <el-menu-item index="/3dshow">
            <i class="el-icon-s-goods"></i>
            <span slot="title">3Dshow</span>
          </el-menu-item> -->
          <!-- 栏目模块之后开发--xuhao -->
          <!-- <el-menu-item index="4">
            <i class="el-icon-s-operation"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item> -->
          
          <el-menu-item v-if="authUserLogin"
                        @click="gcLogout()">
            <i class="el-icon-back"></i>
            <span slot="title">OUT</span>
          </el-menu-item>
        </el-menu>
          <div >
            <span style="margin-left:25px;color:gold">
              
               <font v-if="shoes" style="color:#13ce66!important;">♪</font>
              <font v-else>♪</font>
              </span>
            <span style="margin-left:10px;color:rgb(209 210 210)">
              <font v-if="shoes" style="color:#13ce66">BGM</font>
              <font v-else>BGM</font>
              </span>
                  <el-switch
                  style="margin-left:5px;"
                  @change="handleClick()"
                  v-model="shoes"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
          </div>
            <div v-if="shoes">
                <div v-html='audios'></div>
              </div>
      </el-col>

    </div>
    <!-- 内容 -->
    <div id="content"
         :class="mobile_content">
      <router-view :screenWidth="screenWidth">
      </router-view>
      <!-- 底部 -->
      <div id="footer"
           class="gcweb">
        <span>
          <img src="../src/assets/images/xhlogo.png"
               style="width:200px">
        </span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      screenWidth: document.body.clientWidth,
      mobile_left: '',
      mobile_content: '',
      shoes:false,
      audios:'',
      username:''
    }
  },
  computed: {
    //验证用户是否登陆
    authUserLogin () {
      //得到token
      return this.$store.getters.isnotUserlogin
    },
  },
  //监听环节
  watch: {
    //监听用户token
    //用户退出登录使得token为空
    //重置路由为登陆界面
    authUserLogin (newVal) {
      if (newVal == null) {
        this.$router.push({ path: '/login' })
      }
    }
  },
  created () {
    //在页面被创建之前检测token进行自动登录
    this.$store.dispatch('tryAutoLogin')
  },
  mounted () {
    this.changeDevice()
    this.showHideLeftMenu()
    console.log('hello')
  },
  methods: {
  
    changeDevice () {
      if (this.screenWidth <= 500) {
        this.mobile_left = ' '
        this.mobile_content = 'xs'
      }
    },
    showHideLeftMenu () {
      if (this.mobile_left == ' ') {
        this.mobile_left = 'xs'
      } else {
        this.mobile_left = ' '
      }
      if (this.screenWidth > 500) {
        if (this.mobile_left == ' ') {
          this.mobile_content = ' '
        } else {
          this.mobile_content = 'xs'
        }
      }
    },
    //退出登陆
    gcLogout () {
      this.$store.dispatch('gcLogout', this.$store.getters.isnotUserlogin)
    },
    //music
     handleClick() {
       this.shoes=!this.shoes
    if(this.shoes == false){
        this.shoes = true;
        this.audios='<head><audio src="./music.mp3" play="true" loop="true" autoplay="autoplay"/>  </head>';
    }else if(this.shoes ==true){
        this.shoes = false;
        this.audios="";
    }
  }
  },

}

</script>
<style>
.el-col {
  margin-top: 5px;
}
</style>
