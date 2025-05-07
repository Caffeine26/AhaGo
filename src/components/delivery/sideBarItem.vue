<template>
  <li :class="['sidebar-item', { active }]" @click="$emit('click')">
    <img
      v-if="!isEmoji"
      :src="icon"
      class="icon"
      alt="icon"
      :class="{ activeIcon: active }"
    />
    <span class="label">{{ label }}</span>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: [String, Object], // icon can now be a component
  label: String,
  active: Boolean,
});
</script>

<style scoped>
.sidebar-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease-out;
}

.sidebar-item.active {
  background-color: white;
  color: #9a0404;
  font-weight: bold;
  width: 110%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  transform: translateY(5px);
}

.icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1); /* makes icon white */
  transition: filter 0.3s ease;
}

.activeIcon {
  filter: none; /* show original red color when active */
}

/* Optional: keep emojis red when active */
.sidebar-item.active .icon {
  color: #9a0404;
}

.label {
  font-size: 24px;
}
</style>
