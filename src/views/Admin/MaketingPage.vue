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
     
    <!-- Main Display with Navigation -->
    <div class="main-display-container">
      <button 
        class="nav-button left" 
        @click="prevBanner" 
        :disabled="currentIndex <= 0"
      >
        &lt;
      </button>
      
      <div class="main-display">
        <img 
          v-if="banners.length > 0" 
          :src="banners[currentIndex].imageUrl" 
          alt="Promotion Banner"
          @click="toggleDetails"
        >
        <div v-else class="placeholder">
          No banners available
        </div>
      </div>
      
      <button 
        class="nav-button right" 
        @click="nextBanner" 
        :disabled="currentIndex >= banners.length - 1"
      >
        &gt;
      </button>
    </div>

    <!-- Banner Details Section -->
    <div class="banner-details" v-if="showDetails && banners.length > 0">
      <h3>{{ banners[currentIndex].title || 'Untitled Banner' }}</h3>
      <p class="date" v-if="banners[currentIndex].date">
        <strong>Date:</strong> {{ formatDate(banners[currentIndex].date) }}
      </p>
      <p class="description" v-if="banners[currentIndex].description">
        <strong>Description:</strong> {{ banners[currentIndex].description }}
      </p>
      <button class="edit-btn" @click="showEditForm = true">
        Edit Details
      </button>
    </div>

    <!-- Edit Form (shown when editing) -->
    <div class="edit-form" v-if="showEditForm && banners.length > 0">
      <h3>Edit Banner Details</h3>
      <form @submit.prevent="saveDetails">
        <div class="form-group">
          <label for="title">Title:</label>
          <input 
            type="text" 
            id="title" 
            v-model="banners[currentIndex].title" 
            placeholder="Enter banner title"
          >
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            v-model="banners[currentIndex].date"
          >
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea 
            id="description" 
            v-model="banners[currentIndex].description" 
            placeholder="Enter banner description"
            rows="3"
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelEdit">
            Cancel
          </button>
          <button type="submit" class="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
     </div>

    <!-- Thumbnail Container (scrollable) -->
    <div class="thumbnails-wrapper" ref="thumbnailsWrapper">
      <div 
        class="thumbnail" 
        v-for="(banner, index) in banners" 
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="setCurrentBanner(index)"
      >
        <img :src="banner.imageUrl" alt="Banner Thumbnail">
        <div class="thumbnail-title" v-if="banner.title">
          {{ banner.title }}
        </div>
      </div>
    </div>

    <!-- Upload Button and Form -->
    <div class="upload-section">
      <input 
        type="file" 
        id="bannerUpload" 
        accept="image/*" 
        @change="handleUpload" 
        hidden
      >
      <button class="upload-btn" @click="triggerUpload">
        Upload New Banner
      </button>
      
      <div class="upload-form" v-if="showUploadForm">
        <h3>Add Banner Details</h3>
        <form @submit.prevent="saveNewBanner">
          <div class="form-group">
            <label for="newTitle">Title:</label>
            <input 
              type="text" 
              id="newTitle" 
              v-model="newBanner.title" 
              placeholder="Enter banner title"
              required
            >
          </div>
          <div class="form-group">
            <label for="newDate">Date:</label>
            <input 
              type="date" 
              id="newDate" 
              v-model="newBanner.date"
            >
          </div>
          <div class="form-group">
            <label for="newDescription">Description:</label>
            <textarea 
              id="newDescription" 
              v-model="newBanner.description" 
              placeholder="Enter banner description"
              rows="3"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="cancelUpload">
              Cancel
            </button>
            <button type="submit" class="save-btn">
              Save Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
  name: 'MarketingBanner',
  components: {
    Sidebar
  },
  data() {
    return {
      banners: [],
      currentIndex: 0,
      showDetails: false,
      showEditForm: false,
      showUploadForm: false,
      newBanner: {
        title: '',
        date: '',
        description: '',
        imageUrl: ''
      }
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    triggerUpload() {
      document.getElementById('bannerUpload').click();
    },
    handleUpload(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.newBanner.imageUrl = event.target.result;
          this.showUploadForm = true;
        };
        reader.readAsDataURL(file);
      }
      e.target.value = '';
    },
    saveNewBanner() {
      // Create a new banner object with all details
      const banner = {
        imageUrl: this.newBanner.imageUrl,
        title: this.newBanner.title,
        date: this.newBanner.date,
        description: this.newBanner.description
      };
      
      this.banners.unshift(banner);
      this.currentIndex = 0;
      this.showUploadForm = false;
      this.showDetails = true;
      this.resetNewBanner();
    },
    cancelUpload() {
      this.showUploadForm = false;
      this.resetNewBanner();
    },
    resetNewBanner() {
      this.newBanner = {
        title: '',
        date: '',
        description: '',
        imageUrl: ''
      };
    },
    prevBanner() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showEditForm = false;
      }
    },
    nextBanner() {
      if (this.currentIndex < this.banners.length - 1) {
        this.currentIndex++;
        this.showEditForm = false;
      }
    },
    setCurrentBanner(index) {
      this.currentIndex = index;
      this.showEditForm = false;
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
      if (this.showDetails) {
        this.showEditForm = false;
      }
    },
    saveDetails() {
      // Data is already bound directly to the banner object
      this.showEditForm = false;
    },
    cancelEdit() {
      this.showEditForm = false;
    }
  }
}
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





/* Main Display with Navigation */
.main-display-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.main-display {
  flex: 1;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
}

.main-display img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #888;
  font-size: 1.2rem;
}

/* Navigation Buttons */
.nav-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover {
  background: rgba(0,0,0,0.9);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Banner Details Section */
.banner-details {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: left;
}

.banner-details h3 {
  margin-top: 0;
  color: #333;
  font-size: 40px;
}

.banner-details .date {
  color: #666;
  margin: 10px 0;
}

.banner-details .description {
  color: #444;
  line-height: 1.5;
  font-size:30px ;
}

.edit-btn {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #0b7dda;
}

/* Edit Form & Upload Form */
.edit-form, .upload-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.edit-form h3, .upload-form h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;

}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.cancel-btn {
  padding: 8px 16px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #d32f2f;
}

.save-btn {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background: #388E3C;
}

/* Thumbnails */
.thumbnails-wrapper {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  margin-bottom: 30px;
  scrollbar-width: none;
}

.thumbnails-wrapper::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  flex: 0 0 120px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  border: 2px solid transparent;
  position: relative;
}

.thumbnail:hover {
  opacity: 0.9;
}

.thumbnail.active {
  opacity: 1;
  border-color: #4CAF50;
}

.thumbnail img {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.thumbnail-title {
  padding: 4px;
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(0,0,0,0.7);
  color: white;
}

/* Upload Button */
.upload-section {
  text-align: center;
}

.upload-btn {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.upload-btn:hover {
  background: #45a049;
}
</style>