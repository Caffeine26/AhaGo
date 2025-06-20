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
            />
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
            selectedCategory ? `${selectedCategory} Stores` : "Popular Stores"
          }}
        </h2>
        <div class="products-grid">
          <ProductCard
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.id"
            :title="restaurant.title"
            :image="restaurant.image"
            :price="restaurant.price"
            :category="restaurant.category"
            :delivery-time="restaurant.deliveryTime"
            :delivery-price="restaurant.deliveryPrice"
            :rating="restaurant.rating"
            :product-id="restaurant.id"
            @click="goToRestaurantDetails(restaurant.title)"

          />
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

<script>
import { useRestaurantStore } from "@/stores/restaurantStore";
import CategoryCard from "@/components/product_cards/CategoryCard.vue";
import ProductCard from "@/components/product_cards/ProductCard.vue";
import BrandHighlight from "@/components/BrandHighlight.vue";

export default {
  name: "LandingPage",
  components: {
    CategoryCard,
    ProductCard,
    BrandHighlight,
  },
  data() {
    return {
      selectedCategory: "Food",
      categories: [
        { id: 1, title: "Food", image: "/src/assets/client/food.png" },
        { id: 2, title: "Dessert", image: "/src/assets/client/dessert.png" },
        { id: 3, title: "Drink", image: "/src/assets/client/drink.png" },
      ],
    };
  },
  computed: {
    restaurantStore() {
      return useRestaurantStore();
    },
    filteredRestaurants() {
    return this.restaurantStore.restaurants.map((restaurant) => ({
      id: restaurant.id,
      title: restaurant.name || 'Unnamed Restaurant',
      image: restaurant.user?.img_src || '/placeholder.png',
      price: restaurant.rating || 0,
      category: restaurant.category || 'Uncategorized',
      deliveryTime: restaurant.deliveryTime || '20-30 min',
      deliveryPrice: restaurant.deliveryPrice || 0.0,
      rating: restaurant.rating || 4.5,
    }));
  }
  },
  created() {
    this.restaurantStore.fetchRestaurants();
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    goToRestaurantDetails(brandName) {
      this.$router.push({ name: "StoreDetails", params: { brandName } });
    },
  },
};
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
}

.search-input input {
  width: 100%;
  padding: 1rem;
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
