<template>
  <div class="category-card">
    <img :src="image" :alt="title" class="category-image">
    <h3 class="category-title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.category-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: scale(1.02);
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}
</style>