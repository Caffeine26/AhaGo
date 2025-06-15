<template>
  <div class="price-details">
    <div class="price-row">
      <span>Total</span>
      <span>${{ cartTotal.toFixed(2) }}</span>
    </div>
    <div class="price-row">
      <span>Delivery fee</span>
      <span>+$1.00</span>
    </div>
    <div class="price-row discount">
      <span>Only $0.45 delivery fee</span>
      <span>-$0.55</span>
    </div>
    <div class="price-row total">
      <span>Total</span>
      <span>${{ finalTotal.toFixed(2) }}</span>
    </div>
    <div class="price-row exchange">
      <span>1USD = 4070KHR</span>
      <span>KHR {{ (finalTotal * 4070).toFixed(0) }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cartTotal: Number,
  finalTotal: Number,
});
</script>

<style scoped>
.price-details {
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
}
.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.discount {
  color: #b91c1c;
}
.total {
  font-weight: 700;
  font-size: 1.1rem;
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
  padding-top: 1rem;
}
.exchange {
  color: #666;
  font-size: 0.95rem;
}
</style>
