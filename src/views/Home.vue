<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col>
        <div class="gcweb" >
          <div style="height:80px">

          </div>
          <div style="display:flex;justify-content: center;">
            <div class="headImgHome" style="width:100px;height:100px;border-radius:100px;overflow:hidden">
                      </div>
          </div>

            
        <div class="header-info" style="display:flex;justify-content: center;flex-wrap: wrap;">
          <p @click="x()" style="width: 100%;flex-grow: 1;text-align:center;
          overflow:hidden;
          text-overflow:ellipsis;
          font-weight:700;
          font-size:17px;
          ">
            {{loveu}}
          </p>
          <div class="disLI" style="margin-top:-10px">
            <ul class="clearfix">
              <li>
                <a target="blank" href="https://github.com/xhhsadan">
                <img src="../assets/images/home/github.png" alt="">
                </a>
              </li>
              <li>
                <a target="blank" href="https://www.zhihu.com/people/xhfebuty">
                <img src="../assets/images/home/zhihu.png" alt="">
                </a>
              </li>
              <li>
                <a target="blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=2646788106@qq.com">
                <img style="width:30px" src="../assets/images/home/email.svg" alt="">
                </a>
              </li>
              <li class="wechat" >
                <a class="vx" href="#"  >
                 <img  src="../assets/images/home/wechat.png" alt="">
                </a>
                <div class="wechatInner">
                    <img style="z-index:9999;position:absolute;top:3px;left:-10px;opacity:1!important" width="80%" src="../assets/images/weixin.png">
                  </div>
              </li>
            </ul>
          </div>
          </div>

          <div >

          </div>
          <div style="display:flex;justify-content: center;flex-wrap: wrap;justify-content: center;
            align-items: center;">
          <span style="color:aliceblue">{{fx}}</span>
            <el-select v-model="direction" class="reading" style="width:100px" placeholder="请选择">
              <el-option
                v-for="item in chooses"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left;color: #8492a6; font-size: 13px">{{ item.name}}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span> -->
              </el-option>
          </el-select>

           

            <el-drawer
              size=60%
              :title="article.author"
              :visible.sync=drawer
              :direction="direction"
              :before-close="handleClose">
              <span>
                  <div class="" style="width:92%; display:flex;justify-content: center;flex-wrap: wrap;
                      max-height:600px;margin:10px auto;overflow-y:scroll;
                      padding: 0 10px; 
                      color: rgb(1 1 1) !important;
                      font-family:'Source Han Serif CN'
                      "> 
                      <div style="width:100%;flex-grow: 1">
                        <p style="width:100%;text-align:center
                        font-size:10px;
                        ">{{article.title}}</p>
                        </div>
                      
                      <div style="flex-grow: 1;font-size:13px; " v-html="article.content" class="article"></div>
                      </div>
                      <div style="">
                        <el-button style="margin-left:85%" @click="y()" type="text">换一篇</el-button>
                      </div>
              </span>
            </el-drawer>
             <el-button @click="xx()" type="text" style="margin-left: 16px;z-index:98">
              阅读
            </el-button>
          </div>
        


        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  //data定义
 data(){
   return{
    shoes:false,
     audios:'',
     loveu:"",
     article:{},
   
     chooses:[
       {
         value:'ltr',label:"左侧阅读",name:"left"
       },
       {value:'rtl',label:"右侧阅读",name:"right"},
       {value:'ttb',label:"上侧阅读",name:"top"},
       {value:'btt',label:"下侧阅读",name:"bottom"}
     ],
      fx:'右侧阅读',
      drawer: false,
      direction: 'rtl',
   }
},

mounted(){
   this.x();
   this.y();
},
watch:{
  direction(val,newval){
    this.chooses.forEach(element => {
      if(element.value == val){
        this.fx=element.label
      }
    });
  }
},
methods:{
    x(){
      Axios(
        {
          url:'https://api.mcloc.cn/love/',
          method:'get'
        }
      ).then(res=>{
        this.loveu=res.data
      })
    },
    y(){
      Axios({
        url:'https://interface.meiriyiwen.com/article/random?dev=1',
        method:"get"
      }).then(res=>{
        console.log(res.data.data)
        this.article=res.data.data
      })
    },
    handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
        done();
      },
      xx(){
        this.drawer = true
      }
  }
}
</script>





<style scoped="scoped">
.wechat {
    width: 35px;
    height: 35px;
    position: relative;
}
.wechatInner {
    position: absolute;
    border-radius: 8px;
    transition: .7s all ease;
    -webkit-transition: .7s all ease;
    -moz-transition: .7s all linear;
    -o-transition: .7s all ease;
    -ms-transition: .7s all ease;
}

.wechatInner {
    width: 121px;
    height: 121px;
    padding: 10px;
    background: rgba(0,0,0,.4);
    top: 40px;
    left: -40px;
    -webkit-transform: translate3d(0,50px,0);
    transform: translate3d(0,50px,0);
    opacity: 0;
}
.vx:hover +.wechatInner {
  top: 6px;
  opacity: 1;
  z-index: 99;
}

.wechatInner:before {
    content: "";
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(0,0,0,.4) transparent;
}




h1 {
  text-align: center;
  font-style: italic;
}
h2 {
  color: aliceblue;
  text-align: center;
  font-style: italic;
}
p {
 
}
hr {
  background-color: rgb(255, 255, 255);
  height: 1px;
  border: none;
}
img {
  margin: 10px 18%;
}
.js {
  margin-left: 10%;
}
.disLI{
  margin-left: -6%;
}
.disLI ul li {
  float: left;
  list-style: none;
  margin-left: 20px;
}
.headImgHome{
    background-image: url(../assets/images/me.jpg);
    background-size: 100%;
		transition: transform 1s  ease-in-out;
}
.headImgHome:hover {
  transform: rotate(360deg);
}

.header-info {
    width: 90%;
    margin: auto;
    font-size: 16px;
    color: #eaeadf;
    background: rgba(0,0,0,.5);
    padding: 15px;
    margin-top:23px;
    letter-spacing: 0;
    line-height: 30px;
    border-radius: 10px;
    box-sizing: initial;
    white-space: nowrap;
}

@media (max-width: 860px){
.header-info {
    width: 90% !important;
}
}
.header-info:before {
    content: "";
    position: absolute;
    top: 138px;
    left: 50%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(0,0,0,.5) transparent;
}


.header-info:before {
    top: 178px !important;
  }
@media (max-width: 860px) {.header-info:before {
    top: 178px !important;
  }
}

.clearfix:after{
  display:block;
  content:' ';
  clear:both;
}
.clearfix{
  *zoom:1;
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

.article p{
  padding: 0px;
  margin: 0px;
  text-indent: 2em;
}
.el-input__inner{
  background-color:rgba(0,0,0,0) ;

  border: none;
}
.el-input--suffix .el-input__inner{

}

.el-select:hover .el-input__inner {
    border-color: rgba(0,0,0,0)!important;
}

  
</style>