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
        <ul v-if="!userLoggedIn" class="sign" @click="toggleLogin">
          Sign Up
        </ul>
        <ul
          v-if="userLoggedIn"
          @click="goToAccount"
          class="account"
        >
          <img src="@/assets/delivery/image.png" alt="Account" />
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    const userLoggedIn = ref(false)

    const toggleLogin = () => {
      userLoggedIn.value = true
    }

    const goToAccount = () => {
      alert('Redirecting to Account Page!')
    }

    return { userLoggedIn, toggleLogin, goToAccount }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.container {
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
.account img{
  border-radius: 20px;
  height: 40px;
  width: 40px;
  object-fit: cover;
}
</style>
