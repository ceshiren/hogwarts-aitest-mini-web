<template>
<div>
    <div id="input">
        <v-text-field label="请输入参数" v-model="param"></v-text-field>
    </div>
    <v-btn @click="search" class="button" color="primary">查询</v-btn>
    <v-textarea v-model="data" auto-grow readonly rows="3" class="data" placeholder="查询结果："></v-textarea>
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
        position: absolute;
        top: 20px;
        left: 50px;
    }
    .data{
        /* display: block; */
        width: 500px;
        position: absolute;
        top: 120px;
        left: 50px;
    }
    .button{
        position: absolute;
        top: 35px;
        left: 300px;
    }
</style>
