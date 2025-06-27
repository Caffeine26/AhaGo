<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <div class="main-container">
        <!-- Rating Summary Panel -->
        <div class="rating-summary-panel">
          <div class="rating-summary">
            <h2>Rating</h2>
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
              v-for="(review, index) in paginatedReviews"
              :key="index"
            >
              <img
                :src="getImageUrl(review.image)"
                alt="Dish Image"
                class="dish-image"
              />
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
                <span class="review-date">{{ formatDate(review.created_at) }}</span>
                <p>{{ review.description }}</p>
                <span class="review-author">{{ review.author }}</span>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <span>Showing {{ currentPage }} out of {{ totalPages }}</span>
            <button @click="prevPage" :disabled="currentPage === 1">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import star from '@/assets/icons/star1.png';
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
  components: { Sidebar },
  data() {
    return {
      starImage: star,
      overallRating: 4.7,
      reviewCount: 0,
      ratingDetails: {
        'Food Quality': 96,
        Service: 89,
        Cleanliness: 85,
        Price: 75,
        Ambiance: 80,
      },
      selectedRating: 'All Rating',
      selectedCategory: 'All Category',
      selectedMenu: 'All Menu',
      allReviews: [],
      currentPage: 1,
      reviewsPerPage: 5,
    };
  },
  computed: {
    filteredReviews() {
      let reviews = [...this.allReviews];

      if (this.selectedRating !== 'All Rating') {
        const rate = parseInt(this.selectedRating);
        reviews = reviews.filter((r) => r.rating === rate);
      }

      if (this.selectedCategory !== 'All Category') {
        reviews = reviews.filter((r) => r.title.toLowerCase().includes(this.selectedCategory.toLowerCase()));
      }

      return reviews;
    },
    totalPages() {
      return Math.ceil(this.filteredReviews.length / this.reviewsPerPage) || 1;
    },
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.reviewsPerPage;
      return this.filteredReviews.slice(start, start + this.reviewsPerPage);
    },
  },
  methods: {
    fetchReviews() {
      axios.get('http://localhost:8300/api/foodItem_reviews')
        .then((res) => {
          this.allReviews = res.data.map((r) => ({
            ...r,
            title: `Food Item #${r.food_item_id}`,
            description: r.comment,
            author: `Customer #${r.customer_id}`,
            image: 'default.jpg'
          }));
          this.reviewCount = this.allReviews.length;
        })
        .catch((err) => console.error('Error fetching reviews:', err));
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    getImageUrl(img) {
      return `http://localhost:8300/storage/${img || 'default.jpg'}`;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  watch: {
    selectedRating() { this.currentPage = 1; },
    selectedCategory() { this.currentPage = 1; },
    selectedMenu() { this.currentPage = 1; },
  },
  mounted() {
    this.fetchReviews();
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
