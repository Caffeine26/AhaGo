<template>
  <RouterView></RouterView>
   <!-- <RegisterInputBox></RegisterInputBox> -->
</template>

<script>
import PaginationComponent from './components/PaginationComponent.vue';
import SearchBar from './components/SearchBar.vue';
import ProductDetailImage from './components/ProductDetailImage.vue';
import ReviewSection from './components/ReviewSection.vue';
import CheckBox from './components/CheckBox.vue';
import Dashboard from './components/Dashboard.vue';
import StockGraph from './components/StockGraph.vue';
import LandingPage from './views/owner/OwnerLandingPage.vue';
import HomePage from './views/owner/HomePage.vue';
import OrdersPage from './views/owner/OrdersPage.vue';
import MenuPage from './views/owner/MenuPage.vue';
import MenuEditPage from './views/owner/MenuEditPage.vue';
import MenuCreatePage from './views/owner/MenuCreatePage.vue';
import ProfilePage from './views/owner/OwnerProfilePage.vue';
import MenuNewCategory from './views/owner/MenuNewCategory.vue';
import { RouterView } from 'vue-router';
import OrderDetails from './components/OrderDetails.vue';
import TransactionPage from './views/owner/TransactionPage.vue';
import Invoice from './components/Invoice.vue';
import InvoicePage from './views/owner/InvoicePage.vue';
import CategoryBannerV2 from './components/CategoryBannerV2.vue';

import edit from '@/assets/owner/svg/edit-white.svg'
import RegisterInputBox from './components/RegisterInputBox.vue';
export default {
  components: {
    PaginationComponent,
    SearchBar,
    ProductDetailImage,
    ReviewSection,
    CheckBox,
    Dashboard,
    StockGraph,
    LandingPage,
    HomePage,
    OrdersPage,
    MenuPage,
    MenuEditPage,
    MenuCreatePage,
    MenuNewCategory,
    ProfilePage,
    OrderDetails,
    TransactionPage,
    InvoicePage,
    CategoryBannerV2,
    RegisterInputBox
  },
  data() {
    return {
      edit: edit,
      currentPage: 1,
      searchKeyword: '',
      categs: [
                'Profile',
                'Trackings'
            ],
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
</style>
