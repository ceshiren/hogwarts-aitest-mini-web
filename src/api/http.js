import axios from 'axios'

// var api = "http://aitest.testing-studio.com:8089/"
// var api = "http://127.0.0.1:8093/"
var api = process.env.API

var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    baseURL:api,
    timeout:10000,
})


instance.defaults.headers.common['token'] = localStorage.getItem('token')
instance.interceptors.request.use(config=>{

    if(localStorage.getItem('token')){
        config.headers.common['token'] = localStorage.getItem('token')
    }
    return config
})

export default instance;