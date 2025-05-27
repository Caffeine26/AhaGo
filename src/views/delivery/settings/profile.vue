<template>
  <div class="profile">
    <!-- <SideBar :defaultActive="'Edit Profile'" /> -->
    <div class="contain">
      <Title class="title" title="Edit Profile" />
      <div class="content">
        <div class="image">
          <img
            class="pic"
            :src="user.photo || defaultPhoto"
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
            <img src="@/assets/delivery/icons/cloud.svg" />
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
              :title="isEditing ? 'Save' : 'Edit'"
              btnColor="#9a0404"
              titleColor="#ffffff"
              @click="toggleEdit"
            />
          </div>
          <div class="input">
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              :label="'First Name'"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.firstname,
                      'onUpdate:modelValue': ($event) =>
                        (user.firstname = $event),
                      placeholder: 'Enter your first name',
                    }
                  : { value: user.firstname }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Last Name"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.lastname,
                      'onUpdate:modelValue': ($event) =>
                        (user.lastname = $event),
                      placeholder: 'Enter your last name',
                    }
                  : { value: user.lastname }
              "
            />
          </div>

          <div class="input">
            <component
              class="email"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Email Address"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.email,
                      'onUpdate:modelValue': ($event) => (user.email = $event),
                      placeholder: 'Enter your email address',
                    }
                  : { value: user.email }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Phone Number"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.phone,
                      'onUpdate:modelValue': ($event) => (user.phone = $event),
                      placeholder: 'Enter your phone number',
                    }
                  : { value: user.phone }
              "
            />
          </div>

          <div class="address">
            <component
              :is="isEditing ? 'InputText' : 'Information'"
              label="Address"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.address,
                      'onUpdate:modelValue': ($event) =>
                        (user.address = $event),
                      placeholder: 'Enter your address',
                    }
                  : { value: user.address }
              "
            />
          </div>

          <div class="input">
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Country"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.country,
                      'onUpdate:modelValue': ($event) =>
                        (user.country = $event),
                      placeholder: 'Enter your country',
                    }
                  : { value: user.country }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="City/Province"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.city,
                      'onUpdate:modelValue': ($event) => (user.city = $event),
                      placeholder: 'Enter your city',
                    }
                  : { value: user.city }
              "
            />
          </div>

          <div class="input">
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="National ID card"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.idCard,
                      'onUpdate:modelValue': ($event) => (user.idCard = $event),
                      placeholder: 'Enter your id',
                    }
                  : { value: user.idCard }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Passport Number"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.passport,
                      'onUpdate:modelValue': ($event) =>
                        (user.passport = $event),
                      placeholder: 'Enter your passport',
                    }
                  : { value: user.passport }
              "
            />
          </div>
        </Box>

        <!-- Vehicle Info -->
        <Box class="box">
          <div class="personal">
            <Text class="head" text="Vehicle Information" />
          </div>
          <div class="input">
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Type of Vehicle"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.vehicleType,
                      'onUpdate:modelValue': ($event) =>
                        (user.vehicleType = $event),
                      placeholder: 'Enter your vehicle\'s type',
                    }
                  : { value: user.vehicleType }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Vehicle Name"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.vehicleName,
                      'onUpdate:modelValue': ($event) =>
                        (user.vehicleName = $event),
                      placeholder: 'Enter your vehicle\'s name',
                    }
                  : { value: user.vehicleName }
              "
            />
          </div>
          <div class="input">
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Vehicle Color"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.vehicleColor,
                      'onUpdate:modelValue': ($event) =>
                        (user.vehicleColor = $event),
                      placeholder: 'Enter your vehicle\'s color',
                    }
                  : { value: user.vehicleColor }
              "
            />
            <component
              class="text"
              :is="isEditing ? 'InputText' : 'Information'"
              label="Vehicle's License Plate"
              v-bind="
                isEditing
                  ? {
                      modelValue: user.licensePlate,
                      'onUpdate:modelValue': ($event) =>
                        (user.licensePlate = $event),
                      placeholder: 'Enter your license plate',
                    }
                  : { value: user.licensePlate }
              "
            />
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
      hideDropzone();
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
  width: 100%;
}
.input {
  width: 88%;
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
  grid-template-columns: repeat(auto-fit, minmax(845px, 845px));
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
