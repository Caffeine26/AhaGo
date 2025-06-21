<template>
  <div class="container">
    <div class="image-section"></div>
    <div class="form-section">
      <div class="form-box">
        <h2>Sign Up</h2>
        <form @submit.prevent="submit">
          <div class="name-fields">
            <div class="input-wrapper">
              <InputText
                v-model="driverStore.firstName"
                placeholder="First Name"
              />
            </div>
            <div class="input-wrapper">
              <InputText
                v-model="driverStore.lastName"
                placeholder="Last Name"
              />
            </div>
          </div>

          <InputText
            v-model="driverStore.email"
            type="email"
            placeholder="Email Address"
          />
          <InputText
            v-model="driverStore.password"
            type="password"
            placeholder="Password"
          />
          <InputText
            v-model="driverStore.confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />

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
            type="submit"
          />

          <p class="small">
            Already have an account?
            <a href="/driver/login">Log In</a>
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
import { useDriverStore } from "@/stores/driverStore";
import { useRouter } from "vue-router";

const driverStore = useDriverStore();
const router = useRouter();

// Local reactive ref for terms checkbox
const agreed = ref(false);

// Submit handler for form
const submit = async () => {
  // Validate terms
  if (!agreed.value) {
    alert("You must agree to the terms and conditions.");
    return;
  }

  // Validate all fields filled
  if (
    !driverStore.firstName ||
    !driverStore.lastName ||
    !driverStore.email ||
    !driverStore.password ||
    !driverStore.confirmPassword
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Validate password confirmation
  if (driverStore.password !== driverStore.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  await driverStore.handleSignUp();
};
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
