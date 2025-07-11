import axios from 'axios'

const API_URL = 'http://localhost:8300/api/users'

export default {
  getAll() {
    return axios.get(`${API_URL}`)
  },
  get(id) {
    return axios.get(`${API_URL}/${id}`)
  },
  create(data) {
    return axios.post(`${API_URL}`, data)
  },
  update(id, data) {
    return axios.patch(`${API_URL}/${id}`, data)
  },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`)
  }
}
