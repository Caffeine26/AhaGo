<template>
    <div class="confirmation-container" v-if="pickupOption && paymentMethod">
      <div class="confirmation-card">
        <h2>Thank you for your order!</h2>
        <p>Your pick-up order has been placed successfully.</p>
  
        <div class="pickup-options">
          <h3>Pick-up options</h3>
          <div class="option-box">
            <span class="option-radio selected"></span>
            <span class="option-label">{{ pickupOption.label }}</span>
            <span class="option-time">{{ pickupOption.time }}</span>
          </div>
        </div>
  
        <div class="payment-section">
          <h3>Payment</h3>
          <div class="payment-box selected">
            <img
              v-if="paymentMethod.icon"
              :src="paymentMethod.icon"
              :alt="paymentMethod.label"
              class="pay-icon"
            />
            <span class="pay-label">{{ paymentMethod.label }}</span>
            <span class="pay-desc">{{ paymentMethod.desc }}</span>
          </div>
          <div class="payment-info" v-if="paymentMethod.info">
            {{ paymentMethod.info }}
          </div>
        </div>
  
        <div class="voucher-section" v-if="voucher">
          <span class="voucher-icon">🏷️</span>
          <span class="voucher-label">{{ voucher }}</span>
        </div>
  
        <button class="main-btn" disabled>Place pick-up order</button>
  
        <div class="terms">
          By making this purchase you agree to our terms and conditions.<br />
          I agree that placing the order places me under an obligation to make a
          payment in accordance with the General Terms and Conditions.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const pickupOption = ref(null);
  const paymentMethod = ref(null);
  const voucher = ref('');
  
  onMounted(() => {
    const stored = localStorage.getItem('orderData');
    if (stored) {
      const parsed = JSON.parse(stored);
      pickupOption.value = parsed.pickupOption;
      paymentMethod.value = parsed.paymentMethod;
      voucher.value = parsed.voucher;
      // Optional: clear data after loading
      localStorage.removeItem('orderData');
    }
  });
  </script>
  
  <style scoped>
  .confirmation-container {
    background: #f7f7f7;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 3rem 1rem;
  }
  .confirmation-card {
    background: #fff;
    border-radius: 16px;
    max-width: 500px;
    width: 100%;
    padding: 2rem 2.5rem;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  h2 {
    margin-bottom: 0.5rem;
    color: #b91c1c;
    text-align: center;
  }
  .pickup-options,
  .payment-section,
  .voucher-section {
    margin: 1.5rem 0 1rem 0;
  }
  .option-box {
    display: flex;
    align-items: center;
    border: 2px solid #222;
    border-radius: 10px;
    padding: 0.8rem 1rem;
    margin-top: 0.5rem;
    background: #fafafa;
  }
  .option-radio {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #222;
    margin-right: 1rem;
    background: #fff;
    position: relative;
  }
  .option-radio.selected::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background: #222;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
  }
  .option-label {
    font-weight: 600;
    margin-right: 0.5rem;
  }
  .option-time {
    color: #888;
    font-size: 1rem;
  }
  .payment-section h3,
  .pickup-options h3 {
    margin-bottom: 0.5rem;
  }
  .payment-box {
    display: flex;
    align-items: center;
    border: 2px solid #222;
    border-radius: 10px;
    padding: 0.8rem 1rem;
    background: #fafafa;
    margin-bottom: 0.5rem;
  }
  .payment-box.selected {
    border-color: #222;
    background: #f5f5f5;
  }
  .pay-icon {
    width: 40px;
    margin-right: 1rem;
  }
  .pay-label {
    font-weight: 600;
    margin-right: 0.5rem;
  }
  .pay-desc {
    color: #888;
    font-size: 1rem;
  }
  .payment-info {
    color: #888;
    font-size: 0.98rem;
    margin-bottom: 1rem;
  }
  .voucher-section {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #222;
    margin-bottom: 1.5rem;
  }
  .voucher-icon {
    font-size: 1.3rem;
    margin-right: 0.5rem;
  }
  .main-btn {
    background: #991818;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1.2rem;
    cursor: not-allowed;
  }
  .terms {
    color: #888;
    font-size: 0.95rem;
    text-align: left;
  }
  </style>