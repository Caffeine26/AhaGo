<template>
<Header></Header>
<OwnerHeader
title="Restaurant"
it1="Home"
it2="Orders"
it3="Transactions"
it4="Menu"
it5="Profile"
></OwnerHeader>

<CategoryBannerV2
title-header= "Order Management"
:titles="buttons"
:add-category="false"
@toggle-category="toggleCategoryData"
></CategoryBannerV2>

<div class="orders">
    <OrderCard02
    v-for="(item, index) in ordersStore.filteredOrders"
    :key="index"
    :index="index"
    :order-id="item.id"
    :order-index="item.id"
    :order-status="item.status"
    :order-items="item.food_items"
    :order-time="item.created_at"
    :total="item.total_amount"
    :paid="item.payment_status"
    />
    
</div>

<AppFooter></AppFooter>

</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import OrderCard from '@/components/OrderCard.vue';
import OrderCard02 from '@/components/OrderCard02.vue';
import OwnerHeader from '@/components/OwnerHeader.vue';
import { useOrdersStore } from '@/stores/ordersStore';

export default {
    components: {
        Header,
        OwnerHeader,
        CategoryBannerV2,
        OrderCard,
        OrderCard02,
        AppFooter
    },
    created() {
        this.ordersStore = useOrdersStore()
        
        this.restId = parseInt(this.$route.params.restId)

        this.ordersStore.filteredOrders = this.ordersStore.orders
        // get orders by restId
        // this.orders = ordersStore.orders.filter(order => order.restaurant_id === this.restId)
        // this.filteredOrders = this.orders
    },
    methods: {
        toggleCategoryData(index) {
            const status = this.orderStatus[index]
            this.ordersStore.filterOrders(status)
            // console.log('selected index = ', index)
            // this.filteredOrders = []
            // if (index === 0) {
            //     this.filteredOrders = this.orders
            // }
            // else {
            //     for (let i=0; i<this.orders.length; i++) {
            //         if (this.orders[i].status === this.orderStatus[index]) {
            //             this.filteredOrders.push(this.orders[i])
            //         }
            //     }
            // }
        },
        select(index) {
            this.selectedIndex = index;
        },
        setSortIndex(index) {
            this.selectedSortIndex = index;
        }
    },
    data() {
        return {
            ordersStore: null,
            orders: [],
            restId: null,
            filteredOrders: [],
            orderStatus: ['all', 'pending', 'preparing', 'ready'],

            selectedIndex: 0,
            selectedSortIndex: 0,
            buttons: [
                'All Orders',
                'Pending',
                'Prepare',
                'Ready'
            ],
            
        //     orders: [
        //     {
        //         orderIndex: 1,
        //         orderStatus: 1,
        //         orderTime: "2025 06 09",
        //         orderId: "0999",
        //         orderItems: [
        //             "Potato Salad",
        //             "Tteokbokki",
        //             "Fried Chicken",
        //         ],
        //         total: 19.9,
        //         paid: false
        //     },
        //     {
        //         orderIndex: 2,
        //         orderStatus: 2,
        //         orderTime: "2025 06 09",
        //         orderId: "0999",
        //         orderItems: [
        //             "Potato Salad",
        //             "Tteokbokki",
        //             "Fried Chicken",
        //         ],
        //         total: 19.9,
        //         paid: false
        //     },
        //     {
        //         orderIndex: 3,
        //         orderStatus: 3,
        //         orderTime: "2025 06 09",
        //         orderId: "0999",
        //         orderItems: [
        //             "Potato Salad",
        //             "Tteokbokki",
        //             "Fried Chicken",
        //         ],
        //         total: 19.9,
        //         paid: false
        //     },
        //     {
        //         orderIndex: 4,
        //         orderStatus: 4,
        //         orderTime: "2025 06 09",
        //         orderId: "0999",
        //         orderItems: [
        //             "Potato Salad",
        //             "Tteokbokki",
        //             "Fried Chicken",
        //         ],
        //         total: 19.9,
        //         paid: false
        //     },
        //     {
        //         orderIndex: 5,
        //         orderStatus: 5,
        //         orderTime: "2025 06 09",
        //         orderId: "0999",
        //         orderItems: [
        //             "Potato Salad",
        //             "Tteokbokki",
        //             "Fried Chicken",
        //         ],
        //         total: 19.9,
        //         paid: false
        //     },
        //     ]
        }
    },
    computed: {
        selectedOrders() {
            this.filteredOrders = [];
            if (this.selectedIndex === 0) {
                return this.orders;
            } 
            else if (this.selectedIndex < 3){
                for (let i=0; i<this.orders.length; i++) {
                    if (this.orders[i].status === this.selectedIndex-1) {
                        this.filteredOrders.push(this.orders[i])
                    }
                }
                return this.filteredOrders;
            }
            else if (this.selectedIndex === 3) {
                for (let i=0; i<this.orders.length; i++) {
                    if (this.orders[i].status === 2 || this.orders[i].status === 3) {
                        this.filteredOrders.push(this.orders[i])
                    }
                }
                return this.filteredOrders;
            }
        }
    },
    
}
</script>

<style scoped>
#title {
    font-family: 'Playfair Display';
    font-size: 32px;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 20px;
}
.button-group {
    display: flex;
    margin-bottom: 20px;
    
}
.button-group button {
    font-size: 16px;
}
.unselected {
    font-family: 'Raleway';
    font-weight: 600;
    color: white;
    background-color: #292929;
    border: 1px solid white;
    padding: 16px 32px;
    width: 310px;
}
.selected {
    font-family: 'Raleway';
    font-weight:700;
    color: white;
    background-color: #D90000;
    border: 1px solid white;
    padding: 10px 20px;
}
select {
    font-family: 'Raleway';
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
}
.orders {
    width: 70%;
    justify-self: center;
    margin: 80px 0 80px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
}
.ordersContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.custom-select {
    align-self: flex-end;
    margin-right: 280px;
}
</style>