import axios from './http'

const user = {
    signIn(params){
        return axios.post('/user',params)
    }
}

export default user;