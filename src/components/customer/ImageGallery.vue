<template>
  <div class="image-gallery">
    <img class="main-img" :src="cover1" alt="main store image" />
  </div>
</template>

<script setup>
defineProps({
  cover1: {
    type: String,
    required: true,
  },
  // The props below are no longer used but are kept to avoid breaking changes on the parent component.
  // Consider removing them if the parent component is also updated.
  cover2: {
    type: String,
    required: false,
  },
  cover3: {
    type: String,
    required: false,
  },
});
</script>

<style scoped>
.image-gallery {
  width: 100%;
  margin-bottom: 1.5rem;
}

.main-img {
  width: 100%;
  height: 400px; /* Or adjust as needed */
  object-fit: cover;
  border-radius: 16px; /* A bit more rounded for a modern look */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* Softer shadow for depth */
}
</style>
