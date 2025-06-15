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
            v-for="store in filteredStores"
            :key="store.id"
            :title="store.name"
            :image="store.logo"
            :price="store.rating"
            :category="store.category"
            :delivery-time="store.deliveryTime"
            :delivery-price="store.deliveryPrice"
            @click="goToStoreDetails(store.name)"
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
      stores: [
        {
          id: 1,
          name: "KFC",
          logo: "/src/assets/client/kfc1.png",
          rating: 4.5,
          category: "Food",
          deliveryTime: "20-35 min",
          deliveryPrice: 0.75,
        },
        {
          id: 2,
          name: "The Pizza Company",
          logo: "/src/assets/client/pizza_company.png",
          rating: 4.2,
          category: "Food",
          deliveryTime: "25-40 min",
          deliveryPrice: 0.85,
        },
        {
          id: 3,
          name: "Cafe Amazon",
          logo: "/src/assets/client/amazon.png",
          rating: 4.4,
          category: "Drink",
          deliveryTime: "15-25 min",
          deliveryPrice: 0.5,
        },
        {
          id: 4,
          name: "Krispy Kreme Cambodia",
          logo: "/src/assets/client/krispy_kreme.png",
          rating: 4.6,
          category: "Food",
          deliveryTime: "30-45 min",
          deliveryPrice: 1.0,
        },
        {
          id: 5,
          name: "Carl's Jr Cambodia",
          logo: "/src/assets/client/carlsjr.png",
          rating: 4.3,
          category: "Food",
          deliveryTime: "20-30 min",
          deliveryPrice: 0.6,
        },
        {
          id: 6,
          name: "Starbucks",
          logo: "/src/assets/client/starbucks.png",
          rating: 4.7,
          category: "Drink",
          deliveryTime: "15-20 min",
          deliveryPrice: 0.45,
        },
        {
          id: 7,
          name: "KOI",
          logo: "/src/assets/client/koi.png",
          rating: 4.5,
          category: "Drink",
          deliveryTime: "20-30 min",
          deliveryPrice: 0.55,
        },
        {
          id: 8,
          name: "Pong Cambodia",
          logo: "/src/assets/client/pong.png",
          rating: 4.4,
          category: "Food",
          deliveryTime: "25-35 min",
          deliveryPrice: 0.8,
        },
        {
          id: 9,
          name: "Brown",
          logo: "/src/assets/client/brown.png",
          rating: 4.6,
          category: "Drink",
          deliveryTime: "15-25 min",
          deliveryPrice: 0.5,
        },
        {
          id: 10,
          name: "Tube Coffee",
          logo: "/src/assets/client/tube.png",
          rating: 4.3,
          category: "Drink",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.4,
        },
        {
          id: 17,
          name: "Coffee Corner",
          logo: "/src/assets/client/coffee_corner.png",
          rating: 4.2,
          category: "Drink",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.4,
        },
        {
          id: 11,
          name: "Burger King",
          logo: "/src/assets/client/burgerking.png",
          rating: 4.5,
          category: "Food",
          deliveryTime: "20-35 min",
          deliveryPrice: 0.75,
        },
        {
          id: 12,
          name: "Dairy Queen",
          logo: "/src/assets/client/dairyqueen.png",
          rating: 4.3,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.4,
        },
        {
          id: 13,
          name: "Mixue",
          logo: "/src/assets/client/mixue.png",
          rating: 4.3,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.6,
        },
        {
          id: 14,
          name: "21 Bakery",
          logo: "/src/assets/client/21bakery.png",
          rating: 4,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 1,
        },
        {
          id: 15,
          name: "Swensens",
          logo: "/src/assets/client/swensens.png",
          rating: 4.1,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 1.5,
        },
        {
          id: 16,
          name: "Cats Cake",
          logo: "/src/assets/client/catscake.png",
          rating: 4.5,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.6,
        },
        {
          id: 17,
          name: "Bing Chun",
          logo: "/src/assets/client/bingchun.png",
          rating: 4.2,
          category: "Dessert",
          deliveryTime: "10-20 min",
          deliveryPrice: 0.4,
        },
      ],
      brands: [
        { name: "KFC", logo: "/src/assets/client/kfc.png" },
        { name: "Mhub Khmer", logo: "/src/assets/client/kfc.png" },
        { name: "Cafe Amazon", logo: "/src/assets/client/amazon.png" },
        { name: "The Pizza Company", logo: "/src/assets/client/pizza.png" },
        {
          name: "Gerbie's Salad & Sandwich",
          logo: "/src/assets/client/gerbies.png",
        },
        { name: "Starbucks", logo: "/src/assets/client/starbucks.png" },
        { name: "KOI", logo: "/src/assets/client/koi.png" },
        { name: "Mexicano", logo: "/src/assets/client/mexicano.png" },
        { name: "Brown", logo: "/src/assets/client/brown.png" },
        { name: "Tube Coffee", logo: "/src/assets/client/tube.png" },
        { name: "Lotteria", logo: "/src/assets/client/lotteria.png" },
      ],
    };
  },
  computed: {
    filteredStores() {
      return this.stores.filter(
        (store) => store.category === this.selectedCategory
      );
    },
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    goToStoreDetails(brandName) {
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
