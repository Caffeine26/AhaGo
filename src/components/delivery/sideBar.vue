<template>
  <div class="sidebar">
    <!-- Profile Section -->
    <div class="section">
      <h3 class="section-title">Profile</h3>
      <ul class="nav">
        <SidebarItem icon="👤" label="Edit Profile" />
        <SidebarItem icon="🌐" label="Language" />
        <SidebarItem icon="🌐" label="Notifications" active />
      </ul>
    </div>

    <!-- Business Section -->
    <div class="section">
      <h3 class="section-title">Business</h3>
      <ul class="nav">
        <SidebarItem icon="💰" label="Track earnings" />
        <SidebarItem icon="⭐" label="Rate by clients" />
        <SidebarItem icon="💬" label="Customer feedback" />
        <SidebarItem icon="📦" label="Past deliveries" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue";
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #b30000; /* Deep red */
  color: white;
  padding: 20px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
