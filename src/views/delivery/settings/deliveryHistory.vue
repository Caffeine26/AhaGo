<template>
  <div class="contain">
    <div class="content">
      <Title class="title" title="Past Deliveries" />
      <div class="booking-list">
        <Order
          class="orders"
          v-for="(item, index) in driverStore.orders"
          :key="index"
          :index="index"
          :order-id="item.id"
          :order-index="item.id"
          :order-status="item.status"
          :order-items="item.orderItems"
          :total="item.total_amount"
          :paid="item.payment_status"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Order from "@/components/OrderCard02.vue";
import { ref, onMounted } from "vue";
import Title from "@/components/delivery/title.vue";
import { computed } from "vue";
import { useDriverStore } from "@/stores/driverStore";


const orders = ref([]);
const driverStore = useDriverStore();
onMounted(async () => {
  await driverStore.fetchOrders("pending");
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
