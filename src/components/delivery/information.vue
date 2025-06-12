<template>
  <div class="info-text">
    <label v-if="label" :for="id">{{ label }}</label>
    <p class="info-value">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: () => `info-${Math.random().toString(36).substr(2, 9)}`,
  },
});
</script>

<style scoped>
.info-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.info-text label {
  font-size: 20px;
  color: #9a0404;
  font-weight: 700;
}

.info-value {
  width: 100%;
  font-size: 20px;
  color: #333;
  margin: 10px;
}
</style>
