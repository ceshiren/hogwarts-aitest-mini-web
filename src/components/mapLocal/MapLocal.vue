<template>
<div>
    <div id="input">
        <v-text-field label="请输入参数" v-model="param"></v-text-field>
    </div>
    <v-btn @click="search" style="float:left;margin:35px 0px" color="primary">查询</v-btn>
    <v-textarea v-model="data" auto-grow label="查询结果:" readonly rows="3" class="data"></v-textarea>
</div>
    

</template>

<script>
export default {
    data(){
        return {
            param:'',
            data:''
        }
    },
    created(){
        
    },

    methods:{
        search(){
            this.$api.mapLocal.getMapLocal({
                param: this.param
            }).then(res=>{
                console.log(res)
                this.data = res.data.data
            })
        }
    }

}
</script>

<style scope>
    #input{
        width: 200px;
        margin: 20px 50px;
        float: left;
    }
    .data{
        display: block;
        width: 500px;
        margin: 150px 50px;
    }
</style>
