<template>
  <div class="review-card">
    <div class="card-header">
      <img :src="reviewer.image" :alt="reviewer.name" class="reviewer-image" />
      <div class="reviewer-info">
        <h3 class="reviewer-name">{{ reviewer.name }}</h3>
        <p v-if="reviewer.meta" class="reviewer-meta">{{ reviewer.meta }}</p>
      </div>
    </div>

    <!-- Delivery Review -->
    <div v-if="type === 'delivery'">
      <div class="rating-section">
        <div class="rating-line">
          <h4 class="rating-title">{{ ratingTitle }}</h4>
          <rateStar v-model="deliveryRating" :totalStars="5" />
          <span v-if="deliveryRating > 0" class="rating-label">{{ deliveryRatingLabel }}</span>
        </div>
        <div v-if="deliveryRating > 0">
          <div class="tags-section">
            <button
              v-for="tag in deliveryTags"
              :key="tag"
              @click="toggleTag('delivery', tag)"
              :class="{ selected: selectedDeliveryTags.includes(tag) }"
              class="tag-btn"
            >
              {{ tag }}
            </button>
          </div>
          <textarea
            v-model="deliveryReviewText"
            :placeholder="placeholder"
            :maxlength="characterLimit"
            class="review-textarea"
          ></textarea>
          <div class="char-counter">{{ deliveryReviewText.length }}/{{ characterLimit }}</div>
        </div>
      </div>
    </div>

    <!-- Restaurant Review -->
    <div v-if="type === 'restaurant'">
      <h4 class="rating-title">{{ ratingTitle }}</h4>
      <div v-for="(sub, index) in restaurantRatings" :key="index" class="rating-section sub-rating">
        <div class="rating-line">
          <h5 class="sub-rating-title">{{ sub.title }}</h5>
          <rateStar v-model="sub.rating" :totalStars="5" />
          <span v-if="sub.rating > 0" class="rating-label">{{ getRestaurantRatingLabel(sub.rating) }}</span>
        </div>
      </div>
      
      <div v-if="showRestaurantDetails">
        <div class="tags-section">
          <button
            v-for="tag in restaurantTags"
            :key="tag"
            @click="toggleTag('restaurant', tag)"
            :class="{ selected: selectedRestaurantTags.includes(tag) }"
            class="tag-btn"
          >
            {{ tag }}
          </button>
        </div>
        <textarea
          v-model="restaurantReviewText"
          placeholder="Please enter the reasons that affect your dining experience. We'll tell the merchant ASAP."
          :maxlength="characterLimit"
          class="review-textarea"
        ></textarea>
        <div class="char-counter">{{ restaurantReviewText.length }}/{{ characterLimit }}</div>

        <div v-if="allowPhotoUpload" class="photo-upload-section">
          <h5 class="photo-upload-title">Add Photo (Optional)</h5>
          
          <div v-if="uploadedImage" class="uploaded-image-container">
            <img :src="uploadedImage.preview" :alt="uploadedImage.name" class="uploaded-image" />
            <button @click="removeImage" class="remove-image-btn" type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <label 
            v-else
            for="photo-upload" 
            class="photo-upload-box"
            :class="{ 'drag-over': isDragOver }"
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleDrop"
          >
            <div class="upload-content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="upload-icon">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
              <span class="upload-text">Add photo</span>
              <span class="upload-subtext">Drag & drop or click to browse</span>
            </div>
            <input 
              id="photo-upload" 
              type="file" 
              @change="onFileChange" 
              accept="image/*" 
              style="display: none;"
            >
          </label>
          
          <div v-if="uploadError" class="upload-error">
            {{ uploadError }}
          </div>
        </div>

        <div class="order-section" v-if="orderItems && orderItems.length">
          <h4 class="order-title">Your Order</h4>
          <div v-for="item in orderItems" :key="item" class="order-item">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import rateStar from '@/components/all/rateStar.vue';

const emit = defineEmits(['update']);

const props = defineProps({
  type: { type: String, required: true, validator: val => ['delivery', 'restaurant'].includes(val) },
  reviewer: { type: Object, required: true },
  ratingTitle: { type: String, required: true },
  placeholder: { type: String, default: 'Tell us how to do better' },
  characterLimit: { type: Number, default: 255 },
  allowPhotoUpload: { type: Boolean, default: false },
  maxFileSize: { type: Number, default: 5 * 1024 * 1024 }, // 5MB
  // for restaurant
  initialRestaurantRatings: { type: Array, default: () => [{ title: 'Taste', rating: 0 }, { title: 'Packaging', rating: 0 }] },
  restaurantTags: { type: Array, default: () => ['bad package', 'Poor service', 'Not enough food', 'bad food'] },
  orderItems: { type: Array, default: () => [] },
  // for delivery
  deliveryTags: { type: Array, default: () => ['Fast delivery', 'Dress professionally', 'Delivered on time', 'The food is in good condition', 'Great', 'likelikelike'] },
});

// Photo upload state
const uploadedImage = ref(null);
const isDragOver = ref(false);
const uploadError = ref('');

const validateFile = (file) => {
  if (!file.type.startsWith('image/')) {
    return 'Please select only image files';
  }
  if (file.size > props.maxFileSize) {
    return `File size must be less than ${Math.round(props.maxFileSize / 1024 / 1024)}MB`;
  }
  return null;
};

const processFile = (file) => {
  uploadError.value = '';
  
  const error = validateFile(file);
  if (error) {
    uploadError.value = error;
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = {
      file,
      preview: e.target.result,
      name: file.name
    };
  };
  reader.readAsDataURL(file);
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    processFile(file);
  }
  e.target.value = ''; // Reset input
};

const handleDrop = (e) => {
  isDragOver.value = false;
  const file = e.dataTransfer.files[0];
  if (file) {
    processFile(file);
  }
};

const removeImage = () => {
  uploadedImage.value = null;
  uploadError.value = '';
};

// Delivery review state
const deliveryRating = ref(0);
const deliveryReviewText = ref('');
const selectedDeliveryTags = ref([]);

const deliveryRatingLabels = { 1: 'Terrible', 2: 'Bad', 3: 'OK', 4: 'Good', 5: 'Great' };
const deliveryRatingLabel = computed(() => deliveryRatingLabels[deliveryRating.value] || '');

// Restaurant review state
const restaurantRatings = ref(JSON.parse(JSON.stringify(props.initialRestaurantRatings))); // deep copy
const restaurantReviewText = ref('');
const selectedRestaurantTags = ref([]);

const restaurantRatingLabels = { 1: 'Terrible', 2: 'Bad', 3: 'OK', 4: 'Good', 5: 'Great' };
const getRestaurantRatingLabel = (rating) => {
    const labels = { 1: 'Terrible', 2: 'Bad', 3: 'OK', 4: 'Good', 5: 'Great' };
    return labels[rating] || '';
}

// Logic to show details only when a rating is given
const showRestaurantDetails = computed(() => restaurantRatings.value.some(r => r.rating > 0));

watch([deliveryRating, deliveryReviewText, selectedDeliveryTags, uploadedImage], () => {
  if (props.type === 'delivery') {
    emit('update', {
      rating: deliveryRating.value,
      reviewText: deliveryReviewText.value,
      tags: selectedDeliveryTags.value,
      image: uploadedImage.value,
    });
  }
}, { deep: true });

watch([restaurantRatings, restaurantReviewText, selectedRestaurantTags, uploadedImage], () => {
  if (props.type === 'restaurant') {
    emit('update', {
      tasteRating: restaurantRatings.value.find(r => r.title === 'Taste')?.rating || 0,
      packagingRating: restaurantRatings.value.find(r => r.title === 'Packaging')?.rating || 0,
      reviewText: restaurantReviewText.value,
      tags: selectedRestaurantTags.value,
      image: uploadedImage.value,
    });
  }
}, { deep: true });

// Tag selection logic
const toggleTag = (type, tag) => {
  if (type === 'delivery') {
    const index = selectedDeliveryTags.value.indexOf(tag);
    if (index > -1) {
      selectedDeliveryTags.value.splice(index, 1);
    } else {
      selectedDeliveryTags.value.push(tag);
    }
  } else if (type === 'restaurant') {
    const index = selectedRestaurantTags.value.indexOf(tag);
    if (index > -1) {
      selectedRestaurantTags.value.splice(index, 1);
    } else {
      selectedRestaurantTags.value.push(tag);
    }
  }
};
</script>

<style scoped>
.review-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}
.reviewer-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}
.reviewer-info { flex-grow: 1; }
.reviewer-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}
.reviewer-meta {
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}
.rating-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.sub-rating {
    margin-bottom: 1rem;
}
.sub-rating-title {
    font-size: 1rem;
    color: #374151;
    width: 120px;
    flex-shrink: 0;
}
.rating-line {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.rating-label {
    font-size: 1rem;
    font-weight: 500;
    color: #ef4444; /* Example color */
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tag-btn {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}
.tag-btn:hover {
  background-color: #e5e7eb;
}
.tag-btn.selected {
  background-color: #fef2f2;
  border-color: #fca5a5;
  color: #b91c1c;
}

.review-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-top: 1rem;
  min-height: 100px;
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s ease;
}
.review-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.char-counter {
  text-align: right;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Photo Upload Styles */
.photo-upload-section { 
  margin-top: 1.5rem; 
}

.photo-upload-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.uploaded-image-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  margin-bottom: 1rem;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.remove-image-btn:hover {
  background-color: #dc2626;
}

.photo-upload-box {
  width: 100%;
  min-height: 120px;
  background-color: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1.5rem;
}

.photo-upload-box:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.photo-upload-box.drag-over {
  background-color: #eff6ff;
  border-color: #3b82f6;
  border-style: solid;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

.upload-icon {
  color: #6b7280;
  transition: color 0.2s ease;
}

.photo-upload-box:hover .upload-icon {
  color: #4b5563;
}

.upload-text {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
}

.upload-subtext {
  font-size: 0.875rem;
  color: #6b7280;
}

.upload-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}

.order-section {
  margin-top: 1.5rem;
}
.order-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}
.order-item:last-child {
  border-bottom: none;
}
</style>