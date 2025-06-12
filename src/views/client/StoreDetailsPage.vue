<template>
  <div class="page-container">
    <Header :title="'AHA GO'" />
    <div class="store-details-page">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <span>Home</span> /
        <span>Cambodia</span> /
        <span>Phnom Penh</span> /
        <span>Chamkar Mon</span> /
        <span>TTP2</span> /
        <span class="active">{{ $route.params.brandName }}</span>
      </nav>

      <!-- Store Name & Address -->
      <h1 class="store-title">{{ brandName }}</h1>
      <div class="store-address">
        Chamkar Mon, Mao Tse Toung Blvd (245), St 163, {{ brandName }}
      </div>

      <!-- Status, Info, Contact -->
      <div class="store-status-row">
        <div class="status-group">
          <span class="open-status">Open now</span>
          <span class="time-status">
            - 12midnight - 3am, 8am - 12midnight (Today)
          </span>
        </div>
        <div class="contact-group">
          <span class="info-icon">ℹ️</span>
          <span class="phone-icon">📞</span>
          <span class="phone-number">+885963024312</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn">Direction</button>
        <button class="action-btn">Share</button>
        <button class="action-btn">Reviews</button>
      </div>

      <!-- Image Gallery -->
      <div class="image-gallery">
        <img class="main-img" :src="cover1" alt="main" />
        <div class="side-imgs">
          <img :src="cover2" alt="side1" />
          <img :src="cover3" alt="side2" />
        </div>
      </div>

      <!-- Tabs -->
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

      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Order Online Section -->
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
              <span
                v-if="search"
                class="clear-search"
                @click="search = ''"
              >
                ✕
              </span>
            </div>
          </div>

          <!-- Delivery/Pickup Toggle -->
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

          <div class="menu-section">
            <h2>Most ordered right now</h2>
            <div class="menu-list">
              <div
                v-for="item in filteredMenu"
                :key="item.id"
                class="menu-item"
              >
                <div class="menu-content">
                  <div class="menu-title">{{ item.title }}</div>
                  <div class="menu-price">from ${{ item.price }}</div>
                  <div class="menu-desc">{{ item.desc }}</div>
                </div>
                <div class="menu-image-container">
                  <img :src="item.image" class="menu-img" />
                  <button class="add-btn" @click="addToCart(item)">+</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Combo Promo Section -->
          <div class="menu-section">
            <h2>Combo Promo</h2>
            <div class="promo-subtitle">40% off selected combos!</div>
            <div class="menu-list">
              <div
                v-for="combo in comboItems"
                :key="combo.id"
                class="menu-item"
              >
                <div class="menu-content">
                  <div class="menu-title">{{ combo.title }}</div>
                  <div class="menu-price">${{ combo.price }}</div>
                  <div class="menu-desc">{{ combo.desc }}</div>
                </div>
                <div class="menu-image-container">
                  <img :src="combo.image" class="menu-img" />
                  <button class="add-btn" @click="addToCart(combo)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Section -->
        <div v-else class="review-section">
          <div class="review-header">
            <span>Review</span>
            <div class="sort-dropdown">
              <select>
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
            </div>
          </div>
          <div class="review-list">
            <div
              v-for="review in reviewData"
              :key="review.id"
              class="review-item"
            >
              <div class="review-user">
                <img :src="review.avatar" class="user-avatar" />
                <div class="user-info">
                  <div class="user-name">{{ review.name }}</div>
                  <div class="user-reviews">{{ review.reviews }} Reviews</div>
                </div>
              </div>
              <div class="review-type">{{ review.type }}</div>
              <div class="review-time">{{ review.time }}</div>
              <div class="review-rating">
                <span
                  v-for="n in 5"
                  :key="n"
                  :class="{ star: true, filled: n <= review.rating }"
                >
                  ★
                </span>
              </div>
              <div class="review-comment">{{ review.comment }}</div>
              <div class="review-actions">
                <button class="action-link">👍 Helpful</button>
                <button class="action-link">💬 Comment</button>
                <button class="action-link">↗️ Share</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Sidebar -->
        <div v-if="activeTab === 'order'" class="cart-sidebar">
          <div class="cart-header">
            <div class="cart-icon">🛒</div>
            <div v-if="cartItems.length === 0" class="empty-cart">
              <h3>Hungry?</h3>
              <p>You haven't added anything to your cart!</p>
            </div>
            <div v-else class="cart-content">
              <div class="cart-items">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="cart-item"
                >
                  <img :src="item.image" class="cart-item-img" />
                  <div class="cart-item-info">
                    <div class="cart-item-title">{{ item.title }}</div>
                    <div class="cart-item-price">${{ item.price }}</div>
                    <div class="cart-item-desc">{{ item.desc }}</div>
                  </div>
                  <div class="cart-item-controls">
                    <div class="quantity-controls">
                      <button @click="decreaseQuantity(item)">-</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="increaseQuantity(item)">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart-footer">
                <div class="cart-total">
                  <span>Total (incl. fees and tax)</span>
                  <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <div class="cart-summary-link" @click="showSummary = !showSummary">
                  See summary
                </div>
                <button class="checkout-btn" @click="goToCheckout">
                  Review payment and address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Header from "@/components/all/header.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import avatar3 from "@/assets/avatars/avatar3.png";
import avatar4 from "@/assets/avatars/avatar3.png";
// Import cover images
import cover1 from "@/assets/store_details/cover1.png";
import cover2 from "@/assets/store_details/cover2.png";
import cover3 from "@/assets/store_details/cover3.png";
// Import menu images
import shrimp1 from "@/assets/store_details/shrimp1.png";
import shrimp2 from "@/assets/store_details/shrimp2.png";
import shrimp3 from "@/assets/store_details/shrimp3.png";
import shrimp4 from "@/assets/store_details/shrimp4.png";
import shrimp5 from "@/assets/store_details/shrimp5.png";

const reviewData = [
  {
    id: 1,
    name: "Garima",
    avatar: avatar1,
    rating: 4,
    time: "1 hour ago",
    type: "Delivery",
    comment:
      "Absolutely delicious! The shrimp is perfectly cooked, bursting with flavor, and seasoned to perfection.",
    reviews: 4,
  },
  {
    id: 2,
    name: "Cheegy",
    avatar: avatar2,
    rating: 4,
    time: "1 hour ago",
    type: "Delivery",
    comment:
      "Whether grilled, buttered, or in a spicy sauce, their shrimp dishes are simply irresistible!",
    reviews: 4,
  },
  {
    id: 3,
    name: "Malina",
    avatar: avatar3,
    rating: 4,
    time: "1 hour ago",
    type: "Delivery",
    comment:
      "If you're a seafood lover, this is a must-try. Highly recommended!",
    reviews: 4,
  },
  {
    id: 4,
    name: "Sky",
    avatar: avatar4,
    rating: 4,
    time: "1 hour ago",
    type: "Delivery",
    comment:
      "Every bite is juicy, tender, and packed with that fresh seafood taste we all love.",
    reviews: 4,
  },
];

const menuData = [
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
    title: "Chicken 3 Pieces",
    rating: 4,
    price: 6.89,
    sold: 3,
    desc: "Crispy and golden brown (For ref only)",
  },
  {
    id: 4,
    image: shrimp4,
    title: "Zinger Burger",
    rating: 4,
    price: 4.35,
    sold: 3,
    desc: "Burger with fried crispy chicken thigh, mayonnaise and iceberg lettuce",
  },
  {
    id: 5,
    image: shrimp5,
    title: "Colonel Chicken Burger",
    rating: 4,
    price: 2.75,
    sold: 3,
    desc: "Tasty colonel chicken burger prepared with lettuce and sweet mayo on a...",
  },
  {
    id: 6,
    image: shrimp1,
    title: "Cheesy potato bowl",
    rating: 4,
    price: 2.99,
    sold: 3,
    desc: "A delicious potato bowl loaded with melted cheese for the ultimate com-...",
  },
];

const comboData = [
  {
    id: 101,
    image: shrimp1,
    title: "Combo 1",
    price: 5.65,
    desc: "Colonel burger with 1 fun fries and a Pepsi",
  },
  {
    id: 102,
    image: shrimp2,
    title: "Combo 2",
    price: 8.49,
    desc: "2pcs Freshly Fried Chicken 1 whipped potato 1 coleslaw 1 Pepsi",
  },
];

export default {
  name: "StoreDetailsPage",
  components: {
    Header,
    AppFooter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const brandName = computed(() => route.params.brandName);
    const cartItems = ref([]);
    const search = ref("");
    const activeTab = ref("order");
    const deliveryMode = ref("delivery");
    const showSummary = ref(false);

    const cartTotal = computed(() => {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const goToCheckout = () => {
      router.push({
        name: "checkout",
        params: {
          brandName: brandName.value,
          cartItems: JSON.stringify(cartItems.value),
        },
      });
    };

    const addToCart = (item) => {
      const existingItem = cartItems.value.find((i) => i.id === item.id);
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
        cartItems.value = cartItems.value.filter((i) => i.id !== item.id);
      }
    };

    const filteredMenu = computed(() => {
      if (!search.value) return menuData;
      return menuData.filter((item) =>
        item.title.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    return {
      brandName,
      activeTab,
      search,
      filteredMenu,
      comboItems: comboData,
      cover1,
      cover2,
      cover3,
      reviewData,
      cartItems,
      cartTotal,
      deliveryMode,
      showSummary,
      goToCheckout,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>

<style scoped>
.pag-container {
  max-width: 100%;
  min-height: 100%;
}
.store-details-page {
  padding: 2rem 6rem;
  margin: 0 auto;
}

.breadcrumb {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.breadcrumb .active {
  color: #111;
  font-weight: bold;
}

.store-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.store-address {
  color: #444;
  margin-bottom: 1rem;
}

.store-status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.open-status {
  color: #b91c1c;
  font-weight: 500;
}

.time-status {
  color: #111;
  font-weight: 400;
}

.contact-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-icon,
.phone-icon {
  font-size: 1.2rem;
  cursor: pointer;
}

.phone-number {
  color: #111;
  font-weight: 400;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.action-btn {
  background: #fff;
  border: 1px solid #b91c1c;
  color: #b91c1c;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.action-btn:hover {
  background: #b91c1c;
  color: #fff;
}

.image-gallery {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.main-img {
  width: 60%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.side-imgs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
}

.side-imgs img {
  width: 100%;
  height: 195px;
  object-fit: cover;
  border-radius: 12px;
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

.menu-section {
  margin-bottom: 2rem;
}

.menu-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.promo-subtitle {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

/* Grid Layout for Menu Items */
.menu-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Menu Item Card - Exact FoodPanda Style */
.menu-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  min-height: 140px;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.1) 0%, rgba(255, 192, 203, 0.15) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.menu-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(185, 28, 28, 0.15);
  border-color: rgba(185, 28, 28, 0.2);
  background: linear-gradient(135deg, #fef7f7 0%, #fdf2f8 100%);
}

.menu-item:hover::before {
  opacity: 1;
}

.menu-item:hover .menu-img {
  transform: scale(1.08);
}

.menu-item:hover .add-btn {
  transform: scale(1.15);
  background: #b91c1c;
  color: #fff;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.35);
}

.menu-item:hover .menu-title {
  color: #b91c1c;
}

.menu-item:hover .menu-price {
  color: #b91c1c;
  transform: scale(1.05);
}

/* Menu Content - Left Side */
.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
  position: relative;
  z-index: 2;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  transition: color 0.3s ease;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.menu-price {
  font-weight: 700;
  color: #111;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.menu-desc {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

/* Menu Image Container - Right Side */
.menu-image-container {
  position: relative;
  flex-shrink: 0;
  z-index: 2;
}

.menu-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-btn {
  background: #f8f8f8;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  color: #b91c1c;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -8px;
  right: -8px;
  z-index: 3;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.add-btn:active {
  transform: scale(0.95);
}

/* Active/Selected State */
.menu-item.selected {
  background: linear-gradient(135deg, #fef7f7 0%, #fdf2f8 100%);
  border-color: #b91c1c;
  box-shadow: 0 6px 20px rgba(185, 28, 28, 0.25);
}

.menu-item.selected .menu-title {
  color: #b91c1c;
}

.menu-item.selected .add-btn {
  background: #b91c1c;
  color: #fff;
}

/* Cart Sidebar */
.cart-sidebar {
  width: 350px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-header {
  text-align: center;
}

.cart-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-cart h3 {
  color: #111;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.empty-cart p {
  color: #666;
  font-size: 0.95rem;
}

.cart-content {
  text-align: left;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-img {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: #111;
}

.cart-item-price {
  color: #111;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.cart-item-desc {
  color: #666;
  font-size: 0.8rem;
  line-height: 1.3;
}

.cart-item-controls {
  display: flex;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 0.25rem;
}

.quantity-controls button {
  background: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #b91c1c;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.quantity-controls span {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.cart-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.cart-total span:first-child {
  color: #666;
  font-size: 0.9rem;
}

.total-amount {
  font-weight: 700;
  color: #111;
  font-size: 1.1rem;
}

.cart-summary-link {
  color: #b91c1c;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-decoration: underline;
}

.checkout-btn {
  width: 100%;
  background: #b91c1c;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.95rem;
}

.checkout-btn:hover {
  background: #991818;
}

/* Review Section Styles */
.review-section {
  flex: 1;
  padding: 1rem 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sort-dropdown select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.review-user {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #111;
}

.user-reviews {
  font-size: 0.9rem;
  color: #666;
}

.review-type {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.review-time {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.review-rating {
  color: #fbbf24;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #fbbf24;
}

.review-comment {
  color: #111;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.review-actions {
  display: flex;
  gap: 1rem;
}

.action-link {
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-link:hover {
  color: #b91c1c;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .order-content {
    max-width: 100%;
  }

  .cart-sidebar {
    width: 100%;
    position: static;
  }

  .menu-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .store-details-page {
    padding: 1rem;
  }

  .image-gallery {
    flex-direction: column;
  }

  .main-img,
  .side-imgs img {
    width: 100%;
    height: 180px;
  }

  .side-imgs {
    flex-direction: row;
    width: 100%;
    gap: 1rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-menu input {
    width: 100%;
  }

  .menu-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .menu-item {
    min-height: auto;
    flex-direction: column;
    text-align: center;
  }

  .menu-content {
    padding-right: 0;
    margin-bottom: 1rem;
  }

  .menu-img {
    width: 100px;
    height: 100px;
  }

  .menu-item:hover {
    transform: translateY(-3px);
  }
}

@media (max-width: 480px) {
  .menu-item {
    padding: 1rem;
  }
  
  .menu-img {
    width: 80px;
    height: 80px;
  }
  
  .add-btn {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }
}
</style>
