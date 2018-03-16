import axios from "axios";

const headers = {};

const url = "http://localhost:8080/api/sponsors/";

//POST functions
export function create(sponsorData) {
  const config = {
    headers,
    data: sponsorData,
    method: "POST"
  };
  return axios(url, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

//GET functions
export function readAll() {
  const config = {
    headers,
    method: "GET"
  };
  return axios(url, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

//PUT functions
export function update(sponsorData) {
  const config = {
    headers,
    data: sponsorData,
    method: "PUT"
  };
  return axios(url+sponsorData._id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

//DEL functions
export function del(id) {
  const config = {
    headers,
    method: "DELETE"
  };
  return axios(url+id, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

//Response functions
const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
