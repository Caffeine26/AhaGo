<template>
  <div class="profile-settings" v-if="user">
    <h1>Edit Profile</h1>
    <div class="profile-photo-section">
      <img :src="user.img_src || defaultPhoto" class="profile-photo" />

      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="onPhotoChange"
        style="display: none"
      />
      <button class="upload-btn" @click="triggerFileInput">Upload new photo</button>
    </div>
    <form class="profile-form" @submit.prevent="saveProfile">
      <h2>Personal Information</h2>
      <div class="form-row">
        <div class="form-group">
          <label>First Name</label>
          <input v-model="user.firstname" required />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input v-model="user.lastname" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Email Address</label>
          <input v-model="user.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input v-model="user.phone" required />
        </div>
      </div>
      <div class="form-group">
        <label>Address</label>
        <input v-model="user.address" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Country</label>
          <input v-model="user.country" required />
        </div>
        <div class="form-group">
          <label>City/Province</label>
          <select v-model="user.city" required>
            <option value="">Select</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
      </div>
      <button class="edit-btn" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authenticationStore'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const router = useRouter()

// const defaultPhoto = 'https://via.placeholder.com/120x120?text=Photo'
const cities = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville']
const fileInput = ref(null)

function triggerFileInput() {
  fileInput.value.click()
}

async function onPhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    try {
      const imgUrl = await authStore.uploadPhoto(file)
      user.value.img_src = imgUrl
    } catch (error) {
      alert('Photo upload failed.')
    }
  }
}

async function saveProfile() {
  try {
    await authStore.saveUserProfile()
    alert('Profile saved!')
    router.push('/')
  } catch (error) {
    alert('Failed to save user.')
  }
}
onMounted(() => {
  authStore.fetchProfile();
});
</script>

<style scoped>
.profile-settings {
  max-width: 700px;
  margin: 2rem auto;
  font-family: 'Georgia', serif;
}
h1 {
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.profile-photo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}
.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #eee;
  object-fit: cover;
  border: 2px solid #ccc;
}
.upload-btn {
  background: #b91c1c;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.upload-btn:hover {
  background: #991818;
}
.profile-form {
  background: #fff;
  border: 2px solid #888;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}
.profile-form h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  font-family: inherit;
}
.form-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.2rem;
}
.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}
label {
  font-weight: 600;
  color: #b91c1c;
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
}
input, select {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #b91c1c;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  margin-bottom: 0.2rem;
}
.edit-btn {
  background: #b91c1c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  float: right;
  margin-top: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #991818;
}
</style>
