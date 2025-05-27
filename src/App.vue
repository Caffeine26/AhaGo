<!-- <template>
  <div style="padding: 40px;">
    <h1>AhaGo Testing Components</h1>

    <SearchBar @search="handleSearch" />

    <PaginationComponent
      :totalPages="4"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    />

    <p style="margin-top: 20px;">You are on page {{ currentPage }}</p>
    <p>Search keyword: <strong>{{ searchKeyword }}</strong></p>
    <ProductDetailImage />
    <ReviewSection />
    <CheckBox />
    <Dashboard />
    <StockGraph />

    
  </div>
</template>

<script>
import PaginationComponent from './components/PaginationComponent.vue';
import SearchBar from './components/SearchBar.vue';
import ProductDetailImage from './components/ProductDetailImage.vue';
import ReviewSection from './components/ReviewSection.vue';
import CheckBox from './components/CheckBox.vue';
import Dashboard from './components/Dashboard.vue';
import StockGraph from './components/StockGraph.vue';
export default {
  components: {
    PaginationComponent,
    SearchBar,
    ProductDetailImage,
    ReviewSection,
    CheckBox,
    Dashboard,
    StockGraph
  },
  data() {
    return {
      currentPage: 1,
      searchKeyword: ''
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    handleSearch(text) {
      this.searchKeyword = text;
      // Add filtering logic here if needed
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
<template>
  <router-view></router-view>
</template>
<script></script>
