<template>
    <div class="receipt-card">
      <!-- Header Section -->
      <div class="header-section">
        <div>
          <p class="date-time">{{ date }}</p>
          <p class="customer-name">{{ customerName }}</p>
          <p class="order-number">{{ orderNumber }}</p>
        </div>
        <div class="status-section">
          <p class="time">{{ time }}</p>
          <span class="status-badge">
            <svg class="checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ status }}
          </span>
          <p class="dining-info">{{ diningType }} <span class="table-number">{{ tableNumber }}</span></p>
        </div>
      </div>
  
      <!-- Items Section -->
      <div class="items-section">
        <p class="items-title">Items</p>
        <div v-for="(item, index) in items" :key="index" class="item-row">
          <div class="item-details">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div>
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">x{{ item.quantity }}</p>
            </div>
          </div>
          <p class="item-price">${{ item.price.toFixed(2) }}</p>
        </div>
      </div>
  
      <!-- Total Section -->
      <div class="total-section">
        <div class="total-row">
          <p class="total-label">Total</p>
          <p class="total-amount">${{ total.toFixed(2) }}</p>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="see-detail-btn">See Detail</button>
        <button class="pay-bills-btn">Pay Bills</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReceiptCard',
    props: {
      date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      customerName: {
        type: String,
        required: true
      },
      orderNumber: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      diningType: {
        type: String,
        required: true
      },
      tableNumber: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true,
        default: () => []
      },
      total: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .receipt-card {
    max-width: 400px;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  
  .date-time {
    color: #4b5563;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
  
  .customer-name {
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .order-number {
    color: #9A0404;
    font-size: 0.875rem;
  }
  
  .status-section {
    text-align: right;
  }
  
  .time {
    color: #4b5563;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background-color: #fdd3d3;
    color: #9A0404;
    font-size: 0.75rem;
    border-radius: 9999px;
  }
  
  .checkmark-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
  
  .dining-info {
    margin-top: 0.15rem;
    font-size: 0.775rem;
  }
  
  .table-number {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background-color: #1f2937;
    color: #ffffff;
    border-radius: 9999px;
  }
    
  .items-section {
    margin-bottom: 1rem;
  }
  
  .items-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  
  .item-details {
    display: flex;
    align-items: center;
  }
  
  .item-image {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    margin-right: 0.75rem;
  }
  
  .item-name {
    font-weight: 500;
  }
  
  .item-quantity {
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .item-price {
    font-size: 1rem;
    font-weight: 500;
  }
  
  .total-section {
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .total-label {
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .total-amount {
    font-size: 1.125rem;
    font-weight: 600;
    color: #9A0404;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .see-detail-btn {
    padding: 0.5rem 1rem;
    background-color: #e5e7eb;
    color: #374151;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
  }
  
  .see-detail-btn:hover {
    background-color: #d1d5db;
  }
  
  .pay-bills-btn {
    padding: 0.5rem 1rem;
    background-color: #9A0404;
    color: #ffffff;
    border-radius: 0.5rem;
    transition: background-color 0.3s;
  }
  
  .pay-bills-btn:hover {
    background-color: #9A0404;
  }
  </style>