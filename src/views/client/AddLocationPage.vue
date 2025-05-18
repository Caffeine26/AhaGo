<template>
  <div class="page-container">
    <Header :title="'Add Location'" />
    <button class="back-btn" @click="goBack">&#8592; Cancel</button>
    <div class="add-location-container">
      <div class="map-placeholder">
        <!-- Map placeholder -->
        <div class="map-box">
          <img src="@/assets/store_details/map.png" alt="Map" />
        </div>
      </div>
      <form class="location-form" @submit.prevent="saveLocation">
        <div class="form-group">
          <label>Delivery Address</label>
          <input v-model="address" placeholder="Enter delivery address" required />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input v-model="addressLabel" placeholder="e.g. Home" required />
        </div>
        <div class="form-group">
          <label>Delivery Service <span class="note">(For Takeaway Orders Only)</span></label>
          <select v-model="deliveryService">
            <option disabled value="">Please select delivery service</option>
            <option>Downstairs pick-up</option>
            <option>Door delivery</option>
          </select>
        </div>
        <div class="form-group">
          <label>Customer Name</label>
          <input v-model="customerName" placeholder="Enter your name" required />
          <div class="radio-group">
            <label><input type="radio" value="Mr." v-model="gender" /> Mr.</label>
            <label><input type="radio" value="Ms." v-model="gender" /> Ms.</label>
          </div>
        </div>
        <div class="form-group">
          <label>Contact</label>
          <input v-model="contact" placeholder="Phone number" required />
        </div>
        <div class="form-group">
          <label>Online Contact</label>
          <div class="online-contact">
            <span class="telegram-icon">&#128241;</span>
            <input v-model="telegram" placeholder="Telegram username" />
          </div>
        </div>
        <div class="form-group">
          <label>Label</label>
          <div class="label-group">
            <button type="button" :class="{active: label==='Home'}" @click="label='Home'">Home</button>
            <button type="button" :class="{active: label==='Work'}" @click="label='Work'">Work</button>
            <button type="button" :class="{active: label==='School'}" @click="label='School'">School</button>
            <button type="button" :class="{active: label==='Other'}" @click="label='Other'">Other</button>
          </div>
        </div>
        <div class="form-group">
          <label>Photo <span class="sample-photo">Sample Photo</span></label>
          <input type="file" @change="onPhotoChange" accept="image/*" />
          <div v-if="photoUrl" class="photo-preview">
            <img :src="photoUrl" alt="Preview" />
          </div>
          <small class="photo-desc">Please upload photo of your house number, doorway, and its surroundings to help the delivery man to deliver your meal in no time.</small>
        </div>
        <button class="save-btn" type="submit">SAVE LOCATION</button>
      </form>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/all/header.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()
const address = ref('')
const addressLabel = ref('Home')
const deliveryService = ref('')
const customerName = ref('')
const gender = ref('Ms.')
const contact = ref('')
const telegram = ref('')
const label = ref('Home')
const photo = ref(null)
const photoUrl = ref('')

function onPhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    photo.value = file
    photoUrl.value = URL.createObjectURL(file)
  }
}

function saveLocation() {
  // Save logic here
  alert('Location saved!')
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fafafa;
}
.add-location-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  flex: 1;
}
.back-btn {
  margin: 1rem 0 0 1rem;
  background: none;
  border: none;
  color: #b91c1c;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}
.map-placeholder {
  margin-bottom: 1rem;
}
.map-box {
  width: 100%;
  height: 140px;
  background: #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1.1rem;
  overflow: hidden;
}
.map-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.location-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-group label {
  font-weight: 600;
}
input[type="text"],
input[type="tel"],
input[type="file"],
select,
textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #fafafa;
  margin-top: 0.2rem;
  box-sizing: border-box;
}
input[type="file"] {
  padding: 0.3rem 0;
  background: none;
  border: none;
}
textarea {
  min-height: 60px;
  resize: vertical;
}
.note {
  font-size: 0.9em;
  color: #888;
  font-weight: 400;
}
.radio-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.3rem;
}
.radio-group label {
  font-weight: 400;
}
.online-contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.telegram-icon {
  font-size: 1.2em;
}
.label-group {
  display: flex;
  gap: 0.5rem;
}
.label-group button {
  padding: 0.3rem 1.2rem;
  border-radius: 16px;
  border: 1px solid #b91c1c;
  background: #fff;
  color: #b91c1c;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.label-group button.active,
.label-group button:hover {
  background: #b91c1c;
  color: #fff;
}
.sample-photo {
  color: #b91c1c;
  float: right;
  font-size: 0.95em;
  font-weight: 500;
}
.photo-preview {
  margin: 0.5rem 0;
}
.photo-preview img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}
.photo-desc {
  color: #666;
  font-size: 0.92em;
}
.save-btn {
  width: 100%;
  background: #b91c1c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.save-btn:hover {
  background: #991818;
}
</style> 