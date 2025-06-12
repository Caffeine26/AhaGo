<template>
  <div class="container">
    <div class="form-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />

        <div class="options">
          <label><input type="checkbox" v-model="remember" /> Remember me</label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>

        <p class="switch">
          Don't have an account?
          <router-link to="/admin/signup">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      remember: false,
    };
  },
  methods: {
    handleLogin() {
      alert(`Logged in as ${this.email}`);
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
  background-color: #f0f2f5;
}

.form-box {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

input[type="email"],
input[type="password"] {
  width: 90%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.options {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  background-color: #3a78c2;
}

.switch {
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
}

.switch a {
  color: #4a90e2;
  text-decoration: none;
}
</style>
