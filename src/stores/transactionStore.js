import TransactionService from "@/services/TransactionService";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        transactions: [],
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
        }
    },
    persist: true
})