<template>
  <div class="container">
    <div class="image-section"></div>
    <div class="form-section">
      <div class="form-box">
        <h2>Log In</h2>
        <form @submit.prevent="login">
          <InputText v-model="email" type="email" placeholder="Email Address" />
          <InputText
            v-model="password"
            type="password"
            placeholder="Password"
          />

          <div class="link small">Forgot your password?</div>

          <GeneralButton
            class="button"
            :title="'Log In'"
            :btnColor="'#9A0404'"
            :titleColor="'#ffffff'"
            @click="login"
          />

          <p class="small">
            Don’t have an account?
            <a href="/driver/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "@/components/all/inputText.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authenticationStore";
const authStore = useAuthStore();
const email = ref("");
const password = ref("");

// On login button click
async function login() {
  if (!email.value || !password.value) {
    alert("Please enter email and password.");
    return;
  }

  // Set the store refs for login
  authStore.email = email.value;
  authStore.password = password.value;

  await authStore.handleLogin("driver");
}
</script>

<style scoped>
.container {
  display: flex;
  height: 91.6vh;
}

.image-section {
  flex: 1;
  background-image: url("https://www.gocambodia.tours/wp-content/uploads/2024/06/Traditional-Khmer-Cuisine-with-go-laos-tours.jpg");
  background-size: cover;
  background-position: center;
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.form-box {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h2 {
  color: #9a0404;
  margin-bottom: 20px;
}

.link {
  text-align: right;
  color: #666;
  cursor: pointer;
  font-size: 0.9em;
}

.button {
  height: fit-content;
  width: 100%;
  margin-left: 5px;
}

.small {
  font-size: 0.9em;
}

a {
  color: #9a0404;
  text-decoration: none;
}
</style>
