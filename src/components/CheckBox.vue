<template>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" v-model="filters.delivery" @change="updateFilters" />
        Delivery
      </label>
      <label>
        <input type="checkbox" v-model="filters.rating" @change="updateFilters" />
        Rating 4 or above
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckboxFilter',
    data() {
      return {
        filters: {
          delivery: false,
          rating: false,
        },
      };
    },
    methods: {
      updateFilters() {
        this.$emit('update-filters', { ...this.filters });
      },
    },
  };
  </script>
  
  <style scoped>
  .checkbox-group label {
    font-size: 14px;
    margin-right: 20px;
  }
  
  .checkbox-group input {
    margin-right: 5px;
  }
  </style>
  