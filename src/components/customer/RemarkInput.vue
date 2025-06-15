<template>
  <div class="section remarks-section">
    <span class="remarks-label">Remarks</span>
    <textarea
      placeholder="Please leave a message, if any."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.remarks-section {
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
}
.remarks-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 60px;
  font-size: 1rem;
}
</style>
