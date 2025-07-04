import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8300/api",
});

export const useAuthStore = defineStore("auth", () => {
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const user = ref(null);
  const role = ref("");

  // Storage keys based on role
  const getKey = (type, userRole) => `${userRole}_${type}`;

  function getDashboardPath(role) {
    switch (role) {
      case "driver":
        return "/delivery/overview";
      case "restaurant":
        return "/owner/home";
      case "customer":
        return "/";
      default:
        return "/login";
    }
  }

  async function handleSignUp(userRole, profileData = {}) {
    try {
      let payload = {
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        role: userRole,
      };

      if (userRole === "driver") {
        payload.name = `${firstName.value} ${lastName.value}`;
        payload.first_name = firstName.value;
        payload.last_name = lastName.value;
        payload.driver_profile = profileData;
      } else if (userRole === "restaurant") {
        payload.name = firstName.value;
        payload.address = profileData.address;
        payload.phone_number = profileData.phone_number;
        payload.restaurant_profile = profileData.restaurant_profile || {};
      } else if (userRole === "customer") {
        payload.name = `${firstName.value} ${lastName.value}`;
        payload.first_name = firstName.value;
        payload.last_name = lastName.value;
        payload.customer_profile = profileData;
      }

      const response = await api.post("/signup", payload);
      const data = response.data;

      localStorage.setItem(getKey("token", userRole), data.token);
      localStorage.setItem(getKey("user", userRole), JSON.stringify(data.user));
      localStorage.setItem("role", userRole); // current active role

      role.value = userRole;
      user.value = data.user;

      router.push(getDashboardPath(userRole));
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || "Unknown error"));
    }
  }

  async function handleLogin(userRole) {
    try {
      const response = await api.post(`/${userRole}/login`, {
        email: email.value,
        password: password.value,
      });

      const data = response.data;

      if (data.user) {
        localStorage.setItem(getKey("token", userRole), data.token);
        localStorage.setItem(getKey("user", userRole), JSON.stringify(data.user));
        localStorage.setItem("role", userRole); // current active role

        role.value = userRole;
        user.value = data.user;

        router.push(getDashboardPath(userRole));
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
    }
  }

  async function fetchProfile() {
    try {
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(getKey("token", userRole));

      if (!token || !userRole) {
        logout();
        return;
      }

      const { data } = await api.get("/auth/currentUser", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const currentUser = data.user;

      if (userRole === "driver") {
        user.value = {
          id: currentUser.id,
          email: currentUser.email,
          address: currentUser.address,
          phone: currentUser.phone_number,
          img_src: currentUser.img_src,
          firstname: currentUser.driver_profile?.first_name,
          lastname: currentUser.driver_profile?.last_name,
          idCard: currentUser.driver_profile?.id_card,
          vehicleType: currentUser.driver_profile?.vehicle_type,
          vehicleName: currentUser.driver_profile?.vehicle_name,
          vehicleColor: currentUser.driver_profile?.vehicle_color,
          licensePlate: currentUser.driver_profile?.license_plate,
          driver_id: currentUser.driver_profile?.id,
        };
      } else if (userRole === "restaurant") {
        user.value = {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone_number,
          address: currentUser.address,
          img_src: currentUser.img_src,
          restaurant_id: currentUser.restaurant_profile?.id,
        };
        console.log('user value for rest=', user.value.restaurant_id)
        return  user.value.restaurant_id
      } else if (userRole === "customer") {
        user.value = {
          id: currentUser.id,
          email: currentUser.email,
          firstname: currentUser.customer_profile?.first_name,
          lastname: currentUser.customer_profile?.last_name,
          phone: currentUser.phone_number,
          address: currentUser.address,
          img_src: currentUser.img_src,
          customer_id: currentUser.customer_profile?.id,
          gender: currentUser.gender,
          latitude: currentUser.latitude,
          longitude: currentUser.longitude,
        };
      }

      role.value = userRole;
    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data || error.message);
      logout();
    }
  }

  async function saveUserProfile() {
    try {
      const currentRole = role.value;
      const token = localStorage.getItem(getKey("token", currentRole));

      if (!user.value || !currentRole || !token) {
        console.warn("Missing user, role, or token");
        return;
      }

      const commonFields = {
        email: user.value.email,
        phone_number: user.value.phone,
        address: user.value.address,
        img_src: user.value.img_src,
      };

      let profileFields = {};

      if (currentRole === "driver") {
        profileFields.driver_profile = {
          first_name: user.value.firstname || "",
          last_name: user.value.lastname || "",
          id_card: user.value.idCard || null,
          vehicle_type: user.value.vehicleType || null,
          vehicle_name: user.value.vehicleName || null,
          vehicle_color: user.value.vehicleColor || null,
          license_plate: user.value.licensePlate || null,
        };
      } else if (currentRole === "restaurant") {
        profileFields.restaurant_profile = {
          name: user.value.name || "",
          address: user.value.address || "",
          phone_number: user.value.phone || "",
        };
      } else if (currentRole === "customer") {
        const custProfile = {
          first_name: user.value.firstname || "",
          last_name: user.value.lastname || "",
          gender: user.value.gender || "unspecified",
        };
        
        if (user.value.latitude !== null && user.value.latitude !== undefined && user.value.latitude !== "") {
          custProfile.latitude = String(user.value.latitude);
        }
        
        if (user.value.longitude !== null && user.value.longitude !== undefined && user.value.longitude !== "") {
          custProfile.longitude = String(user.value.longitude);
        }
        
        profileFields.customer_profile = custProfile;
      };

      // Send the full merged payload to update endpoint
      await api.put(`/${currentRole}/profile`, {
        ...commonFields,
        ...profileFields,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to save profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  }


  async function uploadPhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const currentRole = role.value; // Ensure role exists
      if (!currentRole) {
        throw new Error("User role is not defined.");
      }

      // Retrieve the token for the current role
      const token = localStorage.getItem(getKey("token", currentRole));
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Dynamically build the API endpoint based on the role
      const endpoint = `/photo-upload`;

      // Make the POST request to the server
      const { data } = await api.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update the user image source (if user is available)
      if (user.value) {
        user.value.img_src = data.img_src;
      }

      return data.img_src;
    } catch (error) {
      console.error("Photo upload failed:", error.response?.data || error.message);

      // Optionally, handle specific error cases here
      if (error.response && error.response.status === 400) {
        alert("Bad Request: " + error.response.data?.message);
      } else {
        alert("An error occurred while uploading the photo. Please try again.");
      }

      // Rethrow the error if needed
      throw error;
    }
  }

  function logout() {
    const currentRole = role.value;
    localStorage.removeItem(getKey("token", currentRole));
    localStorage.removeItem(getKey("user", currentRole));
    localStorage.removeItem("role");
    user.value = null;
    role.value = "";
    router.push("/login");
  }

  return {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    user,
    role,
    handleSignUp,
    handleLogin,
    fetchProfile,
    saveUserProfile,
    uploadPhoto,
    logout,
  };
});
