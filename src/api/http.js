import axios from 'axios'

var api = process.env.API

var instance = axios.create({
    headers:{
        'Content-Type':'application/json',
        baseURL:api,
        timeout:10000,
    }
})


export default instance;