<template>
    <div style="margin:20px">

        <v-dialog v-model="editDialog" width="400px">
            <v-card>
                <v-card-title>
                    编辑任务
                </v-card-title>
                <v-card-text>
                    <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                    <v-text-field label="备注" v-model="remark"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                        <v-btn color="primary" @click="saveEdit()">确认</v-btn>
                    </v-spacer>
                </v-card-actions>
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
                <div v-else-if="item.status==3"><a @click="getAllure(item)">执行完成</a></div>
            </template>
            
            <template v-slot:item.action="{item}">
                <v-btn color="primary" small @click="doTask(item)">执行任务</v-btn>
                <v-btn color="success" small @click="editTask(item)">编辑</v-btn>
                <v-btn color="error" small @click="deleteTask(item)">删除</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            editDialog:false,
            editId:'',
            taskName:'',
            remark:'',
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
        getAllure(item){
            let params = {
                id:item.id
            }
            this.$api.report.getAllure(params).then(res=>{
                console.log(res)
                window.open(res.data.data.allureReportUrl,"_blank")
            })
        },
        saveEdit(){
            let params = {
                name:this.taskName,
                remark:this.remark,
                id:this.editId
            }

            this.$api.project.editTask(params).then(res=>{
                if(this.instanceNotify){
                    this.instanceNotify.close()
                }
                this.instanceNotify = this.$notify({
                    title:'成功',
                    message:'保存成功',
                    type:'success',
                })
                this.getTaskList()
            })
        },
        editTask(item){
            this.taskName = item.name
            this.remark = item.remark
            this.editId = item.id
            this.editDialog = true
        },
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
        },
        close(){
            this.editDialog = false
        }
    }
}
</script>