import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRestaurantStore = defineStore("restaurant", () => {
  const restaurants = ref([]);
  const foodItems = ref([]);
  const favorites = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const categories = ref([]);

  const fetchRestaurants = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("http://localhost:8300/api/restaurants");
      restaurants.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch restaurants";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchFoodItems = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("http://localhost:8300/api/foodItems");
      foodItems.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch food items";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchFoodItemsByRestaurant = async (restaurantId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `http://localhost:8300/api/restaurants/${restaurantId}/foodItems`
      );
      foodItems.value = response.data;
    } catch (err) {
      error.value = "Failed to fetch food items for restaurant";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoriesByRestaurant = async (restaurantId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `http://localhost:8300/api/restaurants/${restaurantId}/categories`
      );
      categories.value = response.data.categories;
    } catch (err) {
      error.value = "Failed to fetch categories";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((favId) => favId !== id);
    } else {
      favorites.value.push(id);
    }
  };

  return {
    restaurants,
    foodItems,
    favorites,
    loading,
    error,
    categories,
    fetchRestaurants,
    fetchFoodItems,
    toggleFavorite,
    fetchFoodItemsByRestaurant,
    fetchCategoriesByRestaurant,
  };
});