<template>
  <div class="track-order-page">
    <div class="map-section">
      <Map :useGeolocation="false" />
    </div>
    <div class="delivery-status-card">
      <div class="delivery-status-header">
        <span class="delivery-status-title">Delivery overtime <span class="chevron">&gt;</span></span>
      </div>
      <div class="delivery-status-info">
        Timed out <span class="highlight">32</span> minutes, originally scheduled <span class="highlight">16:43</span> Delivered
      </div>
      <div class="delivery-status-progress">
        <span class="status-icon">🍔</span>
        <span class="status-line"></span>
        <span class="status-icon">🥤</span>
        <span class="status-line"></span>
        <span class="status-icon">🛵</span>
        <span class="status-line"></span>
        <span class="status-icon">🏠</span>
      </div>
    </div>
    <div class="order-detail-card">
      <div class="order-item-row">
        <img class="order-item-img" src="@/assets/client/pizza_company.png" alt="Pizza Company" />
        <div class="order-item-info">
          <div class="order-item-title">1x Pepperoni Pizza (Large)</div>
          <div class="order-item-desc">Thin crust, Extra cheese, No onions</div>
          <div class="order-item-qty-price">
            <span>x1</span>
            <span class="order-item-old-price">$12.00</span>
            <span class="order-item-price">$8.99</span>
          </div>
        </div>
      </div>
      <div class="order-fee-row">
        <span>Delivery Fee <span class="info-icon">?</span></span>
        <span>$0.75</span>
      </div>
      <div class="order-total-row">
        <div class="order-total-label">Total</div>
        <div class="order-total-amount">$9.74</div>
      </div>
      <div class="order-currency-row">
        <span>1USD=4008.00KHR</span>
        <span class="order-total-khr">៛39,048.00</span>
      </div>
      <div class="section-card">
        <div class="section-title">
          <span class="section-icon">📦</span> Delivery Information
        </div>
        <div class="section-row">
          <span class="section-label">Delivery Address</span>
          <span class="section-value">Saint 253  Khan Tuol Kouk Phnom Penh Phnom Penh Cambodia<br/>សង្កាត់,855099916946</span>
        </div>
        <div class="section-row">
          <span class="section-label">Estimated time to arrived at</span>
          <span class="section-value">21/06/2025 16:43</span>
        </div>
        <div class="section-row">
          <span class="section-label">Note</span>
          <span class="section-value">No chili flakes, please.</span>
        </div>
        <div class="section-row">
          <span class="section-label">Delivery man</span>
          <span class="section-value">N-T1-WE-Da Ravuth (凌)</span>
        </div>
      </div>
      <div class="section-card">
        <div class="section-title">
          <span class="section-icon">📄</span> Order Information
        </div>
        <div class="section-row">
          <span class="section-label">Order Number</span>
          <span class="section-value">1936350949814362112</span>
        </div>
        <div class="section-row">
          <span class="section-label">Payment method</span>
          <span class="section-value">Online Payment</span>
        </div>
        <div class="section-row">
          <span class="section-label">Order Time</span>
          <span class="section-value">21/06/2025 16:10</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Map from '@/components/delivery/map.vue';
// Static page for design purposes. No dynamic logic needed yet.
</script>

<style scoped>
:root {
  --brand-red: #d90000;
}
.track-order-page {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  gap: 1.5rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 0 0 2rem 0;
}
.map-section {
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.delivery-status-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(217,0,0,0.08);
  margin: 1.5rem 1.5rem 0 1.5rem;
  padding: 1rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.delivery-status-header {
  font-weight: 600;
  font-size: 1.08rem;
  color: #222;
  margin-bottom: 0.2rem;
}
.delivery-status-title {
  color: #222;
}
.chevron {
  color: var(--brand-red);
  font-weight: bold;
  margin-left: 0.2em;
}
.delivery-status-info {
  color: #222;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}
.highlight {
  color: var(--brand-red);
  font-weight: 700;
  font-size: 1.08em;
}
.delivery-status-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 0.2em;
}
.status-icon {
  font-size: 1.3em;
  color: var(--brand-red);
}
.status-line {
  flex: 1;
  height: 4px;
  background: var(--brand-red);
  border-radius: 2px;
  margin: 0 0.1em;
}
.order-detail-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
}
.order-item-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}
.order-item-img {
  width: 70px;
  height: 90px;
  object-fit: contain;
  border-radius: 10px;
  background: #f7f7f7;
}
.order-item-info {
  flex: 1;
}
.order-item-title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}
.order-item-desc {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}
.order-item-qty-price {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
}
.order-item-old-price {
  color: #bbb;
  text-decoration: line-through;
  font-size: 0.95rem;
}
.order-item-price {
  color: var(--brand-red);
  font-weight: 700;
  font-size: 1.1rem;
}
.order-fee-row {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.info-icon {
  background: #eee;
  border-radius: 50%;
  padding: 0 0.3em;
  font-size: 0.9em;
  margin-left: 0.2em;
}
.order-total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.order-total-label {
  color: #222;
}
.order-total-amount {
  color: var(--brand-red);
}
.order-currency-row {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1.2rem;
}
.order-total-khr {
  font-weight: 700;
  color: var(--brand-red);
}
.section-card {
  background: #fafbfc;
  border-radius: 12px;
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.section-title {
  font-weight: 700;
  font-size: 1.08rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: var(--brand-red);
}
.section-icon {
  font-size: 1.1em;
}
.section-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  margin-bottom: 0.4rem;
  gap: 1.5em;
}
.section-label {
  color: #888;
  min-width: 120px;
}
.section-value {
  color: #222;
  text-align: right;
  flex: 1;
  word-break: break-word;
}
@media (min-width: 900px) {
  .track-order-page {
    flex-direction: column;
    max-width: 900px;
    gap: 2.5rem;
    padding: 2rem 0;
    background: none;
    box-shadow: none;
  }
  .map-section {
    margin: 0;
    height: 400px;
  }
  .delivery-status-card {
    margin: 2rem 0 0 0;
  }
  .order-detail-card {
    flex: none;
    padding: 2.5rem 2.5rem 1.5rem 2.5rem;
  }
}
</style>