import axios from "axios";

const headers = {};

const baseUrl = `http://localhost:8080/api/rewards`;

export function create(rewardData) {
  const config = {
    method: "POST",
    headers,
    data: rewardData
  };

  return axios(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function readAll() {
  const config = {
    method: "GET",
    headers
  };

  return axios
    .get(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(rewardData) {
  const config = {
    method: "PUT",
    headers,
    data: rewardData
  };

  return axios(`${baseUrl}/${rewardData._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE",
    headers
  };

  return axios(`${baseUrl}/${id}`, config)
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
