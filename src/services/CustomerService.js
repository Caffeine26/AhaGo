import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8300/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getAllCount() {
    return apiClient.get('/customers/count')
      .then(response => {
        if (!response.data) {
          throw new Error('Invalid response format');
        }
        return response.data.count || 0;
      })
      .catch(error => {
        console.error('Error fetching customer count:', error);
        return 0; // Return default value
      });
  }
};