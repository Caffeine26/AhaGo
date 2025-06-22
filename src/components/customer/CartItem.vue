<template>
  <div class="cart-item">
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
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      image: 'https://via.placeholder.com/80',
      name: 'Product Name',
      options: 'Option 1, Option 2',
      quantity: 1,
      price: 0.00,
    }),
  },
});
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
  height: 100%;
}

.item-quantity {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: auto; /* Pushes quantity to the top */
}

.item-price-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto; /* Pushes price to the bottom */
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
</style> 