import axios from 'axios'

// var api = "http://aitest.testing-studio.com:8089/"
var api = "http://127.0.0.1:8093/"

var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
    },
    baseURL:api,
    timeout:10000,
})


instance.defaults.headers.common['token'] = localStorage.getItem('token')

export default instance;