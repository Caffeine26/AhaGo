import { defineStore } from 'pinia';
import axios from 'axios';

export const useReviewFoodItems = defineStore('reviewFoodItems', {
  state: () => ({
    reviews: [],
  }),
  actions: {
    async fetchReviewsByFoodItem(foodItemId) {
      try {
        const response = await axios.get(`http://localhost:8300/api/foodItem_reviews/${foodItemId}`);
        this.reviews = response.data.data || [];
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        this.reviews = [];
      }
    },
  },
});
