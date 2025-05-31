<template>
  <div>
    <Header :title="'AHA GO'" />
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
            <input type="text" placeholder="Search for restaurant, cuisine or a dish" />
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
        <h2>{{ selectedCategory ? `${selectedCategory} Products` : 'Inspiration for your first order' }}</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :title="product.title"
            :image="product.image"
            :price="product.price"
            :category="product.category"
            :delivery-time="product.deliveryTime"
            :delivery-price="product.deliveryPrice"
          />
        </div>
      </div>

      <div class="brand-highlights-section">
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
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Header from '@/components/all/header.vue'
import AppFooter from '@/components/AppFooter.vue'
import CategoryCard from '@/components/product_cards/CategoryCard.vue'
import ProductCard from '@/components/product_cards/ProductCard.vue'
import BrandHighlight from '@/components/BrandHighlight.vue'

export default {
  name: 'LandingPage',
  components: {
    Header,
    AppFooter,
    CategoryCard,
    ProductCard,
    BrandHighlight
  },
  data() {
    return {
      selectedCategory: 'Food',
      categories: [
        { id: 1, title: 'Food', image: '/src/assets/client/food.png' },
        { id: 2, title: 'Dessert', image: '/src/assets/client/dessert.png' },
        { id: 3, title: 'Drink', image: '/src/assets/client/drink.png' }
      ],
      products: [
        // Food (12)
        { id: 1, title: 'Yellow Cab', image: '/src/assets/client/yellow_cab.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '30-45 min', deliveryPrice: 1.05 },
        { id: 2, title: 'KFC', image: '/src/assets/client/kfc1.png', price: 5, rating: 4.2, category: 'Food', deliveryTime: '20-35 min', deliveryPrice: 0.75 },
        { id: 3, title: 'Yellow Cab', image: '/src/assets/client/steamed-eggs.png', price: 5, rating: 4.4, category: 'Food', deliveryTime: '25-40 min', deliveryPrice: 1.10 },
        { id: 4, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.4, category: 'Food', deliveryTime: '30-45 min', deliveryPrice: 0.95 },
        { id: 5, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '20-30 min', deliveryPrice: 0.50 },
        { id: 6, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '25-35 min', deliveryPrice: 0.80 },
        { id: 7, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '30-40 min', deliveryPrice: 1.00 },
        { id: 8, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '20-35 min', deliveryPrice: 0.70 },
        { id: 9, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '35-50 min', deliveryPrice: 1.20 },
        { id: 10, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '25-40 min', deliveryPrice: 0.85 },
        { id: 11, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '30-45 min', deliveryPrice: 1.05 },
        { id: 12, title: 'Yellow Cab', image: '/src/assets/client/fish-amok.png', price: 5, rating: 4.8, category: 'Food', deliveryTime: '20-30 min', deliveryPrice: 0.60 },

        // Dessert (12)
        { id: 13, title: 'Nom Ahkor', image: '/src/assets/client/dessert.png', price: 3, rating: 4.5, category: 'Dessert', deliveryTime: '20-30 min', deliveryPrice: 0.50 },
        { id: 14, title: 'Mango Sticky Rice', image: '/src/assets/client/dessert.png', price: 4, rating: 4.7, category: 'Dessert', deliveryTime: '25-35 min', deliveryPrice: 0.60 },
        { id: 15, title: 'Pumpkin Custard', image: '/src/assets/client/dessert.png', price: 3.5, rating: 4.6, category: 'Dessert', deliveryTime: '20-30 min', deliveryPrice: 0.55 },
        { id: 16, title: 'Banana in Coconut Milk', image: '/src/assets/client/dessert.png', price: 3, rating: 4.4, category: 'Dessert', deliveryTime: '30-40 min', deliveryPrice: 0.70 },
        { id: 17, title: 'Sweet Rice Balls', image: '/src/assets/client/dessert.png', price: 3, rating: 4.5, category: 'Dessert', deliveryTime: '20-35 min', deliveryPrice: 0.50 },
        { id: 18, title: 'Coconut Jelly', image: '/src/assets/client/dessert.png', price: 3, rating: 4.3, category: 'Dessert', deliveryTime: '25-35 min', deliveryPrice: 0.65 },
        { id: 19, title: 'Taro Cake', image: '/src/assets/client/dessert.png', price: 3, rating: 4.2, category: 'Dessert', deliveryTime: '30-40 min', deliveryPrice: 0.70 },
        { id: 20, title: 'Palm Sugar Cake', image: '/src/assets/client/dessert.png', price: 3, rating: 4.6, category: 'Dessert', deliveryTime: '20-30 min', deliveryPrice: 0.50 },
        { id: 21, title: 'Layer Cake', image: '/src/assets/client/dessert.png', price: 3, rating: 4.7, category: 'Dessert', deliveryTime: '25-35 min', deliveryPrice: 0.60 },
        { id: 22, title: 'Sesame Balls', image: '/src/assets/client/dessert.png', price: 3, rating: 4.5, category: 'Dessert', deliveryTime: '20-30 min', deliveryPrice: 0.50 },
        { id: 23, title: 'Coconut Pudding', image: '/src/assets/client/dessert.png', price: 3, rating: 4.8, category: 'Dessert', deliveryTime: '25-35 min', deliveryPrice: 0.70 },
        { id: 24, title: 'Banana Cake', image: '/src/assets/client/dessert.png', price: 3, rating: 4.4, category: 'Dessert', deliveryTime: '30-40 min', deliveryPrice: 0.80 },

        // Drink (12)
        { id: 25, title: 'Mango Smoothie', image: '/src/assets/client/drink.png', price: 2.5, rating: 4.6, category: 'Drink', deliveryTime: '15-25 min', deliveryPrice: 0.40 },
        { id: 26, title: 'Iced Coffee', image: '/src/assets/client/drink.png', price: 2, rating: 4.7, category: 'Drink', deliveryTime: '10-20 min', deliveryPrice: 0.30 },
        { id: 27, title: 'Sugarcane Juice', image: '/src/assets/client/drink.png', price: 2, rating: 4.5, category: 'Drink', deliveryTime: '15-25 min', deliveryPrice: 0.35 },
        { id: 28, title: 'Coconut Water', image: '/src/assets/client/drink.png', price: 2, rating: 4.8, category: 'Drink', deliveryTime: '10-15 min', deliveryPrice: 0.25 },
        { id: 29, title: 'Lime Soda', image: '/src/assets/client/drink.png', price: 2, rating: 4.4, category: 'Drink', deliveryTime: '15-20 min', deliveryPrice: 0.30 },
        { id: 30, title: 'Milk Tea', image: '/src/assets/client/drink.png', price: 2, rating: 4.6, category: 'Drink', deliveryTime: '10-20 min', deliveryPrice: 0.35 },
        { id: 31, title: 'Lemon Tea', image: '/src/assets/client/drink.png', price: 2, rating: 4.5, category: 'Drink', deliveryTime: '15-20 min', deliveryPrice: 0.30 },
        { id: 32, title: 'Passion Fruit Juice', image: '/src/assets/client/drink.png', price: 2, rating: 4.7, category: 'Drink', deliveryTime: '15-25 min', deliveryPrice: 0.40 },
        { id: 33, title: 'Avocado Shake', image: '/src/assets/client/drink.png', price: 2.5, rating: 4.8, category: 'Drink', deliveryTime: '20-30 min', deliveryPrice: 0.50 },
        { id: 34, title: 'Pineapple Juice', image: '/src/assets/client/drink.png', price: 2, rating: 4.4, category: 'Drink', deliveryTime: '10-20 min', deliveryPrice: 0.30 },
        { id: 35, title: 'Orange Juice', image: '/src/assets/client/drink.png', price: 2, rating: 4.6, category: 'Drink', deliveryTime: '15-20 min', deliveryPrice: 0.35 },
        { id: 36, title: 'Watermelon Juice', image: '/src/assets/client/drink.png', price: 2, rating: 4.5, category: 'Drink', deliveryTime: '15-25 min', deliveryPrice: 0.40 },
      ],
      brands: [
        { name: 'KFC', logo: '/src/assets/client/kfc.png' },
        { name: 'Mhub Khmer', logo: '/src/assets/client/kfc.png' },
        // { name: 'Cafe Amazon', logo: '/src/assets/client/amazon.png' },
        // { name: 'The Pizza Company', logo: '/src/assets/client/pizza.png' },
        // { name: "Gerbie's Salad & Sandwich", logo: '/src/assets/client/gerbies.png' },
        // { name: 'Starbucks', logo: '/src/assets/client/starbucks.png' },
        // { name: 'KOI', logo: '/src/assets/client/koi.png' },
        // { name: 'Mexicano', logo: '/src/assets/client/mexicano.png' },
        // { name: 'Brown', logo: '/src/assets/client/brown.png' },
        // { name: 'Tube Coffee', logo: '/src/assets/client/tube.png' },
        // { name: 'Lotteria', logo: '/src/assets/client/lotteria.png' }
      ]
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === this.selectedCategory);
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    goToStoreDetails(brandName) {
      this.$router.push({ name: 'StoreDetails', params: { brandName } });
    }
  }
}
</script>

<style scoped>
.landing-page {
  padding: 2rem;
}

.hero-section {
  background-image: url('@/assets/client/banner.png');
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
  border-right: 1px solid #E5E7EB;
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

.location-icon, .search-icon {
  color: #B91C1C;
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.search-input input::placeholder {
  color: #9CA3AF;
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