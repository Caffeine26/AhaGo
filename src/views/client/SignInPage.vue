<template>
  <div>
    <Header :title="'AHA GO'" />
    <AuthPanel :defaultPanel="'login'" />
    <AppFooter />
  </div>
</template>

<script setup>
import Header from '@/components/all/header.vue'
import AppFooter from '@/components/AppFooter.vue'
import AuthPanel from '@/components/AuthPanel.vue'
</script> 