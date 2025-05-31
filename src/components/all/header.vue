<template>
  <div class="container">
    <div class="Logo">
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
        <ul v-if="!userLoggedIn" class="sign" @click="goToSignUp">
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
// Importing 'ref' from Vue
import { ref } from "vue";
import { useRouter } from 'vue-router';

// Accept props
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  goToAccount: Function, // Accept the goToAccount method as a prop
});

const userLoggedIn = ref(false); // This line initializes the reactive ref
const router = useRouter();

const toggleLogin = () => {
  userLoggedIn.value = true;
};

const goToSignUp = () => {
  router.push('/signup');
};
</script>

<style scoped>
.container {
  background-color: #292929;
  padding: 0px 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
.Logo {
  gap: 10px;
  display: flex;
  align-items: center;
}
.logo {
  height: 60px;
  width: auto;
}
.title {
  font-size: 32px;
  white-space: nowrap;
}
.sign {
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  color: #292929;
  cursor: pointer;
  white-space: nowrap;
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

@media (max-width: 768px) {
  .container {
    padding: 0px 1rem;
  }
  .title {
    font-size: 24px;
  }
  .nav,
  .acc {
    font-size: 16px;
    gap: 10px;
  }
  .logo {
    height: 40px;
  }
}
</style>
