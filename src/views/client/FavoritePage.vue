<template>
    <div class="favorites-page">
      <h1>My Favourites</h1>
      <div class="favorites-list">
        <ProductCard
          v-for="product in favoritesStore.favoriteProducts"
          :key="product.id"
          :product="product"
          :is-favorite="true"
          @toggle-favorite="favoritesStore.toggleFavorite(product)"
        />
        <div v-if="favoritesStore.favoriteProducts.length === 0" class="empty-msg">
          No favorites yet.
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // import { useFavoritesStore } from '@/stores/favorites'
  import ProductCard from '@/components/product_cards/ProductCard.vue'
  // const favoritesStore = useFavoritesStore()
  </script>
  
  <style scoped>
  .favorites-page {
    padding: 2rem 2rem 0 2rem;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .favorites-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .empty-msg {
    font-size: 1.2rem;
    color: #888;
    margin-top: 2rem;
  }
  </style>