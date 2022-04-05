<template>
  <div>
    <BreadMenu :page_name="'栏目管理'"></BreadMenu>
    <!-- 内容区域 -->
    <div class="body gcweb">
      <el-row :gutter="10">
        <el-col :span="5">
          <div class="gcweb">
            <h5>栏目树状图</h5>
            <el-divider></el-divider>
          </div>
          <!-- 添加栏目 -->
          <div class="body gcweb"
               style="display:flex">
            <el-input v-model="new_lanmu_name"
                      placeholder="请输入栏目名称"></el-input>
            <el-button @click="pushlanmulist()"
                       type="success">添加</el-button>
          </div>
          <!-- 栏目展示 -->
          <div class="body gcweb">
            <el-tree :data="lanmu_tree"
                     node-key="id"
                     default-expand-all
                     draggable
                     :render-content="renderContent"
                     @node-click="choosed_lanmu_artilce">
            </el-tree>
          </div>
          <div class="body gcweb">
            <el-button @click="getLanmudata()"
                       type="warning">恢复结构</el-button>
            <el-button @click="saveLanmuTree()"
                       type="success">保存结构</el-button>
            <el-button @click="getArticlelistData(1,'nobelong')"
                       type="primary">获取文章</el-button>
          </div>
        </el-col>
        <!-- 左侧部分结束 -->
        <!-- 右侧部分 -->
        <el-col :span="19">
          <div class="gcweb">
            <h5>文章列表</h5>
            <el-divider></el-divider>
          </div>
          <!-- 文章列表 -->
          <div class="gcweb"
               style=" min-height:700px; margin-top:10px;">
            <el-row>
              <!-- 循环展示栏目下文章 -->
              <!-- 每一个小的文章对象就是item -->
              <el-col v-for="item in  article_list"
                      :key="item.id"
                      :span="24">
                <div class="card gcweb">
                  <el-row>
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
                      <span>
                        {{item.title}}
                      </span>
                    </el-col>
                    <el-col class="text-item"
                            :xs="12"
                            :lg="7">
                      <span>发布者：{{item.nickName}}</span>
                    </el-col>
                    <!-- 对文章操作 -->
                    <el-col class="text-item"
                            :xs="12"
                            :lg="7">
                      <!-- 文章分配栏目 -->
                      <!-- pop over 弹出框 -->
                      <el-popover placement="right"
                                  width="400"
                                  trigger="click">
                        <!-- 栏目树形结构 -->
                        <el-tree :data="lanmu_tree"
                                 node-key="id"
                                 default-expand-all
                                 @node-click="choosed_lanmu">
                        </el-tree>
                        <!-- 分割线 -->
                        <el-divider></el-divider>
                        <el-button icon="el-icon-plus"
                                   type="warning"
                                   slot="reference"
                                   circle></el-button>
                        <!-- 点击事件传入文章id -->
                        <el-button type="success"
                                   style="margin-left:40%;"
                                   size='mini'
                                   @click="saveArticleToLanmu(item.id)">确认</el-button>
                      </el-popover>
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
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
import BreadMenu from "../components/BreadMenu"
import axios from "axios"
import Qs from 'qs'
export default {
  data () {
    return {
      pageSize: 3,
      total: 0,
      currentPage: 1,
      //当前栏目
      currentlanmu: 'nobelong',
      article_list: [],

      //栏目结构的数据
      new_lanmu_name: '',
      lanmu_tree: [],
      max: 0,

      //文章栏目分配
      //选中的栏目id
      choosed_lanmu_id: 0,
      //选中的文章id
      choosed_article_id: 0,
      choosed_lanmu_name: ''


    }
  },
  components: {
    BreadMenu
  },
  mounted () {
    this.getlistData(this.currentPage, this.currentlanmu)
    this.getLanmudata()
  },
  methods: {
    //获取全部文章
    getArticlelistData (page, currentlanmu) {
      this.currentlanmu = currentlanmu
      this.getlistData(page, currentlanmu)
    },
    //栏目树点击事件 选择栏目查看文章
    choosed_lanmu_artilce (node) {
      let lanmu_name = node.label
      this.currentlanmu = lanmu_name
      this.getlistData(1, lanmu_name)
    },
    //popover 节点点击事件
    choosed_lanmu (node) {
      this.choosed_lanmu_id = node.id
      // 修改当前选中id
      this.choosed_lanmu_name = node.label
    },
    // popover 确认添加到栏目
    saveArticleToLanmu (id) {
      this.choosed_article_id = id
      axios({
        url: 'http://180.76.116.149:9999/api/add-article/',
        method: 'PUT',
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          lanmu_id: this.choosed_lanmu_id,
          artilce_id: this.choosed_article_id
        })
      }).then(res => {
        console.log(res.data)
        if (res.data == 'nologin') {
          alert('登陆过期')
          return
        }
        if (res.data == 'noperm') {
          alert('权限不足')
          return
        }
        if (res.data == 'ok') {
          alert('栏目保存成功')
          this.getlistData(this.currentPage, this.currentlanmu)
          this.getLanmudata()
          return
        }
      })
    },
    //获取栏目数据
    getLanmudata () {
      axios({
        url: "http://180.76.116.149:9999/api/gcweb-lanmu/",
        method: 'GET',
      }).then(res => {
        console.log(res.data)
        this.lanmu_tree = res.data
      })
    },
    //保存栏目结构
    saveLanmuTree () {
      console.log(this.lanmu_tree)
      axios({
        url: 'http://180.76.116.149:9999/api/gcweb-lanmu/',
        method: 'PUT',
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          lanmu_tree: JSON.stringify(this.lanmu_tree),
        })
      }).then(res => {
        console.log(res.data)
        if (res.data == 'nologin') {
          alert('登陆过期')
          return
        }
        if (res.data == 'noperm') {
          alert('权限不足')
          return
        }
        if (res.data == 'ok') {
          alert('栏目保存成功')
          return
        }
      })
    },


    //添加新栏目到树形结构
    pushlanmulist () {
      if (this.new_lanmu_name.length == 0) {
        alert('栏目名称不能为空')
        return
      }
      // 检查当前插入的数据
      let checkTREE = this.loopcheckData(this.lanmu_tree)
      if (checkTREE == false) {
        return
      }
      let new_lanmu = {
        id: this.max + 1,
        label: this.new_lanmu_name,
        children: []
      }
      this.lanmu_tree.push(new_lanmu)
      this.new_lanmu_name = ''
    },
    // 循环检查数据
    loopcheckData (tree) {
      let checkTREE = true
      tree.forEach((obj) => {
        if (obj.id > this.max) {
          this.max = obj.id
        }
        if (obj.label == this.new_lanmu_name) {
          alert('栏目已存在')
          checkTREE = false
          this.new_lanmu_name = ''
          return checkTREE
        }
        // 如果子栏目长度还出存在则递归
        if (obj.children && obj.children.length > 0) {
          this.loopcheckData(obj.children)
        }
      });
      return checkTREE
    },
    //获取文章列表
    getlistData (page, lanmu) {
      axios({
        url: 'http://180.76.116.149:9999/api/article-list/',
        method: 'GET',
        params: {
          page: page,
          pageSize: this.pageSize,
          // 栏目
          lanmu: lanmu
        }
      }).then((res) => {
        console.log(res)
        this.article_list = res.data.data
        this.total = res.data.total
      })
    },
    //点击分页器事件
    currentChange (val) {
      this.currentPage = val
      console.log('第' + val + '页')

      this.getlistData(val, this.currentlanmu)
    },
    //element treee 控件

    remove (data) {
      //权限鉴定
      if (confirm('确定删除该栏目')) {
        let checkInfo = {
          contentType: 'api_wave_lanmu',
          permissons: ['delete']
        }
        this.$store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res) {
            axios({
              url: 'http://180.76.116.149:9999/api/gcweb-lanmu/',
              method: 'delete',
              data: Qs.stringify({
                id: data.id,
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
                this.getLanmudata()
              }
            })
          }
        })

      }

    },
    renderContent (h, { node, data }) {
      return (

        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>({node.data.article_num})</span>
          <span>
            <el-button size="mini"
              type="text"
              on-click={() => this.remove(data)}
              style="margin-left:90%;">删除</el-button>
          </span>
        </span>);
    },
    // 文章确认添加到哪一个栏目
    haha () {
      alert('添加成功')
    }
  },
}
</script>

<style>
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
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
</style>