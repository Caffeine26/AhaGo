<template>
    <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>
  <div class="main-container">
    <!-- Rating Summary Panel -->
    <div class="rating-summary-panel">
      <div class="rating-summary">
        <h2>Rating</h2>

        <!-- Overall Rating and Stars -->
        <div class="overall-rating">
          <span class="rating-value">{{ overallRating }}</span>
          <span class="stars">
            <img
              v-for="star in 5"
              :key="star"
              :src="starImage"
              alt="star"
              class="star-icon"
              :class="{ active: star <= Math.round(overallRating) }"
            />
          </span>
          <span class="review-count">{{ reviewCount }} reviews</span>
        </div>

        <!-- Individual Rating Details -->
        <div class="rating-details">
          <div
            class="rating-item"
            v-for="(value, key) in ratingDetails"
            :key="key"
          >
            <span>{{ key }}</span>
            <div class="rating-bar">
              <div class="bar" :style="{ width: value + '%' }"></div>
            </div>
            <span>{{ value }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Panel -->
    <div class="feedback-panel">
      <!-- Filter Section -->
      <div class="filter-section">
        <select v-model="selectedRating">
          <option>All Rating</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
        </select>
        <select v-model="selectedCategory">
          <option>All Category</option>
          <option>Pasta</option>
          <option>Pizza</option>
        </select>
        <select v-model="selectedMenu">
          <option>All Menu</option>
          <option>Menu 1</option>
          <option>Menu 2</option>
        </select>
      </div>

      <!-- Review List -->
      <div class="review-list">
        <div
          class="review-item"
          v-for="(review, index) in reviews"
          :key="index"
        >
          <img :src="review.image" alt="Dish Image" class="dish-image" />

          <div class="review-content">
            <h3>{{ review.title }}</h3>
            <div class="review-rating">
              <span class="stars">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="fas fa-star"
                  :class="{ active: star <= review.rating }"
                ></i>
              </span>
              <span>{{ review.rating }}/5</span>
            </div>
            <span class="review-date">{{ review.date }}</span>
            <p>{{ review.description }}</p>
            <span class="review-author">{{ review.author }}</span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <span>Showing {{ currentPage }} out of {{ totalPages }}</span>
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
  </div>
  </div>

</template>

<script>

import star from '@/assets/icons/star1.png';
import cake from '@/assets/food/cake.png';
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
    components:{
        Sidebar
    },
  data() {
    return {
      // Overall rating summary
      starImage: star,
      overallRating: 4.7,
      reviewCount: 3078,

      // Rating breakdown
      ratingDetails: {
        "Food Quality": 96,
        Service: 89,
        Cleanliness: 85,
        Price: 75,
        Ambiance: 80,
      },

      // Filter state
      selectedRating: "All Rating",
      selectedCategory: "All Category",
      selectedMenu: "All Menu",

      // Reviews (demo data)
      reviews: [
        {
          title: "Classic Italian Penne",
          rating: 5,
          date: "Oct 20 2024",
          description:
            "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. This flavor was well-balanced and satisfying. I will order it again!",
          author: "Sonita Yakorn",
          image: cake,
        },
        {
          title: "Classic Italian Penne",
          rating: 5,
          date: "Oct 20 2024",
          description:
            "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. This flavor was well-balanced and satisfying. I will order it again!",
          author: "Sonita Yakorn",
          image: cake,
        },
        {
          title: "Classic Italian Penne",
          rating: 5,
          date: "Oct 20 2024",
          description:
            "A delightful dish with perfectly cooked penne pasta and a rich, savory tomato sauce. This flavor was well-balanced and satisfying. I will order it again!",
          author: "Sonita Yakorn",
          image: cake,
        },
      ],

      // Pagination
      currentPage: 1,
      totalPages: 4,
    };
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 15%;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
  padding: 24px;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
}
.main-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Rating Summary Panel */
.rating-summary-panel {
  padding: 30px;
  border-radius: 10px;
  background-color: #ecd1ca78;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.rating-summary h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
}

.overall-rating {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  color: #ffd700;
}

.fa-star {
  font-size: 1.2rem;
  margin-right: 2px;
  color: #ccc;
}

.fa-star.active {
  color: #ffd700;
}

.star-icon {
  width: 20px;
  height: 20px;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.star-icon.active {
  opacity: 1;
}

.review-count {
  font-size: 0.9rem;
  color: #666;
}

.rating-details {
  margin-top: 20px;
}

.rating-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 0.95rem;
  color: #333;
}

.rating-bar {
  background: #e0e0e0;
  border-radius: 20px;
  flex: 1;
  height: 10px;
  margin: 0 15px;
  overflow: hidden;
}

.bar {
  background: #4caf50;
  height: 100%;
  border-radius: 20px;
}

/* Feedback Panel */
.feedback-panel {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* Filter Dropdown */
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-section select {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #ffffff;
  font-size: 0.95rem;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

/* Review List */
.review-list {
  margin-bottom: 30px;
}

.review-item {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.dish-image {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.review-content {
  flex: 1;
}

.review-content h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
}

.review-date {
  font-size: 0.85rem;
  color: #999;
  display: block;
  margin-bottom: 8px;
}

.review-content p {
  margin: 5px 0 10px;
  font-size: 0.95rem;
  color: #555;
}

.review-author {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination span {
  font-size: 0.95rem;
  color: #666;
}

.pagination button {
  padding: 8px 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #43a047;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
