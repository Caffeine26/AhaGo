<template>
  <div class="menu-section">
    <h2>{{ title }}</h2>
    <div v-if="subtitle" class="promo-subtitle">{{ subtitle }}</div>
    <div class="menu-list">
      <MenuItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @add="$emit('add', $event)"
      />
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "MenuList",
  components: {
    MenuItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.menu-section {
  margin-bottom: 2rem;
}

.menu-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.promo-subtitle {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.menu-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
</style>
