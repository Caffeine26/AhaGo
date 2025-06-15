<script setup>
import Header from "@/components/all/header.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <Header
    :userLoggedIn="userLoggedIn"
    :basePath="''"
    title="<span style='color: #9A0404;'>AhaGo</span>"
  />
  <router-view></router-view>
  <AppFooter />
</template>
