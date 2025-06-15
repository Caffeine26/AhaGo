<template>
  <div class="cont">
    <div class="heade">
      <Header         title="<span style='color: #9A0404;'>AhaGo</span> Delivery"
 :basePath="'deliver'" :userLoggedIn="false" />
      <Header2
        title="Deliver"
        it1="Overview"
        it2="Delivery basics"
        it3="About Us"
        it4="Contact Us"
      />
    </div>
    <div class="contnt">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import Header from "@/components/all/header.vue";
import AppFooter from "@/components/AppFooter.vue";
import Header2 from "@/components/delivery/header2.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userLoggedIn = ref(false);

// Replace this with your actual auth logic
const checkAuth = () => {
  const token = localStorage.getItem("auth_token");
  userLoggedIn.value = !!token; // true if token exists
};

const goToAccount = () => {
  router.push("/delivery/settings/profile");
};

onMounted(() => {
  checkAuth();
});
</script>

<style>
body {
  margin: 0px;
}
.cont {
  font-family: Raleway;
}
.heade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

.contnt {
  padding-top: 136px;
}
</style>
