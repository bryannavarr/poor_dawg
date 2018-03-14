import axios from "axios";

const baseUrl = "http://localhost:8080/api/challenges";

export function readAll() {
  const config = {
    method: "GET",
    headers: {}
  };
  return axios(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function create(challengeData) {
  const config = {
    method: "POST",
    headers: {},
    data: challengeData
  };
  return axios(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(challengeData) {
  const config = {
    method: "PUT",
    headers: {},
    data: challengeData
  };
  return axios(`${baseUrl}/${challengeData._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
