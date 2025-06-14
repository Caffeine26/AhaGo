<template>
  <div class="store-info">
    <img :src="cover" class="store-img" alt="store" />
    <div class="store-details">
      <p>{{ address }}</p>
      <p class="contact">{{ contact }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cover: String,
  address: String,
  contact: String
})
</script>

<style scoped>
.store-info {
  display: flex;
  gap: 1rem;
  padding: 1rem 0 0.5rem 0;
  background: white;
  border-radius: 12px;
  margin-bottom: 0.5rem;
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
.contact {
  margin-top: 0.5rem !important;
}
</style>
