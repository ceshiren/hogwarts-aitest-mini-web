<template>
    <div>
        <v-app-bar dense dark>
            <v-toolbar-title style="width:100px" class="text-none">AITEST</v-toolbar-title>
            <v-tabs>
                <v-tab @click="$router.push('jenkins')" class="text-none">jenkins管理</v-tab>
                <v-tab @click="$router.push('case')">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>

            <v-spacer></v-spacer>
            <v-btn text class="text-none">{{username}}</v-btn>
            <v-btn text @click="getSwaggerDoc()" class="text-none" v-if="currentUsername == 't10'">swagger文档</v-btn>
            <v-btn text @click="logout()">退出</v-btn>
        </v-app-bar>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            currentUsername:''
        }
    },
    created(){
        this.$api.user.isLogin().then(res=>{
            this.username = res.data.data.userName
        })
        this.currentUsername = localStorage.getItem('username')
    },
    methods:{
        logout(){
            this.$api.user.logout().then(res=>{
                this.$router.push('/')
            })
        },
        getSwaggerDoc(){
          window.open(process.env.API+"swagger-ui.html","_blank")
        }
    }
}
</script>
