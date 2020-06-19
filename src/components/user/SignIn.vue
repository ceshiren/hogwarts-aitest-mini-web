<template>
    <div class="login-form">
        <h1>登录</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="password" type="password" label="密码"></v-text-field>
        <v-btn color="primary" @click="signIn()">登录</v-btn>
        <v-btn color="primary" text @click="$router.push({name:'SignUp'})">注册</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return {
            notifyInstance:'',
            username:'',
            password:'',
        }
    },

    methods:{
        signIn(){
            let params = {
                userName:this.username,
                password:this.password
            }

            this.$api.user.signIn(params).then(res=>{
                console.log(res)
                if(res.data.resultCode==1){
                    localStorage.setItem('token',res.data.data.token)
                    localStorage.setItem('username',this.username)
                    this.$router.push({name:'Jenkins'})
                }
                else{
                    if(this.notifyInstance){
                        this.notifyInstance.close()
                    }
                    this.notifyInstance = this.$notify({
                        title:'错误',
                        message:res.data.message,
                        type:'error'
                    })
                }
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