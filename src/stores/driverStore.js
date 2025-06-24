import { defineStore } from "pinia";
import { ref } from "vue";
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
    fetchSections,
    fetchButtons,
    fetchOrders,
    updateOrderStatus,
    fetchNotifications,
    fetchOrderById,
  };
});