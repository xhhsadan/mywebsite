<template>
    <div>
        
        <div>
            
            <div style="height:15px"></div>
            <div style="display:flex;width:90%;margin:0 auto">
            <el-input  @keyup.enter.native="so()"  v-model="title" placeholder="请输入内容" >
            </el-input>
            <el-button  @click="so">搜题</el-button>
            </div>
            <div style="height:15px"></div>
            <div v-if="tf">
                <iframe :src="daan" width="100%" height="500px" frameborder="0" style="overflow-y:hidden!important;"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    data(){
        return{
            daan:"https://www.jhq8.cn/s/",
            title:'',
            tf:false
        }
    },
    methods:{
        so(){
        
            this.tf=false
            //去除空格
            this.title=this.title.replace(/\s+/g,"");
            //检查是否是空
            if(this.title.length<2){
                alert("请输入内容（至少两个字符）")
                return
            }
            this.daan='https://www.jhq8.cn/s/'
            this.daan = this.daan+this.title+'/'
            this.title=""
            this.tf=true
        }
    }
}
</script>
