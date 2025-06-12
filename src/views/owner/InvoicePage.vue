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

<CreateMenuBanner
title="Invoice"
:icon-url="invoice"
></CreateMenuBanner>


<div class="box3">
    <div class="backbtn">
        <button @click="goToPrevious">
            <img :src="backarrow" alt="<">
        </button>
        
    </div>

    <div class="boxbox">
        <button id="dl"
        @click="downloadAsPDF"
        >Download PDF</button>
        <div class="invoiceBox" ref="invoice">
            <Invoice
            :order-id="orderId"
            :order-date="orderDate"
            :client-name="clientName"
            :client-email="clientEmail"
            :client-tel="clientTel"
            :client-location="clientLocation"
            :rest-name="restName"
            :rest-email="restEmail"
            :rest-tel="restTel"
            :remark="remark"
            :pay-method="payMethod"
            :order-items="orderItems"
            ></Invoice>
        </div>
    </div>
</div>




<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CreateMenuBanner from '@/components/CreateMenuBanner.vue';
import Header2 from '@/components/delivery/header2.vue';

import invoice from '@/assets/owner/svg/invoice.svg';
import Invoice from '@/components/Invoice.vue';
import backarrow from '@/assets/owner/svg/backarrow.svg'
import html2pdf from 'html2pdf.js';

export default {
    components: {
        Header,
        Header2,
        CreateMenuBanner,
        Invoice,
        AppFooter
    },
    created() {
        const orderId = this.$route.params.orderId;
        const order = this.orders.find( item => item.orderId = orderId );
        
        this.orderId = order.orderId;
        this.orderDate = order.orderDate;
        this.clientName = order.clientName;
        this.clientEmail = order.clientEmail;
        this.clientTel = order.clientTel;
        this.clientLocation = order.clientLocation;
        this.restName = order.restName;
        this.restEmail = order.restEmail;
        this.restTel = order.restTel;
        this.remark = order.remark;
        this.payMethod = order.payMethod;
        this.orderItems = order.orderItems;
    },
    methods: {
        downloadAsPDF() {
            const element = this.$refs.invoice;
            html2pdf().from(element).save('invoice.pdf');
        },
        goToPrevious() {
            this.$router.back();
        }
    },
    data() {
        return {
            invoice: invoice,
            backarrow: backarrow,

            orderId: 0,
            orderDate: '',
            clientName: '',
            clientEmail: '',
            clientTel: '',
            clientLocation: '',
            restName: '',
            restEmail: '',
            restTel: '',
            remark: '',
            payMethod: '',
            orderItems: [],

            orders: [
                {
                    orderId: 5,
                    orderDate: '2025 06 09',
                    clientName: 'Bayaya Sorkins',
                    clientEmail: 'anna@gmail.com',
                    clientTel: '+0987654321',
                    clientLocation: 'St987 Phnom Penh',
                    restName: 'Malis Restaurant',
                    restEmail: 'malis@gmail.com',
                    restTel: '+76599545355',
                    remark: 'no chilli',
                    payMethod: 'Cash',
                    orderItems: [
                        {
                            name: 'Burger',
                            size: 'M',
                            unit: 1,
                            price: 2.5,
                            subtotal: 2.5
                        },
                        {
                            name: 'Cola',
                            size: 'M',
                            unit: 2,
                            price: 2.5,
                            subtotal: 5
                        },
                        {
                            name: 'Fries',
                            size: 'M',
                            unit: 3,
                            price: 2.5,
                            subtotal: 7.5
                        }
                    ]
                },
                {
                    orderId: 2,
                    orderDate: '2025 06 09',
                    clientName: 'Barista Sorkins',
                    clientEmail: 'barry@gmail.com',
                    clientTel: '+0987654321',
                    clientLocation: 'St987 Phnom Penh',
                    restName: 'Malis Restaurant',
                    restEmail: 'malis@gmail.com',
                    restTel: '+76599545355',
                    remark: 'no chilli',
                    payMethod: 'Cash',
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
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.invoiceBox {
    justify-self: center;
}
#dl {
    background-color: #D90000;
    color: white;
    border: none;
    border-radius: 999px;
    padding: 8px 16px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: large;
    box-shadow: 0 2px 2px #ccc;
    cursor: pointer;
}
.boxbox {
    margin: 20px 0 80px 0;
}
.backbtn {
    position: relative;
    top: 20px;
    left: -250px;
}
.backbtn button {
    background-color: #292929;
    border-radius: 99px;
    padding: 6px 8px 6px 8px;
    cursor: pointer;
}
.box3 {
    display: flex;
    justify-self: center;
}
</style>