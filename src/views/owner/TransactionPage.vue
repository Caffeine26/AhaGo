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
title-header= "Transactions Records"
:add-category="false"
></CategoryBannerV2>

<!-- <div class="records">
    <TransactionBox
    v-for="item in transactions"
    :client-name="item.clientName"
    :pay-method="item.payMethod"
    :order-id="item.orderId"
    :money="item.money"
    ></TransactionBox>
</div> -->

<div class="table-container">
<div class="theader">
    <div>Transactions</div>
    <div>
        <input 
        v-model="queryReceipt" 
        id="inputQuery"
        type="text" 
        
        placeholder="Search a receipt">
        <button id="export">
            <img :src="exportSvg" alt="*">
        </button>
    </div>
</div>
<table class="modern-table">
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Payment Method</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in filteredTransactions" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.customer.city }}</td>
        <td>${{ item.amount }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.payment }}</td>
        <td>{{ item.order.payment_status }}</td>
        <td>
            <RouterLink :to="'/owner/order/invoice/' + item.order_id">
                <button class="invoice">Get Invoice</button>
            </RouterLink>
        </td>
    </tr>
    </tbody>
</table>
</div>



<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import TransactionBox from '@/components/TransactionBox.vue';
import { useTransactionStore } from '@/stores/transactionStore';

import exportSvg from '@/assets/owner/svg/export.svg';
import OwnerHeader from '@/components/OwnerHeader.vue';
export default {
    components: {
        Header,
        OwnerHeader,
        CategoryBannerV2,
        TransactionBox,
        AppFooter
    },
    created() {
        this.restId = parseInt(this.$route.params.restId)
        const transactionStore = useTransactionStore()
        this.transactions = transactionStore.transactions
        console.log('this transactions=', this.transactions)
    },
    computed: {
        filteredTransactions() {
            if(!this.queryReceipt) return this.transactions
            if(this.queryReceipt) {
                const filtered = this.transactions.filter(transaction =>
                transaction.customer.city.toLowerCase().includes(this.queryReceipt.toLowerCase()))
                return filtered
            }
        }
    },
    methods: {
        onToggleCategory(index) {
            if(index === 1){
                for(let i = 0; i<this.records; i++) {
                    if(this.records[i].money > 0) {
                        this.filteredTransactions.push(this.records[i])
                    }
                }
            }
        }
    },
    data() {
        return {
            restId: null,
            transactions: null,
            // filteredTransactions: null,
            titles: [ 'All', 'Payments', 'Refunds' ],
            queryReceipt: '',

            exportSvg: exportSvg,
            items: [
            { id: 1, name: 'Product A', status: 'active', price: 19.99 },
            { id: 2, name: 'Product B', status: 'inactive', price: 9.5 },
            { id: 3, name: 'Product C', status: 'active', price: 14.25 },
            ],
            // transactions: [
            //     {
            //         clientName: 'Anna Sorkins',
            //         payMethod: 'bank',
            //         orderId: 1,
            //         money: 8.9
            //     },
            //     {
            //         clientName: 'Rick Sorkins',
            //         payMethod: 'bank',
            //         orderId: 2,
            //         money: 8.9
            //     },
            //     {
            //         clientName: 'Courtney Sorkins',
            //         payMethod: 'bank',
            //         orderId: 3,
            //         money: 8.9
            //     },
            // ],
            
        }
    },
    
}
</script>

<style scoped>
.records {
    justify-self: center;
}
.table-container {
    width: 100vw;
  overflow-x: auto;
  margin: 50px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.theader {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 24px 0;
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

.status-active {
  color: green;
  font-weight: 600;
}

.status-inactive {
  color: red;
  font-weight: 600;
}

#export {
    padding: 5px 8px 5px 8px;
    border-radius: 99px;
    background-color: #D90000;
    border: none;
    cursor: pointer;
}
#export:hover {
    box-shadow: 0 4px 4px #aeaeae;
}
#inputQuery {
    padding: 5px 14px 5px 14px;
    border-radius: 20px;
    margin-right: 8px;
}
.invoice {
    color: white;
    background-color: #D90000;
    font-weight: 500;
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