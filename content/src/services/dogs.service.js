import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/dogs'

export function readAll() {
    const config = {
        method: 'GET'
    }

    return axios(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
}

export function create(dogData) {
    const config = {
        method: 'POST'
        , data: dogData
    };

    return axios(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function update(dogData) {
    const config = {
        method: 'PUT'
        , data: dogData
    }

    return axios(`${baseUrl}/${dogData._id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

export function del(id) {
    const config = {
        method: 'DELETE'
    }

    return axios(`${baseUrl}/${id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
    return response.data
}

const responseErrorHandler = error => {
    console.log(error)
    return Promise.reject(error)
}