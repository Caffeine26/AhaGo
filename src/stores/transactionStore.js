import TransactionService from "@/services/TransactionService";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        transactions: [],
        recentTransactions: {},
    }),
    actions: {
        async fetchTransactions(restId) {
            try {
                const response = await TransactionService.getAllByRest(restId);
                this.transactions = response.data;
                console.log('Transactions = ', this.transactions)
            } catch (err) {
                console.log(err)
            }
        },
        async getRecentTransactions(restId) {
            try {
                const response = await TransactionService.getRecent(restId);
                this.recentTransactions = response.data;
                console.log('Recent Transactions = ', this.recentTransactions)
            } catch (err) {
                console.log(err)
            }
        },
        getRevenue() {
            let sum = 0;
            for(let transaction of this.transactions) {
                sum += transaction['amount']
            }
            return sum;
        }
    },
    persist: true
})