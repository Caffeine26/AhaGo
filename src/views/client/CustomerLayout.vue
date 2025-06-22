<script setup>
import Header from "@/components/customer/header2.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const userStore = useUserStore();
userStore.login(); // Temporarily log the user in for testing
const { userLoggedIn } = storeToRefs(userStore);

const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<template>
  <Header
    :userLoggedIn="userLoggedIn"
    :logout="handleLogout"
    title="<span style='color: #9A0404;'>AhaGo</span>"
  />
  <router-view></router-view>
  <AppFooter />
</template>
