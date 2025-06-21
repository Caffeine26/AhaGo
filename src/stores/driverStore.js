import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8300/api",
});

export const useDriverStore = defineStore("driver", () => {
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const user = ref(null);
  const sections = ref([]);
  const buttons = ref([]);
  const orders = ref([]);
  const notifications = ref([]);
  const currentOrder = ref(null);

  async function handleSignUp() {
    try {
      const response = await api.post("/signup", {
        name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        role: "driver",
        first_name: firstName.value,
        last_name: lastName.value,
      });
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", "driver");
      router.push("/delivery/overview");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(
        "Signup failed: " + (error.response?.data?.message || "Unknown error")
      );
    }
  }

  async function handleLogin() {
    try {
      const { data } = await api.post("/driver/login", {
        email: email.value,
        password: password.value,
      });

      if (data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", "driver");
        router.push("/delivery/overview");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Unable to connect. Please try again.");
    }
  }

  async function fetchDriverProfile() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const { data } = await api.get("/auth/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const profile = data.user.driver_profile;

      user.value = {
        id: data.user.id,
        email: data.user.email,
        address: data.user.address,
        phone: data.user.phone_number,
        img_src: data.user.img_src,
        firstname: profile.first_name,
        lastname: profile.last_name,
        idCard: profile.id_card,
        vehicleType: profile.vehicle_type,
        vehicleName: profile.vehicle_name,
        vehicleColor: profile.vehicle_color,
        licensePlate: profile.license_plate,
        driver_id: profile.id,
      };
    } catch (error) {
      console.error(
        "Failed to fetch driver profile:",
        error.response?.data || error.message
      );
    }
  }

  async function saveUserProfile() {
    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        email: user.value.email,
        phone_number: user.value.phone,
        address: user.value.address,
        img_src: user.value.img_src,
        driver_profile: {
          first_name: user.value.firstname,
          last_name: user.value.lastname,
          id_card: user.value.idCard,
          vehicle_type: user.value.vehicleType,
          vehicle_name: user.value.vehicleName,
          vehicle_color: user.value.vehicleColor,
          license_plate: user.value.licensePlate,
        },
      };

      await api.put("/driver/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error(
        "Failed to save driver profile:",
        error.response?.data || error.message
      );
      alert("Failed to update profile.");
    }
  }
  async function uploadPhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post("/driver/photo-upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user img_src with returned URL
      if (user.value) {
        user.value.img_src = data.img_src;
      }

      return data.img_src;
    } catch (error) {
      console.error(
        "Photo upload failed:",
        error.response?.data || error.message
      );
      throw error; // rethrow so component can catch if needed
    }
  }
  async function fetchSections() {
    try {
      const { data } = await api.get("/driver-sections");
      sections.value = data.map((section) => ({
        ...section,
        linkTo: section.link_to,
        buttons: section.buttons.map((btn) => ({
          ...btn,
          imageSrc: btn.img_src,
        })),
      }));
    } catch (error) {
      console.error(
        "Error fetching sections:",
        error.response?.data || error.message
      );
    }
  }

  async function fetchButtons() {
    try {
      const { data } = await api.get("/driver-buttons");
      buttons.value = data;
    } catch (error) {
      console.error(
        "Error fetching buttons:",
        error.response?.data || error.message
      );
    }
  }

  async function fetchOrders(status = null) {
    try {
      const url = status ? `/orders?status=${status}` : "/orders";
      const { data } = await api.get(url);

      // Parse coordinates as numbers to avoid map issues
      orders.value = data.map((order) => {
        return {
          ...order,
          restaurant: {
            ...order.restaurant,
            latitude: parseFloat(order.restaurant.latitude),
            longitude: parseFloat(order.restaurant.longitude),
          },
          customer: {
            ...order.customer,
            latitude: parseFloat(order.customer.latitude),
            longitude: parseFloat(order.customer.longitude),
          },
        };
      });
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  }

  async function fetchOrderById(id) {
    try {
      const { data } = await api.get(`/orders/${id}`);
      const order = data.data;

      currentOrder.value = {
        id: order.id,
        status: order.status,
        remark: order.remark,
        totalAmount: parseFloat(order.total_amount),
        createdAt: order.created_at,
        orderItems: (order.order_items || []).map((item) => ({
          id: item.id,
          foodItemId: item.food_item_id,
          orderId: item.order_id,
          quantity: item.quantity,
          price: item.price !== null ? parseFloat(item.price) : 0,
          name: item.food_item?.name || "Unknown",
          img_url: item.food_item?.img_url || "Unknown",
        })),
        details: {
          restaurantName: order.restaurant?.name || "Restaurant",
          restaurantAddress: order.restaurant?.user?.address || "-", // your data shows no user on restaurant, so this fallback
          restaurantLocation: {
            lat: parseFloat(order.restaurant?.latitude) || 0,
            lng: parseFloat(order.restaurant?.longitude) || 0,
          },
          clientName:
            `${order.customer?.first_name || ""} ${
              order.customer?.last_name || ""
            }`.trim() || "Customer",
          clientAddress: order.customer?.user?.address || "-", // your data shows customer.user.address exists
          clientLocation: {
            lat: parseFloat(order.customer?.latitude) || 0,
            lng: parseFloat(order.customer?.longitude) || 0,
          },
        },
      };
    } catch (error) {
      console.error(
        "Failed to fetch order:",
        error.response?.data || error.message
      );
    }
  }
  async function updateOrderStatus(id, status) {
    try {
      await api.patch(`/orders/${id}`, { status });
      // Remove locally updated order so UI refreshes correctly
      orders.value = orders.value.filter((order) => order.id !== id);
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async function fetchNotifications() {
    try {
      const driverId = user.value?.driver_id;

      if (!driverId) {
        console.warn("No driver ID found, cannot fetch notifications.");
        notifications.value = [];
        return;
      }

      const { data } = await api.get(`/notifications?driver_id=${driverId}`);

      notifications.value = data;
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error.response?.data || error.message
      );
    }
  }

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    user,
    sections,
    buttons,
    orders,
    notifications,
    currentOrder,
    handleSignUp,
    handleLogin,
    fetchDriverProfile,
    fetchSections,
    fetchButtons,
    fetchOrders,
    updateOrderStatus,
    fetchNotifications,
    saveUserProfile,
    uploadPhoto,
    fetchOrderById,
  };
});
