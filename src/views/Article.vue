<template>

  <div class="gcweb">
    <div class="gcweb">
      
      <BreadMenu :lanmu="article_data.lanmu"
                 :page_name="article_data.title"></BreadMenu>
    </div>
    <el-row gutter="10">
      <el-col :xs="24"
              :lg="18">
        <!-- <div class="body gcweb">
          <div class="header">
            <h1>
              {{article_data.title}}
            </h1>
          </div>
        </div> -->

        <div class="body   ">
          <div class="desc">
           <font style="margin-left:-25px">Describe:</font> 
           {{article_data.describe}}
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="body gcweb  ">
          <div class="article-content"
          style="max-height:550px;margin-left:20px"
               v-html="article_data.content">
          </div>
          <div class="clear"></div>
        </div>

        <div class="body gcweb  " style="color:aliceblue">
          <!-- hello -->
          <el-button v-if="article_data.pre_id == 0"
                     @click="toOtherPage(article_data.pre_id)"
                     type="text">上一页</el-button>
          <el-button v-else
                     @click="toOtherPage(article_data.pre_id)"
                     type="text">上一页</el-button>
          <el-button v-if="article_data.next_id == 0"
                     @click="toOtherPage(article_data.next_id)"
                     type="text">下一页</el-button>
          <el-button v-else
                     @click="toOtherPage(article_data.next_id)"
                     type="text">下一页</el-button>
        </div>
        <!-- 封面 评论 收藏 点赞 -->
      </el-col>
      <el-col :xs="24"
              :lg="6">
        <div class="body dweb">
          <!-- 封面 -->
          <el-image :src="article_data.cover"
                    :fit="'cover'"
                    style="padding:0px;margin:0px;width:300px;height:400px;"></el-image>
        </div>
        <div class="gcweb body like-btn">
          <el-row>
            <el-col :lg="8">
              <i v-if="user_article_info.like "
                 class="iconfont icon-dianzan"
                 @click="toLike()"
                 style="color:#00a1d6"></i>
              <i v-else
                 @click="toLike()"
                 class="iconfont icon-dianzan"></i>
            </el-col>
            <el-col :lg="8">
              <i v-if="user_article_info.favor"
                 class="icon-shoucang_huaban1 iconfont"
                 @click="toFavor()"
                 style="color:#00a1d6"></i>
              <i v-else
                 @click="toFavor()"
                 class="icon-shoucang_huaban1 iconfont"></i>
            </el-col>
            <el-col :lg="8">
              <i v-if="user_article_info.dashang"
                 class="iconfont icon-dashang"
                 style="color:#00a1d6"></i>
              <i v-else
                 class="iconfont icon-dashang"></i>
            </el-col>

          </el-row>
        </div>
        <!-- 评论区 -->
        <div class="body gcweb pinglun-item">
          <div v-if="pinglun_data.length==0">
            <h1></h1>
          </div>
          <div v-for="(item,index) in pinglun_data"
               :key="index">
            {{(index+1)+"楼--"+item.nickname + tiaopi + "say："}}

            {{item.text}}
            <el-divider></el-divider>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="dweb"
             style="margin-top:10px">
          <el-pagination background
                         small
                         :pager-count="5"
                         layout="prev, pager, next"
                         :total="ping_total"
                         :page-size="pinglun_pageSize"
                         @current-change="pinglunCurrentChange">
          </el-pagination>
        </div>
        <!-- 用户发表评论 -->
        <div class="gcweb body">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    maxlength="120"
                    placeholder="留下你的精彩感悟"
                    v-model="new_pinglun">
          </el-input>
          <el-button @click="savenewpinglun"
                     icon="el-icon-s-promotion"
                     style="margin:1% 0 0 86%;width:70px;height:35px;"></el-button>
        </div>
      </el-col>
    </el-row>
    <div>
      <a id="payLink"
         href=""
         target="_blank"></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
import BreadMenu from "../components/BreadMenu"
export default {
  data () {
    return {
      article_id: this.$route.query.id,
      article_data: {},
      //互动数据
      user_article_info: {},
      //评论
      new_pinglun: "",
      ping_total: 100,
      pinglun_pageSize: 4,
      pinglun_data: [],
      tiaopi: '😀'
    }
  },
  //监听
  watch: {
    $route (to) {
      this.getArticleData(to.query.id)
    }
  },
  components: {
    BreadMenu
  },
  mounted () {
    this.getArticleData(this.article_id)
    this.getAllPinglun(1, this.pinglun_pageSize)
    this.getUserArticleInfo()
  },
  methods: {
    toDashang () {
      axios({
        method: "post",
        url: "http://180.76.116.149:9999/api/get-alipay-url/",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        let link = document.getElementById("payLink");
        link.href = res.data.pay_link;
        link.click();
        if (confirm("支付完成了嘛？")) {
          console.log("ok");
          this.getUserArticleInfo()
        }
      });
    },
    //点赞
    toLike () {
      axios({
        url: 'http://180.76.116.149:9999/api/article-like/',
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        // console.log(res.data)
        if (res.data == "nologin") {
          alert("尚未登录");
          return;
        }
        if (res.data == "ok") {
          this.getUserArticleInfo();
        }
      });
    },
    //收藏
    toFavor () {
      axios({
        url: 'http://180.76.116.149:9999/api/article-favor/',
        method: "post",
        data: Qs.stringify({
          token: this.$store.getters.isnotUserlogin,
          article_id: this.article_id,
        }),
      }).then((res) => {
        // console.log(res.data)
        if (res.data == "nologin") {
          alert("尚未登录");
          return;
        }
        if (res.data == "ok") {
          this.getUserArticleInfo();
        }
      });
    },

    //获取互动信息
    getUserArticleInfo () {
      let token = this.$store.getters.isnotUserlogin;
      if (token) {
        axios({
          url: "http://180.76.116.149:9999/api/user-article-info/",
          method: "post",
          data: Qs.stringify({
            token: token,
            article_id: this.article_id,
          }),
        }).then((res) => {
          console.log(res.data)
          this.user_article_info = res.data;
        });
      }
    },
    //获取文章评论
    getAllPinglun (page, pagesize) {
      axios({
        url: 'http://180.76.116.149:9999/api/pinglun/',
        method: 'GET',
        params: {
          page: page,
          pagesize: pagesize,
          article_id: this.article_id,
        }
      }).then(res => {
        this.pinglun_data = res.data.data
        this.ping_total = res.data.total
      })
    },
    //添加评论
    savenewpinglun () {
      if (this.new_pinglun.length == 0) {
        alert('不能不说话啊兄弟')
      }
      else {
        if (this.new_pinglun.search('傻逼') != -1) {
          alert('注意文明规范')
          this.new_pinglun = ''
          return
        }
        if (this.new_pinglun.search('就这？') != -1) {
          alert('对，就这')
          this.new_pinglun = ''
          return
        }
        if (this.new_pinglun.replace(/\s+/g, "") == "") {
          alert("别想发空格梦幻过关")
          this.new_pinglun = ''
          return
        }
        if (this.new_pinglun.search('cnm') != -1) {
          alert('讲文明树新风')
        }
        if (this.new_pinglun.search('昊哥牛逼') != -1) {
          alert('😀低调低调')
        }
        axios({
          url: 'http://180.76.116.149:9999/api/pinglun/',
          method: 'POST',
          data: Qs.stringify({
            token: this.$store.getters.isnotUserlogin,
            article_id: this.article_id,
            text: this.new_pinglun,
          })
        }).then(res => {
          console.log(res.data)
          if (res.data == "nologin") {
            alert("尚未登录");
            return;
          }
          if (res.data == "noperm") {
            alert("权限不足");
            return;
          }
          if (res.data == "ok") {
            this.getAllPinglun(1, this.pinglun_pageSize);

            alert('发表成功')
          }
        })
      }
    },
    //评论分页器
    pinglunCurrentChange (page) {
      this.getAllPinglun(page, this.pinglun_pageSize)
    },
    //获取文章数据
    getArticleData (id) {
      axios({
        url: 'http://180.76.116.149:9999/api/article-data/',
        method: 'GET',
        params: {
          article_id: id
        }
      }).then((res) => {
        console.log(res.data)
        this.article_data = res.data
        this.article_id = res.data.id
        this.getAllPinglun(1, this.pinglun_pageSize)
        this.getUserArticleInfo()
      })
    },
    //上一篇文章
    toOtherPage (id) {
      if (id == 0) {
        alert('没有啦')
        return
      }
      this.$router.push({ path: '/article', query: { id: id } })
    }
  },


}
</script >
<style  scoped>
.body.gcweb .gcweb {
  padding: 10px 10px;
  color: rgb(198, 198, 198);
  font-size: 16px;
  text-indent: 2em;
  font-style: normal;
}
.body.gcweb {
  padding: 10px 10px;
}
.mc {
  width: 1200px;
  margin-left: 30%;
}


.like-btn {
  text-align: center;
  color: aliceblue;
}
.like-btn i {
  font-size: 30px;
}
.body.gcweb.pinglun-item {
  color: antiquewhite;
  font-size: 18px;
  font-family: "楷体";
}
.body.gcweb.pinglun-item div {
}


html {
    box-sizing: border-box;
    scrollbar-width: thin;
}

*,
*:before,
*:after {
    box-sizing: inherit;
    scrollbar-width: inherit;
}

*::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
*::-webkit-scrollbar-thumb {
    background: hsl(214, 13%, 75%);
    border-radius: 4px;
}

.desc {
    font-size: 16px;
    line-height: 1.5;
    color: rgb(198, 198, 198);
    text-indent: 2em;
    font-style: normal;
    border-bottom:rgb(222, 219, 219) 1px solid;
    width: 95%;margin: 0 auto;
    padding-left: 0px;
    padding-bottom: 10px;
}
</style>