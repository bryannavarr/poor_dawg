import axios from 'axios';

const headers = {

}

const baseUrl = `http://localhost:8080/api/users`

export function create(usersData) {
    const config = {
        method: 'POST',
        headers,
        data: usersData
    }
    return axios(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
};

export function readAll() {
    const config = {
        method: 'GET',
        headers,
    }
    return axios.get(baseUrl, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
};

export function update(usersData) {
    const config = {
        method: "PUT",
        headers,
        data: usersData
    }
    return axios(`${baseUrl}/${usersData._id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
};

export function del(id) {
    const config = {
        method: 'DELETE',
        headers
    }
    return axios(`${baseUrl}/${id}`, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
};

const responseSuccessHandler = response => {
    return response.data;
};

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error)
};
