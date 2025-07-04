import axios from 'axios'

const API_URL = 'http://localhost:8300/api/orders'

export default {
  getAll() {
    return axios.get(`${API_URL}`)
  },
  getAllCount() {
    return axios.get(`${API_URL}/count`)
  },
  getOrderTypes() {
    return axios.get(`${API_URL}/orderTypes`)
  },
  getAllByRest(id) {
    return axios.get(`${API_URL}/rest/${id}`)
  },
  getRecentOrders(id) {
    return axios.get(`${API_URL}/recent/${id}`)
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
