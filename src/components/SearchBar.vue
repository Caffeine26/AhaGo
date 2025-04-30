<template>
    <div class="search-bar">
      <div class="input-container">
        <input
          type="text"
          v-model="searchText"
          @input="handleInput"
          placeholder="Search here..."
        />
        <img
          src="@/assets/search.png"
          alt="Search Icon"
          class="search-icon"
          @click="handleInput"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        searchText: ''
      };
    },
    emits: ['search'],
    methods: {
      handleInput() {
        this.$emit('search', this.searchText);
      }
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .input-container {
    position: relative;
    width: 300px;
  }
  
  input {
    width: 100%;
    padding: 8px 12px;
    /* font-size: 16px; */
    border-radius: 6px;
    border: 1px solid #ccc;
    padding-right: 1px; /* Add space for the icon */
  }
  
  .search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  </style>
  