import axios from 'axios'

var api = 'http://127.0.0.1'

var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
        baseURL:api,
        timeout:10000,
    }
})


export default instance;