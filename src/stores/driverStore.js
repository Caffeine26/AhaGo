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

  const sections = ref([]);
  const buttons = ref([]);
  const orders = ref([]);
  const notifications = ref([]);

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

      alert("Signup successful!");
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
        alert(`Welcome, ${data.user.name}`);
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
      orders.value = data;
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  }

  async function updateOrderStatus(id, status) {
    try {
      await api.patch(`/orders/${id}`, { status });

      // Remove the order from local list immediately
      orders.value = orders.value.filter((order) => order.id !== id);
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
  async function fetchNotifications(driverId) {
    try {
      const { data } = await api.get(`/notifications`);
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
    sections,
    buttons,
    orders,
    notifications,
    handleSignUp,
    handleLogin,
    fetchSections,
    fetchButtons,
    fetchOrders,
    updateOrderStatus,
    fetchNotifications,
  };
});
