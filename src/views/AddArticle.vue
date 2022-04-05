<template>
  <div id="add-article">
    <!-- 左侧第一部分 -->
    <el-row :gutter="10">
      <el-col :xs="24"
              :lg="8">
        <div class="gcweb">
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition"
                   label-width="80px"
                   :model="article_info">
            <el-form-item label="文章标题">
              <el-input v-model="article_info.title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="article_info.describe">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <!-- 提交部分，右侧第二部分 -->
      <el-col :xs="24"
              :lg="16">
        <div class="gcweb">
          <div v-for="(img,index)
               in
               cover_list"
               :key="index">
            <el-image v-if="img == cover_img"
                      class="cover"
                      style="width: 200px; height: 200px"
                      :src="img"
                      @click="choseCover(img)"
                      :fit="'cover'">
            </el-image>
            <el-image v-else
                      class=""
                      style="width: 200px; height: 200px"
                      :src="img"
                      @click="choseCover(img)"
                      :fit="'cover'">
            </el-image>
          </div>
          <el-button @click="submitArticle()"
                     type="success"
                     round> 保存文章 </el-button>
        </div>
      </el-col>

      <el-col :xs="24"
              :lg="24">
        <div class="gcweb">
          <div id="summernote"
               placeholder=""></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import $ from 'jquery'
import axios from 'axios'
import QS from 'qs'
export default {
  data () {
    return {
      //一篇文章 有标题 简介 封面 内容
      article_info: {
        title: '',
        describe: '',
        content: '',
      },
      cover_img: '',
      cover_list: [],
      labelPosition: 'left'
    }
  },
  mounted () {
    this.summernote();
  },
  methods: {
    submitArticle () {
      //文章信息
      let article_data = {
        title: this.article_info.title,
        describe: this.article_info.describe,
        content: this.article_info.content,
        cover: this.cover_img,
        // 获取当前用户token
        token: this.$store.getters.isnotUserlogin
      }
      axios.post('http://180.76.116.149:9999/api/add-article/', QS.stringify(article_data))
        .then(res => {
          if (res.data == 'nologin') {
            alert('用户信息错误')
            return
          }
          if (res.data == 'notitle') {
            alert('内容填全啊兄弟，我后台会报错的')
            return
          }
          if (res.data == 'ok') {
            window.location.reload()
            return
          }
        }).catch(err => {
          console.log(err)
          alert('文明人')
        })
    },

    summernote () {
      let self = this
      $('#summernote').summernote({
        height: 500,
        lang: 'zh-CN',
        toolbar: [
          ['edit', ['undo', 'redo']],//编辑
          ['headline', ['style']],   //大字标题
          ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],//样式
          ['fontface', ['fontname', 'color', 'fontsize']],//字体
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],//对齐方式
          ['height', ['height']],//行高(自定义行高时一定不要忘记写这个)
          ['table', ['table']],//表单
          ['insert', ['link', 'picture', 'video', 'hr']],//插入链接，图片，视频，下划线
          ['view', ['fullscreen', 'codeview']]//全屏，代码视图
        ],
        dialogsFade: true,  //模态框淡入淡出  

        callbacks: {
          //内容修改
          onChange (contents) {
            self.article_info.content = contents
          },
          //图片添加
          onImageUpload (files) {
            let img = files[0]
            let imgData = new FileReader()
            imgData.readAsDataURL(img)
            imgData.onload = function () {
              //本次已经在富文本内容李了 插入图片
              let imgnode = document.createElement('img')
              imgnode.src = imgData.result

              //操作summernote
              $("#summernote").summernote('insertNode', imgnode)
              self.cover_list.push(imgData.result)
            }
          },
          //远程图片添加
          onImageLinkInsert (url) {
            // console.log(url)
            let imgnode = document.createElement('img')
            imgnode.src = url
            $("#summernote").summernote('insertNode', imgnode)
            self.cover_list.push(url)
          },
          //删除媒体文件 富文本时事件删除 此处保留delete 键
          onMediaDelete (target) {
            //传入为列表 每一次执行时  我们要去 删除cover——list中对应的图片
            //删除for 查找 相同文件进行删除 
            let imgData = target[0].src
            for (let i = 0; i < self.cover_list.length; i++) {
              if (self.cover_list[i] == imgData) {
                self.cover_list.splice(i, 1)
              }
            }
          },

        }
      });
    },
    choseCover (img) {
      this.cover_img = img
    }
  },
}
</script>

<style scoped>
.gcweb {
  padding: 20px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form-item {
  margin-top: 20px;
}
.gcweb .el-button {
  position: fixed;
  right: 25px;
  top: 280px;
  z-index: 1001;
}
.el-image {
  margin-left: 10px;
}
.el-image:hover {
  border: 2px solid gold;
}
/*被选择的封面将获得的样式*/
.cover {
  border: 4px solid yellowgreen;
}
</style>