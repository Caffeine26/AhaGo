<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Main Body -->
      <section class="content-container">
        <!-- Banner Display + Details side-by-side -->
        <div class="banner-main">
          <div class="banner-card">
            <div class="banner-image-container">
              <img
                v-if="banners.length > 0"
                :src="banners[currentIndex].imageUrl"
                alt="Promotion Banner"
                class="banner-image"
                @click="toggleDetails"
              />
              <div v-else class="placeholder">No banners available</div>
              <button
                class="nav-button left"
                @click="prevBanner"
                :disabled="currentIndex <= 0"
                aria-label="Previous Banner"
              >
                &lt;
              </button>
              <button
                class="nav-button right"
                @click="nextBanner"
                :disabled="currentIndex >= banners.length - 1"
                aria-label="Next Banner"
              >
                &gt;
              </button>
            </div>
          </div>

          <transition name="fade">
            <div v-if="showDetails && banners.length > 0" class="banner-details-card">
              <h3 class="banner-title">
                {{ banners[currentIndex].title || "Untitled Banner" }}
              </h3>
              <p class="banner-date" v-if="banners[currentIndex].date">
                <strong>Date:</strong> {{ formatDate(banners[currentIndex].date) }}
              </p>
              <p class="banner-description" v-if="banners[currentIndex].description">
                {{ banners[currentIndex].description }}
              </p>

              <div class="banner-details-actions">
                <button class="btn btn-edit" @click="showEditForm = true">Edit</button>
                <button class="btn btn-download" @click="downloadPdf">Download PDF</button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Thumbnails -->
        <div class="thumbnails-wrapper" ref="thumbnailsWrapper">
          <div
            class="thumbnail"
            v-for="(banner, index) in banners"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="setCurrentBanner(index)"
          >
            <img :src="banner.imageUrl" alt="Banner Thumbnail" />
            <div class="thumbnail-title" v-if="banner.title" :title="banner.title">
              {{ banner.title }}
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <div class="upload-container">
          <button class="btn btn-upload" @click="triggerUpload">Upload New Banner</button>
          <input
            type="file"
            id="bannerUpload"
            accept="image/*"
            @change="handleUpload"
            hidden
          />
        </div>
      </section>

      <!-- Edit Modal -->
      <transition name="modal-fade">
        <div v-if="showEditForm && banners.length > 0" class="modal-overlay" @click.self="cancelEdit">
          <div class="modal-content">
            <h3>Edit Banner Details</h3>
            <form @submit.prevent="saveDetails" class="form-edit">
              <label for="title">Title:</label>
              <input id="title" type="text" v-model="banners[currentIndex].title" required />

              <label for="date">Date:</label>
              <input id="date" type="date" v-model="banners[currentIndex].date" />

              <label for="description">Description:</label>
              <textarea id="description" v-model="banners[currentIndex].description" rows="4"></textarea>

              <div class="modal-actions">
                <button type="button" class="btn btn-cancel" @click="cancelEdit">Cancel</button>
                <button type="submit" class="btn btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Upload Modal -->
      <transition name="modal-fade">
        <div v-if="showUploadForm" class="modal-overlay" @click.self="cancelUpload">
          <div class="modal-content">
            <h3>Add New Banner</h3>
            <form @submit.prevent="saveNewBanner" class="form-upload">
              <label for="newTitle">Title:</label>
              <input id="newTitle" type="text" v-model="newBanner.title" required />

              <label for="newDate">Date:</label>
              <input id="newDate" type="date" v-model="newBanner.date" />

              <label for="newDescription">Description:</label>
              <textarea id="newDescription" v-model="newBanner.description" rows="4"></textarea>

              <div class="modal-actions">
                <button type="button" class="btn btn-cancel" @click="cancelUpload">Cancel</button>
                <button type="submit" class="btn btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jsPDF } from "jspdf";
import Sidebar from "@/components/admin/Sidebar.vue";

export default {
  name: "MarketingBanner",
  components: { Sidebar },
  data() {
    return {
      banners: [],
      currentIndex: 0,
      showDetails: false,
      showEditForm: false,
      showUploadForm: false,
      selectedFile: null,
      newBanner: {
        title: "",
        date: "",
        description: "",
      },
    };
  },
  mounted() {
    this.fetchBanners();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async fetchBanners() {
      try {
        const res = await axios.get("http://localhost:8300/api/banners");
        this.banners = res.data.map((b) => ({
          ...b,
          imageUrl: `http://localhost:8300/storage/${b.image_path}`,
        }));
      } catch (error) {
        console.error("Failed to load banners:", error);
      }
    },
    triggerUpload() {
      document.getElementById("bannerUpload").click();
    },
    handleUpload(e) {
      this.selectedFile = e.target.files[0];
      this.showUploadForm = true;
    },
    async saveNewBanner() {
      if (!this.selectedFile) {
        alert("Please select an image");
        return;
      }
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      formData.append("title", this.newBanner.title);
      formData.append("date", this.newBanner.date);
      formData.append("description", this.newBanner.description);

      try {
        const res = await axios.post("http://localhost:8300/api/banners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.banners.unshift({
          ...res.data,
          imageUrl: `http://localhost:8300/storage/${res.data.image_path}`,
        });

        this.currentIndex = 0;
        this.showUploadForm = false;
        this.showDetails = true;
        this.resetNewBanner();
        this.selectedFile = null;
      } catch (error) {
        console.error("Upload failed", error);
      }
    },
    cancelUpload() {
      this.showUploadForm = false;
      this.resetNewBanner();
      this.selectedFile = null;
    },
    resetNewBanner() {
      this.newBanner = { title: "", date: "", description: "" };
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
      if (this.showDetails) this.showEditForm = false;
    },
    saveDetails() {
      this.showEditForm = false;
    },
    cancelEdit() {
      this.showEditForm = false;
    },

    // New improved download PDF method with image included
    downloadPdf() {
      if (this.banners.length === 0) return;

      const banner = this.banners[this.currentIndex];
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.setTextColor("#1f2937");
      doc.text(banner.title || "Untitled Banner", 20, 30);

      if (banner.date) {
        doc.setFontSize(12);
        doc.setTextColor("#555");
        doc.text(this.formatDate(banner.date), 20, 40);
      }

      if (banner.imageUrl) {
        this.convertImageToBase64(banner.imageUrl)
          .then((base64) => {
            if (!base64) {
              console.error("Image conversion failed");
              this.downloadPdfWithoutImage(doc, banner);
              return;
            }

            const img = new Image();
            img.src = base64;

            img.onload = () => {
              const maxWidth = 170;
              const imgWidth = maxWidth;
              const imgHeight = (img.height * imgWidth) / img.width;

              doc.addImage(base64, this.getImageType(base64), 20, 50, imgWidth, imgHeight);

              if (banner.description) {
                doc.setFontSize(14);
                doc.setTextColor("#333");
                doc.text("Description:", 20, 50 + imgHeight + 15);

                const splitDesc = doc.splitTextToSize(banner.description, 170);
                doc.setFontSize(12);
                doc.setTextColor("#444");
                doc.text(splitDesc, 20, 50 + imgHeight + 25);
              }

              doc.save(`${banner.title || "banner"}.pdf`);
            };

            img.onerror = () => {
              console.error("Error loading base64 image");
              this.downloadPdfWithoutImage(doc, banner);
            };
          })
          .catch((err) => {
            console.error("Error converting image:", err);
            this.downloadPdfWithoutImage(doc, banner);
          });
      } else {
        this.downloadPdfWithoutImage(doc, banner);
      }
    },

    // Helper to detect image type from base64 data string
    getImageType(base64) {
      if (base64.startsWith("data:image/png")) {
        return "PNG";
      } else {
        return "JPEG";
      }
    },

    // Converts image url to base64 string, returns Promise<string>
    convertImageToBase64(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // needed for cross-origin images
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png"); // you can change to "image/png" if needed
            resolve(dataURL);
          } catch (e) {
            reject(e);
          }
        };
        img.onerror = () => reject(new Error("Image load error"));
        img.src = url;
      });
    },

    // Fallback PDF creation without image
    downloadPdfWithoutImage(doc, banner) {
      doc.setFontSize(22);
      doc.setTextColor("#1f2937");
      doc.text(banner.title || "Untitled Banner", 20, 30);

      if (banner.date) {
        doc.setFontSize(12);
        doc.setTextColor("#555");
        doc.text(this.formatDate(banner.date), 20, 40);
      }

      if (banner.description) {
        doc.setFontSize(14);
        doc.setTextColor("#333");
        doc.text("Description:", 20, 60);

        const splitDesc = doc.splitTextToSize(banner.description, 170);
        doc.setFontSize(12);
        doc.setTextColor("#444");
        doc.text(splitDesc, 20, 70);
      }

      doc.save(`${banner.title || "banner"}.pdf`);
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

.main-content {
  flex: 1;
  background-color: #f4f6f8;
  padding: 40px;
  overflow-y: auto;
}

.content-container {
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}


/* Layout */
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.main-content {
  margin-left: 340px; /* 240px (sidebar) + 100px space */
  background-color: #f4f6f8;
  padding: 40px 40px 80px 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
}


/* Header */
.header {
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 220px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #333;
}

.user-img {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 2px solid #4caf50;
}

/* Content Container */
.content-container {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}


/* Banner Main: Image + Details side by side */
.banner-main {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Banner card */
.banner-card {
  position: relative;
  flex: 1 1 480px;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.banner-image-container {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.banner-image:hover {
  transform: scale(1.03);
}

.placeholder {
  width: 100%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #888;
  font-size: 1.3rem;
  font-weight: 600;
}

/* Navigation Buttons on banner image */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  user-select: none;
  z-index: 10;
}

.nav-button:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.8);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: default;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

/* Banner details card */
.banner-details-card {
  flex: 1 1 380px;
  background: white;
  padding: 30px 30px 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  color: #222;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.banner-title {
  font-size: 2.6rem;
  margin: 0 0 10px 0;
  font-weight: 700;
  color: #1f2937;
}

.banner-date {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 25px;
  font-weight: 500;
}

.banner-description {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #444;
  flex-grow: 1;
  white-space: pre-line;
}

/* Banner details actions */
.banner-details-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
}

.btn {
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
}

.btn-edit {
  background-color: #2196f3;
  color: white;
}

.btn-edit:hover {
  background-color: #0b7dda;
}

.btn-download {
  background-color: #007bff;
  color: white;
}

.btn-download:hover {
  background-color: #0056b3;
}

/* Thumbnails */
.thumbnails-wrapper {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 5px;
  scrollbar-width: none;
  max-width: 1100px;
  margin: 0 auto;
}

.thumbnails-wrapper::-webkit-scrollbar {
  display: none;
}

.thumbnail {
  flex: 0 0 130px;
  height: 110px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0.75;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumbnail:hover {
  opacity: 1;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.thumbnail.active {
  opacity: 1;
  box-shadow: 0 6px 20px rgba(0, 128, 0, 0.8);
  border: 2px solid #4caf50;
}

.thumbnail img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
  border-radius: 10px 10px 0 0;
}

.thumbnail-title {
  font-size: 0.85rem;
  color: #333;
  padding: 5px 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-weight: 600;
  user-select: none;
}

/* Upload Button */
.upload-container {
  text-align: center;
  margin-top: 15px;
}

.btn-upload {
  background-color: #4caf50;
  color: white;
  padding: 14px 36px;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.btn-upload:hover {
  background-color: #3e8e41;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 41, 55, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 15px;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  padding: 30px 30px 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.modal-content h3 {
  margin-top: 0;
  font-weight: 700;
  font-size: 1.9rem;
  color: #222;
  margin-bottom: 20px;
}

.form-edit label,
.form-upload label {
  font-weight: 600;
  margin-top: 15px;
  display: block;
  color: #444;
}

.form-edit input,
.form-upload input,
.form-edit textarea,
.form-upload textarea {
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  margin-top: 5px;
  transition: border-color 0.3s ease;
}

.form-edit input:focus,
.form-upload input:focus,
.form-edit textarea:focus,
.form-upload textarea:focus {
  border-color: #4caf50;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  padding: 12px 28px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  padding: 12px 28px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-save:hover {
  background-color: #388e3c;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .banner-main {
    flex-direction: column;
  }

  .banner-card,
  .banner-details-card {
    max-width: 100%;
    flex: none;
  }

  .thumbnails-wrapper {
    max-width: 100%;
  }
}

</style>
