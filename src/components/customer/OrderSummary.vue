<template>
  <div class="section">
    <h3>{{ category }}</h3>
    <div class="order-items">
      <div v-for="item in items" :key="item.id" class="order-item">
        <img :src="item.img_url" class="item-img" />
        <div class="item-details">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-quantity">x{{ item.quantity }}</div>
        </div>
        <div class="item-price">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: String,
  items: Array,
});
</script>

<style scoped>
.section {
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
}
.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.item-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}
.item-details {
  flex: 1;
}
.item-name {
  font-weight: 500;
}
.item-quantity {
  color: #666;
  font-size: 0.9rem;
}
.item-price {
  font-weight: 600;
  color: #b91c1c;
}
</style>
