import { defineStore } from 'pinia';
import CustomerService from '@/services/CustomerService';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    totalCustomers: 0
  }),
  actions: {
    async fetchTotalCustomers() {
      try {
        const response = await CustomerService.getAllCount();
        this.totalCustomers = response.count || 0;
      } catch (error) {
        console.error('Failed to fetch customer count:', error);
        this.totalCustomers = 0;
      }
    }
  }
});