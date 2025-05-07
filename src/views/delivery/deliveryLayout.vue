<template>
  <div class="container">
    <Header
      :userLoggedIn="userLoggedIn"
      :goToAccount="goToAccount"
      title="<span style='color: #9A0404;'>AhaGo</span> Delivery"
    />
    <Header2
      title="Deliver"
      it1="Overview"
      it2="Delivery basics"
      it3="Earnings"
      it4="Safety"
      it5="Support"
    />
    <router-view />
  </div>
</template>

<script setup>
import Header from "@/components/all/header.vue";
import Header2 from "@/components/delivery/header2.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userLoggedIn = ref(false);

const goToAccount = () => {
  router.push("/delivery/profile");
};
</script>
<style scoped>
.container {
  font-family: Raleway;
}
</style>
