<template>
  <div class="review-page-container">
    <div class="review-page">
      <div class="page-header">
        <button @click="goBack" class="back-btn">&larr;</button>
        <h1>Reviews</h1>
      </div>
      
      <div v-if="loading" class="loading">Loading review details...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      
      <div v-else>
        <ReviewCard
          type="delivery"
          :reviewer="reviewData.delivery"
          ratingTitle="Delivery Service"
          @update="deliveryReview = $event"
        />
        <ReviewCard
          type="restaurant"
          :reviewer="reviewData.restaurant"
          ratingTitle="Taste & Packaging"
          placeholder="Rate & review us if you're satisfied"
          :allowPhotoUpload="true"
          :orderItems="reviewData.orderItems"
          @update="restaurantReview = $event"
        />
        <button class="post-btn" @click="submitReview">POST</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { useOrderHistoryStore } from '@/stores/orderHistoryStore';
import { useReviewStore } from '@/stores/reviewStore';
import { useOrderStore } from '@/stores/orderStore';
import { useUserStore } from '@/stores/userStore';
import ReviewCard from '@/components/customer/ReviewCard.vue';

const route = useRoute();
const router = useRouter();
// const orderHistoryStore = useOrderHistoryStore();
const reviewStore = useReviewStore();
const userStore = useUserStore();
const orderStore = useOrderStore();
const loading = ref(true);
const error = ref(null);
const reviewData = reactive({
  delivery: null,
  restaurant: null,
  orderItems: [],
});

const deliveryReview = ref({});
const restaurantReview = ref({});

const formatReviewDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

onMounted(async () => {
  try {
    const orderId = parseInt(route.params.orderId, 10);
    if (isNaN(orderId)) throw new Error("Invalid Order ID provided.");

    await orderStore.fetchOrderById(orderId);
    const order = orderStore.currentOrder;
    if (!order) throw new Error("Could not find the specified order.");

    reviewData.delivery = {
      name: 'D18a.Brak Pisithra',
      image: '/src/assets/delivery/images/image1.png',
      meta: `Delivery Time: ${formatReviewDate(order.createdAt)}`,
    };

    reviewData.restaurant = {
      name: order.details.restaurantName,
      image: order.details.restaurantLogo || '/fallback.png', // optional fallback
    };

    reviewData.orderItems = order.orderItems.map(item => item.name || 'Unknown Item');
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});


const goBack = () => {
  router.back();
};

const submitReview = () => {
  const finalReview = {
    name: userStore.user.name,
    avatar: userStore.user.profile,
    rating: restaurantReview.value.tasteRating || 0, // Or average them?
    type: 'Delivery',
    comment: restaurantReview.value.reviewText || '',
    reviews: 1, // Or fetch from user data
  };
  reviewStore.addReview(finalReview);
  router.push({ name: 'StoreDetails', params: { brandName: reviewData.restaurant.name } });
}
</script>

<style scoped>
.review-page-container {
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
}
.review-page {
  max-width: 800px;
  margin: 0 auto;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.back-btn {
  background: none;
  border: 1px solid #ccc;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
}
h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
.post-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #9a0404;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
}
.loading, .error-message {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
}
.error-message {
  color: #dc2626;
}
</style> 