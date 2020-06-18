<template>
    <div style="margin:20px">
        <v-btn color="success" @click="createCase()">导入用例</v-btn>
        <v-btn color="primary" @click="taskDialog=true">生成任务</v-btn>
        <v-dialog v-model="taskDialog">
            <v-card>
                <v-card-title>
                    生成任务
                </v-card-title>
                <v-card-text>
                    <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                        <v-btn color="primary" @click="addTask()">确认</v-btn>
                    </v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table 
        v-model="selected" 
        :headers="headers" 
        :items="tableData"
        show-select
        hide-default-footer
        >
            <template v-slot:item.action="{item}">
                <v-btn small color="error" @click="deleteItem(item)">删除</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            taskName:'',
            taskDialog:'',
            instanceNotify:'',
            remark:'',
            selected:[],
            headers:[
                {text:'标识',value:'caseSign'},
                {text:'包名',value:'packageName'},
                {text:'类名',value:'className   '},
                {text:'方法名',value:'methodName'},
                {text:'操作',value:'action'}
            ],
            tableData:[
            ],
        }
    },
    created(){
        this.getCaseList()
    },
    methods:{
        createCase(){
            this.$api.project.createCase().then(res=>{
                if(res.data.resulCose==1){
                    if(this.instanceNotify){
                        this.instanceNotify.close
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'生成成功',
                        type:'success'
                    })
                    this.close()
                }
            })
        },
        getCaseList(){
            
            let params = {
                pageNum:1,
                pageSize:10,
            }
            this.$api.project.getCase(params).then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
            })
        },
        addTask(){
            let casesId = []
            for(let i=0;i<this.selected.length;i++){
                casesId.push(this.selected[i].id)
            }

            let params = {
                caseIdList:casesId,
                testTask:{
                    name:this.taskName,
                    remark:this.remark
                }
            }
            this.$api.project.addTask(params).then(res=>{
                if(res.data.resultCode==1){
                    this.$notify({
                        title:'成功',
                        message:'生成成功',
                        type:'success'
                    })
                    this.close()
                }
            })
        },
        deleteItem(item){
            let params = {
                id:item.id
            }
            this.$api.project.deleteCase(params).then(res=>{
                if(res.data.resultCode==1){
                    this.getCaseList()
                }
            })
        },
        close(){
            this.taskDialog = false
        }
    }
}
</script>