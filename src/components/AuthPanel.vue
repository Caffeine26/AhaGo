<template>
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
                <div class="form-group">
                  <input 
                    type="tel" 
                    v-model="loginForm.phone" 
                    required
                    placeholder="Phone number"
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="password" 
                    v-model="loginForm.password" 
                    required
                    placeholder="Enter password"
                  >
                </div>
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
                <h2>SignUp</h2>
                <span class="switch-link" @click="navigateToSignIn">SignIn</span>
              </div>
              <form @submit.prevent="handleSignup">
                <div class="form-group">
                  <input 
                    type="tel" 
                    v-model="signupForm.phone" 
                    required
                    placeholder="Phone number"
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="password" 
                    v-model="signupForm.password" 
                    required
                    placeholder="Enter password"
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="password" 
                    v-model="signupForm.confirmPassword" 
                    required
                    placeholder="Confirm password"
                  >
                </div>
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
            <div class="form-section">
              <div class="panel-header">
                <h2>Verify Code</h2>
                <button class="back-btn" @click="navigateToSignIn">
                  <span>&times;</span>
                </button>
              </div>
              <div class="verify-content">
                <p>Please enter code we just sent to your email</p>
                <p class="email">example@gmail.com</p>
                <div class="code-inputs">
                  <input type="text" maxlength="1" v-for="(digit, index) in 4" :key="index" 
                         v-model="verificationCode[index]" 
                         @input="handleCodeInput($event, index)"
                         ref="codeInputs">
                </div>
                <p class="resend">Resend code</p>
                <button class="verify-btn" @click="handleVerification">Verify</button>
              </div>
            </div>
          </div>
        </div>
      <!-- </transition-group> -->
    </div>
  </div>
</template>

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
  color: #000;
}

.switch-link {
  color: #999;
  font-weight: 500;
  cursor: pointer;
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
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.signup-text {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.signup-link {
  color: #FF0000;
  cursor: pointer;
  font-weight: 500;
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
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
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
</style>

<script>
export default {
  name: 'AuthPanel',
  props: {
    defaultPanel: {
      type: String,
      default: 'login'
    }
  },
  data() {
    return {
      activePanel: this.defaultPanel,
      loginForm: {
        phone: '',
        password: ''
      },
      signupForm: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      verificationCode: ['', '', '', '']
    }
  },
  watch: {
    defaultPanel(newValue) {
      this.activePanel = newValue
    }
  },
  methods: {
    handleLogin() {
      this.$emit('login', this.loginForm)
    },
    handleSignup() {
      if (this.signupForm.password !== this.signupForm.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      this.$emit('signup', this.signupForm)
    },
    handleCodeInput(event, index) {
      const input = event.target
      const value = input.value
      
      if (value.length === 1 && index < 3) {
        this.$refs.codeInputs[index + 1].focus()
      }
    },
    handleVerification() {
      const code = this.verificationCode.join('')
      this.$emit('verify-code', code)
    },
    // Navigation methods
    navigateToSignIn() {
      this.$router.push('/signin')
    },
    navigateToSignUp() {
      this.$router.push('/signup')
    },
    navigateToForgotPassword() {
      this.$router.push('/forgot-password')
    }
  }
}
</script>