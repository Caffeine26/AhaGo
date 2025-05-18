<template>
  <div class="page-container">
    <Header :title="'Checkout'" />
    <div class="checkout-page">
      <!-- Store Info -->
      <div class="store-info">
        <img :src="cover1" class="store-img" alt="store" />
        <div class="store-details">
          <p>35c St 472, Phnom Penh, Cambodia 35c St 472, TTP2, Chamkar Mon</p>
          <p class="contact">Ms.Lyly  +885963024312</p>
        </div>
      </div>
      <button class="add-location-btn" @click="goToAddLocation">
        + Add Location
      </button>
      <hr />
      <!-- Delivery Info -->
      <div class="info-list">
        <div class="info-row">
          <span>Delivery Time</span>
          <span class="info-value red">Instant(12:30)</span>
        </div>
        <div class="info-row">
          <span>Delivery Service</span>
          <span class="info-value">Downstairs pick-up <span class="chevron">&gt;</span></span>
        </div>
        <div class="info-row">
          <span>Payment method</span>
          <span class="info-value">Cash On Delivery</span>
        </div>
      </div>
      <hr />
      <!-- Order Summary (Category as title) -->
      <div class="section">
        <h3>Sweet Shrimp (TTP)</h3>
        <div class="order-items">
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <img :src="item.image" class="item-img" />
            <div class="item-details">
              <div class="item-name">{{ item.title }}</div>
              <div class="item-quantity">x{{ item.quantity }}</div>
            </div>
            <div class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Red Envelope, Coupons, Promotion -->
      <div class="info-list">
        <div class="info-row">
          <span>Red Envelope</span>
          <span class="info-value">No available red envelopes</span>
        </div>
        <div class="info-row">
          <span>Coupons</span>
          <span class="info-value">Not Available</span>
        </div>
        <div class="info-row">
          <span>0% Off Promotion</span>
          <span class="info-value red">-${{ (cartTotal * 0).toFixed(2) }}</span>
        </div>
      </div>
      <hr />
      <!-- Price Details -->
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
      <!-- Remarks -->
      <div class="section remarks-section">
        <span class="remarks-label">Remarks</span>
        <textarea placeholder="Please leave a message, if any." v-model="remarks"></textarea>
      </div>
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="pay-btn">PAY FOR ME</button>
        <button class="order-btn" @click="placeOrder">ORDER NOW</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Header from '@/components/all/header.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import cover1 from '@/assets/store_details/house.png'

export default {
  name: 'CheckoutPage',
  components: {
    Header,
    AppFooter
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const brandName = route.params.brandName
    const cartItems = ref(JSON.parse(route.params.cartItems || '[]'))
    const remarks = ref('')

    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const finalTotal = computed(() => {
      return cartTotal.value + 0.45 // Adding reduced delivery fee
    })

    const placeOrder = () => {
      // Implement order placement logic here
      console.log('Order placed:', {
        items: cartItems.value,
        total: finalTotal.value,
        remarks: remarks.value
      })
    }

    const goToAddLocation = () => {
      router.push({ name: 'AddLocation' })
    }

    return {
      brandName,
      cartItems,
      remarks,
      cartTotal,
      finalTotal,
      placeOrder,
      cover1,
      goToAddLocation
    }
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
}
.store-info {
  display: flex;
  gap: 1rem;
  padding: 1rem 0 0.5rem 0;
  background: white;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  box-shadow: none;
}
.store-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}
.store-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.store-details h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}
.store-details p {
  margin: 0;
  font-size: 0.95rem;
  color: #222;
}
.contact {
  margin-top: 0.5rem !important;
}
.info-list {
  background: white;
  border-radius: 12px;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  box-shadow: none;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
}
.info-value {
  color: #222;
}
.info-value.red {
  color: #b91c1c;
  font-weight: 500;
}
.chevron {
  color: #888;
  font-size: 1.1em;
  margin-left: 0.2em;
}
.section {
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: none;
}
.section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}
.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.price-details {
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  box-shadow: none;
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}
.discount {
  color: #b91c1c;
  font-size: 0.95rem;
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
.remarks-section {
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 12px;
  padding: 1rem 0.5rem;
}
.remarks-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 60px;
  margin-top: 0.5rem;
  font-size: 1rem;
}
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.pay-btn, .order-btn {
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1rem;
}
.pay-btn {
  background: white;
  border: 1px solid #b91c1c;
  color: #b91c1c;
}
.order-btn {
  background: #b91c1c;
  border: none;
  color: white;
}
.pay-btn:hover {
  background: #f3f3f3;
}
.order-btn:hover {
  background: #991818;
}
.add-location-btn {
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.add-location-btn:hover {
  background: #991818;
}
@media (max-width: 600px) {
  .checkout-page {
    padding: 0.5rem;
  }
  .action-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: white;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
    margin: 0;
  }
}
</style>