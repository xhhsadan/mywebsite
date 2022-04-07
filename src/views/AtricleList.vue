<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div class="gcweb">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     style="padding:20px 0px 20px 20px;font-size:16px">
        <el-breadcrumb-item :to="{ path: '/' }">TOP</el-breadcrumb-item>
        <el-breadcrumb-item>Article LIST</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章列表 -->
    <div class="gcweb"
         style=" margin-top:10px;">
      <el-row>
        <el-col v-for="item in  article_list"
                :key="item.id"
                :span="24">
          <div class="card " style="background-color: transparent;">
            <el-row class="gcweb">
              <el-col :xs="24"
                      :lg="5">
                <el-image v-if="screenWidth>500"
                          style="width:100px"
                          :src="item.cover"
                          :fit="'cover'"></el-image>
                <el-image v-else
                          style="width:100%;"
                          :src="item.cover"
                          :fit="'cover'"></el-image>
              </el-col>
              <el-col class="text-item-title"
                      :xs="24"
                      :lg="5"
                      style="padding-left:20px">
                <span style="overflow:hidden;
                
                text-align:left!important;
                text-overflow: ellipsis;font-size:14px;white-space: nowrap;font-weight:400">
                  {{item.title}}
                </span>
              </el-col>
              <el-col class="text-item"
                      :xs="24"
                      :lg="4"
                      style="padding-left:20px">
                <span style="width:150px;height:20px;overflow:hidden;text-overflow: ellipsis;font-size:12px;white-space: nowrap;">
                  简介: {{item.describe}}
                </span>
              </el-col>
              <el-col class="text-item"
                      :xs="12"
                      :lg="2">
                <span
                style="overflow:hidden;text-overflow: ellipsis;font-size:12px;white-space: nowrap;"
                >Author：{{item.nickName}}</span>
              </el-col>
              <el-col class="text-item"
                      :xs="12"
                      :lg="7">
                <!-- 文章查看 -->
                <el-button icon="el-icon-search"
                           @click="toArticle(item.id)"
                           circle></el-button>
                <!-- 文章删除 -->
                <el-button type="danger"
                           icon="el-icon-delete"
                           @click="deleteArticle(item.id)"
                           circle></el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>
    </div>
    <!-- 分页器 -->
    <div class="gcweb"
         style=" margin-top:10px;">
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size="pageSize"
                     @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  props: ['screenWidth'],
  data () {
    return {
      pageSize: 5,
      total: 0,
      currentPage: 1,
      article_list: []
    }
  },
  mounted () {
    this.getlistData(this.currentPage)
  },
  methods: {
    currentChange (val) {
      this.currentPage = val
      //点击分页器事件
      console.log('第' + val + '页')
      this.getlistData(val)
    },
    //获取文章列表
    getlistData (page) {
      axios({
        url: 'http://180.76.116.149:9999/api/article-list/',
        method: 'GET',
        params: {
          page,
          pageSize: this.pageSize,
          lanmu: 'all'
        }
      }).then((res) => {
        console.log(res)
        this.article_list = res.data.data
        this.total = res.data.total
      })
      console.log(this.article_list)
    },
    //文章查看
    toArticle (index) {
      // query 路由传参
      this.$router.push({ path: '/article', query: { id: index } })
    },
    //文章删除
    deleteArticle (id) {
      if (confirm('确定删除该文章')) {

        let checkInfo = {
          contentType: 'api_wave_article',
          permissons: ['delete']
        }
        this.$store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res) {
            axios({
              url: 'http://180.76.116.149:9999/api/delete-article/',
              method: 'delete',
              data: Qs.stringify({
                id,
                token: this.$store.getters.isnotUserlogin
              }),
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }).then((res) => {
              if (res.data == 'nologin') {
                alert('登陆失效')
              }
              if (res.data == 'noperm') {
                alert('权限不足')
              }
              if (res.data == 'ok') {
                alert('删除成功')
                this.getlistData(this.currentPage)
              }
            })
          }
        })

      }
    }
  },
}
</script>
<style >
#article-list .gcweb {
  padding: 20px 10px;
}

.card .el-row .el-col {
  text-align: center;
}
.card .text-item {
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: rgb(85, 82, 82);
  font-size: 16px;
}
.card .text-item-title {
  height: 100px;
  display: flex;
  justify-content: left;
  align-content: center;
  align-items: center;
  color: rgb(104, 100, 100);
  font-size: 16px;
}


@media screen and (max-width: 1200px) {
  .card .text-item-title {
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: rgb(68, 66, 66);
  font-size: 16px;
}

  
}


</style>