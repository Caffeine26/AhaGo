<template>
  <div class="page-container">
    <div class="store-details-page">
      <Breadcrumb :crumbs="breadcrumbCrumbs" />

      <StoreInfo
        :brandName="brandName"
        :address="storeAddress"
        :openStatus="openStatus"
        :timeStatus="timeStatus"
        :phoneNumber="phoneNumber"
      />

      <ActionButtons
        @direction="onDirection"
        @share="onShare"
        @reviews="onReviews"
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
        <span
          :class="{ active: activeTab === 'dine-in' }"
          @click="activeTab = 'dine-in'"
        >
          Dine-In
        </span>
      </div>
      <hr />

      <div class="main-content">
        <div v-if="activeTab === 'order'" class="order-content">
          <div class="order-header">
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
          <MenuList
            title="Most ordered right now"
            :items="filteredMenu.slice(0, 4)"
            @add="addToCart"
          />

          <MenuList
            title="Combo Promo"
            subtitle="40% off selected combos!"
            :items="comboItems"
            @add="addToCart"
          />
        </div>

        <ReviewList v-else-if="activeTab === 'review'" :reviews="reviewStore.reviews" />

        <div v-else-if="activeTab === 'dine-in'" class="dine-in-content">
          <div class="dinein-left">
            <div class="dinein-description">
              <h3>Description</h3>
              <p>{{ storeDescription }}</p>
            </div>
            <MenuList
              title="Most ordered right now"
              :items="filteredMenu.slice(0, 4)"
              @add="addToCart"
            />
          </div>
          <div class="dinein-right">
            <div class="dinein-reservation">
              <DineInSection @make-reservation="handleReservation" />
            </div>
            <div class="dinein-map">
              <Map :useGeolocation="false" style="width:100%;height:220px;" />
            </div>
            <div class="dinein-reviews">
              <ReviewList :reviews="reviewStore.reviews.slice(0,2)" />
            </div>
          </div>
        </div>

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

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReviewStore } from "@/stores/reviewStore";

import Breadcrumb from "@/components/customer/Breadcrumb.vue";
import StoreInfo from "@/components/customer/StoreInfo.vue";
import ActionButtons from "@/components/customer/ActionButtons.vue";
import ImageGallery from "@/components/customer/ImageGallery.vue";
import MenuList from "@/components/customer/MenuList.vue";
import ReviewList from "@/components/customer/ReviewList.vue";
import CartSidebar from "@/components/customer/CartSidebar.vue";
import DineInSection from "@/components/customer/DineInSection.vue";
import Map from "@/components/delivery/map.vue";

// Store images
import cover1 from "@/assets/store_details/cover1.png";
import cover2 from "@/assets/store_details/cover2.png";
import cover3 from "@/assets/store_details/cover3.png";

// Menu images
import shrimp1 from "@/assets/store_details/shrimp1.png";
import shrimp2 from "@/assets/store_details/shrimp2.png";
import shrimp3 from "@/assets/store_details/shrimp3.png";
import shrimp4 from "@/assets/store_details/shrimp4.png";
import shrimp5 from "@/assets/store_details/shrimp5.png";

const route = useRoute();
const router = useRouter();
const reviewStore = useReviewStore();

const brandName = computed(() => route.params.brandName || "AHA GO");
const storeAddress = ref(
  "35c St 472, Phnom Penh, Cambodia 35c St 472, TTP2, Chamkar Mon"
);
const openStatus = ref("Open");
const timeStatus = ref("10:00 AM - 9:00 PM");
const phoneNumber = ref("+855 1234 5678");

const breadcrumbCrumbs = ref([
  { text: "Home", to: "/" },
  { text: brandName.value, to: `/store/${brandName.value}` },
]);

const activeTab = ref(route.query.tab || "order");
const search = ref("");
const deliveryMode = ref("delivery");
const showSummary = ref(false);
const cartItems = ref([]);

const menuData = ref([
  {
    id: 1,
    image: shrimp1,
    title: "Chicken 2 Pieces",
    rating: 4,
    price: 4.59,
    sold: 3,
    desc: "Crispy and golden brown (For ref only)",
  },
  {
    id: 2,
    image: shrimp2,
    title: "Nuggets (6pc)",
    rating: 3,
    price: 2.8,
    sold: 3,
    desc: "6 Pcs",
  },
  {
    id: 3,
    image: shrimp3,
    title: "Fries (L)",
    rating: 5,
    price: 1.5,
    sold: 5,
    desc: "Large",
  },
  {
    id: 4,
    image: shrimp4,
    title: "Burger",
    rating: 4,
    price: 3.5,
    sold: 2,
    desc: "Beef burger with cheese",
  },
]);

const comboItems = ref([
  {
    id: 5,
    image: shrimp5,
    title: "Family Combo",
    rating: 5,
    price: 15.99,
    sold: 10,
    desc: "Full meal for the family",
  },
]);

const storeDescription = ref(
  "Indulge in our succulent shrimp, sourced from pristine waters and cooked to perfection. Whether grilled, buttered, or in a spicy sauce, our shrimp dishes are simply irresistible!"
);

const filteredMenu = computed(() =>
  menuData.value.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  )
);

const cartTotal = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

const addToCart = (item) => {
  const existingItem = cartItems.value.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...item, quantity: 1 });
  }
};

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cartItems.value = cartItems.value.filter(
      (cartItem) => cartItem.id !== item.id
    );
  }
};

const goToCheckout = () => {
  router.push({ 
    name: 'checkout', 
    params: { 
      brandName: brandName.value,
      cartItems: JSON.stringify(cartItems.value) 
    } 
  });
};

const onDirection = () => console.log("Direction clicked");
const onShare = () => console.log("Share clicked");
const onReviews = () => (activeTab.value = "review");
const handleReservation = (details) => console.log("Reservation:", details);

</script>

<style scoped>
/* General Styles */
.page-container {
  padding: 1.5rem 2rem;
  background-color: #f9fafb;
}

.store-details-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* Tabs Styling */
.tabs {
  margin-top: 1.5rem;
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;
  color: #6b7280;
}

.tabs span {
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease-in-out;
}

.tabs span.active {
  color: #b91c1c;
  border-bottom-color: #b91c1c;
  font-weight: 600;
}

hr {
  border: none;
  height: 1px;
  background-color: #e5e7eb;
  margin-top: -1px; /* Overlap with tabs underline */
}

.main-content {
  display: flex;
  margin-top: 1.5rem;
  gap: 2rem;
}

.order-content,
.dine-in-content {
  flex-grow: 1;
}

/* Order Content */
.order-header {
  margin-bottom: 2rem;
}

.search-menu {
  position: relative;
  max-width: 400px;
}

.search-menu input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem; /* Space for clear button */
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.clear-search {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9ca3af;
  font-weight: bold;
}

/* Dine-In Content */
.dine-in-content {
  display: flex;
  gap: 2rem;
}
.dinein-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.dinein-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dinein-description h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.dinein-description p {
  color: #4b5563;
  line-height: 1.6;
}

.dinein-reservation,
.dinein-map,
.dinein-reviews {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
