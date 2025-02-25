import axios from 'axios';

const headers = {
      //'SABIO-AUTH': 'U56LC3BHB'
}

const baseUrl = `http://localhost:8080/api/vets`

export function create(data) {
      const config = {
            method: 'POST',
            headers,
            data: data
      };

      return axios(baseUrl, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler);
}

export function readAll() {
      const config = {
            method: 'GET',
            headers
      }

      return axios.get(baseUrl, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler);
};

export function update(data) {
      const config = {
            method: 'PUT',
            headers,
            data: data
      }

      return axios(`${baseUrl}/${data._id}`, config)
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
            .catch(responseErrorHandler)
}

const responseSuccessHandler = response => {
      return response.data
}

const responseErrorHandler = error => {
      console.log(error)
      return Promise.reject(error)
}





