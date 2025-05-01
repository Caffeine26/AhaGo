<template>
  
  
  <div>
      <!-- <BarChart 
      :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" 
      :dataValues="[10, 20, 30, 40, 50, 60, 70]" /> -->

    <!-- <AppFooter></AppFooter> -->

    <ProfileUser
    name="kittiecattie"
    img-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s"
    user-id=1
    ></ProfileUser>
    <ProfileUser
    name="kittiecattie"
    img-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s"
    user-id=2
    ></ProfileUser>
    <ProfileUser
    name="kittiecattie"
    img-url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK5CqiQQDLVEVd_mEtfKpqF8MTZj0SqiEEWg&s"
    user-id=3
    ></ProfileUser>
    <ProfileUser
    name="kittiecattie"
    img-url=""
    user-id=0
    ></ProfileUser>

    <!-- <CategoryCard></CategoryCard> -->
     <!-- <ProductCard></ProductCard> -->

    <!-- <OrderCard></OrderCard> -->

     <!-- <StatusAction :status-id="3"></StatusAction> -->

    <!-- <GeneralButton
    img-url="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmNmY2IiBkPSJNMTkgMTIuOTk4aC02djZoLTJ2LTZINXYtMmg2di02aDJ2Nmg2eiIvPjwvc3ZnPg=="
    title-color="white"
    btn-color="#292929"
    title="add category"
    ></GeneralButton>

    <GeneralButton
    img-url="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmNmY2IiBkPSJNMTkgMTIuOTk4aC02djZoLTJ2LTZINXYtMmg2di02aDJ2Nmg2eiIvPjwvc3ZnPg=="
    title-color="white"
    btn-color="#C82E2E"
    title="add item"
    ></GeneralButton>

    <GeneralButton
    img-url="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmNmY2IiBkPSJNMyAyMXYtNC4yNUwxNi4yIDMuNTc1cS4zLS4yNzUuNjYzLS40MjV0Ljc2Mi0uMTV0Ljc3NS4xNXQuNjUuNDVMMjAuNDI1IDVxLjMuMjc1LjQzOC42NVQyMSA2LjRxMCAuNC0uMTM3Ljc2M3QtLjQzOC42NjJMNy4yNSAyMXpNMTcuNiA3LjhMMTkgNi40TDE3LjYgNWwtMS40IDEuNHoiLz48L3N2Zz4="
    title-color="white"
    btn-color="red"
    title="Edit"
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
// import ProductCard from './components/ProductCard.vue';
import ProfileUser from './components/ProfileUser.vue';
// import BarChart from './components/BarChart.vue';


export default {
  name: 'App',
  components: {
    // AppFooter,
    // CategoryCard,
    // OrderCard,
    // StatusAction,
    // GeneralButton,
    ProfileUser,
    // BarChart,
    // ProductCard,

  }
}
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
