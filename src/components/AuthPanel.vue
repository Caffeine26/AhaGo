<template>
    <Header2 title="AHA GO" it1="Sign In" it2="Sign Up" it3="Forgot Password" />
    <div class="auth-container">
      <div class="auth-panel">
        <!-- <transition-group name="fade" mode="out-in"> -->
        <!-- Login Panel -->
        <div v-if="activePanel === 'login'" class="login-panel" key="login">
          <div class="panel-content">
            <div class="image-section">
              <img src="@/assets/sign-in.png" alt="Sign In" class="panel-image" />
            </div>
            <div class="form-section">
              <div class="panel-header">
                <h2>SignIn</h2>
                <span class="switch-link" @click="navigateToSignUp">Register</span>
              </div>
              <form @submit.prevent="handleLogin">
                <InputText
                  v-model="loginForm.email"
                  placeholder="Email address"
                  type="email"
                />
                <InputText
                  v-model="loginForm.password"
                  placeholder="Enter password"
                  type="password"
                />
                <div class="forgot-password">
                  <a href="#" @click.prevent="navigateToForgotPassword">Forgot password?</a>
                </div>
                <button type="submit" class="submit-btn">LogIn</button>
                <div class="signup-text">
                  Don't have An Account? <span class="signup-link" @click="navigateToSignUp">Signup</span>
                </div>
                <div class="divider">
                  <div class="line"></div>
                  <span>OR</span>
                  <div class="line"></div>
                </div>
                <button type="button" class="google-btn">
                  <img src="@/assets/google-icon.png" alt="Google" />
                  Continue with google
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Register Panel -->
        <div v-if="activePanel === 'register'" class="register-panel" key="register">
          <div class="panel-content">
            <div class="form-section">
              <div class="panel-header">
                <h2>Register</h2>
                <span class="switch-link" @click="navigateToSignIn">SignIn</span>
              </div>
              <form @submit.prevent="handleSignup">
                <div style="display: flex; gap: 40px; padding-right: 22px;">
                  <InputText
                    v-model="signupForm.firstName"
                    placeholder="First Name"
                    type="text"
                    style="flex: 1;"
                  />
                  <InputText
                    v-model="signupForm.lastName"
                    placeholder="Last Name"
                    type="text"
                    style="flex: 1;"
                  />
                </div>
                <InputText
                  v-model="signupForm.email"
                  placeholder="Email Address"
                  type="email"
                />
                <InputText
                  v-model="signupForm.password"
                  placeholder="Password"
                  type="password"
                />
                <InputText
                  v-model="signupForm.confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                />
                <button type="submit" class="submit-btn">SignUp</button>
                <div class="signin-text">
                  Already have an account? <span class="signin-link" @click="navigateToSignIn">SignIn</span>
                </div>
                <div class="divider">
                  <div class="line"></div>
                  <span>OR</span>
                  <div class="line"></div>
                </div>
                <button type="button" class="google-btn">
                  <img src="@/assets/google-icon.png" alt="Google" />
                  Continue with google
                </button>
              </form>
            </div>
            <div class="image-section">
              <img src="@/assets/sign-up.png" alt="Sign Up" class="panel-image" />
            </div>
          </div>
        </div>

        <!-- Forgot Password Panel -->
        <div v-if="activePanel === 'forgot'" class="forgot-panel" key="forgot">
          <div class="panel-content">
            <div class="image-section">
              <img src="@/assets/forgot.png" alt="Forgot Password" class="panel-image" />
            </div>
            <div class="form-section forgot-form-section">
              <button class="back-btn" @click="navigateToSignIn">
                <svg width="32" height="32" fill="none" stroke="#9A0404" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h2 class="forgot-title">Verify Code</h2>
              <p class="forgot-instructions">
                Please enter code we just sent to your email<br>
                <span class="forgot-email">example@gmail.com</span>
              </p>
              <div class="code-inputs">
                <input type="text" maxlength="1" v-for="(digit, index) in 4" :key="index"
                       v-model="verificationCode[index]"
                       @input="handleCodeInput($event, index)"
                       ref="codeInputs">
              </div>
              <div class="forgot-resend-row">
                <span class="forgot-otp-label">Didn't receive OTP?</span>
                <span class="resend" @click="handleResendCode">Resend code</span>
              </div>
              <button class="verify-btn" @click="handleVerification">Verify</button>
            </div>
          </div>
        </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authenticationStore';
import Header2 from '@/components/delivery/header2.vue';
import InputText from '@/components/all/inputText.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

function getPanelFromRoute(path) {
  if (path.includes('signup')) return 'register';
  if (path.includes('forgot')) return 'forgot';
  return 'login';
}

const activePanel = ref(getPanelFromRoute(route.path));
const loginForm = ref({
  email: '',
  password: ''
});
const signupForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});
const verificationCode = ref(['', '', '', '']);

watch(
  () => route.path,
  (newPath) => {
    activePanel.value = getPanelFromRoute(newPath);
  }
);

function handleCodeInput(event, index) {
  const input = event.target;
  if (input.value.length === 1 && index < 3) {
    input.nextElementSibling?.focus();
  }
}

function handleVerification() {
  const code = verificationCode.value.join('');
  console.log('Verification Code:', code);
}

async function handleLogin() {
  authStore.email = loginForm.value.email;
  authStore.password = loginForm.value.password;
  await authStore.handleLogin("customer");
}

async function handleSignup() {
  if (signupForm.value.password !== signupForm.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  authStore.firstName = signupForm.value.firstName;
  authStore.lastName = signupForm.value.lastName;
  authStore.email = signupForm.value.email;
  authStore.password = signupForm.value.password;
  authStore.confirmPassword = signupForm.value.confirmPassword;
  await authStore.handleSignUp("customer");
}

function navigateToSignIn() {
  router.push('/login');
}
function navigateToSignUp() {
  router.push('/signup');
}
function navigateToForgotPassword() {
  router.push('/forgot-password');
}

// Resend code stub
function handleResendCode() {
  alert("Resend code clicked!");
}
</script>

<style scoped>
.auth-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}

.panel-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
}

.image-section {
  width: 50%;  /* Exactly half width */
  height: 100%;
  overflow: hidden;
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-section {
  width: 50%;  /* Exactly half width */
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.panel-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #9A0404;
}

.switch-link {
  color: #9A0404;
  font-weight: 500;
  cursor: pointer;
  font-size: 24px;
}

.form-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  font-size: 1rem;
  background: #F8F8F8;
}

input::placeholder {
  color: #999;
}

.forgot-password {
  text-align: right;
  margin-bottom: 1rem;
}

.forgot-password a {
  color: #FF0000;
  text-decoration: none;
  font-size: 0.9rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #9A0404;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #b91c1c;
}

.signup-text {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.signup-link,
.signin-link {
  color: #9A0404;
  cursor: pointer;
  font-weight: 600;
}

.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.line {
  flex: 1;
  height: 1px;
  background: #E8E8E8;
}

.divider span {
  color: #666;
  font-weight: 500;
}

.google-btn {
  width: 100%;
  padding: 1rem;
  background: white;
  border: 1.5px solid #9A0404;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  color: #9A0404;
}

.google-btn img {
  width: 20px;
  height: 20px;
}

/* Verification Code Panel Styles */
.verify-content {
  text-align: center;
}

.email {
  color: #666;
  margin-bottom: 2rem;
}

.code-inputs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.code-inputs input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
}

.resend {
  color: #FF0000;
  cursor: pointer;
  margin: 1rem 0;
}

.verify-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

/* Replace the existing animation styles with these enhanced versions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Remove position: absolute from panels */
.login-panel,
.register-panel,
.forgot-panel {
  width: 100%;
  height: 100%;
}

/* Keep the auth-panel styles but remove overflow: hidden */
.auth-panel {
  position: relative;
  width: 100%;
  height: 100%;
}

.forgot-form-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  width: 100%;
}

.back-btn {
  align-self: flex-start;
  background: none;
  border: none;
  margin-bottom: 1.5rem;
  cursor: pointer;
  padding: 0;
}

.forgot-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1rem;
  text-align: center;
}

.forgot-instructions {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
}

.forgot-email {
  color: #9A0404;
  font-weight: 600;
  display: block;
  margin-top: 0.5rem;
}

.code-inputs {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0 1.5rem 0;
}

.code-inputs input {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  border: 1.5px solid #e5e5e5;
  background: #f8f8f8;
  font-size: 2rem;
  text-align: center;
  transition: border 0.2s;
}

.code-inputs input:focus {
  border: 2px solid #9A0404;
  outline: none;
}

.forgot-resend-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.forgot-otp-label {
  color: #aaa;
  font-size: 1rem;
}

.resend {
  color: #111;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
}

.verify-btn {
  width: 100%;
  padding: 1rem;
  background-color: #9A0404;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.verify-btn:hover {
  background: #b91c1c;
}
</style>
