import axios from 'axios'

const API_URL = 'http://localhost:8300/api/foodItems'

export default {
  getAll() {
    return axios.get(`${API_URL}`)
  },
  getStock() {
    return axios.get(`${API_URL}/stock`)
  },
  getCount() {
    return axios.get(`${API_URL}/count`)
  },
  getTopSellers() {
    return axios.get(`${API_URL}/top`)
  },
  getTopSellersOfRest(restId) {
    return axios.get(`${API_URL}/top/${restId}`)
  },
  get(id) {
    return axios.get(`${API_URL}/${id}`)
  },
  getByRest(restId) {
    return axios.get(`${API_URL}/rest/${restId}`)
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
