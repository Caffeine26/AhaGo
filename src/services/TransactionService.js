import axios from 'axios'

const API_URL = 'http://localhost:8300/api/transactions'

export default {
  getAll() {
    return axios.get(`${API_URL}`)
  },
  getRevenue() {
    return axios.get(`${API_URL}/revenue`)
  },
  getRecent(id) {
    return axios.get(`${API_URL}/recent/${id}`)
  },
  get(id) {
    return axios.get(`${API_URL}/${id}`)
  },
  getAllByRest(restId) {
    return axios.get(`${API_URL}/rest/${restId}`)
  },
  create(data) {
    return axios.post(`${API_URL}`, data)
  },
//   update(id, data) {
//     return axios.patch(`${API_URL}/${id}`, data)
//   },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`)
  }
}
