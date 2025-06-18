<template>
  <div class="input-text">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
});
</script>

<style scoped>
.input-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.input-text label {
  font-size: 20px;
  color: #9a0404;
  font-weight: 700;
}

.input-text input {
  width: 95%;
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 12px;
}

.input-text input:focus {
  outline: none;
  border: 2px solid #9a0404;
}
</style>
