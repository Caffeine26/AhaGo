<template>
  <div class="cart-sidebar">
    <div class="cart-header">
      <div class="cart-icon">🛒</div>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <h3>Hungry?</h3>
        <p>You haven't added anything to your cart!</p>
      </div>
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.img_url" class="cart-item-img" />
            <div class="cart-item-info">
              <div class="cart-item-title">{{ item.name }}</div>
              <div class="cart-item-price">${{ item.price }}</div>
              <div class="cart-item-desc">{{ item.description }}</div>
            </div>
            <div class="cart-item-controls">
              <div class="quantity-controls">
                <button @click="$emit('decrease', item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="$emit('increase', item)">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total (incl. fees and tax)</span>
            <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="cart-summary-link" @click="$emit('toggle-summary')">
            See summary
          </div>
          <button class="checkout-btn" @click="$emit('checkout')">
            Review payment and address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartSidebar",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    cartTotal: {
      type: Number,
      required: true,
    },
    showSummary: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.cart-sidebar {
  width: 350px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-header {
  text-align: center;
}

.cart-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-cart h3 {
  color: #111;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.empty-cart p {
  color: #666;
  font-size: 0.95rem;
}

.cart-content {
  text-align: left;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-img {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #111;
}

.cart-item-price {
  color: #111;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.cart-item-desc {
  color: #666;
  font-size: 0.8rem;
  line-height: 1.3;
}

.cart-item-controls {
  display: flex;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 0.25rem;
}

.quantity-controls button {
  background: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #b91c1c;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.quantity-controls span {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.cart-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cart-total span:first-child {
  color: #666;
  font-size: 0.9rem;
}

.total-amount {
  font-weight: 700;
  color: #111;
  font-size: 1.1rem;
}

.cart-summary-link {
  color: #b91c1c;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: underline;
}

.checkout-btn {
  width: 100%;
  background: #b91c1c;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.95rem;
}

.checkout-btn:hover {
  background: #991818;
}
</style>
