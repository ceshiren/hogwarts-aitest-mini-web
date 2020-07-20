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
                    <v-text-field v-model="jenkinsCommand" label="测试命令标识"></v-text-field>
                    <v-text-field v-model="jenkinsURL" label="jenkins地址"></v-text-field>
                    <v-text-field v-model="jenkinsUsername" label="jenkins用户名"></v-text-field>
                    <v-text-field v-model="jenkinsPassword" label="jenkins密码"></v-text-field>
                    <v-select v-model="commandRunCaseType " :items="runType" label="类型"></v-select>
                    <v-text-field v-model="commandRunCasSuffix " label="后缀名"></v-text-field>
                    <!-- <v-text-field v-model="gitURL" label="git地址"></v-text-field>
                    <v-text-field v-model="gitBranch" label="git分支"></v-text-field> -->
                    <v-text-field v-model="remark" label="备注"></v-text-field>
                    <v-checkbox v-model="defaultJenkinsFlag" label="默认"></v-checkbox>
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
                    <v-text-field v-model="jenkinsCommand" label="测试命令标识"></v-text-field>
                    <v-text-field v-model="jenkinsURL" label="jenkins地址"></v-text-field>
                    <v-text-field v-model="jenkinsUsername" label="jenkins用户名"></v-text-field>
                    <v-text-field v-model="jenkinsPassword" type="password" label="jenkins密码"></v-text-field>
                    <v-select v-model="commandRunCaseType " :items="runType" label="测试用例类型"></v-select>
                    <v-text-field v-model="commandRunCasSuffix " label="测试用例后缀名"></v-text-field>
                    <!-- <v-text-field v-model="gitURL" label="git地址"></v-text-field>
                    <v-text-field v-model="gitBranch" label="git分支"></v-text-field> -->
                    <v-text-field v-model="remark" label="备注"></v-text-field>
                    <v-checkbox v-model="defaultJenkinsFlag" label="默认"></v-checkbox>
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
            runType:[
                {text:'文本',value:1},
                {text:'文件',value:2}
            ],
            commandRunCaseType:'',
            commandRunCasSuffix:'',
            defaultJenkinsFlag:'',
            editDialog:false,
            editId:'',
            addDialog:false,
            headers:[
                {text:'id',value:'id'},
                {text:'jenkins名称',value:'name'},
                {text:'测试命令 ',value:'testCommand'},
                {text:'jenkins地址',value:'url'},
                {text:'测试用例类型',value:'commandRunCaseType'},
                {text:'测试用例文件后缀',value:'commandRunCasSuffix'},
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
            this.editId = item.id
            this.jenkinsName = item.name
            this.jenkinsCommand = item.testCommand
            this.jenkinsURL = item.url
            this.jenkinsUsername = item.userName
            this.jenkinsPassword = item.password
            this.remark = item.remark
            this.commandRunCaseType = item.commandRunCaseType
            this.commandRunCasSuffix = item.commandRunCasSuffix
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
                name:this.jenkinsName,
                commandRunCaseType:this.commandRunCaseType,
                commandRunCasSuffix:this.commandRunCasSuffix,
                password:this.jenkinsPassword,
                remark:this.remark,
                testCommand:this.jenkinsCommand,
                url:this.jenkinsURL,
                userName:this.jenkinsUsername,
                defaultJenkinsFlag:this.defaultJenkinsFlag?1:0
            }

            this.$api.project.editJenkins(params).then(res=>{
                console.log(res)
                    this.getJenkinsList()
                    this.close()
            })
        },
        saveJenkins(){
            let params = {
                commandRunCaseType:this.commandRunCaseType,
                commandRunCasSuffix:this.commandRunCasSuffix,
                gitBranch:this.gitBranch,
                gitUrl:this.gitURL,
                name:this.jenkinsName,
                password:this.jenkinsPassword,
                remark:this.remark,
                testCommand:this.jenkinsCommand,
                url:this.jenkinsURL,
                userName:this.jenkinsUsername,
                defaultJenkinsFlag:this.defaultJenkinsFlag?1:0
            }

            this.$api.project.addJenkins(params).then(res=>{
                console.log(res)
                    this.getJenkinsList()
                    this.close()
            })
        },
        close(){
            this.addDialog = false
            this.editDialog = false
        }
    }

}
</script>
