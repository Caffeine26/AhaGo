<template>
  <div class="info-list">
    <div v-for="row in info" :key="row.label" class="info-row">
      <span>{{ row.label }}</span>
      <span class="info-value" :class="{ red: row.highlight }">
        {{ row.value }}
        <span v-if="row.chevron" class="chevron">&gt;</span>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  info: Array,
});
</script>

<style scoped>
.info-list {
  background: white;
  border-radius: 12px;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
}
.info-value.red {
  color: #b91c1c;
  font-weight: 500;
}
.chevron {
  color: #888;
  margin-left: 0.2em;
}
</style>
