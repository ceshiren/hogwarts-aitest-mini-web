import axios from './http'

const project = {
    getProjectInfo(params){
        return axios.get('/peoject',{params})
    },
    editJenkins(params){
        return axios.post('/project',params)
    }
}

export default project;