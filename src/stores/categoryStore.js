import CategoryService from "@/services/CategoryService";
import FoodItemService from "@/services/FoodItemService";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        foodItems: [],
    }),
    persist: true,
    actions: {
        async fetchCategories() {
            try {
                const response = await CategoryService.getAll();
                this.categories = response.data;
                console.log('categories = ', this.categories)
            } catch (err) {
                console.log(err)
            }
        },
        async fetchFoodItemsByRest(restId) {
            try {
                const response = await FoodItemService.getByRest(restId);
                this.foodItems = response.data;
                console.log('food items = ', this.foodItems)
            } catch (err) {
                console.log(err)
            }
        }
    }
})