<template>
    <div class="sign-up-form">
        <h1>注册</h1>
        <v-text-field label="用户名"></v-text-field>
        <v-text-field label="密码"></v-text-field>
        <v-btn color="primary">确认</v-btn>
        <v-btn color="primary" text @click="$router.push({name:'SignIn'})">返回登录</v-btn>
    </div>
</template>

<style scoped>

.sign-up-form{
    width: 400px;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
}
</style>