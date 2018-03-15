import axios from "axios";

const headers = {};
const baseUrl = `http://localhost:8080/api/breeds`;

export function create(data) {
  const config = {
    method: "POST",
    headers,
    data: data
  };
  return axios(baseUrl, config);
}

export function readAll() {
  const config = {
    method: "GET",
    headers
  };
  return axios.get(baseUrl, config);
}

export function update(data) {
  const config = {
    method: "PUT",
    headers,
    data: data
  };
  return axios(`${baseUrl}/${data._id}`, config);
}

export function del(id) {
  const config = {
    method: "DELETE",
    headers
  };

  return axios(`${baseUrl}/${id}`, config);
}
