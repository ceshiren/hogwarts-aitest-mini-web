<template>
    <div class="sign-up-form">

        <v-snackbar v-model="snackbar" top
        timeout="2000" 
        color="success">
            {{message}}
        </v-snackbar>

        <h1>注册</h1>
        <v-text-field v-model="username" label="用户名"></v-text-field>
        <v-text-field v-model="email" label="邮箱"></v-text-field>
        <v-text-field type="password" v-model="password" label="密码"></v-text-field>
        <v-btn color="primary" @click="signUp()">确认</v-btn>
        <v-btn color="primary" text @click="$router.push({name:'SignIn'})">返回登录</v-btn>
    </div>
</template>

<script>
export default {
    data(){
        return {
            instanceNotify:'',
            message:'注册成功',
            snackbar:false,
            username:'',
            password:'',
            email:'',
        }
    },
    methods:{
        signUp(){
            let params ={
                email:this.email,
                userName:this.username,
                password:this.password
            }

            this.$api.user.signUp(params).then(res=>{
                console.log(res)
                if(res.data.resultCode==1){
                    this.$notify({
                        title:'成功',
                        message:'注册成功',
                        type:'success'
                    })
                    this.$router.push({name:'SignIn'})
                }else{
                    if(this.instanceNotify){
                        this.instanceNotify.close()
                    }
                    this.instanceNotify = this.$notify({
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

.sign-up-form{
    width: 400px;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
}
</style>