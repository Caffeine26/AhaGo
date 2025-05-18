<template>
  <div>
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
      <div class="store-address">Chamkar Mon, Mao Tse Toung Blvd (245), St 163, {{ brandName }}</div>

      <!-- Status, Info, Contact -->
      <div class="store-status-row">
        <div class="status-group">
          <span class="open-status">Open now</span>
          <span class="time-status">- 12midnight - 3am, 8am - 12midnight (Today)</span>
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
        <span :class="{active: activeTab==='order'}" @click="activeTab='order'">Order Online</span>
        <span :class="{active: activeTab==='review'}" @click="activeTab='review'">Review</span>
      </div>
      <hr />

      <!-- Order Online Section -->
      <div v-if="activeTab==='order'">
        <div class="order-header">
          <span>Order Online</span>
          <span class="live-track">⏱️ Live track order | 30m</span>
          <div class="search-menu">
            <input type="text" placeholder="Search within menu" v-model="search" />
            <span v-if="search" class="clear-search" @click="search=''">✕</span>
          </div>
        </div>
        <div class="menu-section">
          <h2>Sweet Shrimp</h2>
          <div class="menu-category">CLASSIC SWEET SHRIMP</div>
          <div class="menu-list">
            <div v-for="item in filteredMenu" :key="item.id" class="menu-item">
              <img :src="item.image" class="menu-img" />
              <div class="menu-info">
                <div class="menu-title">{{ item.title }}</div>
                <div class="menu-rating">
                  <span v-for="n in 5" :key="n" :class="{'star': true, 'filled': n <= item.rating}">★</span>
                </div>
                <div class="menu-price">${{ item.price }}</div>
                <div class="menu-sold">{{ item.sold }} sold</div>
                <div class="menu-desc">{{ item.desc }}</div>
              </div>
              <button class="add-btn">+</button>
            </div>
          </div>
        </div>
      </div>
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
          <div v-for="review in reviewData" :key="review.id" class="review-item">
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
              <span v-for="n in 5" :key="n" :class="{'star': true, 'filled': n <= review.rating}">★</span>
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
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Header from '@/components/all/header.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import avatar1 from '@/assets/avatars/avatar1.png'
import avatar2 from '@/assets/avatars/avatar2.png'
import avatar3 from '@/assets/avatars/avatar3.png'
import avatar4 from '@/assets/avatars/avatar3.png'
// Import cover images
import cover1 from '@/assets/store_details/cover1.png'
import cover2 from '@/assets/store_details/cover2.png'
import cover3 from '@/assets/store_details/cover3.png'
// Import menu images
import shrimp1 from '@/assets/store_details/shrimp1.png'
import shrimp2 from '@/assets/store_details/shrimp2.png'
import shrimp3 from '@/assets/store_details/shrimp3.png'
import shrimp4 from '@/assets/store_details/shrimp4.png'
import shrimp5 from '@/assets/store_details/shrimp5.png'

const reviewData = [
  {
    id: 1,
    name: 'Garima',
    avatar: avatar1,
    rating: 4,
    time: '1 hour ago',
    type: 'Delivery',
    comment: 'Absolutely delicious! The shrimp is perfectly cooked, bursting with flavor, and seasoned to perfection.',
    reviews: 4
  },
  {
    id: 2,
    name: 'Cheegy',
    avatar: avatar2,
    rating: 4,
    time: '1 hour ago',
    type: 'Delivery',
    comment: 'Whether grilled, buttered, or in a spicy sauce, their shrimp dishes are simply irresistible!',
    reviews: 4
  },
  {
    id: 3,
    name: 'Malina',
    avatar: avatar3,
    rating: 4,
    time: '1 hour ago',
    type: 'Delivery',
    comment: "If you're a seafood lover, this is a must-try. Highly recommended!",
    reviews: 4
  },
  {
    id: 4,
    name: 'Sky',
    avatar: avatar4,
    rating: 4,
    time: '1 hour ago',
    type: 'Delivery',
    comment: 'Every bite is juicy, tender, and packed with that fresh seafood taste we all love.',
    reviews: 4
  }
]

const menuData = [
  {
    id: 1,
    image: shrimp1,
    title: 'Coconut Shrimp',
    rating: 4,
    price: 15,
    sold: 3,
    desc: 'Fresh coconut shrimp with chili and creamy sauce'
  },
  {
    id: 2,
    image: shrimp2,
    title: 'Coconut Shrimp',
    rating: 3,
    price: 15,
    sold: 3,
    desc: 'Fresh coconut shrimp with chili and creamy sauce'
  },
  {
    id: 3,
    image: shrimp3,
    title: 'Coconut Shrimp',
    rating: 4,
    price: 15,
    sold: 3,
    desc: 'Fresh coconut shrimp with chili and creamy sauce'
  },
  {
    id: 4,
    image: shrimp4,
    title: 'Coconut Shrimp',
    rating: 4,
    price: 15,
    sold: 3,
    desc: 'Fresh coconut shrimp with chili and creamy sauce'
  },
  {
    id: 5,
    image: shrimp5,
    title: 'Coconut Shrimp',
    rating: 4,
    price: 15,
    sold: 3,
    desc: 'Fresh coconut shrimp with chili and creamy sauce'
  }
]

export default {
  name: 'StoreDetailsPage',
  components: {
    Header,
    AppFooter
  },
  setup() {
    const route = useRoute();
    const activeTab = ref('order')
    const search = ref('')
    const filteredMenu = computed(() => {
      if (!search.value) return menuData
      return menuData.filter(item => item.title.toLowerCase().includes(search.value.toLowerCase()))
    })
    return {
      brandName: route.params.brandName,
      activeTab,
      search,
      filteredMenu,
      cover1,
      cover2,
      cover3,
      reviewData
    }
  }
}
</script>

<style scoped>
.store-details-page {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: 60vh;
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
.info-icon, .phone-icon {
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
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
}
.side-imgs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
}
.side-imgs img {
  width: 100%;
  height: 105px;
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
.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0 1rem 0;
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
}
.clear-search {
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  color: #b91c1c;
  font-size: 1.1rem;
}
.menu-section {
  margin-top: 1.5rem;
}
.menu-category {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.menu-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1rem;
  gap: 1.5rem;
}
.menu-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
}
.menu-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.menu-title {
  font-size: 1.1rem;
  font-weight: 600;
}
.menu-rating {
  color: #fbbf24;
  font-size: 1.1rem;
}
.star {
  color: #ddd;
}
.star.filled {
  color: #fbbf24;
}
.menu-price {
  font-weight: 700;
  color: #b91c1c;
}
.menu-sold {
  color: #888;
  font-size: 0.95rem;
}
.menu-desc {
  color: #444;
  font-size: 0.98rem;
}
.add-btn {
  background: #f3f3f3;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.5rem;
  color: #b91c1c;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #b91c1c;
  color: #fff;
}
.review-section {
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
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
@media (max-width: 900px) {
  .store-details-page {
    padding: 1rem;
    max-width: 100%;
  }
  .image-gallery {
    flex-direction: column;
  }
  .main-img, .side-imgs img {
    width: 100%;
    height: 180px;
  }
  .side-imgs {
    flex-direction: row;
    width: 100%;
    gap: 1rem;
  }
}
</style>