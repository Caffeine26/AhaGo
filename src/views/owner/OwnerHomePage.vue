<template>
<Header></Header>

<Header2
title="Restaurant"
it1="Home"
it2="Orders"
it3="Menu"
it4="Analytics"
it5="Profile"
></Header2>

<div>Dashboard</div>
<div>Total orders: {{ tOrders }}</div>
<div>Total revenue: ${{ revenue }}</div>
<div>Popular Dish: {{ mostSold }}</div>

<div class="revbox">
    <ReviewSection
    :reviews-array="reviews"
    ></ReviewSection>
</div>

  <div class="notification">
    <div class="contain">
      <div class="upper">
        <Title class="title" title="Notifications" />
        <ButtonFilter
          class="filter"
          v-model:value="selectedFilter"
          :options="filterOptions"
        />
      </div>
      <div class="content">
        <Box
          v-for="notification in notifications"
          :key="notification.id"
          class="box"
        >
          <div class="head">{{ notification.title }}</div>

          <p v-if="notification.details?.pickUp" class="text">
            Pick up: {{ notification.details.pickUp }}
          </p>
          <p v-if="notification.details?.destination" class="text">
            Destination: {{ notification.details.destination }}
          </p>
          <p v-if="notification.details?.customer" class="text">
            Customer: {{ notification.details.customer }}
          </p>

          <p class="text">{{ notification.message }}</p>

          <div v-if="notification.status === 'pending'" class="bottom">
            <div class="buttons">
              <GeneralButton
                title="Accept"
                btnColor="#9A0404"
                titleColor="#ffffff"
                @click="updateNotificationStatus(notification.id, 'accepted')"
              />
              <GeneralButton
                title="Reject"
                btnColor="#292929"
                titleColor="#FFFFFF"
                @click="updateNotificationStatus(notification.id, 'rejected')"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
<BarChart
:orders-data="recentOrdersData"
></BarChart>

<RevenueLineChart
:labels="recentTransactions.dates"
:data="recentTransactions.totals"
></RevenueLineChart>

<TrendingMenus
:menus="topsolds"
></TrendingMenus>


<PieChart
:labels="topCategories.categories"
:data="topCategories.quantities"
></PieChart>
<!-- <RestaurantBanner
:image-src="imageSrc"
:name="name"
:address="address"
:open-hours="openHours"
:ratings="ratings"
:review-count="reviewCount"
></RestaurantBanner> -->

<!-- <div class="orderShortcuts">
    <OrderShortcut
    :image-src="incoming1"
    :title="title1"
    :goto="goto1"
    :color="color1"
    ></OrderShortcut>

    <OrderShortcut
    :image-src="incoming2"
    :title="title2"
    :goto="goto2"
    :color="color2"
    ></OrderShortcut>

    <OrderShortcut
    :image-src="incoming3"
    :title="title3"
    :goto="goto3"
    :color="color3"
    ></OrderShortcut>
</div>

<div class="mymenu">
    <p id="title">Menu</p>
    <div class="categoryBanner">
        <CategoryBanner
        v-for="categ in categs"
        :title="categ"
        ></CategoryBanner>
    </div>
    <div id="dishBox">
        <DishBox
        v-for="(item,index) in dish"
        :key="index"
        :image-src="item.imageSrc"
        :name="item.name"
        :price="item.price"
        ></DishBox>
    </div>
</div>

<div>
    <div id="mystats">My Business Statistics</div>
</div> -->

<AppFooter></AppFooter>
</template>

<script>
import BarChart from '@/components/admin/BarChart.vue';
import LineGraph from '@/components/admin/LineGraph.vue';
import OrderDonutChart from '@/components/admin/OrderDonutChart.vue';
import OrderLineChart from '@/components/admin/RevenueLineChart.vue';
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
import ReviewSection from '@/components/ReviewSection.vue';
import { useRestStore } from '@/stores/restStore';
import GeneralButton from '@/components/GeneralButton.vue';
import ButtonFilter from '@/components/ButtonFilter.vue';

export default {
    components: {
        Header,
        Header2,
        RestaurantBanner,
        OrderShortcut,
        CategoryBanner,
        DishBox,
        BarChart,
        OrderDonutChart,
        PieChart,
        RevenueLineChart,
        TrendingMenus,
        ReviewSection,
        GeneralButton,
        ButtonFilter,
        AppFooter
    },
    created() {
        const orderStore = useOrdersStore()
        const transactionStore = useTransactionStore()
        const foodItemSore = useCategoryStore()
        const restStore = useRestStore() 

        this.tOrders = orderStore.orders.length
        this.revenue = transactionStore.getRevenue()
        this.mostSold = foodItemSore.getMostSold().name

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
        foodItemSore.getTopSolds()
        this.topsolds = foodItemSore.topSellers

        // fetch data of transactions of the last 7 days for restaurant id 2
        transactionStore.getRecentTransactions(2)
        this.recentTransactions = transactionStore.recentTransactions

        // fetch data of top categories
        orderStore.fetchTopCategories()
        this.topCategories = orderStore.topCategories



    },
    methods: {
        toggleChosen() {
            this.chosen = !this.chosen
        }
    },
    data() {
        return {
            tOrders: null,
            revenue: null,
            mostSold: null,
            recentOrdersData: null,
            topsolds: null,
            recentTransactions: null,
            topCategories: null,
            notifications: null,
            reviews: null,
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
/* .revbox {
    height: 500px;
    overflow-y: scroll;
} */
.orderShortcuts {
    display: flex;
    justify-content: space-around;
    margin: 54px 0;
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
  display: flex;
  justify-content: space-between;
}
.head {
  font-size: 20px;
  font-weight: 600;
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
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}
.filter {
  color: #9a0404;
  background-color: white;
}
</style>