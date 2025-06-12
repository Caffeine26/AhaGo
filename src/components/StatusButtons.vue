<template>
<div class="status-box">
    <template v-if="statusId === 0">
        <button v-if="paid" class="status-btn refund">Refund</button>
        <button v-else class="status-btn remove">Remove</button>
    </template>
    
    <template v-else-if="statusId === 1">
        <button class="reject">Reject</button>
        <button class="status-btn accept">Accept</button>
    </template>

    <template v-else-if="statusId === 2">
        <button class="status-btn ready">Ready</button>
    </template>

    <template v-else-if="statusId === 3">
        <button class="status-btn deliver">Deliver</button>
    </template>

    <template v-else-if="statusId === 4">
        <button class="status-btn viewDeliver">View Delivery</button>
    </template>

    <template v-else-if="statusId === 5">
        <RouterLink :to="'/owner/order/invoice/' + orderId">
            <button class="status-btn view">View</button>
        </RouterLink>
        
    </template>
</div>
</template>

<script>
export default {
props: {
    statusId: {
        type: Number,
        required: true
    },
    orderId: Number,
    paid: Boolean
}
};
</script>

<style scoped>
/* .status-box {
display: flex;
gap: 10px;
align-items: center;
font-family: 'Raleway';
} */

.status-btn {
font-weight: bold;
font-size: medium;
color: white;
font-family: 'Raleway';
padding: 8px 16px;
border: none;
border-radius: 20px;
cursor: pointer;
}
.status-btn:hover {
    box-shadow: 0 4px 5px #979797;
}
.remove {
background-color: #292929;
}
.accept, .refund {
background-color: #D90000;
}
.reject {
    background-color: transparent;
    border: none;
    font-size: medium;
    font-family: 'Raleway';
}
.ready {
background-color: #FF3F00;
}
.deliver {
background-color: #0C8CE9;
}
.viewDeliver {
background-color: #F8BD00;
}
.view {
background-color: #008F39;
}


</style>
    