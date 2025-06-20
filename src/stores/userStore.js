import UserService from "@/services/UserService";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await UserService.getAll();
                this.users = response.data;
                console.log('Users = ', this.users)
            } catch (err) {
                console.log(err)
            }
        }
    },
    persist: true
})