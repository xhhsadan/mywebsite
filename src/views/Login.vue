<template>
  <div id="login-page">
    <div class="gcweb loginbox">
      <div class="header">
        <span style="color:black"> Login</span>
        <el-divider></el-divider>
      </div>
      <el-form :label-position="labelPosition"
               
               :model="formData">
        <el-form-item >
          <span>username</span>
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item >
           <span>password</span>
          <el-input v-model="formData.password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="mini" icon="el-icon-coffee-cup"
          
                     @click="gcLogin()">login</el-button>
          <el-button type="mini primary"
                     @click="toRegister()">to register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 前往注册页面
    toRegister () {
      this.$router.push({ path: '/register' })
    },
    gcLogin () {
      if (this.formData.username.length == 0 || this.formData.password.length == 0) {
        alert('账户密码不能为空')
        return
      }
      else {
        console.log(this.formData)
        this.$store.dispatch('gcLogin', this.formData)
      }
    },

  },
}
</script>
<style>
#login-page {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginbox {
  padding: 10px 80px;
}
</style>