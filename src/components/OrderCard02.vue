<template>
<div class="orderContainer">
    <RouterLink :to="'/owner/orders/details/' + orderId">
        <div class="orderHeader">
            <div>#{{ orderIndex }}</div>
            <StatusAction
            :status="orderStatus"
            ></StatusAction>
        </div>
    </RouterLink>
    
    <div class="detailBox">
        <div>{{ orderTime }}</div>
        <div>#{{ orderId }}</div>
    </div>
    

    <div class="foodBox">
        <div
        v-for="(item, index) in orderItems"
        >
        {{ index+1 }}- {{ item.name }} ${{ item.price }}
          
        </div>
    </div>
    

    <div class="totalBox">
        <div>Total: ${{ total }}</div>
        <div v-if="paid === 'paid' || paid === 'refunded'">PAID</div>
        <div v-else>UNPAID</div>
    </div>
    
    <div class="actionBtn">
        <StatusButtons
        :order-id="orderIndex"
        :status="orderStatus"
        :paid="paid"
        @change-state="toggleNewState"
        ></StatusButtons>
    </div>
    

    
</div>
</template>

<script>
import { useOrdersStore } from '@/stores/ordersStore';
import StatusAction from './StatusAction.vue';
import StatusButtons from './StatusButtons.vue';

export default {
    components: {
        StatusAction,
        StatusButtons
    },
    // created() {
    //     this.ordersStore = useOrdersStore()
    // },
    props: {
        orderIndex: Number,
        orderStatus: String,
        orderTime: String,
        orderId: Number,
        orderItems: Array,
        total: String,
        paid: String

    },
    methods: {
        toggleNewState(newState) {
            // update state in db
            // update state in store
            console.log('newstate=', newState)
            const ordersStore = useOrdersStore()

            if(newState == 'rejected') {
                ordersStore.deleteOrder(this.orderIndex)    // del order from store
            } 
            else if(newState == 'refunded') {
                ordersStore.updatePaymentStatus(this.orderIndex, newState)
            }
            else {
                ordersStore.updateOrderStatus(this.orderIndex, newState)
                console.log('toggled item=', ordersStore.orders[this.orderIndex])
            }
            

        }
    },
    
    data() {
        return {
            // orderIndex: 1,
            // orderStatus: 4,
            // orderTime: '2025 06 09',
            // orderId: 1,
            // orderItems: [ 'chicken', 'beef', 'orange juice'],
            // total: 18.9,
            // paid: true,

            orders: [
            {
                orderIndex: 1,
                orderStatus: 1,
                orderTime: "2025 06 09",
                orderId: 1,
                orderItems: [
                    "Potato Salad",
                    "Tteokbokki",
                    "Fried Chicken",
                ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 2,
                orderStatus: 2,
                orderTime: "2025 06 09",
                orderId: 2,
                orderItems: [
                    "Potato Salad",
                    "Tteokbokki",
                    "Fried Chicken",
                ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 3,
                orderStatus: 3,
                orderTime: "2025 06 09",
                orderId: 3,
                orderItems: [
                    "Potato Salad",
                    "Tteokbokki",
                    "Fried Chicken",
                ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 4,
                orderStatus: 4,
                orderTime: "2025 06 09",
                orderId: 4,
                orderItems: [
                    "Potato Salad",
                    "Tteokbokki",
                    "Fried Chicken",
                ],
                total: 19.9,
                paid: false
            },
            {
                orderIndex: 5,
                orderStatus: 5,
                orderTime: "2025 06 09",
                orderId: 5,
                orderItems: [
                    "Potato Salad",
                    "Tteokbokki",
                    "Fried Chicken",
                ],
                total: 19.9,
                paid: false
            },
            ]


        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Quicksand';
}
a {
  text-decoration: none;
  color: inherit;
}

.orderContainer {
    width: 250px;
    border: 1px solid black;
    box-shadow: 0 4px 5px #979797;
}
.orderHeader {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;
}
.orderHeader div {
    font-weight: 900;
    font-size: 32px;
}
.detailBox {
    color: #979797;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* margin: 8px 0 8px 0; */
    padding: 0 0 10px 10px;

}
.foodBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 10px 0 10px;
}
.totalBox {
    display: flex;
    justify-content: space-between;
    border-top: #979797 1px solid;
    border-bottom: #979797 1px solid;
    margin: 10px 0 10px 0;
    padding: 10px;
    font-weight: bold;
}
.actionBtn {
    padding-bottom: 20px;
}
</style>