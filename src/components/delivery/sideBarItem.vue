<template>
  <RouterLink :to="to" class="sidebar-item" :class="{ active }">
    <img :src="icon" class="icon" :class="{ activeIcon: active }" />
    <span class="label">{{ label }}</span>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  icon: String,
  label: String,
  active: Boolean,
  to: String,
});
</script>

<style scoped>
.sidebar-item {
  width: 280px;
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  border-radius: 30px 0 0 30px;
  background-color: #9a0404;
}

.sidebar-item.active {
  background-color: white;
  color: #9a0404;
  font-weight: bold;
  width: 110%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.sidebar-item:hover {
  transform: scale(1.1);
}
.icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.activeIcon {
  filter: none;
}

.label {
  font-size: 24px;
}
</style>
