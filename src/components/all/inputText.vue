<template>
    <div class="input-text">
      <label v-if="label" :for="id">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="localValue"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  // create a local copy
  const localValue = ref(props.modelValue);
  
  // watch for local changes and emit
  watch(localValue, (newVal) => {
    emit('update:modelValue', newVal);
  });
  
  // watch if parent changes modelValue
  watch(() => props.modelValue, (newVal) => {
    localValue.value = newVal;
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
  font-size: 14px;
  color: #333;
}

.input-text input {
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-text input:focus {
  outline: none;
  border: 2px solid #9A0404; 
}
</style>