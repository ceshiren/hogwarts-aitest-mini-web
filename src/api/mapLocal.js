import axios from './http'

const mapLocal = {
   getMapLocal(params){
    return axios.get('/report/showMapLocal',{params})
   }
}

export default mapLocal;