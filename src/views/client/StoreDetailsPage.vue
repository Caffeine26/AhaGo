<template>
  <div class="page-container">
    <div class="store-details-page">
      <Breadcrumb :crumbs="breadcrumbCrumbs" />

      <StoreInfo
        v-if="restaurant"
        :brandName="restaurant.name"
        :address="restaurant.user?.address"
        :openStatus="restaurant.open_status"
        :timeStatus="restaurant.working_hours"
        :phoneNumber="restaurant.user?.phone_number"
      />

      <ImageGallery :cover1="cover1" :cover2="cover2" :cover3="cover3" />

      <div class="tabs">
        <span
          :class="{ active: activeTab === 'order' }"
          @click="activeTab = 'order'"
        >
          Order Online
        </span>
        <span
          :class="{ active: activeTab === 'review' }"
          @click="activeTab = 'review'"
        >
          Review
        </span>
      </div>
      <hr />

      <div class="main-content">
        <div v-if="activeTab === 'order'" class="order-content">
          <div class="order-header">
            <span>Order Online</span>
            <span class="live-track">⏱️ Live track order | 30m</span>
            <div class="search-menu">
              <input
                type="text"
                placeholder="Search within menu"
                v-model="search"
              />
              <span v-if="search" class="clear-search" @click="search = ''">
                ✕
              </span>
            </div>
          </div>

          <div class="delivery-toggle">
            <button
              :class="{ active: deliveryMode === 'delivery' }"
              @click="deliveryMode = 'delivery'"
            >
              Delivery
            </button>
            <button
              :class="{ active: deliveryMode === 'pickup' }"
              @click="deliveryMode = 'pickup'"
            >
              Pick-up
            </button>
          </div>

          <MenuList
            title="Most ordered right now"
            :items="filteredMenu"
            @add="addToCart"
          />

          <MenuList
            title="Combo Promo"
            subtitle="40% off selected combos!"
            :items="comboItems"
            @add="addToCart"
          />
        </div>

        <ReviewList v-else :reviews="reviewData" />

        <CartSidebar
          v-if="activeTab === 'order'"
          :cartItems="cartItems"
          :cartTotal="cartTotal"
          :showSummary="showSummary"
          @increase="increaseQuantity"
          @decrease="decreaseQuantity"
          @toggle-summary="showSummary = !showSummary"
          @checkout="goToCheckout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRestaurantStore } from "@/stores/restaurantStore";

import Breadcrumb from "@/components/customer/Breadcrumb.vue";
import StoreInfo from "@/components/customer/StoreInfo.vue";
import ImageGallery from "@/components/customer/ImageGallery.vue";
import MenuList from "@/components/customer/MenuList.vue";
import ReviewList from "@/components/customer/ReviewList.vue";
import CartSidebar from "@/components/customer/CartSidebar.vue";

// Sample assets
import cover1 from "@/assets/store_details/cover1.png";
import cover2 from "@/assets/store_details/cover2.png";
import cover3 from "@/assets/store_details/cover3.png";
import shrimp1 from "@/assets/store_details/shrimp1.png";
import shrimp2 from "@/assets/store_details/shrimp2.png";
import shrimp3 from "@/assets/store_details/shrimp3.png";
import shrimp4 from "@/assets/store_details/shrimp4.png";
import shrimp5 from "@/assets/store_details/shrimp5.png";

import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import avatar3 from "@/assets/avatars/avatar3.png";
import avatar4 from "@/assets/avatars/avatar3.png";

export default {
  name: "StoreDetailsPage",
  components: {
    Breadcrumb,
    StoreInfo,
    ImageGallery,
    MenuList,
    ReviewList,
    CartSidebar,
  },
  setup() {
  const route = useRoute();
  const router = useRouter();
  const brandName = computed(() => route.params.brandName);
  const restaurantStore = useRestaurantStore();

  const restaurant = ref(null);
  const menuData = ref([]); // Define it here so it can be updated
  const comboData = ref([]); // Optional: Replace later if backend provides
  const search = ref("");
  const cartItems = ref([]);
  const activeTab = ref("order");
  const deliveryMode = ref("delivery");
  const showSummary = ref(false);

  const breadcrumbCrumbs = computed(() => [
    { text: "Home", to: "/" },
    { text: brandName.value, to: `/restaurant/${brandName.value}` },
  ]);

  const loadStore = async () => {
    await restaurantStore.fetchRestaurants();

    restaurant.value = restaurantStore.restaurants.find(
      (r) => r.name.toLowerCase() === brandName.value.toLowerCase()
    );

    if (restaurant.value) {
      await restaurantStore.fetchFoodItemsByRestaurant(restaurant.value.id);
      menuData.value = restaurantStore.foodItems;
    } else {
      console.warn("Restaurant not found");
    }
  };

  onMounted(loadStore);

  const filteredMenu = computed(() => {
    if (!search.value) return menuData.value;
    return menuData.value.filter((item) =>
      item.name?.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  const addToCart = (item) => {
    const existing = cartItems.value.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      cartItems.value.push({ ...item, quantity: 1 });
    }
  };

  const increaseQuantity = (item) => item.quantity++;
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) item.quantity--;
    else cartItems.value = cartItems.value.filter((i) => i.id !== item.id);
  };

  const goToCheckout = () => {
    router.push({
      name: "checkout",
      params: {
        brandName: brandName.value,
        cartItems: JSON.stringify(cartItems.value),
      },
    });
  };

  const reviewData = ref([
    { id: 1, name: "Garima", avatar: avatar1, rating: 4, time: "1 hour ago", type: "Delivery", comment: "Absolutely delicious..." },
    { id: 2, name: "Cheegy", avatar: avatar2, rating: 4, time: "1 hour ago", type: "Delivery", comment: "Whether grilled..." },
    { id: 3, name: "Malina", avatar: avatar3, rating: 4, time: "1 hour ago", type: "Delivery", comment: "If you're a seafood lover..." },
    { id: 4, name: "Sky", avatar: avatar4, rating: 4, time: "1 hour ago", type: "Delivery", comment: "Every bite is juicy..." },
  ]);

  return {
    brandName,
    breadcrumbCrumbs,
    cover1,
    cover2,
    cover3,
    restaurant,
    activeTab,
    search,
    filteredMenu,
    comboItems: comboData,
    reviewData,
    cartItems,
    cartTotal,
    deliveryMode,
    showSummary,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    goToCheckout,
  };
}
};
</script>

<style scoped>
.store-details-page {
  padding: 2rem 6rem;
  margin: 0 auto;
}
.tabs {
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.tabs span {
  cursor: pointer;
  color: #888;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid transparent;
}

.tabs .active {
  color: #b91c1c;
  border-bottom: 2px solid #b91c1c;
}

/* Main Content Layout */
.main-content {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.order-content {
  flex: 1;
  max-width: 70%;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.live-track {
  color: #888;
  font-size: 0.95rem;
}

.search-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.search-menu input {
  padding: 0.4rem 2rem 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 250px;
}

.clear-search {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  color: #b91c1c;
  font-size: 1.1rem;
}

/* Delivery Toggle */
.delivery-toggle {
  display: flex;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 1.5rem;
  width: fit-content;
}

.delivery-toggle button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.delivery-toggle button.active {
  background: white;
  color: #b91c1c;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
