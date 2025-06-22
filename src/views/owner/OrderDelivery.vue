<template>
<div class="contain">
    <Map
    id="map"
    driverProfilePicUrl="https://i.pinimg.com/736x/66/88/2c/66882c2ba53aeea6c32d3862fa656866.jpg"
    :use-geolocation="true"
    :restaurant-coords="restaurantCoords"
    :client-coords="clientCoords"
    :route-points="routePoints"
    @update:driver-location="onDriverLocation"
    />
    <Box class="box">
    <h2>Order #</h2>
    <div class="line"></div>
    <div class="content-container">
        <div class="content">
        <div class="left">
            <div class="wrap">
            <img src="@/assets/delivery/icons/serve.svg" />
            </div>
            <div class="wrap2">
            <div class="title">Tube Santhormuk</div>
            <div class="text">Street 261, Phnom Penh 12156</div>
            </div>
        </div>
        <div class="right">
            <img class="contact" src="@/assets/delivery/icons/phone.svg" />
            <img class="contact" src="@/assets/delivery/icons/chat.svg" />
        </div>
        </div>

        <div class="content">
        <div class="left">
            <div class="wrap">
            <img src="@/assets/delivery/icons/user.svg" />
            </div>
            <div class="wrap2">
            <div class="title">Tube Santhormuk</div>
            <div class="text">Street 261, Phnom Penh 12156</div>
            </div>
        </div>
        <div class="right">
            <img class="contact" src="@/assets/delivery/icons/phone.svg" />
            <img class="contact" src="@/assets/delivery/icons/chat.svg" />
        </div>
        </div>
    </div>

    <h2>Total Orders</h2>
    <div class="orders">
        <Order
        v-for="(item, index) in orderDetails?.orderItems || []"
        :key="index"
        :title="item.name"
        :amount="item.quantity"
        :price="item.price.toFixed(2)"
        />
    </div>

    <div class="button">
        <GeneralButton
        btnColor="green"
        title="Completed Delivery"
        titleColor="#FFFFFF"
        @click="markOrderCompleted"
        />
    </div>
    </Box>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Map from "@/components/delivery/map.vue";
import Box from "@/components/delivery/box.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import Order from "@/components/delivery/OrderCard.vue";

const route = useRoute();
const router = useRouter();
const orderId = route.params.id;

const driverLocation = ref(null);
const restaurantCoords = ref(null);
const clientCoords = ref(null);
const routePoints = ref([]);
const orderDetails = ref(null); // optional for displaying info

function onDriverLocation(coords) {
driverLocation.value = coords;
}
async function fetchOrderData() {
    try {
        const { data } = await axios.get(
        `http://localhost:4000/api/incoming-order/${orderId}`
        );
        orderDetails.value = data;

        const restaurantLocation = data.details?.restaurantLocation;
        const clientLocation = data.details?.clientLocation;

        restaurantCoords.value = {
        lat: restaurantLocation.lat,
        lng: restaurantLocation.lng,
        };

        clientCoords.value = {
        lat: clientLocation.lat,
        lng: clientLocation.lng,
        };
    } catch (err) {
        console.error("Failed to fetch order data", err);
    }
}

function startJourney() {
if (!driverLocation.value || !restaurantCoords.value || !clientCoords.value)
    return;
routePoints.value = [
    driverLocation.value,
    restaurantCoords.value,
    clientCoords.value,
];
}
async function markOrderCompleted() {
try {
    await axios.patch(`http://localhost:8300/api/orders/${orderId}`, {
    status: "completed",
    });

    alert("Order marked as completed!");
    router.push("/delivery/settings/history");
} catch (error) {
    console.error("Failed to complete order:", error);
    alert("Something went wrong. Please try again.");
}
}

onMounted(fetchOrderData);
</script>
<style scoped>
h2 {
margin: 0;
}

.contain {
display: flex;
gap: 20px;
justify-content: space-between;
align-items: flex-start;
width: 100%;
height: 100vh;
padding: 10px;
box-sizing: border-box;
overflow: hidden;
}

#map {
flex: 2;
height: 100%;
min-height: 400px;
max-height: 660px;
border-radius: 8px;
}

.box {
flex: 1;
display: flex;
flex-direction: column;
gap: 20px;
padding: 30px;
height: 600px;
overflow-y: auto;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
}

.line {
border: 1px solid lightgray;
}

.content {
display: flex;
align-items: center;
justify-content: space-between;
}

.wrap {
display: flex;
justify-content: center;
align-items: center;
background-color: green;
padding: 5px;
border-radius: 50%;
width: 40px;
height: 40px;
min-width: 40px;
}

.wrap2 {
display: flex;
flex-direction: column;
gap: 6px;
}

.title {
font-weight: 500;
font-size: 18px;
max-width: 100%;
word-break: break-word;
}

.text {
font-size: 14px;
color: #555;
max-width: 100%;
word-break: break-word;
}

.right {
display: flex;
gap: 10px;
}

.contact {
padding: 8px;
border-radius: 50%;
border: 1px solid #000;
width: 24px;
height: 24px;
}

.left {
display: flex;
gap: 15px;
flex: 1;
}

.orders {
display: flex;
flex-direction: column;
gap: 16px;
}

.button {
display: flex;
justify-content: center;
align-items: center;
margin-top: auto;
cursor: pointer;
}

.content-container {
position: relative;
display: flex;
flex-direction: column;
gap: 40px;
}

.content-container::before {
content: "";
position: absolute;
top: 40px;
left: 25px;
width: 2px;
height: calc(100% - 80px);
border-left: 2px dashed green;
}
</style>
  