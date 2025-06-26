<template>
  <div class="history-page">
    <h1>Order History</h1>
    <div v-if="orders.length > 0" class="orders-list">
      <OrderHistoryCard 
        v-for="order in orders" 
        :key="order.id" 
        :order="order" 
      />
    </div>
    <div v-else class="empty-history">
      <h2>No past orders</h2>
      <p>Your history is empty. Start a new order to see it here.</p>
      <button @click="goToHome">Start Ordering</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';
import OrderHistoryCard from '@/components/customer/OrderHistoryCard.vue';

const router = useRouter();
const orderStore = useOrderStore();
const orders = computed(() => 
  orderStore.orders.filter(o => ['completed', 'cancelled'].includes(o.status))
);

const goToHome = () => {
  router.push('/');
};

onMounted(() => {
  orderStore.fetchOrders(null, 'customer');
});
</script>


<style scoped>
.history-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.empty-history {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #fff;
  border-radius: 12px;
}

.empty-history h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.empty-history p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.empty-history button {
  background-color: #9a0404;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.empty-history button:hover {
  background-color: #7f1d1d;
}
</style> 