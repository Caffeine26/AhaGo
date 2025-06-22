<template>
  <div class="order-history-card">
    <div class="card-header">
      <img :src="order.restaurant.logo" :alt="order.restaurant.name" class="restaurant-logo" />
      <div class="restaurant-info">
        <h3 class="restaurant-name">{{ order.restaurant.name }}</h3>
        <p class="order-date">{{ formatDate(order.date) }}</p>
      </div>
      <img src="@/assets/owner/svg/backarrow.svg" alt="details" class="details-arrow" />
    </div>

    <div class="order-item" v-for="item in order.items" :key="item.id">
      <img :src="item.image" :alt="item.name" class="item-image" />
      <div class="item-details">
        <h4 class="item-name">{{ item.name }}</h4>
        <p class="item-options">{{ item.options }}</p>
      </div>
      <div class="item-info">
        <span class="item-quantity">x{{ item.quantity }}</span>
        <div class="item-price-section">
          <span class="item-price">${{ item.price.toFixed(2) }}</span>
          <img src="@/assets/down.png" alt="options" class="options-arrow" />
        </div>
      </div>
    </div>

    <div class="card-footer">
      <span class="order-status" :class="statusClass">{{ order.status }}</span>
      <div class="action-buttons">
        <button v-if="order.status === 'Order Canceled'" class="re-order-btn">RE-ORDER</button>
        <template v-if="order.status === 'Completed'">
          <button class="re-order-btn">RE-ORDER</button>
          <button @click="goToReview" class="rate-us-btn">RATE US</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const statusClass = computed(() => {
  return props.order.status.toLowerCase().replace(' ', '-');
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
  return new Date(dateString).toLocaleString('en-CA', options).replace(',', '');
};

const goToReview = () => {
  router.push(`/review/${props.order.id}`);
};
</script>

<style scoped>
.order-history-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.restaurant-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.restaurant-info {
  flex-grow: 1;
}

.restaurant-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.order-date {
  color: #6b7280;
  margin: 0;
}

.details-arrow {
  width: 14px;
  transform: rotate(180deg);
  cursor: pointer;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb; /* Lighter background for the item */
  border-radius: 8px;
  margin: 1rem 0;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 1rem;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.item-options {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch; /* Make it take full height */
  justify-content: space-between;
}

.item-quantity {
  font-size: 1rem;
  color: #6b7280;
}

.item-price-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 600;
}

.options-arrow {
  width: 12px;
  height: 12px;
  cursor: pointer;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

.order-status {
  font-weight: 600;
}

.order-status.completed {
  color: #16a34a; /* Green 600 */
}

.order-status.order-canceled {
  color: #dc2626; /* Red 600 */
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.re-order-btn, .rate-us-btn {
  border: 1px solid #d1d5db; /* Gray 300 */
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.re-order-btn:hover, .rate-us-btn:hover {
  background-color: #f9fafb; /* Gray 50 */
}

.rate-us-btn {
  border-color: #9a0404;
  color: #9a0404;
}
</style> 