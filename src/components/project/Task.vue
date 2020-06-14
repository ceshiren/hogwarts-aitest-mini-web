<template>
    <div style="margin:20px">
        <v-data-table
        :headers="headers"
        :items="tableData"
        >
            <template v-slot:item.status="{item}">
                <div v-if="item.status==0">无效</div>
                <div v-else-if="item.status==1">新建</div>
                <div v-else-if="item.status==2">执行中</div>
                <div v-else-if="item.status==3">执行完成</div>
            </template>
            
            <template v-slot:item.action="{item}">
                <v-btn color="primary" small @click="doTask(item)">执行任务</v-btn>
                <v-btn color="error" small @click="deleteTask(item)">删除</v-btn>
                <v-btn color="success" small>查看报告</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            headers:[
                {text:'id',value:'id'},
                {text:'名称',value:'name'},
                {text:'JenkinsID',value:'base_jenkins_id'},
                {text:'用例数量',value:'case_count'},
                {text:'执行脚本',value:'test_command'},
                {text:'执行状态',value:'status'},
                {text:'操作',value:'action'}
            ],
            tableData:[
                {
                    id:1,
                    name:'tesk'
                }
            ]
        }
    },
    methods:{
        doTask(item){

        },
        deleteTask(item){

        }
    }
}
</script>