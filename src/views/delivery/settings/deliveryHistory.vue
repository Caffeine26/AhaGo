<template>
  <div class="contain">
    <div class="content">
      <Title class="title" title="Past Deliveries" />
      <div class="booking-list">
        <Order
          class="orders"
           v-for="(item, index) in filteredOrders"
    :key="index"
    :index="index"
    :order-id="item.orderIndex"
    :order-index="item.orderIndex"
    :order-status="item.orderStatus"
    :order-items="item.orderItems"
    :total="item.total"
    :paid="item.paid"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Order from "@/components/OrderCard02.vue";
import { ref, onMounted } from "vue";
import Title from "@/components/delivery/title.vue";
import axios from "axios";
import { computed } from "vue";

const filteredOrders = computed(() => {
  return orders.value; // or filter logic if needed
});

const orders = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/delivery-history");
    orders.value = res.data;
  } catch (error) {
    console.error("Failed to load delivery history:", error);
  }
});
</script>

<style scoped>
.contain {
  display: flex;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
  width: 100%;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 480px;
  overflow-y: scroll;
  padding: 20px;
  overflow-x: hidden;
}
.orders {
  width: 100%;
  z-index: 0;
}
</style>
