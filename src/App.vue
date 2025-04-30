<template>
<<<<<<< HEAD
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
=======
  
  
  <div>
      <BarChart 
      :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" 
      :dataValues="[10, 20, 30, 40, 50, 60, 70]" />

    <!-- <AppFooter></AppFooter> -->
     
    <!-- <ProfileUser
    name="kittiecattie"
    img-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s"
    user-id=1
    ></ProfileUser> -->

    <!-- <CategoryCard></CategoryCard> -->

    <!-- <OrderCard></OrderCard> -->

     <!-- <StatusAction :status-id="3"></StatusAction> -->

    <!-- <GeneralButton
    img-url="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xOSAxMi45OThoLTZ2NmgtMnYtNkg1di0yaDZ2LTZoMnY2aDZ6Ii8+PC9zdmc+"
    title-color="white"
    btn-color="#292929"
    title="add category"
    ></GeneralButton> -->
  </div>
  
</template>

<script>
// import AppFooter from './components/AppFooter.vue';
// import ProductCard from './components/ProductCard.vue';
// import CategoryCard from './components/CategoryCard.vue';
// import OrderCard from './components/OrderCard.vue';
// import StatusAction from './components/StatusAction.vue';
// import GeneralButton from './components/GeneralButton.vue';
// import ProfileUser from './components/ProfileUser.vue';
import BarChart from './components/BarChart.vue';


export default {
  name: 'App',
  components: {
    // AppFooter,
    // CategoryCard,
    // OrderCard,
    // StatusAction,
    // GeneralButton,
    // ProfileUser,
    BarChart,

  }
}
>>>>>>> caae844 (init)
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
</style>
