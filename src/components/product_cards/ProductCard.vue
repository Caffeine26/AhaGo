<template>
  <div class="product-card">
    <img :src="image" :alt="title" class="product-image">
    <div class="product-info">
      <div class="product-header">
        <h3 class="product-title">{{ title }}</h3>
        <div class="product-rating">
          <span class="rating-star">⭐</span> {{ rating }}
        </div>
      </div>
      <p class="product-price">${{ price.toFixed(2) }} &bull; {{ category }}</p>
      <div class="product-delivery-info">
        <span class="delivery-time">🕒 {{ deliveryTime }}</span>
        <span class="delivery-price">🏍️ ${{ deliveryPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    deliveryTime: {
      type: String,
      required: true
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 4.5
    }
  }
}
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  position: relative;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.product-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #6b7280; /* Gray 500 */
}

.rating-star {
  color: #ffc107; /* Amber color for the star */
}

.product-price {
  font-size: 0.9rem;
  color: #6b7280; /* Gray 500 */
  margin: 0.25rem 0;
}

.product-delivery-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #6b7280; /* Gray 500 */
}

.delivery-time,
.delivery-price {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9A0404;
}

.delivery-star {
  color: #9A0404;
}
</style>