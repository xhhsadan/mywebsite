<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="gcweb">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     style="padding:20px 0px 20px 20px;font-size:16px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑导航结束 -->
    <div class="body gcweb">
      <div class="gcweb">
        <h5>用户组</h5>
        <el-divider></el-divider>
      </div>

      <el-row :gutter="10">
        <el-col :xs="24"
                :lg="12">
          <div class="new-group gcweb">
            <el-form :inline="true"
                     :model="new_group"
                     class="demo-form-inline">
              <el-form-item>
                <el-input v-model="new_group.name"
                          placeholder="新用户组名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="saveNewGroup">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :xs="24"
                :lg="12">
          <div class="perm-list gcweb">
            <el-row>
              <el-col :span="24"
                      v-for="(item,index) in new_group.checkList"
                      :key="index"
                      style="border-bottom:1px solid white;padding:5px 0px">
                <el-button type="primary"
                           @click="chooseAllmethod(index)"
                           plain
                           style="float:left;margin-right:10px;">
                  {{item.name}}</el-button>
                <el-checkbox-group v-model="item.checkList"
                                   style="float:left;">
                  <el-checkbox v-for="method in item.perm_methods"
                               :key="method.codename"
                               :label=" method.codename ">
                    {{method.name}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <div class="body gcweb">
        <h5>所有用户组</h5>
        <el-divider></el-divider>
        <div class="body gcweb">
          <!-- 循环用户组 -->
          <el-row>
            <el-col v-for="(item,index) in all_groups"
                    :key="index"
                    :xs="12"
                    :lg="4">
              <el-button v-if="index == choosed_group"
                         @click="choosedGroup(index)"
                         type="warning">{{item.name}}</el-button>
              <el-button v-else
                         @click="choosedGroup(index)"
                         type="primary">{{item.name}}</el-button>
              <el-button @click="deleteGroup(item.name)"
                         type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="body gcweb">
        <h5>用户列表</h5>
        <el-divider></el-divider>
      </div>
      <!-- 穿梭框 -->
      <el-row>
        <el-col :span="16">
          <div class="body gcweb">
            <el-transfer filterable
                         :filter-method="filterMethod"
                         filter-placeholder="请输入用户名"
                         v-model="choosed_user"
                         :data="userlist"
                         style="margin-left:20%">
            </el-transfer>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="body gcweb">
            <el-button @click="setUserToGroup()"
                       type="success"
                       round>分配</el-button>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import QS from 'qs'
export default {
  data () {
    return {
      new_group: {
        name: '',
        checkList: [
          {
            name: '文章管理',
            content_type: "api_wave_article",
            perm_methods: [
              {
                name: '增',
                codename: 'add'
              },
              {
                name: '删',
                codename: 'delete'
              },
              {
                name: '改',
                codename: 'change'
              },
              {
                name: '查',
                codename: 'view'
              }
            ],
            checkList: []
          },
          {
            name: '用户管理',
            content_type: 'auth_user',
            perm_methods: [

              {
                name: '增',
                codename: 'add'
              },
              {
                name: '删',
                codename: 'delete'
              },
              {
                name: '改',
                codename: 'change'
              },
              {
                name: '查',
                codename: 'view'
              }
            ],
            checkList: []
          },
          {
            name: '栏目管理',
            content_type: 'api_wave_Lanmu',
            perm_methods: [

              {
                name: '增',
                codename: 'add'
              },
              {
                name: '删',
                codename: 'delete'
              },
              {
                name: '改',
                codename: 'change'
              },
              {
                name: '查',
                codename: 'view'
              }
            ],
            checkList: []
          }
        ]


      },
      all_groups: [],
      //用户列表分配
      userlist: [],
      choosed_user: [],
      choosed_group: 0,
      filterMethod (query, item) {
        return item.name.indexOf(query) > -1;
      }
    }
  },
  mounted () {
    //获取所有用户组
    this.getAllUserGroup()
    this.getUserList()
  },
  methods: {
    //选择用户组
    choosedGroup (index) {
      this.choosed_group = index
    },
    //保存分配用户到用户组
    setUserToGroup () {
      let group = this.all_groups[this.choosed_group]
      let userlist = this.choosed_user
      if (userlist.length == 0) {
        alert('未选择用户')
        return
      }
      axios({
        url: "http://180.76.116.149:9999/api/gcweb-group/",
        method: 'POST',
        data: QS.stringify({
          token: this.$store.getters.isnotUserlogin,
          group: group.name,
          userlist: JSON.stringify(userlist)
        })
      }).then((res) => {
        if (res.data == 'nologin') {
          alert('登陆过期')
          return
        }
        if (res.data == 'noperm') {
          alert('权限不足')
          return
        }
        if (res.data == 'ok') {
          alert('权限分配成功')
          return
        }
      })

    },

    //获取用户列表
    getUserList () {
      axios({
        url: "http://180.76.116.149:9999/api/gcweb-userlist/",
        method: "GET"
      }).then((res) => {
        console.log(res.data)
        let userlist = res.data
        userlist.forEach((user) => {
          this.userlist.push({
            label: user.name,
            key: user.name,
            name: user.name
          });
        });
      })
    },

    // 获取所有用户组
    getAllUserGroup () {
      axios({
        url: 'http://180.76.116.149:9999/api/gcweb-group/',
        method: 'GET',
      }).then((res) => {
        console.log(res.data)
        this.all_groups = res.data
      })
    },

    // 删除用户组 通过用户组名称进行
    deleteGroup (name) {
      axios({
        url: 'http://180.76.116.149:9999/api/gcweb-group/',
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: QS.stringify({
          name: name,
          token: this.$store.getters.isnotUserlogin
        })
      }).then((res) => {
        if (res.data == 'nologin') {
          alert('登陆过期')
          return
        }
        if (res.data == 'noperm') {
          alert('权限不足')
          return
        }
        if (res.data == 'ok') {
          alert('删除成功')
          this.getAllUserGroup()
        }
      })
    },

    //提交用户组
    saveNewGroup () {
      if (this.new_group.name.length == 0) {
        alert('用户组名称不能为空')
        return
      }
      console.log(this.new_group.checkList[0].checkList)
      let checkType = false
      let perm_list = []
      this.new_group.checkList.forEach((obj) => {
        if (obj.checkList.length > 0) {
          checkType = true
          let perm_item = {
            content_type: obj.content_type,
            perm_methods: obj.checkList
          }
          perm_list.push(perm_item)
        }
      });
      if (checkType) {
        //执行提交
        //权限判定
        let checkInfo = {
          contentType: 'auth_user',
          permissons: ['add', 'change', 'delete', 'view']
        }
        this.$store.dispatch("checkUserPerm", checkInfo).then((res) => {
          if (res) {
            axios({
              url: 'http://180.76.116.149:9999/api/gcweb-group/',
              method: 'PUT',
              data: QS.stringify({
                token: this.$store.getters.isnotUserlogin,
                new_group: this.new_group.name,
                perm_list: JSON.stringify(perm_list)
              })
            }).then((res) => {
              if (res.data == 'nologin') {
                alert('登陆过期')
                return
              }
              if (res.data == 'noperm') {
                alert('权限不足')
                return
              }
              if (res.data == 'samename') {
                alert('用户组名称存在')
                return
              }
              if (res.data == 'ok') {
                this.getAllUserGroup()
              }
            })
          }
        })
      } else {
        alert('新用户组权限未提交')
        return
      }
    },
    chooseAllmethod (index) {
      if (this.new_group.checkList[index].checkList.length == 0) {
        this.new_group.checkList[index].checkList = ["add", "delete", "change", "view"]
      }
      else {
        this.new_group.checkList[index].checkList = []
      }

    }
  }
}
</script>

<style  scoped>
.gcweb {
  padding: 10px 10px;
}
.new-group {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.perm-list {
  height: 200px;
  overflow-y: scroll;
}
.el-checkbox {
  color: aliceblue;
}
</style>