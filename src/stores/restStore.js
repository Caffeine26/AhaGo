import RestService from "@/services/RestService";
import { defineStore } from "pinia";

export const useRestStore = defineStore('rest', {
    state: () => ({
        rests: [],
    }),
    actions: {
        async fetchRests() {
            try {
                const response = await RestService.getAll();
                this.rests = response.data;
            } catch (err) {
                console.log(err)
            }
        }
    },
    persist: true
})