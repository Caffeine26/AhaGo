import axios from 'axios'

const API_URL = 'http://localhost:8300/api/notifications'

export default {
  getOwnerNotifications(restId) {
    return axios.get(`${API_URL}/rest/${restId}`)
  },
}
