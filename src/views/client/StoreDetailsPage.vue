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

      <ImageGallery :cover1="dynamicCover1" :cover2="dynamicCover2" :cover3="dynamicCover3" />

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
           <!-- 
          <MenuList
            title="Most ordered right now"
            :items="filteredMenu.slice(0, 4)"
            @add="addToCart"
          /> -->

          <MenuList
            v-for="category in filteredCategories"
            :key="category.id"
            :title="category.name"
            :items="category.food_items"
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

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRestaurantStore } from "@/stores/restaurantStore";

// Components
import Breadcrumb from "@/components/customer/Breadcrumb.vue";
import StoreInfo from "@/components/customer/StoreInfo.vue";
import ImageGallery from "@/components/customer/ImageGallery.vue";
import MenuList from "@/components/customer/MenuList.vue";
import ReviewList from "@/components/customer/ReviewList.vue";
import CartSidebar from "@/components/customer/CartSidebar.vue";
import DineInSection from "@/components/customer/DineInSection.vue";
import Map from "@/components/delivery/map.vue";
import { useReviewStore } from "@/stores/reviewStore";
// Avatars
import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import avatar3 from "@/assets/avatars/avatar3.png";
import avatar4 from "@/assets/avatars/avatar3.png";

// Fallback Images
import cover1 from "@/assets/store_details/cover1.png";
import cover2 from "@/assets/store_details/cover2.png";
import cover3 from "@/assets/store_details/cover3.png";

export default {
  name: "StoreDetailsPage",
  components: {
    Breadcrumb,
    StoreInfo,
    ImageGallery,
    MenuList,
    ReviewList,
    CartSidebar,
    DineInSection,
    Map,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const restaurantStore = useRestaurantStore();
    const reviewStore = useReviewStore();
    // Data
    const brandName = computed(() => route.params.brandName);
    const restaurant = ref(null);
    const menuData = ref([]);
    const search = ref("");
    const cartItems = ref([]);
    const activeTab = ref("order");
    const deliveryMode = ref("delivery");
    const showSummary = ref(false);

    // Breadcrumb
    const breadcrumbCrumbs = computed(() => [
      { text: "Home", to: "/" },
      { text: brandName.value, to: `/restaurant/${brandName.value}` },
    ]);

    // Computed
    const filteredCategories = computed(() => {
      if (!search.value) return restaurantStore.categories;
      return restaurantStore.categories
        .map((category) => ({
          ...category,
          food_items: category.food_items.filter((item) =>
            item.name?.toLowerCase().includes(search.value.toLowerCase())
          ),
        }))
        .filter((category) => category.food_items.length > 0);
    });

    const filteredMenu = computed(() => {
      if (!search.value) return Array.isArray(menuData.value) ? menuData.value : [];
      if (!Array.isArray(menuData.value)) return [];
      return menuData.value.filter((item) =>
        item.name?.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const foodImages = computed(() => {
      if (!Array.isArray(menuData.value)) return [];
      const itemsWithImages = menuData.value.filter((item) => item.img_url);
      return itemsWithImages.slice(0, 3).map((item) => item.img_url);
    });

    const dynamicCover1 = computed(() => foodImages.value[0] || cover1);
    const dynamicCover2 = computed(() => foodImages.value[1] || cover2);
    const dynamicCover3 = computed(() => foodImages.value[2] || cover3);

    const cartTotal = computed(() =>
      cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    // Methods
    const addToCart = (item) => {
      const existing = cartItems.value.find((i) => i.id === item.id);
      if (existing) existing.quantity++;
      else cartItems.value.push({ ...item, quantity: 1 });
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

    const handleReservation = (reservation) => {
      console.log("Reservation details:", reservation);
      // Add API logic here if needed
    };

    // Fetch restaurant data
    const loadStore = async () => {
      await restaurantStore.fetchRestaurants();
      restaurant.value = restaurantStore.restaurants.find(
        (r) => r.name.toLowerCase() === brandName.value.toLowerCase()
      );

      if (restaurant.value) {
        await restaurantStore.fetchCategoriesByRestaurant(restaurant.value.id);
        await restaurantStore.fetchFoodItemsByRestaurant(restaurant.value.id);
        menuData.value = restaurantStore.foodItems;
      } else {
        console.warn("Restaurant not found");
      }
    };

    onMounted(loadStore);

    // Static description (replaceable with backend content later)
    const storeDescription = ref(
      `It serves breakfast, lunch and dinner, and also has private dining rooms for special occasions. "Malis" or Khmer, who make his parents shine. Recent guests found this hidden gem among the restaurants serving premium local tastes can find this beautiful location in a tranquil setting in which you can taste local dishes with traditional recipes, such as Samlor Mchou Kroeung and Kuy Teav Phnom Penh. There are also signature rice from nearby Takeo Province and Kep crab with Kampot pepper.`
    );

    // Return to template
    return {
      brandName,
      breadcrumbCrumbs,
      restaurant,
      activeTab,
      search,
      deliveryMode,
      showSummary,
      cartItems,
      cartTotal,
      filteredCategories,
      filteredMenu,
      dynamicCover1,
      dynamicCover2,
      dynamicCover3,
      reviewStore,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      goToCheckout,
      handleReservation,
      storeDescription,
    };
  },
};
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