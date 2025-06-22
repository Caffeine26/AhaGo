import CategoryService from "@/services/CategoryService";
import FoodItemService from "@/services/FoodItemService";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        foodItems: [],
        topSellers: [],
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
        },
        // returns the name of most sold food item of restaurant
        getMostSold() {
            if (this.foodItems.length === 0) return -1;

            let index = 0;
            for (let i = 1; i < this.foodItems.length; i++) {
                if (this.foodItems[i].sold > this.foodItems[index].sold) {
                    index = i;
                }
            }
            return this.foodItems[index]
        },
        async getTopSolds() {
            try {
                const response = await FoodItemService.getTopSellers();
                this.topSellers = response.data;
                console.log('topSellers = ', this.topSellers)
            } catch (err) {
                console.log(err)
            }
        }
    }
})