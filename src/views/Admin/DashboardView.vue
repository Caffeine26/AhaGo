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

      <!-- Row 1: Stats -->
      <section class="section">
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
        </div>
        <div class="right-column">
          <PieChart
          :labels="topCategories.categories"
          :data="topCategories.quantities"
          ></PieChart>
          <OrderTypeGraph 
          :total-orders="totalOrders"
          :order-data="orderTypes" />
        </div>
      </section>

      
      <!-- Row 3: Orders -->
      <section class="section">
        
        <RecentOrders :orders="orders" />
        <div class="title-and-filter">
        <h1 class="trending-title">Item Grid</h1>
        <ButtonFilter :options="filters" v-model="selectedFilter" />
      </div>
      <ItemGrid :items="topSellers" :starImg="starImg" />


      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue'
import DashboardStats from '@/components/admin/DashboardStats.vue'
import RecentOrders from '@/components/admin/RecentOrders.vue'
import BarChart from '@/components/admin/BarChart.vue'
import PieChart from '@/components/admin/PieChart.vue'
import StockGraph from '@/components/admin/StockGraph.vue'
import OrderTypeGraph from '@/components/admin/Ordertype.vue'
import starImg from '@/assets/icons/star1.png'
import ButtonFilter from '@/components/ButtonFilter.vue'
import cakeImg from '@/assets/food/cake.png'
import saladImg from '@/assets/food/salad.png'
import cucumberImg from '@/assets/food/cucumber.png'
import ItemGrid from '@/components/admin/ItemGrid.vue'
import { useOrdersStore } from '@/stores/ordersStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useRestStore } from '@/stores/restStore'
import { useCustomerStore } from '@/stores/customerStore'



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
    ],


      filters: [
        { label: 'This week', value: 'this-week' },
        { label: 'Last Week', value: 'last-week' },
        { label: 'Last Month', value: 'last-month' },
        { label: 'In a year', value: 'in-a-year' }
      ],
      selectedFilter: 'this-week', // Make sure this matches one of the values above

      orderTypeData: {
        walkIn: 45,
        takeAway: 30,
        onlineOrder: 25
      }
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  background-color: #f9fafb;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: calc(100vw - 250px); /* Prevent horizontal overflow */
  box-sizing: border-box;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  max-width: 200px;
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

/* Sections */
.section {
  margin-bottom: 32px;
}

.row-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 24px;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
  
}
.stock{
  background-color: white;
  width:600px;
}

.bar-chart-wrapper {
  padding-top: 1px;
  
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 150px;
 ;
}


/* Recent Orders & Trending */
.section:last-child {
  margin-bottom: 0;
}

.title-and-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.trending-title {
  font-size: 1.25rem;
  font-weight: bold;
}



</style>