<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="page-title">Dashboard</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img :src="userImage" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="error-message">
        Error loading dashboard data. Please try again.
        <button @click="loadData" class="retry-btn">Retry</button>
      </div>

      <!-- Main Content -->
      <template v-else>
        <!-- Row 1: Stats -->
        <section class="stats-section">
          <DashboardStats :stats="stats" />
        </section>

      <!-- Row 2: StockGraph + (PieChart & OrderTypeGraph) -->
      <section class="section row-grid">
        <div class="chart-container">
          <!-- <StockGraph class="stock"
          :total-food-items="totalItems"
          :in-stock="instock"
          :out-of-stock="outstock"
          ></StockGraph> -->
          <div class="bar-chart-wrapper">
            <BarChart
            :orders-data="recentOrdersData"
            ></BarChart>
          </div>
          <div class="right-charts">
            <div class="chart-card">
              <PieChart
                :labels="topCategories.categories"
                :data="topCategories.quantities"
              />
            </div>
            <div class="chart-card">
              <OrderTypeGraph 
                :total-orders="totalOrders"
                :order-data="orderTypes" 
              />
            </div>
          </div>
        </section>

        <!-- Row 3: Orders and Items -->
        <section class="orders-section">
          <div class="orders-container">
            <RecentOrders :orders="orders" />
          </div>
          <div class="items-container">
            <div class="title-and-filter">
              <h1 class="trending-title">Top Selling Items</h1>
              <ButtonFilter 
                :options="filters" 
                v-model="selectedFilter" 
              />
            </div>
            <ItemGrid :items="topSellers" :starImg="starImg" />
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useOrdersStore } from '@/stores/ordersStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useCustomerStore } from '@/stores/customerStore';

// Components
import Sidebar from '@/components/admin/Sidebar.vue';
import DashboardStats from '@/components/admin/DashboardStats.vue';
import RecentOrders from '@/components/admin/RecentOrders.vue';
import BarChart from '@/components/admin/BarChart.vue';
import PieChart from '@/components/admin/PieChart.vue';
import StockGraph from '@/components/admin/StockGraph.vue';
import OrderTypeGraph from '@/components/admin/Ordertype.vue';
import ItemGrid from '@/components/admin/ItemGrid.vue';
import ButtonFilter from '@/components/ButtonFilter.vue';

// Assets
import starImg from '@/assets/icons/star1.png';
import userImage from '@/assets/Kuromi.jpg';
import cakeImg from '@/assets/food/cake.png';
import saladImg from '@/assets/food/salad.png';
import cucumberImg from '@/assets/food/cucumber.png';

export default {
  name: 'DashboardView',
  components: {
    Sidebar,
    DashboardStats,
    RecentOrders,
    PieChart,
    StockGraph,
    BarChart,
    OrderTypeGraph,
    ItemGrid,
    ButtonFilter
  },
  created() {
    const orderStore = useOrdersStore()
    const transactionStore = useTransactionStore()
    const foodItemStore = useCategoryStore()
    const customerStore = useCustomerStore()

    // get length of all orders
    orderStore.fetchAllOrdersCount()
    this.totalOrders = orderStore.ordersCount
    this.stats[0].value = orderStore.ordersCount

    // get customers count
    customerStore.fetchTotalCustomers()
    this.stats[1].value = customerStore.totalCustomers

    // getAllGeneratedRevenue
    transactionStore.getAllGeneratedRevenue()
    this.stats[2].value = `\$ ${transactionStore.adminRevenue}`

    // get #fooditems and stock levels
    foodItemStore.getStock()
    foodItemStore.getFoodItemsCount()
    this.instock = foodItemStore.stock[0]
    this.outstock = foodItemStore.stock[1]
    this.totalItems = foodItemStore.foodItemsCount

    // get orderTypes and their amount
    orderStore.getOrderTypes()
    this.orderTypes = orderStore.orderTypes

    // get data of amount of orders of the last 7 days for restaurant id 2
    orderStore.fetchRecentOrders(2)
    this.recentOrdersData = orderStore.recentOrders

    // get data of the top 3 sold food items
    foodItemStore.getTopSolds()
    this.topsolds = foodItemStore.topSellers

    // fetch data of transactions of the last 7 days for restaurant id 2
    transactionStore.getRecentTransactions(2)
    this.recentTransactions = transactionStore.recentTransactions

    // fetch data of top categories
    orderStore.fetchTopCategories()
    this.topCategories = orderStore.topCategories

    // get top sellers
    foodItemStore.getTopSolds()
    this.topSellers = foodItemStore.topSellers
  },
  data() {
    return {
      totalOrders: 0,
      totalCustomers: 0,
      recentOrdersData: null,
      topsolds: null,
      recentTransactions: null,
      topCategories: null,
      instock: 0,
      outstock: 0,
      totalItems: 0,
      orderTypes: null,
      recentOrders: [],
      topSellers: null,

      starImg,
      stats: [
        { label: 'Total Orders', value: 0, trend: 3, icon: 'fas fa-shopping-cart' },
        { label: 'Total Customers', value: 0, trend: 5, icon: 'fas fa-users' },
        { label: 'Total Revenue', value: 0, trend: 2, icon: 'fas fa-dollar-sign' }
      ],
      menus: [
        { id: 1, name: 'Pizza', price: 9.99, image: cakeImg },
        { id: 2, name: 'Burger', price: 6.49, image: saladImg },
        { id: 3, name: 'Sushi', price: 11.25, image: cucumberImg },
        { id: 4, name: 'koo', price: 9.99, image: cakeImg },
        { id: 5, name: 'Burger', price: 6.49, image: saladImg },
        { id: 6, name: 'Sushi', price: 11.25, image: cucumberImg }
      ],
      orders: [
      {
        id: 1,
        photo: cakeImg,
        menu: 'Burger',
        quantity: 2,
        customer: 'John Doe',
        status: 'Completed'
      },
      {
        id: 2,
        photo: saladImg,
        menu: 'Pizza',
        quantity: 1,
        customer: 'Alice',
        status: 'Pending'
      },
      {
        id: 3,
        photo: cucumberImg,
        menu: 'Sushi',
        quantity: 3,
        customer: 'Bob',
        status: 'Cancelled'
      }
    ]);

    const filters = ref([
      { label: 'This week', value: 'this-week' },
      { label: 'Last Week', value: 'last-week' },
      { label: 'Last Month', value: 'last-month' },
      { label: 'In a year', value: 'in-a-year' }
    ]);

    // Load all dashboard data
    const loadData = async () => {
      try {
        loading.value = true;
        error.value = false;

        await Promise.all([
          orderStore.fetchAllOrdersCount(),
          customerStore.fetchTotalCustomers(),
          transactionStore.getAllGeneratedRevenue(),
          foodItemStore.getStock(),
          foodItemStore.getFoodItemsCount(),
          orderStore.getOrderTypes(),
          orderStore.fetchRecentOrders(2),
          foodItemStore.getTopSolds(),
          transactionStore.getRecentTransactions(2),
          orderStore.fetchTopCategories()
        ]);

        // Update reactive data
        totalOrders.value = orderStore.ordersCount || 0;
        recentOrdersData.value = orderStore.recentOrders || [];
        topCategories.value = orderStore.topCategories || { categories: [], quantities: [] };
        instock.value = foodItemStore.stock[0]?.total || 0;
        outstock.value = foodItemStore.stock[1]?.total || 0;
        totalItems.value = foodItemStore.foodItemsCount || 0;
        orderTypes.value = orderStore.orderTypes || {};
        topSellers.value = foodItemStore.topSellers || [];

        // Update stats
        stats.value = [
          { ...stats.value[0], value: totalOrders.value },
          { ...stats.value[1], value: customerStore.totalCustomers || 0 },
          { ...stats.value[2], value: `$${transactionStore.adminRevenue || 0}` }
        ];

      } catch (err) {
        console.error('Dashboard data loading error:', err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadData);

    return {
      // State
      loading,
      error,
      stats,
      
      // Data
      totalOrders,
      recentOrdersData,
      topCategories,
      instock,
      outstock,
      totalItems,
      orderTypes,
      topSellers,
      orders,
      filters,
      selectedFilter,
      
      // Assets
      starImg,
      userImage,
      
      // Methods
      loadData
    };
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
}

.sidebar {
  width: 250px;
  background-color: #1f2937;
  color: white;
  padding: 20px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  margin-left: 250px;
  flex: 1;
  padding: 24px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  min-width: 200px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.left-charts, .right-charts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-card {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Orders Section */
.orders-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.orders-container, .items-container {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.title-and-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.trending-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

/* Loading and Error States */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
}

.retry-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}

.retry-btn:hover {
  background-color: #2563eb;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .charts-section, .orders-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: relative;
    height: auto;
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .loading-overlay {
    left: 0;
  }
}
</style>