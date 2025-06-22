import UserService from "@/services/UserService";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        userLoggedIn: false,
        profile: {
          photo: '/src/assets/delivery/images/image1.png',
          firstName: 'Veth',
          lastName: 'Toilet',
          email: 'veth@gmail.com',
          phone: '012-345-678',
          address: 'Skibidi',
          country: 'Cambodia',
          city: 'Phnom Penh'
        }
    }),
    actions: {
        login() {
            this.userLoggedIn = true;
        },
        logout() {
            this.userLoggedIn = false;
        },
        async fetchUsers() {
            try {
                const response = await UserService.getAll();
                this.users = response.data;
                console.log('Users = ', this.users)
            } catch (err) {
                console.log(err)
            }
        },
        updateProfile(newProfile) {
          this.profile = { ...this.profile, ...newProfile };
        }
    },
    persist: true
})