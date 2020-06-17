<template>
    <div>
        <v-app-bar dense dark>
            <v-toolbar-title style="width:100px">AITEST</v-toolbar-title>
            <v-tabs>
                <v-tab @click="$router.push('jenkins')">jenkins管理</v-tab>
                <v-tab @click="$router.push('case')">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
            
            <v-spacer></v-spacer>
        </v-app-bar>  
        <router-view></router-view>
    </div>
</template>