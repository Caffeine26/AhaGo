<template>
  <div class="page-container">
    <Header :title="'Add Location'" />
    <button class="back-btn" @click="goBack">&#8592; Cancel</button>

    <div class="add-location-container">
      <Map
        :useGeolocation="false"
        :enableClickSelection="true"
        @map-clicked="onMapClick"
      />

      <form class="location-form">
        <InputText v-model="address" label="Delivery Address" placeholder="Enter delivery address" />
        <InputText v-model="addressLabel" label="Address" placeholder="e.g. Home" />

        <div class="form-group">
          <label class="label">Delivery Service <span class="note">(For Takeaway Orders Only)</span></label>
          <select class="select" v-model="deliveryService" required>
            <option disabled value="">Please select delivery service</option>
            <option>Downstairs pick-up</option>
            <option>Door delivery</option>
          </select>
        </div>

        <InputText v-model="customerName" label="Customer Name" placeholder="Enter your name" />

        <div class="form-group">
          <label class="label">Gender</label>
          <div class="radio-group">
            <label><input type="radio" value="Mr." v-model="gender" /> Mr.</label>
            <label><input type="radio" value="Ms." v-model="gender" /> Ms.</label>
          </div>
        </div>

        <InputText v-model="contact" label="Contact" placeholder="Phone number" type="tel" />
        <InputText v-model="telegram" label="Telegram" placeholder="Telegram username" />

        <div class="form-group">
          <label class="label">Label</label>
          <div class="label-group">
            <GeneralButton
              v-for="option in ['Home', 'Work', 'School', 'Other']"
              :key="option"
              :title="option"
              :btnColor="label === option ? '#b91c1c' : '#ffffff'"
              :titleColor="label === option ? '#ffffff' : '#b91c1c'"
              :border="'1px solid #b91c1c'"
              @click="label = option"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="label">Photo <span class="sample-photo">Sample Photo</span></label>
          <input type="file" @change="onPhotoChange" accept="image/*" />
          <div v-if="photoUrl" class="photo-preview">
            <img :src="photoUrl" alt="Preview" />
          </div>
          <small class="photo-desc">
            Please upload photo of your house number, doorway, and its surroundings to help the delivery man to deliver your meal in no time.
          </small>
        </div>

        <div class="button">
          <GeneralButton
            class="save-btn"
            title="SAVE LOCATION"
            :btnColor="'#b91c1c'"
            :titleColor="'#fff'"
                  @click="saveLocation"

          />
        </div>
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
import GeneralButton from '@/components/GeneralButton.vue'
import InputText from '@/components/all/inputText.vue'
import Map from '@/components/delivery/map.vue'

const router = useRouter()

// Form fields
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
const customerCoords = ref({ lat: null, lng: null })

// Handle map click event
function onMapClick({ coords, address: resolvedAddress }) {
  address.value = resolvedAddress
  customerCoords.value = coords
}

// Handle photo file upload
function onPhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    photo.value = file
    photoUrl.value = URL.createObjectURL(file)
  }
}

// Save the location to localStorage and go back
function saveLocation() {
  if (!address.value || !customerCoords.value.lat || !customerCoords.value.lng) {
    alert("Please click on the map to select your delivery location.")
    return
  }

  const locationData = {
    address: address.value,
    addressLabel: addressLabel.value,
    deliveryService: deliveryService.value,
    customerName: customerName.value,
    gender: gender.value,
    contact: contact.value,
    telegram: telegram.value,
    label: label.value,
    photoUrl: photoUrl.value,
    coords: customerCoords.value,
  }

  localStorage.setItem('savedLocation', JSON.stringify(locationData))
  router.back()
}

// Cancel/back button
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
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
.location-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-right: -10px;
}
.form-group label {
  font-weight: 600;
}
.radio-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.3rem;
}
.note {
  font-size: 0.9em;
  color: #888;
  font-weight: 400;
}
.label-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
.label {
  font-size: 20px;
  color: #9A0404;
}
.select {
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
}
.button {
  display: flex;
  justify-content: center;
}
</style>
