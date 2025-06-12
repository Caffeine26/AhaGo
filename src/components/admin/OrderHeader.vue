<!-- OrderHeader.vue -->
<template>
  <div class="order-header">
    <h2>Order ID: {{ order.id }}</h2>
    <p>Customer: {{ order.customerName }}</p>
    <p>Status: {{ order.status }}</p>
  </div>
</template>

<script>
export default {
  name: 'OrderHeader',
  props: {
    order: Object
  }
}
</script>

<style scoped>
.order-header {
  margin-bottom: 16px;
}
</style>
