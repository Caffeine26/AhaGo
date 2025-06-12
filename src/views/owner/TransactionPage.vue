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
title-header= "Transactions Records"
:titles="titles"
:add-category="false"
@toggle-category="onToggleCategory"
></CategoryBannerV2>

<div class="records">
    <TransactionBox
    v-for="item in transactions"
    :client-name="item.clientName"
    :pay-method="item.payMethod"
    :order-id="item.orderId"
    :money="item.money"
    ></TransactionBox>
</div>


<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';
import TransactionBox from '@/components/TransactionBox.vue';

export default {
    components: {
        Header,
        Header2,
        CategoryBannerV2,
        TransactionBox,
        AppFooter
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
            titles: [ 'All', 'Payments', 'Refunds' ],

            transactions: [
                {
                    clientName: 'Anna Sorkins',
                    payMethod: 'bank',
                    orderId: 1,
                    money: 8.9
                },
                {
                    clientName: 'Rick Sorkins',
                    payMethod: 'bank',
                    orderId: 2,
                    money: 8.9
                },
                {
                    clientName: 'Courtney Sorkins',
                    payMethod: 'bank',
                    orderId: 3,
                    money: 8.9
                },
            ],
            
        }
    },
    
}
</script>

<style scoped>
.records {
    justify-self: center;
}
</style>