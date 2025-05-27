<template>
  <div class="contain">
    <Map
      id="map"
      driverProfilePicUrl="https://i.pinimg.com/736x/66/88/2c/66882c2ba53aeea6c32d3862fa656866.jpg"
      :use-geolocation="true"
      :restaurant-coords="restaurantCoords"
      :client-coords="clientCoords"
    />
    <Box class="box">
      <h2>Order #</h2>
      <div class="line"></div>
      <div class="content-container">
        <div class="content">
          <div class="wrap">
            <img src="@/assets/delivery/icons/serve.svg" />
          </div>
          <div class="wrap2">
            <div class="title">Tube Santhormuk</div>
            <div class="text">Street 261, Phnom Penh 12156</div>
          </div>
        </div>

        <div class="content">
          <div class="wrap">
            <img src="@/assets/delivery/icons/user.svg" />
          </div>
          <div class="wrap2">
            <div class="title">Tube Santhormuk</div>
            <div class="text">Street 261, Phnom Penh 12156</div>
          </div>
        </div>
      </div>

      <h2>Total Orders</h2>
      <div class="orders">
        <Order title="Chicken Laksa" amount="3" price="12.00" />
        <Order title="Chicken Laksa" amount="3" price="12.00" />
      </div>
      <div class="button">
        <GeneralButton
          btnColor="green"
          title="Completed Delivery"
          titleColor="#FFFFFF"
        />
      </div>
    </Box>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Map from "@/components/delivery/map.vue";
import Box from "@/components/delivery/box.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import Order from "@/components/delivery/OrderCard.vue";
const route = useRoute();

const restaurantCoords = computed(() => ({
  lat: parseFloat(route.query.restaurantLat),
  lng: parseFloat(route.query.restaurantLng),
}));

const clientCoords = computed(() => ({
  lat: parseFloat(route.query.clientLat),
  lng: parseFloat(route.query.clientLng),
}));
</script>
<style scoped>
h2 {
  margin: 0px;
}
.contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
  height: 600px;
  padding: 10px;
}
#map {
  width: 880px;
  height: 580px;
}
.line {
  border: 1px solid lightgray;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 30px;
  height: 500px;
  width: 480px;
  overflow-y: scroll;
}
.content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  padding: 5px;
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
}
.wrap2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  font-weight: 500;
  width: 200px;
  font-size: 20px;
}
.text {
  width: 300px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
}
.orders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.content-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px; /* space between content blocks */
}

.content-container::before {
  content: "";
  position: absolute;
  top: 40px; /* height of the first icon */
  left: 25px; /* center of icon assuming it's 40px wide */
  width: 2px;
  height: calc(100% - 80px); /* spans the gap */
  border-left: 2px dashed green; /* dashed line */
}
</style>
