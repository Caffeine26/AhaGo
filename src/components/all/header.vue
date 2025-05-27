<template>
  <div class="container">
    <div class="Logo" @click="goToOverview" style="cursor: pointer">
      <img class="logo" src="@/assets/main/logo.png" alt="Logo" />
      <div class="title" v-html="title"></div>
    </div>

    <div class="nav">
      <ul>
        Help
      </ul>
      <div class="acc">
        <ul v-if="!userLoggedIn" @click="toggleLogin">
          Login
        </ul>
        <ul v-if="!userLoggedIn" class="sign" @click="toggleLogin">
          Sign Up
        </ul>
        <ul v-if="userLoggedIn" @click="goToAccount" class="account">
          <img src="@/assets/delivery/images/image.png" alt="Account" />
        </ul>
      </div>
    </div>
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
.container {
  width: 93.3%;
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
.sign {
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  color: #292929;
  cursor: pointer;
}
.nav,
.acc {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  font-size: 20px;
}
.account img {
  border-radius: 20px;
  height: 40px;
  width: 40px;
  object-fit: cover;
}
</style>
