<template>
  <div class="profile">
    <div class="contain">
      <Title class="title" title="Edit Profile" />

      <div class="content" v-if="user">
        <!-- Profile Image -->
        <div class="image">
          <img
            class="pic"
            :src="user.img_src || defaultPhoto"
            alt="Profile photo"
          />
          <GeneralButton
            title="Upload a new photo"
            btnColor="#9A0404"
            titleColor="#FFFFFF"
            @click="showDropzone"
          />
        </div>

        <!-- Dropzone overlay -->
        <div
          v-if="uploading"
          class="dropzone-overlay"
          @dragover.prevent
          @drop="handleDrop"
          @click="hideDropzone"
        >
          <div class="dropzone-box" @click.stop>
            <img src="@/assets/delivery/icons/cloud.svg" alt="Upload Icon" />
            <p>Drag & Drop an image here</p>
            <p>or</p>
            <label class="upload-label">
              Click to browse
              <input
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                hidden
              />
            </label>
          </div>
        </div>

        <!-- Personal Info -->
        <Box class="box">
          <div class="personal">
            <Text class="head" text="Personal Information" />
            <GeneralButton
              v-if="!isEditing"
              title="Edit"
              btnColor="#9a0404"
              titleColor="#ffffff"
              @click="startEditing"
            />

            <GeneralButton
              v-else
              title="Save"
              btnColor="#9a0404"
              titleColor="#ffffff"
              @click="saveChanges"
            />
          </div>

          <div class="input">
            <div class="text">
              <InputText
                v-if="isEditing"
                label="First Name"
                :modelValue="localUser.firstname"
                @update:modelValue="(val) => (localUser.firstname = val)"
                placeholder="Enter your first name"
              />
              <Information v-else label="First Name" :value="user.firstname" />
            </div>

            <div class="text">
              <InputText
                v-if="isEditing"
                label="Last Name"
                :modelValue="localUser.lastname"
                @update:modelValue="(val) => (localUser.lastname = val)"
                placeholder="Enter your last name"
              />
              <Information v-else label="Last Name" :value="user.lastname" />
            </div>
          </div>

          <div class="input">
            <div class="email">
              <InputText
                v-if="isEditing"
                label="Email Address"
                :modelValue="localUser.email"
                @update:modelValue="(val) => (localUser.email = val)"
                placeholder="Enter your email address"
              />
              <Information v-else label="Email Address" :value="user.email" />
            </div>

            <div class="text">
              <InputText
                v-if="isEditing"
                label="Phone Number"
                :modelValue="localUser.phone"
                @update:modelValue="(val) => (localUser.phone = val)"
                placeholder="Enter your phone number"
              />
              <Information v-else label="Phone Number" :value="user.phone" />
            </div>
          </div>

          <div class="address">
            <InputText
              v-if="isEditing"
              label="Address"
              :modelValue="localUser.address"
              @update:modelValue="(val) => (localUser.address = val)"
              placeholder="Enter your address"
            />
            <Information v-else label="Address" :value="user.address" />
          </div>

          <div class="input">
            <div class="text">
              <InputText
                v-if="isEditing"
                label="National ID card"
                :modelValue="localUser.idCard"
                @update:modelValue="(val) => (localUser.idCard = val)"
                placeholder="Enter your id"
              />
              <Information
                v-else
                label="National ID card"
                :value="user.idCard"
              />
            </div>
          </div>
        </Box>

        <!-- Vehicle Info -->
        <Box class="box">
          <div class="personal">
            <Text class="head" text="Vehicle Information" />
          </div>

          <div class="input">
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Type of Vehicle"
                :modelValue="localUser.vehicleType"
                @update:modelValue="(val) => (localUser.vehicleType = val)"
                placeholder="Enter your vehicle's type"
              />
              <Information
                v-else
                label="Type of Vehicle"
                :value="user.vehicleType"
              />
            </div>

            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle Name"
                :modelValue="localUser.vehicleName"
                @update:modelValue="(val) => (localUser.vehicleName = val)"
                placeholder="Enter your vehicle's name"
              />
              <Information
                v-else
                label="Vehicle Name"
                :value="user.vehicleName"
              />
            </div>
          </div>

          <div class="input">
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle Color"
                :modelValue="localUser.vehicleColor"
                @update:modelValue="(val) => (localUser.vehicleColor = val)"
                placeholder="Enter your vehicle's color"
              />
              <Information
                v-else
                label="Vehicle Color"
                :value="user.vehicleColor"
              />
            </div>

            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle's License Plate"
                :modelValue="localUser.licensePlate"
                @update:modelValue="(val) => (localUser.licensePlate = val)"
                placeholder="Enter your license plate"
              />
              <Information
                v-else
                label="Vehicle's License Plate"
                :value="user.licensePlate"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useDriverStore } from "@/stores/driverStore";

import Information from "@/components/delivery/information.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import Text from "@/components/delivery/text.vue";
import InputText from "@/components/all/inputText.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import photo from "@/assets/delivery/images/1.png";

const driverStore = useDriverStore();

const isEditing = ref(false);
const uploading = ref(false);
const defaultPhoto = photo;

const user = computed(() => driverStore.user || {});
const localUser = reactive({});

// Start editing
const startEditing = () => {
  if (user.value) {
    Object.keys(localUser).forEach((key) => delete localUser[key]);
    Object.assign(localUser, user.value);
    isEditing.value = true;
  }
};

// Save profile changes
const saveChanges = async () => {
  Object.assign(driverStore.user, localUser);
  await driverStore.saveUserProfile();
  isEditing.value = false;
};

// Dropzone handlers
const showDropzone = () => (uploading.value = true);
const hideDropzone = () => (uploading.value = false);

const previewAndSetPhoto = async (file) => {
  try {
    await driverStore.uploadPhoto(file);
  } catch (error) {
    alert("Photo upload failed.");
  }
  hideDropzone();
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) previewAndSetPhoto(file);
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) previewAndSetPhoto(file);
};

// Fetch profile on load
onMounted(() => {
  driverStore.fetchDriverProfile();
});
</script>

<style scoped>
.profile {
  display: flex;
}
.contain {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.content {
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 40px;
}
.pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.image {
  display: flex;
  align-items: center;
  gap: 30px;
}
.box {
  width: 120%;
  max-width: 850px;
  margin: 0 auto; /* Centers the box */
}
.input {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.email {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 350px));
}
.address {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(765px, 765px));
}
.personal {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text {
  width: 300px;
}
.head {
  font-weight: 700;
}
.dropzone-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  z-index: 5;
}
.dropzone-box {
  margin-left: 800px;
  background: #fff;
  border: 2px dashed #9a0404;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.upload-label {
  display: inline-block;
  background-color: #9a0404;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
p {
  margin: 5px;
}
</style>
