<template>
  <div class="test-container">
    <!-- Graphs Section -->
    <h2 class="test-title">Analytics</h2>
    <div class="graphs-grid">
      <LineGraph
        title="Supply Overview"
        value="1678"
        :data="[50, 150, 180, 320, 180, 350, 400, 320]"
        :months="['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug']"
      />
      <LineGraph
        title="Total Revenue"
        value="$ 186,899"
        :data="[5000, 6000, 5500, 10000, 7000, 12000, 8000, 10000]"
        :months="['Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct']"
      />
    </div>

    <!-- Existing Categories Section -->
    <h2 class="test-title">Categories</h2>
    <div class="category-grid">
      <CategoryCard
        v-for="category in categories"
        :key="category.title"
        :title="category.title"
        :image="category.image"
      />
    </div>

    <h2 class="test-title">Products</h2>
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.title"
        :title="product.title"
        :image="product.image"
        :price="product.price"
        :rating="product.rating"
      />
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/product_cards/CategoryCard.vue'
import ProductCard from '@/components/product_cards/ProductCard.vue'
import LineGraph from '@/components/charts/LineGraph.vue'

export default {
  name: 'TestCards',
  components: {
    CategoryCard,
    ProductCard,
    LineGraph
  },
  data() {
    return {
      categories: [
        {
          title: 'Food',
          image: require('@/assets/category/category1.png')
        },
        {
          title: 'Dessert',
          image: require('@/assets/category/category2.png')
        },
        {
          title: 'Drink',
          image: require('@/assets/category/category3.png')
        }
      ],
      products: [
        {
          title: 'Nom Ahkor',
          image: require('@/assets/products/product1.png'),
          price: 5,
          rating: 4.5
        },
        {
          title: 'Nom Ahkor Special',
          image: require('@/assets/products/product2.png'),
          price: 5,
          rating: 4.5
        },
        {
          title: 'Nom Ahkor Special',
          image: require('@/assets/products/product3.png'),
          price: 5,
          rating: 4.5
        }
      ]
    }
  }
}
</script>

<style scoped>
.test-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.test-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.graphs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
</style>