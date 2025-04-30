<template>
  <div class="product-card">
    <img :src="image" :alt="title" class="product-image">
    <div class="product-info">
      <div class="product-header">
        <h3 class="product-title">{{ title }}</h3>
        <div class="product-rating">
          {{ rating }}
          <span class="rating-star">★</span>
        </div>
      </div>
      <p class="product-price">${{ price }}</p>
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
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
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
  font-weight: 500;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #22C55E;
  font-weight: 500;
}

.rating-star {
  color: #22C55E;
}

.product-price {
  margin: 0;
  font-weight: 600;
  color: #FF0000;
}
</style>