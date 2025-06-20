<template>
<div class="status-box">
    <template v-if="status === 'cancelled'">
        <button v-if="paid == 'paid'" class="status-btn refund">Refund</button>
        <button v-else class="status-btn remove">Remove</button>
    </template>
    
    <template v-else-if="status === 'pending'">
        <button class="reject">Reject</button>
        <button 
        class="status-btn accept"
        @click="toggleState('preparing')"
        >Accept</button>
    </template>

    <template v-else-if="status === 'preparing'">
        <button 
        class="status-btn ready"
        @click="toggleState('ready')"
        >Ready</button>
    </template>

    <template v-else-if="status === 'ready'">
        <button 
        class="status-btn deliver"
        @click="toggleState('delivering')"
        >Deliver</button>
    </template>

    <template v-else-if="status === 'delivering'">
        <button 
        class="status-btn viewDeliver"
        @click="toggleState('completed')"
        >View Delivery</button>
    </template>

    <template v-else-if="status === 'completed'">
        <RouterLink :to="'/owner/order/invoice/' + orderId">
            <button class="status-btn view">View</button>
        </RouterLink>
        
    </template>
</div>
</template>

<script>
export default {
props: {
    status: {
        type: String,
        required: true
    },
    orderId: Number,
    paid: String
},
methods: {
    toggleState(newState) {
        this.$emit('change-state', newState)
    }
},
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
    