<template>
    <div style="margin:20px">
        <v-btn color="success">导入用例</v-btn>
        <v-btn color="primary" @click="addTask()">生成任务</v-btn>
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
        let params = {
            pageNum:1,
            pageSize:10,
        }
        this.$api.project.getCase(params).then(res=>{
            console.log(res)
            this.tableData = res.data.data
        })
    },
    methods:{
        addTask(){
            let casesId = []
            for(let i=0;i<this.selected.length;i++){
                casesId.push(this.selected[i].id)
            }

            let params = {
                casesIdList:casesId,
                teskTask:{
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
                    let params = {
                        pageNum:1,
                        pageSize:10,
                    }
                    this.$api.project.getCase(params).then(res=>{
                        console.log(res)
                        this.tableData = res.data.data
                    })
                }
            })
        }
    }
}
</script>