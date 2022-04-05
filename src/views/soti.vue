<template>
    <div>
        <h1>souti</h1>
        
        <el-button @click="so">so</el-button>
        <div>
            <el-input  v-model="title" placeholder="请输入内容">
            </el-input>
            <div v-if="tf">
                <iframe :src="daan" width="100%" height="300px" frameborder="0" style="overflow-y:hidden!important;"></iframe>
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
            this.daan = this.daan+this.title+'/'
            this.tf=true
        }
    }
}
</script>
