import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8300/api",
});

export const useOrderStore = defineStore("order", () => {
  const orders = ref([]);
  const currentOrder = ref(null);

  async function fetchOrders(status = null, role = null) {
    try {
      let url = "/orders";
      const params = [];

      if (status) params.push(`status=${status}`);
      if (role) params.push(`role=${role}`);

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await api.get(url);
      const result = response.data.data || response.data; 

      if (!Array.isArray(result)) {
        console.error("Expected array, got:", result);
        orders.value = [];
        return;
      }

      orders.value = result.map((order) => ({
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
      }));
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
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
          restaurantAddress: order.restaurant?.user?.address || "-",
          restaurantLocation: {
            lat: parseFloat(order.restaurant?.latitude) || 0,
            lng: parseFloat(order.restaurant?.longitude) || 0,
          },
          clientName:
            `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`.trim() || "Customer",
          clientAddress: order.customer?.user?.address || "-",
          clientLocation: {
            lat: parseFloat(order.customer?.latitude) || 0,
            lng: parseFloat(order.customer?.longitude) || 0,
          },
        },
      };
    } catch (error) {
      console.error("Failed to fetch order:", error.response?.data || error.message);
    }
  }

  async function updateOrderStatus(id, status) {
    try {
      await api.patch(`/orders/${id}`, { status });
      orders.value = orders.value.filter((order) => order.id !== id);
    } catch (error) {
      console.error("Failed to update order status:", error.response?.data || error.message);
      throw error;
    }
  }

  return {
    orders,
    currentOrder,
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
  };
});
