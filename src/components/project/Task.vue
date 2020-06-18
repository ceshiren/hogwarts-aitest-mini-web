<template>
    <div style="margin:20px">
        <v-dialog v-model="taskDialog">
            <v-card>
                <v-card-title>

                </v-card-title>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-dialog>

        <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer
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
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            taskDialog:'',
            instanceNotify:'',
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

    created(){
        this.getTaskList()
    },
    methods:{
        getTaskList(){
            let params = {
                pageNum:1,
                pageSize:10,
            }
            this.$api.project.getTaskList(params).then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
            })
        },
        doTask(item){
            let params = {
                id:item.id
            }
            this.$api.project.doTask(params).then(res=>{
                if(res.data.resultCode==1){
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'执行成功',
                        type:'success'
                    })
                }
            })
        },
        deleteTask(item){
            let params = {
                id:item.id
            }
            this.$api.project.deleteTask(params).then(res=>{
                if(res.data.resultCode==1){
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'删除成功',
                        type:'success',
                    })
                    this.getTaskList()
                }
            })
        }
    }
}
</script>