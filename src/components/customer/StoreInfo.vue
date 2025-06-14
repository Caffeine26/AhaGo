<template>
  <div class="store-info">
    <h1 class="store-title">{{ brandName }}</h1>
    <div class="store-address">{{ address }}</div>
    <div class="store-status-row">
      <div class="status-group">
        <span class="open-status">{{ openStatus }}</span>
        <span class="time-status">{{ timeStatus }}</span>
      </div>
      <div class="contact-group">
        <span class="info-icon">ℹ️</span>
        <span class="phone-icon">📞</span>
        <span class="phone-number">{{ phoneNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreInfo",
  props: {
    brandName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openStatus: {
      type: String,
      required: true,
    },
    timeStatus: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.store-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.store-address {
  color: #444;
  margin-bottom: 1rem;
}

.store-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.open-status {
  color: #b91c1c;
  font-weight: 500;
}

.time-status {
  color: #111;
  font-weight: 400;
}

.contact-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-icon,
.phone-icon {
  font-size: 1.2rem;
  cursor: pointer;
}

.phone-number {
  color: #111;
  font-weight: 400;
}
</style>
