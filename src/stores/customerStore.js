import CustomerService from "@/services/CustomerService";
import { defineStore } from "pinia";

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        totalCustomers: 0,
    }),
    actions: {
        async fetchTotalCustomers() {
            try {
                const response = await CustomerService.getAllCount();
                this.totalCustomers = response.data;
            } catch (err) {
                console.log(err)
            }
        },
    },
    persist: true
})