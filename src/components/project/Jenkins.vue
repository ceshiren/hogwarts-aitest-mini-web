<template>
    <div style="margin:20px">
        <v-text-field v-model="jenkinsName" label="jenkins名称"></v-text-field>
        <v-text-field v-model="jenkinsCommand" label="Jenkins命令"></v-text-field>
        <v-text-field v-model="jenkinsURL" label="jenkins地址"></v-text-field>
        <v-text-field v-model="jenkinsUsername" label="jenkins用户名"></v-text-field>
        <v-text-field v-model="jenkinsPassword" label="jenkins密码"></v-text-field>
        <v-text-field v-model="gitURL" label="git地址"></v-text-field>
        <v-text-field v-model="gitBranch" label="git分支"></v-text-field>
        <v-text-field v-model="remark" label="备注"></v-text-field>
        <v-btn color="primary">保存</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return {
            jenkinsName:'Jenkins服务器',
            jenkinsCommand:'npm ',
            jenkinsURL:'192.168.1.1',
            jenkinsUsername:'',
            jenkinsPassword:'',
            gitURL:'',
            gitBranch:'',
            remark:''
        }
    }
}
</script>