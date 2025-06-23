<script setup>
import Header from "@/components/customer/header2.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProfileDropdown from "@/components/customer/ProfileDropdown.vue";
import { useAuthStore } from "@/stores/authenticationStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { user, role } = storeToRefs(authStore);
const userLoggedIn = ref(false);
const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleLogout = () => {
  authStore.logout();
  showDropdown.value = false;
  router.push("/");
};

const goToAccount = () => {
  router.push("/profile-settings");
};

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await authStore.fetchProfile();
    userLoggedIn.value = !!authStore.user;
  }
});
</script>

<template>
  <Header
    :userLoggedIn="userLoggedIn"
    :userProfileImg="user?.img_src"
    title="<span style='color: #9A0404;'>AhaGo</span>"
    @go-to-account="goToAccount"
    @toggle-dropdown="toggleDropdown"
  />

  <div v-if="showDropdown" class="dropdown-wrapper">
    <ProfileDropdown :logout="handleLogout" />
  </div>

  <router-view />
  <AppFooter />
</template>
