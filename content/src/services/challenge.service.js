import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/poordawg/challenges'

export function readAll() {
    const config = {
        method: 'GET',
        headers: {}
    }
    return axios.get(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
}

const responseSuccessHandler=response=>{
    return response.data;
}

const responseErrorHandler = error =>{
    console.log(error);
    return Promise.reject(error) 
}