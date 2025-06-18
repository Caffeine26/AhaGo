<template>
  <div class="contain">
    <div class="Logo" @click="goToOverview" style="cursor: pointer">
      <img class="logo" src="@/assets/main/logo.png" alt="Logo" />
      <div class="title" v-html="title"></div>
    </div>
  </div>
  <div class="cont">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Add this line
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  goToAccount: Function,
});

const router = useRouter(); // Get the router instance

const userLoggedIn = ref(false);

const toggleLogin = () => {
  userLoggedIn.value = true;
};

// Navigate to overview page when logo/title is clicked
const goToOverview = () => {
  router.push("/delivery/overview");
};
</script>

<style scoped>
.contain {
  width: 93.3%;
  height: fit-content;
  background-color: #292929;
  padding: 0px 50px;
  display: flex;
  justify-content: space-between;
  color: white;
}
.Logo {
  gap: 10px;
  display: flex;
  align-items: center;
}
.logo {
  height: 60px;
}
.title {
  font-size: 32px;
}
</style>
