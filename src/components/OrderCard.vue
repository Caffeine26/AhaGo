<template>
    <div class="orderCard">
        <div class="fire"></div>
        <div id="fireId">#{{ index+1 }}</div>

        <div class="card">
            <div class="section01">
                <div id="order">Order: {{ orderId }}</div>
                <div id="location">Location: {{ location }}</div>
                <div id="total">Total: ${{ price }}</div>
            </div>

            <div class="section02">
                <ol>
                    <li v-for="(item, index) in items" :key="index">
                        {{ item }}
                    </li>
                </ol>
            </div>

            <div class="section03">
                <StatusAction :status-id="status"></StatusAction>
            </div>
        </div>
    </div>
    
</template>

<script>
import StatusAction from './StatusAction.vue';

export default{
    components: {
        StatusAction,
    },
    props: {
        index: Number,
        orderId: String,
        location: String,
        price: Number,
        items: Array,
        status: Number,
        
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.orderCard{
    position: relative;
    font-family: 'Raleway';
    margin-top: 30px;

}
.fire{
    position: absolute;
    left: 30px;
    top: -4px;
    z-index: 2;
    width: 57px;
    height: 47px;
    border-radius: 30px 0 30px 30px;
    background-color: orangered;
    transform: rotate(-20deg);

}
#fireId {
    position: absolute;
    left:46px;
    top: 6px;
    color: white;
    z-index: 3;
    font-size: 20px;
}
.card{
    /* width: 1250px; */
    border: 1px solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 4px rgb(220, 218, 218);
    padding-top: 12px;
    padding-bottom: 12px;
}
#order{
    font-size: 20px;
}
#location{
    font-size: 16px;
    margin-top: 4px;
    margin-bottom: 16px;
}
#total{
    font-size: 20px;
}
.section02{
    font-size: 18px;
}
.section01{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>