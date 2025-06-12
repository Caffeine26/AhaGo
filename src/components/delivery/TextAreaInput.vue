<template>
  <div class="textarea-input">
    <label v-if="label" :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      v-model="localValue"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  rows: {
    type: Number,
    default: 5,
  },
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(localValue, (newVal) => emit("update:modelValue", newVal));
watch(
  () => props.modelValue,
  (newVal) => (localValue.value = newVal)
);
</script>

<style scoped>
.textarea-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.textarea-input label {
  font-size: 20px;
  color: #9a0404;
  font-weight: 700;
}

.textarea-input textarea {
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

.textarea-input textarea:focus {
  outline: none;
  border: 2px solid #9a0404;
}
</style>
