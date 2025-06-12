<template>
  <div class="profile">
    <div class="contain">
      <Title class="title" title="Edit Profile" />
      <div class="content">
        <div class="image">
          <img class="pic" :src="user.photo || defaultPhoto" alt="Profile photo" />
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
            <img src="@/assets/delivery/icons/cloud.svg" />
            <p>Drag & Drop an image here</p>
            <p>or</p>
            <label class="upload-label">
              Click to browse
              <input type="file" accept="image/*" @change="handleFileSelect" hidden />
            </label>
          </div>
        </div>

        <!-- Personal Info -->
        <Box class="box">
          <div class="personal">
            <Text class="head" text="Personal Information" />
            <GeneralButton
              :title="isEditing ? 'Save' : 'Edit'"
              btnColor="#9a0404"
              titleColor="#ffffff"
              @click="toggleEdit"
            />
          </div>

          <div class="input">
            <!-- First Name -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="First Name"
                :modelValue="user.firstname"
                @update:modelValue="(val) => user.firstname = val"
                placeholder="Enter your first name"
              />
              <Information
                v-else
                label="First Name"
                :value="user.firstname"
              />
            </div>

            <!-- Last Name -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Last Name"
                :modelValue="user.lastname"
                @update:modelValue="(val) => user.lastname = val"
                placeholder="Enter your last name"
              />
              <Information
                v-else
                label="Last Name"
                :value="user.lastname"
              />
            </div>
          </div>

          <div class="input">
            <!-- Email -->
            <div class="email">
              <InputText
                v-if="isEditing"
                label="Email Address"
                :modelValue="user.email"
                @update:modelValue="(val) => user.email = val"
                placeholder="Enter your email address"
              />
              <Information
                v-else
                label="Email Address"
                :value="user.email"
              />
            </div>

            <!-- Phone -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Phone Number"
                :modelValue="user.phone"
                @update:modelValue="(val) => user.phone = val"
                placeholder="Enter your phone number"
              />
              <Information
                v-else
                label="Phone Number"
                :value="user.phone"
              />
            </div>
          </div>

          <!-- Address -->
          <div class="address">
            <InputText
            id="address"
              v-if="isEditing"
              label="Address"
              :modelValue="user.address"
              @update:modelValue="(val) => user.address = val"
              placeholder="Enter your address"
            />
            <Information
              v-else
              label="Address"
              :value="user.address"
            />
          </div>

          <div class="input">
            <!-- Country -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Country"
                :modelValue="user.country"
                @update:modelValue="(val) => user.country = val"
                placeholder="Enter your country"
              />
              <Information
                v-else
                label="Country"
                :value="user.country"
              />
            </div>

            <!-- City -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="City/Province"
                :modelValue="user.city"
                @update:modelValue="(val) => user.city = val"
                placeholder="Enter your city"
              />
              <Information
                v-else
                label="City/Province"
                :value="user.city"
              />
            </div>
          </div>

          <div class="input">
            <!-- ID Card -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="National ID card"
                :modelValue="user.idCard"
                @update:modelValue="(val) => user.idCard = val"
                placeholder="Enter your id"
              />
              <Information
                v-else
                label="National ID card"
                :value="user.idCard"
              />
            </div>

            <!-- Passport -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Passport Number"
                :modelValue="user.passport"
                @update:modelValue="(val) => user.passport = val"
                placeholder="Enter your passport"
              />
              <Information
                v-else
                label="Passport Number"
                :value="user.passport"
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
            <!-- Vehicle Type -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Type of Vehicle"
                :modelValue="user.vehicleType"
                @update:modelValue="(val) => user.vehicleType = val"
                placeholder="Enter your vehicle's type"
              />
              <Information
                v-else
                label="Type of Vehicle"
                :value="user.vehicleType"
              />
            </div>

            <!-- Vehicle Name -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle Name"
                :modelValue="user.vehicleName"
                @update:modelValue="(val) => user.vehicleName = val"
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
            <!-- Vehicle Color -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle Color"
                :modelValue="user.vehicleColor"
                @update:modelValue="(val) => user.vehicleColor = val"
                placeholder="Enter your vehicle's color"
              />
              <Information
                v-else
                label="Vehicle Color"
                :value="user.vehicleColor"
              />
            </div>

            <!-- License Plate -->
            <div class="text">
              <InputText
                v-if="isEditing"
                label="Vehicle's License Plate"
                :modelValue="user.licensePlate"
                @update:modelValue="(val) => user.licensePlate = val"
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

<script>
import { ref, onMounted } from "vue";
import Information from "@/components/delivery/information.vue";
import SideBar from "@/components/delivery/sideBar.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import Text from "@/components/delivery/text.vue";
import InputText from "@/components/all/inputText.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import photo from "@/assets/delivery/images/1.png";

export default {
  name: "ProfilePage",
  components: {
    SideBar,
    Title,
    Box,
    Text,
    InputText,
    Information,
    GeneralButton,
  },
  setup() {
    const isEditing = ref(false);
    const uploading = ref(false);
    const defaultPhoto = photo;

    const user = ref({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      idCard: "",
      passport: "",
      vehicleType: "",
      vehicleName: "",
      vehicleColor: "",
      licensePlate: "",
      photo: "",
    });

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/driver/profile"
        );
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        user.value = data;
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    const saveUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/driver/profile",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user.value),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to save profile");
        }
        const updatedUser = await response.json();
        user.value = updatedUser;
      } catch (error) {
        console.error("Error saving profile:", error.message);
        alert("Error saving profile: " + error.message);
      }
    };

    const toggleEdit = async () => {
      if (isEditing.value) {
        await saveUserProfile();
      }
      isEditing.value = !isEditing.value;
    };

    const showDropzone = () => {
      uploading.value = true;
    };

    const hideDropzone = () => {
      uploading.value = false;
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

    const previewAndSetPhoto = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        user.value.photo = e.target.result;
        hideDropzone(); 
      };
      reader.readAsDataURL(file);
    };

    onMounted(fetchUserProfile);

    return {
      isEditing,
      user,
      uploading,
      showDropzone,
      hideDropzone,
      handleDrop,
      handleFileSelect,
      defaultPhoto,
      toggleEdit,
    };
  },
};
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
