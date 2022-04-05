<template>
  <div id="article-list">
    <!-- 面包屑导航 -->
    <div class="gcweb">
        <p>
           <a  @click="getall()">
               <font v-if="'all' == lanmu" class="nochoosedspan"> # 全部</font>
               <font v-else class="choosedspan"> # 全部</font>
            </a>
         
            <a v-for="item in lanmus " v-bind:key="item" @click="LMclick(item)">

               <font v-if="item.label == lanmu" class="nochoosedspan"> # {{item.label}} </font>
               <font v-else class="choosedspan"> # {{item.label}} </font>
            </a>
              <a  @click="getnoblong()">
                   <font v-if="'nobelong' == lanmu" class="nochoosedspan"> # 未归档</font>
               <font v-else class="choosedspan"> # 未归档 </font>
            </a>
        </p>
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
              <el-col class="text-item"
                      :xs="24"
                      :lg="5"
                      style="padding-left:20px">
                <span style="overflow:hidden;text-overflow: ellipsis;font-size:16px;white-space: nowrap;font-weight:700">
                  {{item.title}}
                </span>
              </el-col>
              <el-col class="text-item"
                      :xs="24"
                      :lg="4"
                      style="padding-left:20px">
                <div style="width:150px;height:20px;overflow:hidden;text-overflow: ellipsis;font-size:12px;white-space: nowrap;">
                  简介: {{item.describe}}
                </div>
              </el-col>
              <el-col class="text-item"
                      :xs="12"
                      :lg="2">
                <span style="overflow:hidden;text-overflow: ellipsis;font-size:12px;white-space: nowrap;">Author：{{item.nickName}}</span>
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
      article_list: [],
      lanmus:[],
      label:[],
      lanmu:"nobelong"
    }
  },
  mounted () {
    this.getlistData(this.currentPage);
    this.getLanmudata()
  },
  methods: {
    currentChange (val) {
      this.currentPage = val
      //点击分页器事件
      console.log('第' + val + '页')
      this.getlistData(val,this.lanmu)
    },
    //获取文章列表
    getlistData (page) {
      axios({
        url: 'http://180.76.116.149:9999/api/article-list/',
        method: 'GET',
        params: {
          page,
          pageSize: this.pageSize,
          lanmu: this.lanmu
        }
      }).then((res) => {
        console.log(res)
        this.article_list = res.data.data
        this.total = res.data.total
      })
   
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
    },
     //获取栏目数据
    getLanmudata () {
      axios({
        url: "http://180.76.116.149:9999/api/gcweb-lanmu/",
        method: 'GET',
      }).then(res => {
            console.log(res.data)
            res.data.forEach(item=>{
      
              this.ddfs(item)
            })
      })
    },
    //分类点击
    LMclick(item){
        this.lanmu = item.label
        this.getlistDataByLM(1,this.lanmu)
    },
    //未归档点击
    getnoblong(){
      this.lanmu='nobelong'
      this.getlistData(1)
    },
    //查看全部
    getall(){
      this.lanmu='all'
      this.getlistData(1)
    },
     //获取文章列表通过栏目名称
    getlistDataByLM (currentPage, lanmu) {
      axios({
        url: 'http://180.76.116.149:9999/api/article-list/',
        method: 'GET',
        params: {
          page: currentPage,
          pageSize: this.pageSize,
          // 栏目
          lanmu: lanmu
        }
      }).then((res) => {
        this.article_list = res.data.data
        this.total = res.data.total
      })
    },
    //栏目树的dfs
   ddfs(root){   //深度优先遍历的方法
    this.lanmus.push(root)
    root.children.forEach(item=>{
        this.ddfs(item);    //递归调用
    })
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
  color: rgb(229, 215, 215);
  font-size: 16px;
}


</style>