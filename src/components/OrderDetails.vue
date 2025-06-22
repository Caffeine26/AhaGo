<template>
    <div class="pageBox">
        <div class="backbtn">
            <button @click="goToPrevious">
                <img :src="backarrow" alt="<">
            </button> 
        </div>

        <div class="detailBox">

            <div class="orderHeader">
                <div>Order ID #{{ orderId }}</div>
                <div>{{ orderDate }}</div>
            </div>

            <table id="orderTable">
                <tr>
                    <th>No.</th>
                    <th>Item</th>
                    <th>Unit</th>
                    <th>Subtotal</th>
                </tr>

                <tr v-for="(item, index) in orderItems">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.pivot.quantity }}</td>
                    <td>${{ item.pivot.price }}</td>
                </tr>
            </table>

            <div class="total">
                <div>Total: </div>
                <div>
                    <span>${{ amount }} </span>
                    <span>({{ paid }})</span>
                </div>
            </div>

            <div class="status">
                <div>Status:</div>
                <div>
                    <StatusAction
                    :status="orderStatus"
                    ></StatusAction>
                </div>
            </div>

            <div class="remark">
                <span>Remark:</span> 
                <span v-if="remark">{{ remark }}</span>
                <span v-else> (None)</span>
                
            </div>
        </div>
    </div>
</template>

<script>
import StatusAction from './StatusAction.vue';

import backarrow from '@/assets/owner/svg/backarrow.svg'

export default {
    components: {
        StatusAction
    },
    props: {
        orderId: Number,
        orderDate: String,
        paid: String,
        orderStatus: String,
        orderItems: Array,
        amount: String,
        remark: String,
    },
    methods: {
        goToPrevious() {
            this.$router.back();
        }
    },
    data() {
        return {
            backarrow: backarrow,
            // orderId: '098989',
            // orderDate: '2025/06/06',
            // paid: true,
            // orderStatus: 1,
            // orderItems: [
            //     {
            //         name: 'potato salad',
            //         size: 'M',
            //         unit: 1,
            //         price: 2.5,
            //         subtotal: 2.5
            //     },
            //     {
            //         name: 'potato salad',
            //         size: 'M',
            //         unit: 2,
            //         price: 2.5,
            //         subtotal: 5
            //     },
            //     {
            //         name: 'potato salad',
            //         size: 'M',
            //         unit: 3,
            //         price: 2.5,
            //         subtotal: 7.5
            //     }
            // ]

        }
    }
}
</script>

<style scoped>
*{
    font-family: 'Quicksand';
}
.pageBox {
    display: flex;
    margin-left: 150px;
    margin-top: 40px;
    margin-bottom: 150px;
}
.detailBox {
    margin-left: 50px;
}
.backbtn button {
    background-color: #292929;
    border-radius: 99px;
    padding: 6px 8px 6px 8px;
    cursor: pointer;
}
.orderHeader {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}
.orderHeader :nth-child(1){
    font-size: 32px;
    font-weight: bolder;
    
}
.orderHeader :nth-child(2){
    font-weight: bold;
    color: #979797;
}
#orderTable {
    border-collapse: collapse;
    margin: 50px 0 16px 0;
}
#orderTable td, #orderTable th {
    border: 1px solid #ddd;
    padding: 8px;
}
#orderTable th {
    background-color: #292929;
    color: white;
    padding: 12px 24px 12px 24px;
}
#orderTable tr:nth-child(even){
    background-color: #f2f2f2;
}
.total, .status {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-weight: bold;
}
.remark {
    justify-self: flex-start;
    font-weight: bold;
}
</style>