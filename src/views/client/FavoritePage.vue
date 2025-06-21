<template>
    <div class="favorites-page">
      <h1>My Favourites</h1>
      <div class="favorites-list">
        <ProductCard
          v-if="favoriteProducts.length > 0"
          v-for="product in favoriteProducts"
          :key="product.id"
          :title="product.title"
          :image="product.image"
          :price="product.price"
          :category="product.category"
          :deliveryTime="product.deliveryTime"
          :deliveryPrice="product.deliveryPrice"
          :rating="product.rating"
          :productId="product.id"
          :is-favorite="true"
          @toggle-favorite="toggleFavorite(product)"
        />
        <div v-if="favoriteProducts.length === 0" class="empty-favorites">
          <h2>No Favourites Saved</h2>
          <p>
            You'll see all your favorites here, to make ordering even faster. Just
            look for the <span class="heart">&hearts;</span>
          </p>
          <button @click="findFavorites">Let's find some favourites</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useFavoritesStore } from '@/stores/favorites'
  import ProductCard from '@/components/product_cards/ProductCard.vue'
  
  const router = useRouter()
  const favoritesStore = useFavoritesStore()
  const favoriteProducts = computed(() => favoritesStore.favoriteProducts)
  
  const findFavorites = () => {
    router.push('/')
  }
  
  const toggleFavorite = (product) => {
    favoritesStore.toggleFavorite(product)
  }
  </script>
  
  <style scoped>
  .favorites-page {
    padding: 2rem;
    background-color: #f9fafb;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  .favorites-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  .empty-favorites {
    text-align: center;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-column: 1 / -1;
  }
  
  .empty-favorites h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .empty-favorites p {
    color: #6b7280;
    margin-bottom: 2rem;
    max-width: 400px;
  }
  
  .empty-favorites .heart {
    color: #9a0404;
  }
  
  .empty-favorites button {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .empty-favorites button:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
  </style>