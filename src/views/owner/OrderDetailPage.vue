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

<CategoryBannerV2
title-header= "Order Management"
:titles="buttons"
:add-category="false"
></CategoryBannerV2>

<OrderDetails
v-if="selectedOrder"
:order-id="selectedOrder.orderId"
:order-date="selectedOrder.orderTime"
:paid="selectedOrder.paid"
:order-status="selectedOrder.orderStatus"
:order-items="selectedOrder.orderItems"
></OrderDetails>

<AppFooter></AppFooter>

</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';
import OrderDetails from '@/components/OrderDetails.vue';

export default {
    components: {
        Header,
        Header2,
        CategoryBannerV2,
        OrderDetails,
        AppFooter
    },
    created() {
        const orderIndex = this.$route.params.orderId;
        console.log(orderIndex)
        const order = this.orders.find( order => order.orderIndex == orderIndex );
        this.selectedOrder = order;
        console.log('selectedOrder = ', order)
    },
    methods: {
        select(index) {
            this.selectedIndex = index;
        },
        setSortIndex(index) {
            this.selectedSortIndex = index;
        }
    },
    data() {
        return {
            selectedOrder: [],
            selectedIndex: 0,
            selectedSortIndex: 0,
            buttons: [
                'All Orders',
                'Pending',
                'Prepare',
                'Ready'
            ],
            filteredOrders: [],
            orders: [
            {
                orderIndex: 1,
                orderStatus: 1,
                orderTime: "2025 06 09",
                orderId: "0999",
                orderItems: [
                {
                    name: 'PPPPOOOotato salad',
                    size: 'M',
                    unit: 1,
                    price: 2.5,
                    subtotal: 2.5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 2,
                    price: 2.5,
                    subtotal: 5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 3,
                    price: 2.5,
                    subtotal: 7.5
                }
            ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 2,
                orderStatus: 2,
                orderTime: "2025 06 09",
                orderId: "0999",
                orderItems: [
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 1,
                    price: 2.5,
                    subtotal: 2.5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 2,
                    price: 2.5,
                    subtotal: 5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 3,
                    price: 2.5,
                    subtotal: 7.5
                }
            ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 3,
                orderStatus: 3,
                orderTime: "2025 06 09",
                orderId: "0999",
                orderItems: [
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 1,
                    price: 2.5,
                    subtotal: 2.5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 2,
                    price: 2.5,
                    subtotal: 5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 3,
                    price: 2.5,
                    subtotal: 7.5
                }
            ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 4,
                orderStatus: 4,
                orderTime: "2025 06 09",
                orderId: "0999",
                orderItems: [
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 1,
                    price: 2.5,
                    subtotal: 2.5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 2,
                    price: 2.5,
                    subtotal: 5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 3,
                    price: 2.5,
                    subtotal: 7.5
                }
            ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 5,
                orderStatus: 5,
                orderTime: "2025 06 09",
                orderId: "0999",
                orderItems: [
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 1,
                    price: 2.5,
                    subtotal: 2.5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 2,
                    price: 2.5,
                    subtotal: 5
                },
                {
                    name: 'potato salad',
                    size: 'M',
                    unit: 3,
                    price: 2.5,
                    subtotal: 7.5
                }
            ],
                total: 19.9,
                paid: false
            },
            ]
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