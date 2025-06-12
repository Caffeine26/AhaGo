<template>
  <div class="inventory-container">
    <LineGraph
      :title="'Supply Overview'"
      :value="totalSupply.toString()"
      :data="supplyData"
      :months="monthsToShow"
    />

    <div class="stock-level card">
      <StockGraph />
    </div>

    <div class="inventory-header">
      <input type="text" v-model="searchQuery" placeholder="Search anything..." />
      <select v-model="selectedWeek">
        <option value="this-week">This Week</option>
        <option value="last-week">Last Week</option>
      </select>
    </div>

    <table class="inventory-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Status</th>
          <th>Quantity</th>
          <th>Quantity to Reorder</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in paginatedItems" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td><span :class="statusClass(item.status)">{{ item.status }}</span></td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.reorderQuantity }}</td>
          <td>
            <button class="btn-update" @click="updateItem(item)">Update</button>
          </td>
        </tr>
        <tr v-if="paginatedItems.length === 0">
          <td colspan="6" class="no-data">No items found.</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <PaginationComponent
        :current-page="currentPage"
        :total-items="filteredItems.length"
        :items-per-page="itemsPerPage"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import StockGraph from '@/components/admin/StockGraph.vue'
import LineGraph from '@/components/admin/LineGraph.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  components: {
    StockGraph,
    LineGraph,
    PaginationComponent
  },
  data() {
    return {
      searchQuery: '',
      selectedWeek: 'this-week',
      currentPage: 1,
      itemsPerPage: 5,
      supplyData: [10, 20, 30, 40, 50],
      monthsToShow: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      inventoryItems: [
        { name: 'Item A', category: 'Category 1', status: 'Active', quantity: 100, reorderQuantity: 20 },
        { name: 'Item B', category: 'Category 2', status: 'Low', quantity: 15, reorderQuantity: 10 },
        { name: 'Item C', category: 'Category 1', status: 'Out of Stock', quantity: 0, reorderQuantity: 50 },
        // Add more items as needed
      ]
    }
  },
  computed: {
    totalSupply() {
      return this.supplyData.reduce((sum, val) => sum + val, 0);
    },
    filteredItems() {
      const query = this.searchQuery.toLowerCase()
      return this.inventoryItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      )
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredItems.slice(start, start + this.itemsPerPage)
    }
  },
  methods: {
    updateItem(item) {
      alert(`Updating item: ${item.name}`)
      // Add modal or update logic here
    },
    statusClass(status) {
      switch (status.toLowerCase()) {
        case 'active': return 'status-active'
        case 'low': return 'status-low'
        case 'out of stock': return 'status-out'
        default: return ''
      }
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.inventory-container {
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.card {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.supply-overview h2 {
  margin-bottom: 10px;
}

.overview-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.last-month {
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;
}

.inventory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.inventory-header input,
.inventory-header select {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
}

.inventory-table th,
.inventory-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.inventory-table th {
  background-color: #f8f8f8;
}

.btn-update {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-update:hover {
  background-color: #45a049;
}

.status-active {
  color: green;
  font-weight: bold;
}

.status-low {
  color: orange;
  font-weight: bold;
}

.status-out {
  color: red;
  font-weight: bold;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 20px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
