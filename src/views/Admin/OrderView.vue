<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="widget">
          <DashboardWidgets/>
        </div>
        <div class="chart-wrapper">
          <OrderLineChart :orders="filteredOrders" />
        </div>
        <div class="chart-wrapper">
          <OrderDonutChart :orders="filteredOrders" />
        </div>
        
      </div>

      <!-- Filter and Sort Options -->
      <div class="filters">
        <select v-model="selectedStatus" class="filter-dropdown">
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="On Process">On Process</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select v-model="sortBy" class="filter-dropdown">
          <option value="">Sort by</option>
          <option value="date">Date (Newest)</option>
          <option value="amount">Amount (High → Low)</option>
        </select>
      </div>

      <!-- Orders Section -->
      <div class="orders-section">
        <h2 class="section-title">Recent Orders</h2>
        <div class="orders-card">
          <table class="orders-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Order Type</th>
                <th>Address</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in paginatedOrders" :key="order.id"
                @click="goToTracking(order.id)"
                class="clickable-row"
              >
                <td class="clickable-id">{{ order.id }}</td>
                <td>{{ order.id }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.orderType }}</td>
                <td>{{ order.address }}</td>
                <td>{{ order.quantity }}</td>
                <td>${{ order.amount.toFixed(2) }}</td>
                <td>
                  <span :class="['badge', order.status.toLowerCase().replace(' ', '')]">
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button @click="deleteOrder(order.id)" class="delete-button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Component -->
        <PaginationComponent
          :totalPages="totalPages"
          :currentPage="currentPage"
          @page-changed="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderLineChart from '@/components/admin/RevenueLineChart.vue';
import OrderDonutChart from '@/components/admin/OrderDonutChart.vue';
import DashboardWidgets from '@/components/admin/DashboardWidgets.vue';

export default {
  name: 'OrderView',
  components: {
    Sidebar,
    PaginationComponent,
    OrderLineChart,
    OrderDonutChart,
    DashboardWidgets
  },
  data() {
    return {
      orders: [
        {
          id: 'ORD1025',
          date: '2025-01-23',
          customer: 'Sonita Yakom',
          orderType: 'Dine In',
          address: 'K4B 47 Z3, Obok keami...',
          quantity: 7,
          amount: 23.0,
          status: 'On Process',
        },
        {
          id: 'ORD1026',
          date: '2025-01-22',
          customer: 'John Doe',
          orderType: 'Dine In',
          address: '123 Main St...',
          quantity: 2,
          amount: 15.5,
          status: 'Completed',
        },
        {
          id: 'ORD1027',
          date: '2025-01-25',
          customer: 'Alice Smith',
          orderType: 'Takeaway',
          address: '456 Elm St...',
          quantity: 4,
          amount: 30.0,
          status: 'Pending',
        },
        {
          id: 'ORD1028',
          date: '2025-01-26',
          customer: 'Bob Johnson',
          orderType: 'Delivery',
          address: '789 Pine St...',
          quantity: 1,
          amount: 10.0,
          status: 'Cancelled',
        },
        // Add more orders as needed
      ],
      currentPage: 1,
      ordersPerPage: 5,
      searchQuery: '',
      selectedStatus: '',
      sortBy: '',
    };
  },
  computed: {
    filteredOrders() {
      let result = this.orders;

      // Search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (order) =>
            order.customer.toLowerCase().includes(query) ||
            order.id.toLowerCase().includes(query)
        );
      }

      // Filter by status
      if (this.selectedStatus) {
        result = result.filter((order) => order.status === this.selectedStatus);
      }

      // Sort
      if (this.sortBy === 'date') {
        result = result.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.sortBy === 'amount') {
        result = result.slice().sort((a, b) => b.amount - a.amount);
      }

      return result;
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.ordersPerPage);
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.ordersPerPage;
      return this.filteredOrders.slice(start, start + this.ordersPerPage);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    deleteOrder(orderId) {
      this.orders = this.orders.filter((order) => order.id !== orderId);
    },
    goToTracking(orderId) {
  this.$router.push({ name: 'OrderTracking', params: { id: orderId } });
},

  },
};
</script>

<style scoped>
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: #f3f4f6;
}

.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 15%;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
  padding: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.greeting {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.welcome {
  color: #6b7280;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
}


.search-bar:focus {
  border-color: #3b82f6;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-dropdown {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
}

.orders-section {
  margin-top: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.orders-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.orders-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.badge {
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.badge.onprocess {
  background-color: #e0f2fe;
  color: #0369a1;
}

.badge.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.badge.cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}

.delete-button {
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #dc2626;
}

/* Chart Section */
/* Chart Section */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.chart-wrapper {
  
  height: 300px;
  display: flex;
  flex-direction: column;
}
.chart-wrapper > * {
  flex-grow: 1;
  height: 100%;
 
}


</style>
