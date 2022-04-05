<template>
  <div class="gcweb">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="padding:20px 0px 20px 20px;font-size:16px;color:black">
      <el-breadcrumb-item :to="{ path: '/' }">TOP</el-breadcrumb-item>
      <el-breadcrumb-item v-if="lanmu">{{lanmu}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{page_name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['page_name', 'lanmu'],
  data () {
    return {
      // 父组件向子组件传值props
    }
  },
}
</script>

<style>
</style>