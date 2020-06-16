<template>
    <div style="margin:20px">
        <v-btn color="success" @click="addDialog = true">添加Jenkins</v-btn>
        <v-data-table
        :headers="headers"
        :items="jenkinsData"
        hide-default-footer>
        <template v-slot:item.action="{item}">
            <v-btn color="success" small @click="editJenkins(item)">编辑</v-btn>
            <v-btn color="error" small @click="deleteJenkins(item)">删除</v-btn>
        </template>
        </v-data-table>

        <v-dialog v-model="editDialog" width="500px">
            <v-card>
                <v-card-title>编辑jenkins</v-card-title>
                <v-card-text>
                    <v-text-field v-model="jenkinsName" label="jenkins名称"></v-text-field>
                    <v-text-field v-model="jenkinsCommand" label="Jenkins命令"></v-text-field>
                    <v-text-field v-model="jenkinsURL" label="jenkins地址"></v-text-field>
                    <v-text-field v-model="jenkinsUsername" label="jenkins用户名"></v-text-field>
                    <v-text-field v-model="jenkinsPassword" label="jenkins密码"></v-text-field>
                    <v-text-field v-model="gitURL" label="git地址"></v-text-field>
                    <v-text-field v-model="gitBranch" label="git分支"></v-text-field>
                    <v-text-field v-model="remark" label="备注"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close()">取消</v-btn>
                    <v-btn color="primary" @click="saveEditJenkins()">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="addDialog" width="500px">
            <v-card>
                <v-card-title>添加Jenkins</v-card-title>
                <v-card-text>
                    <v-text-field v-model="jenkinsName" label="jenkins名称"></v-text-field>
                    <v-text-field v-model="jenkinsCommand" label="Jenkins命令"></v-text-field>
                    <v-text-field v-model="jenkinsURL" label="jenkins地址"></v-text-field>
                    <v-text-field v-model="jenkinsUsername" label="jenkins用户名"></v-text-field>
                    <v-text-field v-model="jenkinsPassword" label="jenkins密码"></v-text-field>
                    <v-text-field v-model="gitURL" label="git地址"></v-text-field>
                    <v-text-field v-model="gitBranch" label="git分支"></v-text-field>
                    <v-text-field v-model="remark" label="备注"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close()">取消</v-btn>
                    <v-btn color="primary" @click="saveJenkins()">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>     

<script>
export default {
    data(){
        return {
            editDialog:false,
            editId:'',
            addDialog:false,
            headers:[
                {text:'jenkins名称',value:'name'},
                {text:'测试命令 ',value:'testCommand'},
                {text:'git地址',vlaue:'gitUrl'},
                {text:'git分支',value:'gitBranch'},
                {text:'jenkins地址',value:'url'},
                {text:'操作',value:'action'}
            ],
            jenkinsData:[],
            jenkinsName:'',
            jenkinsCommand:'',
            jenkinsURL:'',
            jenkinsUsername:'',
            jenkinsPassword:'',
            gitURL:'',
            gitBranch:'',
            remark:''
        }
    },
    created(){
        this.getJenkinsList()
    },

    methods:{
        getJenkinsList(){
            this.$api.project.getJenkinsList().then(res=>{
                console.log(res)
                this.jenkinsData = res.data.data.data
            })
        },
        editJenkins(item){
            this.jenkinsName = item.name
            this.jenkinsCommand = item.testCommand
            this.gitURL = item.gitUrl
            this.gitBranch = item.gitBranch
            this.jenkinsURL = item.url
            this.jenkinsUsername = item.userName
            this.jenkinsPassword = item.password
            this.editId = item.id
            this.editDialog = true
        },
        deleteJenkins(item){
            let params = {
                id:item.id
            }
            this.$api.project.deleteJenkins(params).then(res=>{
                if(res.data.resultCode==1){
                    this.getJenkinsList()
                }
            })
        },
        saveEditJenkins(){

            let params = {
                id:this.editId,
                gitBranch:this.gitBranch,
                gitUrl:this.gitURL,
                name:this.jenkinsName,
                password:this.password,
                remark:this.remark,
                testCommand:this.jenkinsCommand,
                url:this.jenkinsURL,
                userName:this.jenkinsUsername
            }

            this.$api.project.editJenkins(params).then(res=>{
                console.log(res)
                if(res.data.resultCode==1){
                    this.getJenkinsList()
                    this.close()
                }
            })
        },
        saveJenkins(){
            let params = {
                
                gitBranch:this.gitBranch,
                gitUrl:this.gitURL,
                name:this.jenkinsName,
                password:this.password,
                remark:this.remark,
                testCommand:this.jenkinsCommand,
                url:this.jenkinsURL,
                userName:this.jenkinsUsername
            }

            this.$api.project.addJenkins(params).then(res=>{
                console.log(res)
                if(this.data.resultCode==1){
                    this.getJenkinsList()
                    this.close()
                }
            })
        },
        close(){
            this.addDialog = false
            this.editDialog = false
        }
    }
    
}
</script>