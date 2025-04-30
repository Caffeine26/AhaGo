<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        &lt;
      </button>
  
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
  
      <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        &gt;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaginationComponent',
    props: {
      totalPages: Number,
      currentPage: Number
    },
    emits: ['page-changed'],
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-changed', page);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }
  button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    background-color: #f9f6f6;
    color: #333;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
  }
  button.active {
    background-color: orange;
    color: white;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>
  