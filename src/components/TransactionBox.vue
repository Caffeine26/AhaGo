<template>
<div class="transactionBox">
    <div class="leftSide">
        <img :src="logo" alt="logo" id="logo">

        <div class="client">
            <div>{{ clientName }}</div>
            <div>via {{ payMethod }}</div>
            <div>Order#{{ orderId }}</div>
        </div>
    </div>
    

    <div>
        <span v-if="money > 0" class="money payment">
            Payment + ${{ money }}
        </span>
        <span v-else-if="money < 0" class="money refund">
            Refund - ${{ money * -1 }}
        </span>
    </div>

    <RouterLink :to="'/owner/order/invoice/' + orderId">
        <button class="invoice">Get Invoice</button>
    </RouterLink>
    
</div>
</template>

<script>
import logo from '@/assets/ahago-logo.png'

export default {
    props: {
        clientName: String,
        payMethod: String,
        orderId: Number,
        money: Number
    },
    data() {
        return {
            logo: logo,

            // clientName: 'Anna Sorkins',
            // payMethod: 'bank',
            // orderId: '088987',
            // money: 8.9
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Quicksand';
}
.transactionBox {
    width: 50vw;
    border: 1px solid #ccc;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
}
#logo {
    width: 60px;
    height: 60px;
    border-radius: 50px;
}
.client {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 12px;
}
.client :nth-child(1) {
    font-size: 18px;
    font-weight: bolder;
}
.client :nth-child(2), .client :nth-child(3) {
    color: #ACACAC;
    font-weight: 600;
}
.leftSide {
    display: flex;
}
.money {
    font-weight: bold;
}
.refund {
    color: #D90000;
}
.payment {
    color: #008F39;
}
.invoice {
    color: white;
    background-color: #D90000;
    font-weight: 600;
    border-radius: 99px;
    border:none;
    padding: 5px 10px;
    box-shadow: 0 2px 5px #ccc;
    cursor: pointer;
}
.invoice:hover {
    background-color: #a50303;
}
</style>