<template>
    <div class="button-filter">
      <select v-model="selectedOption" @change="handleChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonFilter',
    props: {
      options: {
        type: Array,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        selectedOption: this.value,
      };
    },
    watch: {
      value(newValue) {
        this.selectedOption = newValue;
      },
    },
    methods: {
      handleChange() {
        this.$emit('update:value', this.selectedOption); // Ensure v-model binding works
        this.$emit('change'); // Emit custom change event
      },
    },
  };
  </script>
  
  <style scoped>
  /* You can style the dropdown here */
  .button-filter select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  