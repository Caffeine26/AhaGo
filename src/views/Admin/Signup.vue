<template>
  <div class="container">
    <div class="form-box">
      <h2>Admin Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <div class="name-fields">
          <input type="text" v-model="firstName" placeholder="First Name" required />
          <input type="text" v-model="lastName" placeholder="Last Name" required />
        </div>
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
        <input type="text" v-model="address" placeholder="Address (optional)" />
        <input type="text" v-model="city" placeholder="City (optional)" />
        <input type="text" v-model="phoneNumber" placeholder="Phone Number (optional)" />

        <label class="checkbox-label">
          <input type="checkbox" v-model="agree" />
          I agree to the Terms & Privacy Policy
        </label>

        <button type="submit" :disabled="!formIsValid">Sign Up</button>

        <p class="switch">
          Already have an account?
          <router-link to="/admin/login">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminSignUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      phoneNumber: '',
      agree: false,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword &&
        this.agree
      );
    },
  },
  methods: {
    async handleSignUp() {
      try {
        const response = await axios.post('http://localhost:8300/api/signup', {
          name: this.firstName + ' ' + this.lastName,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          role: 'admin',
          first_name: this.firstName,
          last_name: this.lastName,
          address: this.address,
          city: this.city,
          phone_number: this.phoneNumber,
        });

        alert('Signup successful! Please login.');
        this.$router.push('/admin/login');
      } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'));
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eef1f4;
}

.form-box {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.name-fields {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.name-fields input {
  flex: 1;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 90%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.checkbox-label {
  display: block;
  font-size: 13px;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #218838;
}

.switch {
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
}

.switch a {
  color: #28a745;
  text-decoration: none;
}
</style>
