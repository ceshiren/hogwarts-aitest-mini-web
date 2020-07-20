<template>
    <div style="margin:20px">
        <v-dialog v-model="addDialog" width="400">
            <v-card>
                <v-card-title>添加用例</v-card-title>
                <v-card-text>
                    <v-select v-model="selectType" :items="items" label="选择用例类型"></v-select>
                    <v-text-field v-model="caseName" label="用例名称"></v-text-field>
                    <v-textarea v-if="selectType==1" v-model="caseData" label="输入文本信息"></v-textarea>
                    <v-file-input v-if="selectType==2" v-model="file" label="选择文件"></v-file-input>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="close()">取消</v-btn>
                    <v-btn color="primary" @click="addCase()">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editDialog" width="400">
            <v-card>
                <v-card-title>修改</v-card-title>
                <v-card-text>
                    <v-select v-model="selectType" :items="items" label="选择用例类型"></v-select>
                    <v-text-field v-model="caseName" label="用例名称"></v-text-field>
                    <v-textarea v-if="selectType==1" v-model="caseData" label="输入文本信息"></v-textarea>
                    <v-file-input v-if="selectType==2" v-model="file" label="选择文件"></v-file-input>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="close()">取消</v-btn>
                    <v-btn color="primary" @click="submitEdit()">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn color="success" @click="addDialog=true">添加用例</v-btn>
        <v-btn color="primary" @click="taskDialog=true">生成任务</v-btn>
        <v-dialog v-model="taskDialog" width="400px">
            <v-card>
                <v-card-title>
                    生成任务
                </v-card-title>
                <v-card-text>
                    <v-text-field label="任务名称" v-model="taskName"></v-text-field>
                    <v-text-field label="备注" v-model="remark"></v-text-field>
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
                <v-btn small color="primary" @click="editItem(item)">修改</v-btn>
                <v-btn small color="error" @click="deleteItem(item)">删除</v-btn>
            </template>
        </v-data-table>
        <v-pagination v-if="pageLength>0" v-model="currentPage" :length="pageLength" @input="getCaseList()" total-visible="7"></v-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            file:null,
            caseName:'',
            editDialog:false,
            caseData:'',
            caseData:'',
            selectType:1,
            items:[
                {text:'文本',value:1},
                {text:'文件',value:2}
            ],
            addDialog:'',
            currentPage:1,
            pageLength:0,
            rows:'',
            taskName:'',
            taskDialog:'',
            instanceNotify:'',
            remark:'',
            selected:[],
            headers:[
                {text:'id',value:'id'},
                {text:'标识',value:'caseSign'},
                {text:'名称',value:'caseData'},
                {text:'数据',value:'caseName'},
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
        editItem(){
            this.caseName = item.caseName
            this.caseData = item.caseData
        },
        submitEdit(){
            
            if(this.selectType==1){
                console.log('文本')
                let params = {
                    caseName:this.caseName,
                    caseData:this.caseData
                }
                this.$api.project.editCaseText(params).then(res=>{
                    
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCaseList()
                })
                
            }else{
                console.log('文件')
                let params = new FormData()
                params.append('file',this.file)
                params.append('caseData',this.caseData)
                params.append('caseName',this.caseName)

                this.$api.project.editCaseFile(params).then(res=>{
                    
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCaseList()
                })
            }
        },
        addCase(){
            if(this.selectType==1){
                let params = {
                    caseName:this.caseName,
                    caseData:this.caseData
                }
                this.$api.project.addCaseText(params).then(res=>{
                    
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCaseList()
                })
                
            }else{
                let params = new FormData()
                params.append('file',this.file)
                params.append('caseData',this.caseData)
                params.append('caseName',this.caseName)

                this.$api.project.addCaseFile(params).then(res=>{
                    
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'添加成功',
                        type:'success'
                    })
                    this.close()
                    this.getCaseList()
                })
            }
        },
        createCase(){
            this.$api.project.createCase().then(res=>{
                console.log(res)
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
                        title:'成功',
                        message:'生成成功',
                        type:'success'
                    })
                    this.$router.push({name:'Task'})
                    this.close()
            })
        },
        getCaseList(){
            
            let params = {
                pageNum:this.currentPage,
                pageSize:10,
            }
            this.$api.project.getCase(params).then(res=>{
                console.log(res)
                this.tableData = res.data.data.data
                this.rows = res.data.data.recordsTotal
                this.pageLength = Math.ceil(this.rows/10)
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
                    this.$router.push({name:'Task'})
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
            this.addDialog = false
            this.editDialog = false
        }
    }
}
</script>
