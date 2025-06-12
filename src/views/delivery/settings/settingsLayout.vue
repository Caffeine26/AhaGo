<template>
  <div class="settings-layout">
    <SideBar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/delivery/sideBar.vue";
</script>

<style scoped>
.settings-layout {
  display: flex;
  padding: 0px;
  overflow-x: hidden;
  /* justify-content: space-between; */
}
.content {
  width: 100%;
}
</style>
