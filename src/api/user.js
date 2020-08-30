import axios from './http'

const user = {
    signIn(params){
        return axios.post('/user/login',params)
    },
    signUp(params){
        return axios.post('/user/register',params)
    },
    isLogin(params){
        return axios.get('/user/isLogin',{params})
    },
    logout(params){
        return axios.delete('/user/logout',params)
    }
}

export default user;
