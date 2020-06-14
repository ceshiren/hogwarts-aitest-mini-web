<template>
    <div class="login-form">
        <h1>登录</h1>
        <v-text-field label="用户名"></v-text-field>
        <v-text-field type="password" label="密码"></v-text-field>
        <v-btn color="primary" @click="$router.push({name:'Jenkins'})">登录</v-btn>
        <v-btn color="primary" text @click="$router.push({name:'SignUp'})">注册</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            password:'',
        }
    },

    methods:{
        signIn(){
            let params = {
                username:this.username,
                password:this.password
            }

            this.$api.user.signIn(params).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>
.login-form{
    width: 400px;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
}
</style>