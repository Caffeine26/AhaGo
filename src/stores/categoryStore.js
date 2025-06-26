import CategoryService from "@/services/CategoryService";
import FoodItemReviewService from "@/services/FoodItemReviewService";
import FoodItemService from "@/services/FoodItemService";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        foodItems: [],
        topSellers: [],
        topSellersOfRest: [],
        foodReviews: {},
        stock: {},
        foodItemsCount: 0,
    }),
    persist: true,
    actions: {
        // return obj of available or not, how many each
        async getStock() {
            try {
                const response = await FoodItemService.getStock();
                this.stock = response.data;
                console.log('stock = ', this.stock)
            } catch (err) {
                console.log(err)
            }
        },
        async getFoodItemsCount() {
            try {
                const response = await FoodItemService.getCount();
                this.foodItemsCount = response.data;
                console.log('categories = ', this.foodItemsCount)
            } catch (err) {
                console.log(err)
            }
        },
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
        // get 10 food items most sold 
        async getTopSolds() {
            try {
                const response = await FoodItemService.getTopSellers();
                this.topSellers = response.data;
                console.log('topSellers = ', this.topSellers)
            } catch (err) {
                console.log(err)
            }
        },
        async getTopSoldsOfRest(id) {
            try {
                const response = await FoodItemService.getTopSellersOfRest(id);
                this.topSellersOfRest = response.data;
                console.log('topSellersOfRest = ', this.topSellersOfRest)
            } catch (err) {
                console.log(err)
            }
        },
        async getReviewsbyFoodId(id) {
            try {
                const response = await FoodItemReviewService.getByFoodItemId(id);
                const data = response.data;
                console.log('getReviewsbyFoodId = ', data)
                return data
            } catch (err) {
                console.log(err)
            }
        },
        async getReviews(id) {
            try {
                const response = await FoodItemReviewService.getByFoodItemId(id);
                const data = response.data;
                console.log('getReviewsbyFoodId = ', data)
                return data
            } catch (err) {
                console.log(err)
            }
        }
    }
})