<script setup>
import Header from "@/components/customer/header2.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProfileDropdown from "@/components/customer/ProfileDropdown.vue";
import { useAuthStore } from "@/stores/authenticationStore";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const { user, role } = storeToRefs(authStore);

const router = useRouter();
const route = useRoute();

const userLoggedIn = ref(false);
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleLogout = () => {
  authStore.logout();
  showDropdown.value = false;
  router.push("/login");
};

const goToAccount = () => {
  router.push("/profile-settings");
};

onMounted(async () => {
  const storedRole = localStorage.getItem("role");
  const token = localStorage.getItem(`${storedRole}_token`);

  if (storedRole !== "customer") {
    authStore.logout();
    return router.push("/login");
  }

  if (token && storedRole === "customer") {
    authStore.role = storedRole;
    if (!user.value) {
      await authStore.fetchProfile();
    }
    userLoggedIn.value = !!user.value;
  } else {
    userLoggedIn.value = false;
  }
});

// Close dropdown on route change
watch(() => route.fullPath, () => {
  showDropdown.value = false;
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
