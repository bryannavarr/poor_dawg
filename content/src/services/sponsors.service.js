import axios from "axios";

const headers = {};

const url = "http://localhost:8080/api/sponsors"

//POST functions
export function postNew(sponsrData) {
    const config = {
        headers,
        data: sponsrData,
        method: "POST"
    }
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
}

//GET functions
export function getAll() {
    const config = {
        headers,
        method: "GET"
    }
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
}

//Response functions
const responseSuccessHandler = response => {
    return response.data;
}

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
}