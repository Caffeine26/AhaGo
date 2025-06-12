<template>
    <div class="invoice">
        <div class="header1">
            <img :src="logo" alt="logo">
            <div>
                NO. {{ orderId }}
            </div>
        </div>

        <div id="title">INVOICE</div>

        <div class="date">
            <span>Date: </span>
            <span>{{ orderDate }}</span>
        </div>

        <div class="recepientBox">
            <div class="recepient">
                <div>Billed to:</div>
                <div>{{ clientName }}</div>
                <div>{{ clientEmail }}</div>
                <div>{{ clientLocation }}</div>
            </div>

            <div class="recepient">
                <div>From:</div>
                <div>{{ restName }}</div>
                <div>{{ restEmail }}</div>
                <div>{{ restTel }}</div>
            </div>
        </div>

        <table id="orderTable">
            <tr>
                <th>No.</th>
                <th>Item</th>
                <th>Size</th>
                <th>Unit</th>
                <th>Subtotal</th>
            </tr>

            <tr v-for="(item, index) in orderItems">
                <td>{{ index+1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.size }}</td>
                <td>{{ item.unit }}</td>
                <td>${{ item.subtotal }}</td>
            </tr>

            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>${{ total }}</td>
            </tr>
        </table>

        <div class="remarkBox">
            <div class="remark">
                <span>Remark: </span>
                <span v-if="remark">{{ remark }}</span>
                <span v-else>-None-</span>
            </div>
            <div class="remark">
                <span>Payment method:</span>
                <span>{{ payMethod }}</span>
            </div>
        </div>
    </div>



</template>

<script>
import logo from '@/assets/ahago-logo.png';

export default {
    props: {
        orderId: Number,
        orderDate: String,
        clientName: String,
        clientEmail: String,
        clientTel: String,
        clientLocation: String,
        restName: String,
        restEmail: String,
        restTel: String,
        remark: String,
        payMethod: String,
        orderItems: Array,
    },
    data() {
        return {
            logo: logo,
            // orderId: 1,
            // orderDate: '2025 06 09',
            // clientName: 'Anna Sorkins',
            // clientEmail: 'anna@gmail.com',
            // clientTel: '+0987654321',
            // clientLocation: 'St987 Phnom Penh',
            // restName: 'Malis Restaurant',
            // restEmail: 'malis@gmail.com',
            // restTel: '+76599545355',
            // remark: 'no chilli',
            // payMethod: 'Cash',
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
* {
    font-family: 'Quicksand';
}
.invoice {
    width: 600px;
    border: 1px solid black;
    padding: 40px 40px 300px 40px;
    display: flex;
    flex-direction: column;
    margin: 40px;
}
.header1 {
    display: flex;
    justify-content: space-between;
}
.header1 img {
    width: 60px;
    height: 60px;
    border-radius: 999px;
    border: none;
}
#title {
    font-size: 56px;
    font-weight: bolder;
    margin: 40px 0 40px 0;
}
.date {
    align-self: flex-start;
}
.date :nth-child(1) {
    font-weight: bolder;
}
.recepient :nth-child(1) {
    font-weight: bolder;
}
.recepient {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.recepientBox {
    display: flex;
    justify-content: space-between;
    margin: 40px 0 0px 0;
}
#orderTable {
    border-collapse: collapse;
    margin: 30px 0 16px 0;
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
.remark {
    margin-bottom: 14px;

}
.remark :nth-child(1) {
    font-weight: bolder;
}
.remarkBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>