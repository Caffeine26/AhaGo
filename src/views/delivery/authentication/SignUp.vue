<template>
  <div class="container">
    <div class="image-section"></div>
    <div class="form-section">
      <div class="form-box">
        <h2>Sign Up</h2>
        <div class="name-fields">
          <div class="input-wrapper">
            <InputText v-model="firstName" placeholder="First Name" />
          </div>
          <div class="input-wrapper">
            <InputText v-model="lastName" placeholder="Last Name" />
          </div>
        </div>

        <InputText v-model="email" type="email" placeholder="Email Address" />
        <InputText v-model="password" type="password" placeholder="Password" />

        <div class="terms">
          <input type="checkbox" id="terms" v-model="agreed" />
          <label for="terms">
            I agree to the
            <a href="#">Terms and Conditions</a>
          </label>
        </div>
        <GeneralButton
          class="button"
          :title="'Sign Up'"
          :btnColor="'#9A0404'"
          :titleColor="'#ffffff'"
          @click="submit"
        />

        <p class="small">
          Already have an account?
          <a href="/deliver/login">Log In</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "@/components/all/inputText.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const agreed = ref(false);

const submit = () => {
  if (!agreed.value) {
    alert("You must agree to the terms and conditions.");
    return;
  }

  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    alert("Please fill in all fields.");
    return;
  }

  // Save mock user data (simulate successful signup)
  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  localStorage.setItem("auth_token", "mock_token_123"); // Simulated token
  localStorage.setItem("user_data", JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "/delivery/settings/profile"; // Redirect after signup
};
</script>

<style scoped>
.container {
  display: flex;
  height: 91.6vh;
}

.image-section {
  flex: 1;
  background-image: url("https://vilandtravel.com/wp-content/uploads/2023/03/siem-reap-khmer-foods-viland-travels-4-1.png.webp");
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

.name-fields {
  display: flex;
  /* gap: 30px; */
  justify-content: space-between;
}
.input-wrapper {
  /* flex: 1; */
  max-width: 170px;
}
.terms {
  display: flex;
  align-items: center;
  font-size: 0.9em;
  margin-bottom: 15px;
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
