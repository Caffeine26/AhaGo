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
  <div class="acc">
  <template v-if="userLoggedIn">
    <ul class="account" @click="$emit('go-to-account')">
      <img
        :src="userProfileImg"
        alt="Account"
        @error="(e) => e.target.src = require('@/assets/delivery/images/image1.png')"
      />
    </ul>   
  </template>
  <template v-else>
    <ul @click="goToLogin">Login</ul>
    <ul class="sign" @click="goToSignup">Sign Up</ul>
  </template>
</div>

</div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  ownerUrl: {
    type: Boolean,
    default: false
  },
  goToAccount: Function,
  userLoggedIn: {
    type: Boolean,
    required: true,
  },
basePath: {
  type: String,
  default: "", // Default to root for customer panel
},
userProfileImg: {
  type: String,
  default: "@/assets/delivery/images/image1.png", 
}

});

const router = useRouter();
const buildRoute = (path) => {
  return props.basePath ? `/${props.basePath}/${path}` : `/${path}`;
};

const goToLogin = () => {
  router.push(buildRoute("login"));
};

const goToSignup = () => {
  router.push(buildRoute("signup"));
};

const goToOverview = () => {
  router.push(buildRoute(""));
};

</script>

<style scoped>
.container {
  width: 100vw;
  background-color: #292929;
  color: white;
  padding: 0px 50px;
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
