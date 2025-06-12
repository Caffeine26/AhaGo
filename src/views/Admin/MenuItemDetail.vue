<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">MenuItemDetail</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>
  <div class="container">
    <!-- Left Column: Product Card with Inline Editing -->
    <div class="card">
      <img
        :src="form.image || placeholderImage"
        alt="Product Image"
        class="product-image"
      />

      <!-- Product Info showing name, price, and total stats with icons -->
      <div class="product-info">
        <div class="name-price-row">
          <!-- Inline Editable Name -->
          <h3 class="product-name">
            <template v-if="isEditing">
              <input v-model="form.name" class="inline-input" placeholder="Enter the product title" />
            </template>
            <template v-else>
              {{ form.name || 'No Name' }}
            </template>
          </h3>

          <!-- Inline Editable Price -->
          <p class="product-price">
            <template v-if="isEditing">
              $<input v-model.number="form.price" type="number" step="0.01" class="inline-input price-input" />
            </template>
            <template v-else>
              {{ form.price || '0.00' }}
            </template>
          </p>
        </div>

        <div class="product-stats">
          <div class="stat-item" title="Total Orders">
            <img :src="icons.cart" alt="Total Orders" class="icon" />
            <p>Orders</p>
            <span class="stat-number">{{ form.totalOrder || 0 }}</span>
          </div>

          <div class="stat-item" title="Total Rating">
            <img :src="icons.star" alt="Total Rating" class="icon" />
            <p>Rating</p>
            <span class="stat-number">{{ form.totalRating || 0 }}</span>
          </div>

          <div class="stat-item" title="Total Favorite">
            <img :src="icons.heart" alt="Total Favorite" class="icon" />
            <p>Favorites</p>
            <span class="stat-number">{{ form.totalFavorite || 0 }}</span>
          </div>
        </div>

        <!-- Inline Editable Description -->
        <div class="product-description" v-if="form.description !== '' || isEditing">
          <h2>Description</h2>
          <template v-if="isEditing">
            <textarea
              v-model="form.description"
              class="inline-textarea"
              placeholder="Enter product description"
            ></textarea>
          </template>
          <template v-else>
            <p>{{ form.description }}</p>
          </template>
        </div>
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button v-if="!isEditing" @click="toggleEdit" class="btn btn-edit">Edit</button>
        <button v-else @click="saveChanges" class="btn btn-save">Save</button>
        <button v-if="isEditing" @click="cancelEdit" class="btn btn-cancel">Cancel</button>
      </div>

      <!-- Review Section -->
      <ReviewSection class="review-section" :reviews="reviews" />
    </div>

    <!-- Bar Chart and Item Grid -->
    <div class="chart-container">
      <BarChart class="chart" />
      <ItemGrid class="item-grid-section" :items="cakes" :starImg="starImg" />
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import ItemGrid from '@/components/admin/ItemGrid.vue';
import ReviewSection from '@/components/ReviewSection.vue';
import BarChart from '@/components/admin/BarChart.vue';
import Sidebar from '@/components/admin/Sidebar.vue';
import salad from '@/assets/food/salad.png';
import cake from '@/assets/food/cake.png';
import star from '@/assets/icons/star1.png';

import cartIcon from '@/assets/icons/orders.png';
import starIcon from '@/assets/icons/star1.png';
import heartIcon from '@/assets/heart.png';

export default {
  name: 'MenuItemDetail',
  components: {
    ItemGrid,
    ReviewSection,
    BarChart,
    Sidebar
  },
  data() {
    return {
      item: null,
      isEditing: false,
      form: {
        name: '',
        price: '',
        image: '',
        description: '',
        totalOrder: 0,
        totalRating: 0,
        totalFavorite: 0,
      },
      originalForm: {},
      placeholderImage: 'https://via.placeholder.com/600x360?text=No+Image',
      starImg: star,
      icons: {
        cart: cartIcon,
        star: starIcon,
        heart: heartIcon,
      },
      cakes: [
        { id: 1, name: 'Mango Cake', image: cake, price: '3.99', rating: 4 },
        { id: 2, name: 'Strawberry Cake', image: salad, price: '3.99', rating: 5 },
        { id: 3, name: 'Blueberry Cake', image: cake, price: '3.99', rating: 3 },
        { id: 4, name: 'Matcha Cake', image: salad, price: '3.99', rating: 2 },
        { id: 5, name: 'Mango Cake', image: cake, price: '3.99', rating: 4 },
        { id: 6, name: 'Strawberry Cake', image: salad, price: '3.99', rating: 5 },
        { id: 7, name: 'Blueberry Cake', image: cake, price: '3.99', rating: 3 },
        { id: 8, name: 'Matcha Cake', image: salad, price: '3.99', rating: 2 },
      ],
      reviews: [
        {
          name: 'Sophanary',
          date: '20-01-2025',
          text: 'Absolutely delicious! This burger and cheese combo together is well, perfect balancing.',
        },
        {
          name: 'Sokly',
          date: '18-01-2025',
          text: 'Tasty and fresh! My favorite spot for cake.',
        },
      ],
    };
  },
  created() {
    const itemId = parseInt(this.$route.params.id);
    const allItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    this.item = allItems.find((item) => item.id === itemId) || null;

    if (this.item) {
      this.form = { ...this.item };
      this.originalForm = { ...this.item };
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.form = { ...this.originalForm };
    },
    saveChanges() {
      if (!this.form.image || this.form.image.trim() === '') {
        alert('Image URL cannot be empty.');
        return;
      }

      const allItems = JSON.parse(localStorage.getItem('menuItems')) || [];
      const index = allItems.findIndex((i) => i.id === this.item.id);
      if (index !== -1) {
        allItems[index] = { ...this.form };
        localStorage.setItem('menuItems', JSON.stringify(allItems));
        this.originalForm = { ...this.form };
        this.isEditing = false;
        alert('Changes saved!');
      } else {
        alert('Item not found!');
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

.container {
  padding: 1.5rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-template-areas:
    "card"
    "chart"
    "review"
    "grid";
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "card chart"
      "review grid";
  }
}

.card {
  grid-area: card;
  background-color: white;
  padding: 1rem 1.5rem 1rem 1.5rem; /* top right bottom left */
  border-radius: 0.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 90%;

  
  
}
.name-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
  gap: 1rem; /* spacing between inputs */
}
.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: orange;
  margin: 0;
}
/* Align product name to left and allow it to grow */
.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0;
  flex-grow: 1;
  text-align: left; /* <-- This aligns the text to left */
}
.product-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
}
.product-description h2 {
  margin-bottom: 0.25rem;
}
.product-image {
  width: 80%;
  padding-left: 45px;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.product-info {
  width: 100%;
  text-align: left; /* Align all text inside product info left */
}
.product-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  padding: 20px;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: #374151;
  cursor: default;
}
.icon {
  width: 24px;
  height: 24px;
  user-select: none;
}
.stat-number {
  font-weight: 700;
  margin-left: 5px;
  user-select: none;
}
.button-group {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  padding-bottom:100px;
}
.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: white;
  transition: background-color 0.3s ease;
}
.btn-edit {
    background-color: #3b82f6;
  width: 100%;
  max-width: 200px;
  height: 50px;
  
}
.btn-edit:hover {
  background-color: #2563eb;
  
}
.btn-save {
  background-color: #10b981;
}
.btn-save:hover {
  background-color: #059669;
}
.btn-cancel {
  background-color: #ef4444;
}
.btn-cancel:hover {
  background-color: #dc2626;
}
/* Inline input styling */
.inline-input {
  font-size: 1.25rem;
  padding: 0.9rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 80%;
}
.price-input {
  width: 80px;
  margin-top: 20px;
}
.inline-textarea {
  width: 500px;
  min-height: 6rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  resize: vertical;
}
/* Chart, Review, and Grid sections */
.chart-container {
  grid-area: chart;

  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.review-section {
  grid-area: review;
  
  padding: 1rem;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  
  
}
.item-grid-section {
   grid-area: grid;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-top:100px;
  width: 95%;

}
.chart{
  width:90%;

}
</style>
