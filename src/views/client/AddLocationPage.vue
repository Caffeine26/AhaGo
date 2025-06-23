<template>
  <div class="page-container">
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
            Please upload photo of your house number, doorway, and its surroundings to help the delivery man deliver your meal in no time.
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authenticationStore";

import Map from "@/components/delivery/map.vue";
import InputText from "@/components/all/inputText.vue";
import GeneralButton from "@/components/GeneralButton.vue";

const router = useRouter();
const authStore = useAuthStore();

const photo = ref(null);
const photoUrl = ref("");

const address = computed({
  get: () => authStore.user?.address || "",
  set: (val) => (authStore.user.address = val),
});

const customerName = computed({
  get: () => `${authStore.user?.firstname || ""} ${authStore.user?.lastname || ""}`,
  set: (val) => {
    const [first = "", ...rest] = val.split(" ");
    authStore.user.firstname = first;
    authStore.user.lastname = rest.join(" ");
  },
});

const gender = computed({
  get: () => authStore.user?.gender || "",
  set: (val) => (authStore.user.gender = val),
});

const contact = computed({
  get: () => authStore.user?.phone || "",
  set: (val) => (authStore.user.phone = val),
});

const telegram = ref(""); // not saved to backend yet
const deliveryService = ref(""); // optional field
const label = ref("Home");
const addressLabel = ref("Home");

function onMapClick({ coords, address: resolvedAddress }) {
  address.value = resolvedAddress;
  authStore.user.latitude = coords.lat;
  authStore.user.longitude = coords.lng;
}

function onPhotoChange(e) {
  const file = e.target.files[0];
  if (file) {
    photo.value = file;
    photoUrl.value = URL.createObjectURL(file);
  }
}

async function saveLocation() {
  if (!address.value || !authStore.user.latitude || !authStore.user.longitude) {
    alert("Please select your delivery location on the map.");
    return;
  }

  try {
    if (photo.value) {
      await authStore.uploadPhoto(photo.value);
    }

    await authStore.saveUserProfile();
    router.back();
  } catch (error) {
    console.error("Failed to save:", error);
    alert("Failed to save your location.");
  }
}

function goBack() {
  router.back();
}

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchProfile();
  } else {
    photoUrl.value = authStore.user?.img_src || "";
  }
});
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
  color: #9a0404;
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
