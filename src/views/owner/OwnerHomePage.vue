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


<PieChart></PieChart>
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
        AppFooter
    },
    created() {
        const orderStore = useOrdersStore()
        const transactionStore = useTransactionStore()
        const foodItemSore = useCategoryStore()

        this.tOrders = orderStore.orders.length
        this.revenue = transactionStore.getRevenue()
        this.mostSold = foodItemSore.getMostSold().name

        // get data of amount of orders of the last 7 days for restaurant id 2
        orderStore.fetchRecentOrders(2)
        this.recentOrdersData = orderStore.recentOrders

        // get data of the top 3 sold food items
        foodItemSore.getTopSolds()
        this.topsolds = foodItemSore.topSellers

        // fetch data of transactions of the last 7 days for restaurant id 2
        transactionStore.getRecentTransactions(2)
        this.recentTransactions = transactionStore.recentTransactions


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
</style>