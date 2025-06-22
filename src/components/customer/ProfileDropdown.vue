<template>
  <div class="dropdown-menu">
    <ul>
      <li @click="goTo('/profile-settings')">Profile</li>
      <li @click="goTo('/favorite')">Favorite</li>
      <li @click="goTo('/history')">History</li>
      <li @click="logout">Log out</li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  logout: Function,
});

const router = useRouter();

const goTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: calc(100% + 15px);
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 8px 0;
  z-index: 1000;
  color: black;
  border: 1px solid #eee;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style> 