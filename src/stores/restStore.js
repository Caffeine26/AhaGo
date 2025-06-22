import NotificationService from "@/services/NotificationService";
import RestaurantReviewService from "@/services/RestaurantReviewService";
import RestService from "@/services/RestService";
import { defineStore } from "pinia";

export const useRestStore = defineStore('rest', {
    state: () => ({
        rests: [],
        notifications: [],
        reviews: [],
    }),
    actions: {
        async fetchRests() {
            try {
                const response = await RestService.getAll();
                this.rests = response.data;
            } catch (err) {
                console.log(err)
            }
        },
        async fetchOwnerNotifications(restId) {
            try {
                const response = await NotificationService.getOwnerNotifications(restId);
                this.notifications = response.data;
            } catch (err) {
                console.log(err)
            }
        },
        async fetchReviews(restId) {
            try {
                const response = await RestaurantReviewService.getByRestaurantId(restId);
                this.reviews = response.data;
            } catch (err) {
                console.log(err)
            }
        },
    },
    persist: true
})