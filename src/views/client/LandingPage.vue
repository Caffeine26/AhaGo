<template>
  <div class="container">
    <div class="landing-page">
      <!-- Hero Section -->
      <div class="hero-section">
        <h1>Discover the best Cambodian food in AHA GO</h1>
        <div class="search-bar">
          <div class="location-select">
            <span class="location-icon">📍</span>
            AHA GO
          </div>
          <div class="search-input">
            <span class="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              v-model="searchTerm"
            />
            <button 
              v-if="searchTerm" 
              @click="clearSearch" 
              class="clear-search-btn"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="categories-section">
        <div class="categories-grid">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :title="category.title"
            :image="category.image"
            :selected="selectedCategory === category.title"
            @click="selectCategory(category.title)"
          />
        </div>
      </div>

      <!-- Inspiration Section -->
      <div class="inspiration-section">
        <h2>
          {{
            searchTerm.trim() 
              ? `Search Results for "${searchTerm}"` 
              : selectedCategory 
                ? `${selectedCategory} Stores` 
                : "Popular Stores"
          }}
        </h2>
        <div class="products-grid">
          <ProductCard
            v-for="restaurant in filteredStores"
            :key="restaurant.id"
            :title="restaurant.name"
            :image="restaurant.logo"
            :price="restaurant.rating"
            :category="restaurant.category"
            :delivery-time="restaurant.deliveryTime"
            :delivery-price="restaurant.deliveryPrice"
            :productId="restaurant.id"
            :favorites="favoriteIds"
            @toggle-favorite="handleToggleFavorite"
            @click="goToStoreDetails(restaurant.name)"
          />
        </div>
        <div v-if="searchTerm.trim() && filteredStores.length === 0" class="no-results">
          <p>No restaurants found for "{{ searchTerm }}". Try a different search term.</p>
        </div>
      </div>

      <!-- <div class="brand-highlights-section">
        <h2>Brand Highlights</h2>
        <div class="brand-grid">
          <BrandHighlight
            v-for="brand in brands"
            :key="brand.name"
            :name="brand.name"
            :logo="brand.logo"
            @click="goToStoreDetails(brand.name)"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import CategoryCard from "@/components/product_cards/CategoryCard.vue";
import ProductCard from "@/components/product_cards/ProductCard.vue";
import { useFavoritesStore } from '@/stores/favorites';
import { useRestaurantStore } from "@/stores/restaurantStore";

const router = useRouter();
const favoritesStore = useFavoritesStore();
const restaurantStore = useRestaurantStore();
const { favoriteProducts } = storeToRefs(favoritesStore);
const { restaurants } = storeToRefs(restaurantStore);

const selectedCategory = ref("Food");
const searchTerm = ref("");

const categories = ref([
  { id: 1, title: "Food", image: "/src/assets/client/food.png" },
  { id: 2, title: "Dessert", image: "/src/assets/client/dessert.png" },
  { id: 3, title: "Drink", image: "/src/assets/client/drink.png" },
]);

const favoriteIds = computed(() => favoriteProducts.value.map(p => p.id));

const filteredStores = computed(() => {
  return restaurants.value.map((restaurant) => {
    const name = restaurant.name || 'Unnamed Restaurant';
    const logo = restaurant.user?.img_src || '/placeholder.png';
    const category = restaurant.categories?.map(c => c.name) || [];
    const deliveryTime = restaurant.delivery_time || '20-30 min';
    const deliveryPrice = restaurant.delivery_price ?? 0;
    const rating = restaurant.rating ?? 4.5;

    return {
      id: restaurant.id,
      name,
      logo,
      category,
      deliveryTime,
      deliveryPrice,
      rating,
    };
  }).filter((store) => {
    const categoryMatch = selectedCategory.value
      ? store.category.some(
          name => name.toLowerCase() === selectedCategory.value.toLowerCase()
        )
      : true;

    const searchMatch = searchTerm.value.trim()
      ? store.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        store.category.some(
          name => name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      : true;

    return categoryMatch && searchMatch;
  });
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const goToStoreDetails = (name) => {
  router.push(`/restaurant/${name}`);
};

const handleToggleFavorite = (restaurantId) => {
  const restaurant = filteredStores.value.find(r => r.id === restaurantId);
  if (!restaurant) return;

  const product = {
    id: restaurant.id,
    title: restaurant.name,
    image: restaurant.logo,
    price: restaurant.rating,
    category: restaurant.category,
    deliveryTime: restaurant.deliveryTime,
    deliveryPrice: restaurant.deliveryPrice,
    rating: restaurant.rating,
  };

  favoritesStore.toggleFavorite(product);
};

const clearSearch = () => {
  searchTerm.value = "";
};

onMounted(() => {
  restaurantStore.fetchRestaurants();
});
</script>

<style scoped>
.landing-page {
  padding: 2rem;
}

.hero-section {
  background-image: url("@/assets/client/banner.png");
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  max-width: 1700px;
  margin: 0 auto;
  border-radius: 0 0 16px 16px;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.location-select {
  padding: 1rem;
  background: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid #e5e7eb;
  color: #374151;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
}

.search-input input {
  width: 100%;
  padding: 1rem;
  padding-right: 2.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.location-icon,
.search-icon {
  color: #b91c1c;
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.search-input input::placeholder {
  color: #9ca3af;
}

.clear-search-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  background-color: #f3f4f6;
  color: #6b7280;
}

.categories-section {
  margin-bottom: 3rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.inspiration-section h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #111827;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.no-results p {
  font-size: 1.1rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .categories-grid,
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.brand-highlights-section {
  margin-top: 3rem;
  margin-bottom: 3rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand-highlights-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: left;
  width: 100%;
  max-width: 800px;
}
.brand-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem 2rem;
  justify-items: center;
  width: 100%;
  max-width: 800px;
}
@media (max-width: 1024px) {
  .brand-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 768px) {
  .brand-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 480px) {
  .brand-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
