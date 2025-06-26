<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar class="sidebar"/>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Menus</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" v-model="searchTerm" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <div class="container">
        <!-- Filter Section -->
        <div class="filter-section">
          <div class="filter-group">
            <h3>Category</h3>
            <div v-for="category in categories" :key="category.id" class="checkbox-row">
              <Checkbox
                :checked="category.checked"
                :checkedImage="checkedImagePath"
                :uncheckedImage="uncheckedImagePath"
                @update:checked="toggleCategory(category.id)"
              />
              <label>{{ category.name }}</label>
            </div>
          </div>

          <hr />

          <div class="filter-group">
            <h3>Rating</h3>
            <div v-for="starCount in [5,4,3,2,1]" :key="starCount" class="checkbox-row rating-row">
              <Checkbox
                :checked="ratings.includes(starCount)"
                :checkedImage="checkedImagePath"
                :uncheckedImage="uncheckedImagePath"
                @update:checked="toggleRating(starCount)"
              />
              <div class="stars-label">
                <span v-for="star in 5" :key="star" class="star-img">
                  <img
                    :src="starImg"
                    :style="{ opacity: star <= starCount ? 1 : 0.3 }"
                    alt="star"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Item Grid Section -->
        <ItemGrid :items="filteredItems" :starImg="starImg" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Checkbox from '@/components/CheckBox.vue';
import ItemGrid from '@/components/admin/ItemGrid.vue';
import Sidebar from '@/components/admin/Sidebar.vue';
import starImg from '@/assets/icons/star1.png';

export default {
  components: {
    Checkbox,
    ItemGrid,
    Sidebar
  },
  data() {
    return {
      starImg,
      checkedImagePath: 'path/to/checked.png',    // replace with actual path
      uncheckedImagePath: 'path/to/unchecked.png', // replace with actual path
      categories: [
        // You can fetch this from backend if you have a category API
        { id: 1, name: 'Chicken', checked: false },
        { id: 2, name: 'Beef', checked: false },
        { id: 3, name: 'Noodle', checked: false },
        { id: 4, name: 'Rice', checked: false },
        { id: 5, name: 'Seafood', checked: false },
        { id: 6, name: 'Pizza', checked: false },
        { id: 7, name: 'Others', checked: false },
      ],
      ratings: [],
      items: [],
      searchTerm: '',
    };
  },
  computed: {
    filteredItems() {
      const selectedCategoryIds = this.categories.filter(c => c.checked).map(c => c.id);
      const selectedRatings = this.ratings;

      return this.items
        .filter(item => {
          // Filter by category_id if categories selected, else show all
          const categoryMatch = selectedCategoryIds.length ? selectedCategoryIds.includes(item.category_id) : true;

          // Filter by rating if ratings selected, else show all
          const ratingMatch = selectedRatings.length ? selectedRatings.some(r => (item.rating || 0) >= r) : true;

          // Filter by search term in name (case-insensitive)
          const searchMatch = this.searchTerm
            ? item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            : true;

          return categoryMatch && ratingMatch && searchMatch;
        });
    }
  },
  methods: {
    async fetchFoodItems() {
      try {
        const response = await axios.get('http://localhost:8300/api/foodItems');
        this.items = response.data.data;
      } catch (error) {
        console.error('Failed to fetch food items:', error);
      }
    },
    toggleCategory(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      if (category) category.checked = !category.checked;
    },
    toggleRating(starCount) {
      const index = this.ratings.indexOf(starCount);
      if (index === -1) this.ratings.push(starCount);
      else this.ratings.splice(index, 1);
    },
  },
  mounted() {
    this.fetchFoodItems();
  }
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

/* Sections */
.section {
  margin-bottom: 32px;
}

.row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bar-chart-wrapper {
  padding-top: 1px;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.container {
  display: flex;
  gap: 30px;
}

.filter-section {
  width: 250px;
}

.filter-group {
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.checkbox-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.checkbox-row label {
  margin-left: 8px;
}

.rating-row .stars-label {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  font-weight: 500;
  user-select: none;
}

.star-img img {
  width: 16px;
  height: 16px;
}
.star-img {
  display: inline-block;
}
</style>
