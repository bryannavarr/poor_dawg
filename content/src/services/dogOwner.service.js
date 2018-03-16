import axios from "axios";

const baseUrl = "http://localhost:8080/api/dogOwners";

export function create(dogOwnerData) {
  const config = {
    method: "POST",
    data: dogOwnerData
  };

  return axios(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(dogOwnerData) {
  const config = {
    method: "PUT",
    data: dogOwnerData
  };

  return axios(`${baseUrl}/${dogOwnerData._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE"
  };

  return axios(`${baseUrl}/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function readAll() {
  const config = {
    method: "GET"
  };
  return axios
    .get(baseUrl, config)
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
