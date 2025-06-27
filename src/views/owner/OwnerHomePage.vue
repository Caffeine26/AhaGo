<template>
<!-- <Header></Header>

<OwnerHeader
title="Restaurant"
it1="Home"
it2="Orders"
it3="Transactions"
it4="Menu"
it5="Profile"
></OwnerHeader> -->

<CategoryBannerV2
title-header= "Dashboard"
:titles="categories"
@toggle-category="toggleCategoryData"
:add-category="false"
></CategoryBannerV2>
<div>HELLO {{ restId }}</div>


  <!-- Analytics -->
  <div v-if="index === 0" class="miniBox">
    <div class="popcards">
      <div class="tOrders">
        <div class="theader">
          <span>Total orders</span>
          <span>
            <img :src="order" alt="*">
          </span>
        </div>
        <div id="tOrders">{{ tOrders }}</div>
      </div>

      <div class="tOrders2">
        <div class="theader">
          <span>Total revenue</span>
          <span>
            <img :src="cash" alt="*">
          </span>
        </div>
        <div id="tOrders">${{ revenue }}</div>
      </div>

      <div class="tOrders3">
        <div class="theader">
          <span>Popular Dish</span>
          <span>
            <img :src="food" alt="*">
          </span>
        </div>
        <div id="tOrders">{{ mostSold }}</div>
      </div>
    </div>

    <div class="recentBox">
      <div class="recent">Recent Orders</div>
      <table class="modern-table">
        <thead>
          <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Food Item</th>
              <th>Status</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in orderItems" :key="index" v-if="index < 4">
              <td>{{ item.id }}</td>
              <td>{{ formatDateTime(item.created_at) }}</td>
              <td>${{ item.price}}</td>
              <td>{{ item.food_item.name }}</td>
              <td>{{ item.order.status }}</td>
              <td @click="goToOrder" id="viewOrder">View Order</td>
          </tr>
          </tbody>
      </table>
    </div>
    
    
    <div class="charts">
      <BarChart
      :orders-data="recentOrdersData"
      ></BarChart>

      <div class="revenue">
        <div class="revenueTitle">Revenue Overview</div>
        <RevenueLineChart
        :labels="recentTransactions.dates"
        :data="recentTransactions.totals"
        ></RevenueLineChart>
      </div>
    </div>

    <div class="bests">
      <div class="recent">Best-Sellers</div>
      <TrendingMenus
      :menus="topsolds"
      ></TrendingMenus>
    </div>
    

    <!-- <PieChart
    :labels="topCategories.categories"
    :data="topCategories.quantities"
    ></PieChart> -->
  </div>

  <!-- Notifications -->
  <div v-if="index === 1">
    <div class="notification">
      <div class="contain">
        <div class="upper">
          <ButtonFilter
            class="filter"
            v-model:value="selectedFilter"
            :options="filterOptions"
          />
        </div>
        <div class="content">
          <Box
            v-for="order in orders"
            :key="order.id"
            class="box"
          >
            <div class="head">
              <div v-if="order.status === 'pending'">
                <span>New Order Arrived! #{{ order.id }}</span>
                <span>{{ formatDateTime(order.created_at) }}</span>
              </div>

              <div v-else-if="order.status === 'delivering'">
                <span>Order #{{ order.id }} On the Way!</span>
                <span>{{ formatDateTime(order.created_at) }}</span>
              </div>

              <div v-else-if="order.status === 'completed'">
                <span>Order #{{ order.id }} Completed!</span>
                <span>{{ formatDateTime(order.created_at) }}</span>
              </div>

              <div v-else-if="order.status === 'cancelled'">
                <span>Order #{{ order.id }} Cancelled!</span>
                <span>{{ formatDateTime(order.created_at) }}</span>
              </div>

              <div v-else>
                <span>Welcome! Let's get started</span>
              </div>

            </div>

            <div v-if="order.status === 'pending'">
              <p class="text">You've received a new order from a customer. Accept order?</p>
              <button>Reject</button>
              <button>Accept</button>
            </div>

            <div v-else-if="order.status === 'delivering'">
              <p>Delivery rider is on his way to your customer!</p>
              <button>View delivery</button>
            </div>

            <div v-else-if="order.status === 'completed'">
              <p>Order #{{ order.id }} has been completed successfully! Thank you for your service!</p>
              <button>View invoice</button>
            </div>

            <div v-else-if="order.status === 'cancelled'">
              <p>Order #{{ order.id }} has been cancelled by Customer!</p>
            </div>

            <div v-else>Start managing your online orders!</div>
          </Box>
        </div>
      </div>
    </div>
  </div>


  <!-- Reviews -->
  <div v-if="index === 2">
    <div class="revbox">
      <OwnerReviews
      :reviews-array="reviews"
      >
      </OwnerReviews>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/admin/BarChart.vue';
import OrderDonutChart from '@/components/admin/OrderDonutChart.vue';
import PieChart from '@/components/admin/PieChart.vue';
import TrendingMenus from '@/components/admin/TrendingMenus.vue';
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBanner from '@/components/CategoryBanner.vue';
import Header2 from '@/components/delivery/header2.vue';
import DishBox from '@/components/DishBox.vue';
import OrderShortcut from '@/components/OrderShortcut.vue';
import RestaurantBanner from '@/components/RestaurantBanner.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { useOrdersStore } from '@/stores/ordersStore';
import { useTransactionStore } from '@/stores/transactionStore';
import RevenueLineChart from '@/components/admin/RevenueLineChart.vue';
import { useRestStore } from '@/stores/restStore';
import GeneralButton from '@/components/GeneralButton.vue';
import ButtonFilter from '@/components/ButtonFilter.vue';
import OwnerHeader from '@/components/OwnerHeader.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';

import order from '@/assets/owner/svg/order.svg';
import cash from '@/assets/owner/svg/cash.svg';
import food from '@/assets/owner/svg/food.svg';
import OwnerReviews from '@/components/OwnerReviews.vue';
import { useAuthStore } from '@/stores/authenticationStore';

export default {
    components: {
        Header,
        OwnerHeader,
        Header2,
        CategoryBannerV2,
        RestaurantBanner,
        OrderShortcut,
        CategoryBanner,
        DishBox,
        BarChart,
        OrderDonutChart,
        PieChart,
        RevenueLineChart,
        TrendingMenus,
        OwnerReviews,
        GeneralButton,
        ButtonFilter,
        AppFooter
    },
    created() {
        const orderStore = useOrdersStore()
        const transactionStore = useTransactionStore()
        const foodItemStore = useCategoryStore()
        const restStore = useRestStore() 
        const authStore = useAuthStore()

        // if (authStore.user) {
        //   this.restId = authStore.user.id
        // }
        

        this.tOrders = orderStore.orders.length
        this.revenue = transactionStore.getRevenue()

        foodItemStore.fetchFoodItemsByRest(2)
        this.mostSold = foodItemStore.getMostSold()

        // fetch notifications
        restStore.fetchOwnerNotifications(2)
        this.notifications = restStore.notifications

        // fetch reviews
        restStore.fetchReviews(2)
        this.reviews = restStore.reviews

        // get data of amount of orders of the last 7 days for restaurant id 2
        orderStore.fetchRecentOrders(2)
        this.recentOrdersData = orderStore.recentOrders

        // get data of the top 3 sold food items
        foodItemStore.getTopSoldsOfRest(2)
        this.topsolds = foodItemStore.topSellersOfRest

        // fetch data of transactions of the last 7 days for restaurant id 2
        transactionStore.getRecentTransactions(2)
        this.recentTransactions = transactionStore.recentTransactions

        // fetch data of top categories
        orderStore.fetchTopCategories()
        this.topCategories = orderStore.topCategories

        // fetch order items by rest id
        orderStore.fetchOrdersItemsById(2)
        this.orderItems = orderStore.orderItems
        console.log('this.orderitems=', this.orderItems)

        // fetch orders
        orderStore.fetchOrders(2)
        this.orders = orderStore.orders

    },
    methods: {
        toggleChosen() {
            this.chosen = !this.chosen
        },
        toggleCategoryData(index) {
            this.index = index;
        },
        formatDateTime(dateStr) {
          const date = new Date(dateStr);
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        },
        goToOrder() {
          this.$router.push('/owner/2/orders');
        }
        
    },
    data() {
        return {
            restId: null,
            index: 0,
            orderItems: null,
            orders: null,
            tOrders: null,
            revenue: null,
            mostSold: null,
            recentOrdersData: null,
            topsolds: null,
            recentTransactions: null,
            topCategories: null,
            notifications: null,
            reviews: null,
            order: order,
            cash: cash,
            food: food,
            categories: [
              'Analytics',
              'Notifications',
              'Reviews'
            ],
            filterOptions: [
                { value: "Today", label: "Today" },
                { value: "This Week", label: "This Week" },
                { value: "Last Month", label: "Last Month" },
            ],
            selectedFilter: "Today",
            dish: [
                {
                    imageSrc: 'src/assets/owner/img/pleasachko.jpg',
                    name: 'Plea Sach Ko',
                    price: 11
                },
                {
                    imageSrc: 'src/assets/owner/img/pleasachko.jpg',
                    name: 'Plea Sach Ko',
                    price: 11
                },
                {
                    imageSrc: 'src/assets/owner/img/pleasachko.jpg',
                    name: 'Plea Sach Ko',
                    price: 11
                },
            ],
            categs: [
                'A La Carte',
                'Breakfast',
                'Business Lunch',
                'Highlights'
            ],
            chosen: false,
            imageSrc: 'src/assets/owner/img/malis.png',
            name: 'Malis Restaurant',
            address: 'No. 136, Norodom Blvd, Phnom Penh',
            openHours: '6AM - 10:30PM daily',
            ratings: 5,
            reviewCount: 1453,

            incoming1: 'src/assets/owner/svg/incoming.svg',
            title1: 'Incoming Orders',
            goto1: 'Go to Orders',
            color1: '#D90000',

            incoming2: 'src/assets/owner/svg/pending.svg',
            title2: 'Pending Orders',
            goto2: 'View All',
            color2: '#FF3F00',

            incoming3: 'src/assets/owner/svg/completed.svg',
            title3: 'Completed Orders',
            goto3: 'View All',
            color3: '#008F39',
        }
    }
}
</script>

<style scoped>
.orderShortcuts {
    display: flex;
    justify-content: space-around;
    margin: 54px 0;
}
.homeBox {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.miniBox {
  width: 100%;
}
.recentBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bests {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
#title {
    font-family: 'Playfair Display';
    font-size: 32px;
    font-weight: 600;
    color: white;
}
.mymenu {
    background-color: #292929;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
}
.categoryBanner {
    display: flex;
}
#dishBox {
    display: flex;
    margin-top: 48px;
}
#mystats {
    font-family: 'Playfair Display';
    font-size: 32px;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 40px;
}
#mystats:hover {
    text-decoration: underline;
}


/* Notification styling */
.notification {
  display: flex;
}
.contain {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
  width: 76%;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.upper {
  align-self: flex-end;
}
.head {
  font-size: 20px;
  font-weight: 600;
}
.head :nth-child(2) {
  color: #929292;
  font-weight: 500;
  font-size: 16px;
  margin-left: 20px;
}
.text {
  margin-left: 16px;
  font-size: 18px;
}
.link {
  color: #9a0404;
  font-style: italic;
}
.link {
  text-align: right;
}
.box {
  padding: 30px 25px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 4px #ccc;
}
.bottom {
  display: flex;
  justify-content: end;
  align-items: center;
}
.buttons {
  display: flex;
  gap: 10px;
}
.acc,
.rej {
  font-size: 18px;
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  border: none;
}
.rate {
  display: flex;
  align-items: center;
  justify-content: end;
}
.rating {
  margin: 5px;
  color: #9a0404;
  font-style: italic;
  text-decoration: underline;
}
.content {
  width: 110%;
  padding: 10px;
  height: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}
.filter {
  color: #9a0404;
  background-color: white;
}


.theader {
  display: flex;
  align-items: center;
}
.tOrders, .tOrders2, .tOrders3 {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 16px;
  background-color: #292929;
  color: white;
  box-shadow: 0 4px 4px #cccc;
  margin: 16px;
}
.tOrders2 {
  background-color: #FF3F00;
}
.tOrders3 {
  background-color: #D90000;
}
#tOrders {
  font-size: 32px;
  font-weight: bold;
  margin-top: 18px;
}
.popcards {
  display: flex;
  margin-top: 10px;
  /* background-color: aqua; */
  width: 100%;
  align-items: center;
  justify-content: center;
}
.modern-table {
  width: 70%;
  border-collapse: collapse;
  font-family: sans-serif;
  font-size: 14px;
  background-color: white;
}

.modern-table thead {
  background-color: #f5f5f5;
  color: #555;
  text-transform: uppercase;
}

.modern-table th,
.modern-table td {
  padding: 12px 16px;
  text-align: left;
  border-top: 1px solid #e0e0e0;
}

.modern-table tbody tr:hover {
  background-color: #fafafa;
  transition: background-color 0.2s ease-in-out;
}
.recent {
  font-weight: bolder;
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 10px;
}
#viewOrder {
  cursor: pointer;
}
.revenue {
  width: 600px;
  /* height: 500px; */
  margin-top: 50px;
}
.bestTitle, .revenueTitle {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Raleway';
}
.revenueTitle {
  position: relative;
  top: -45px;
}
.charts {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
</style>