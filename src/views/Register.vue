<template>
  <div id="register-page">
    <div class="gcweb  registerbox">
      <div class="header">
        <span style="color:black">Register</span>
        <el-divider></el-divider>
      </div>
      <el-form :label-position="labelPosition"
               label-width="80px"
               :model="formData">
        <el-form-item >
          <span>username</span>
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item>
          <span>password</span>
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <span>please input password agin</span>
          <el-input v-model="formData.password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="mini" icon="el-icon-edit"
                     @click="gcRegister()">register</el-button>
          <el-button type="mini"
                     @click="toLogin()">to login</el-button>
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
        password: '',
        password2: ''
      }
    };
  },
  methods: {
    //返回登陆
    toLogin () {
      this.$router.push({ path: '/login' })
    },
    //登陆
    gcRegister () {
      if (this.formData.username.length == 0 || this.formData.password.length == 0 || this.formData.password2.length == 0) {
        alert('请填写完整数据')
        return
      } else {
        if (this.formData.password != this.formData.password2) {
          alert('两次密码输入不一致')
          return
        }
        else {
          if (this.formData.password.length <= 8 || this.formData.password.length >= 16) {
            alert('请输入8-16位的密码')
            return
          }
          //提交注册
          else {
            this.$store.dispatch('gcRegister', this.formData)
          }
        }
      }

    }
  }
}
</script>
<style>
#register-page {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.registerbox {
  padding: 10px 80px;
}
</style>