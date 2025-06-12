<template>
   
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar class="sidebar"/>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Menus</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>
  <div class="container">
    <!-- Filter Section -->
    <div class="filter-section">
      <!-- Category -->
      <div class="filter-group">
        <h3>Category</h3>
        <div v-for="category in categories" :key="category.name" class="checkbox-row">
          <Checkbox
            :checked="category.checked"
            :checkedImage="checkedImagePath"
            :uncheckedImage="uncheckedImagePath"
            @update:checked="toggleCategory(category.name)"
          />
          <label>{{ category.name }}</label>
        </div>
      </div>
      <hr />

      <!-- Meal Time -->
      <div class="filter-group">
        <h3>Meal Time</h3>
        <div v-for="meal in mealTimes" :key="meal.name" class="checkbox-row">
          <Checkbox
            :checked="meal.checked"
            :checkedImage="checkedImagePath"
            :uncheckedImage="uncheckedImagePath"
            @update:checked="toggleMealTime(meal.name)"
          />
          <label>{{ meal.name }}</label>
        </div>
      </div>
      <hr />

      <!-- Price Range -->
      <div class="filter-group">
        <h3>Price Range</h3>
        <div v-for="range in priceRanges" :key="range.label" class="checkbox-row">
          <Checkbox
            :checked="range.checked"
            :checkedImage="checkedImagePath"
            :uncheckedImage="uncheckedImagePath"
            @update:checked="togglePriceRange(range.label)"
          />
          <label>{{ range.label }}</label>
        </div>
      </div>
      <hr />

      <!-- Rating -->
      <div class="filter-group">
        <h3>Rating</h3>
        <div v-for="starCount in [5, 4, 3, 2, 1]" :key="starCount" class="checkbox-row rating-row">
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
            &nbsp;
          </div>
        </div>
      </div>
    </div>

    <!-- Item Grid Section (Split into component) -->
     
    <ItemGrid :items="filteredItems" :starImg="starImg" />
    <ButtonFilter
        :options="sortOptions"
        v-model="selectedSort"
        @change="applySort"
     />
  </div>
  
</div>

</div>

</template>

<script>
import Checkbox from '@/components/CheckBox.vue';
import ItemGrid from '@/components/admin/ItemGrid.vue';
import starImg from '@/assets/icons/star1.png';
import cake from '@/assets/food/cake.png';
import Sidebar from '@/components/admin/Sidebar.vue';
import ButtonFilter from '@/components/ButtonFilter.vue';
export default {
  components: {
    Checkbox,
    ItemGrid,
    Sidebar,
    ButtonFilter
  },
  data() {
    return {
      starImg,
      checkedImagePath: 'path/to/checked.png',
      uncheckedImagePath: 'path/to/unchecked.png',
      categories: [
        { name: 'Chicken', checked: false },
        { name: 'Beef', checked: false },
        { name: 'Noodle', checked: false },
        { name: 'Rice', checked: false },
        { name: 'Seafood', checked: false },
        { name: 'Pizza', checked: false },
        { name: 'Others', checked: false },
      ],
      mealTimes: [
        { name: 'Breakfast', checked: false },
        { name: 'Lunch', checked: false },
        { name: 'Snack', checked: false },
        { name: 'Dinner', checked: false },
      ],
      priceRanges: [
        { label: '$0 - $10', checked: false },
        { label: '$10 - $20', checked: false },
        { label: '$20 - $30', checked: false },
        { label: '$30+', checked: false },
      ],
      
      ratings: [],
      selectedSort: 'az',
      sortOptions:[
        {value:'az',label: 'A-Z'},
        {value:'za',label: 'Z-A'},
        {value:'LowToHight',label: 'Price: Low to High'},
        {value:'HightToLow',label: 'Price: High to Low'},
        {value:'Popular',label: 'Popular'},
      ],
      items: [
        {
          id: 1,
          name: 'Smokey Supreme Pizza',
          description: 'Delicious pizza with smoky flavor.',
          price: '$18.00',
          image: cake,
          category: 'Pizza',
          mealTime: 'Lunch',
          rating: 4,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
        {
          id: 2,
          name: 'Hamburger',
          description: 'Juicy beef burger.',
          price: '$9.00',
          image: cake,
          category: 'Beef',
          mealTime: 'Dinner',
          rating: 5,
        },
      ],
      
    };
  },
  mounted() {
  // Save items to localStorage so MenuItemDetail.vue can access it
  localStorage.setItem('menuItems', JSON.stringify(this.items));
},

  computed: {
    filteredItems() {
      const selectedCategories = this.categories.filter(c => c.checked).map(c => c.name);
      const selectedMeals = this.mealTimes.filter(m => m.checked).map(m => m.name);
      const selectedRatings = this.ratings;

      return this.items.filter(item => {
        const categoryMatch = selectedCategories.length ? selectedCategories.includes(item.category) : true;
        const mealMatch = selectedMeals.length ? selectedMeals.includes(item.mealTime) : true;
        const ratingMatch = selectedRatings.length ? selectedRatings.some(r => item.rating >= r) : true;
        return categoryMatch && mealMatch && ratingMatch;
      });
    },
  },
  methods: {
    toggleCategory(name) {
      const category = this.categories.find(c => c.name === name);
      if (category) category.checked = !category.checked;
    },
    toggleMealTime(name) {
      const meal = this.mealTimes.find(m => m.name === name);
      if (meal) meal.checked = !meal.checked;
    },
    togglePriceRange(label) {
      const range = this.priceRanges.find(r => r.label === label);
      if (range) range.checked = !range.checked;
    },
    toggleRating(starCount) {
      const index = this.ratings.indexOf(starCount);
      if (index === -1) this.ratings.push(starCount);
      else this.ratings.splice(index, 1);
    },
    applySort() {
    console.log("Sort selected:", this.selectedSort);
    // Here you can sort your filteredProducts accordingly
    if (this.selectedSort === 'az') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedSort === 'za') {
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.selectedSort === 'lowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'highToLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
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
