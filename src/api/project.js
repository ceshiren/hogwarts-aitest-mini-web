import axios from './http'

const project = {
    getProjectInfo(params){
        return axios.get('/peoject',{params})
    },
    editJenkins(params){
        return axios.post('/project',params)
    },
    getCase(params){
        return axios.get('/testCase/list',{params})
    },
    addJenkins(params){
        return axios.post('/jenkins',params)
    },
    getJenkinsList(params){
        return axios.get('/jenkins/list',{params})
    },
    editJenkins(params){
        return axios.put('/jenkins',params)
    },
    deleteJenkins(params){
        return axios.delete('/jenkins/'+params.id)
    },
    deleteCase(params){
        return axios.delete('/testCase/'+params.id)
    },
    addTask(params){
        return axios.post('/task',params)
    },
    deleteTask(params){
        return axios.delete('/task',params)
    },
    getTaskList(params){
        return axios.get('/task/list',{params})
    }
}

export default project;