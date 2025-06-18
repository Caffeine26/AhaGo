<template>
  <div class="incoming-orders">
    <div class="contain">
      <div class="upper">
        <Title class="title" title="Incoming Orders" />
      </div>

      <div class="content">
        <Box v-for="order in driverStore.orders" :key="order.id" class="box">
          <div class="head"> Order #{{ order.id || "Delivery Request" }}</div>

          <div class="location">
            <p v-if="order.restaurant?.name" class="text">
            Pick up: {{ order.restaurant.name }}
          </p>
          <p class="text">||</p>
          <p v-if="order.customer.address" class="text">
            Destination: {{ order.customer.address }}
          </p>
          </div>
          <p v-if="order.customer_profile?.name" class="text">
            Customer: {{ order.customer_profile.name }}
          </p>

          <p class="link">Remark: {{ order.remark }}</p>

          <div v-if="order.status === 'pending'" class="bottom">
            <div class="buttons">
              <GeneralButton
                title="Accept"
                btnColor="#059669"
                titleColor="#fff"
                @click="handleAccept(order.id)"
              />
              <GeneralButton
                title="Reject"
                btnColor="#DC2626"
                titleColor="#fff"
                @click="handleReject(order.id)"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDriverStore } from "@/stores/driverStore";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import GeneralButton from "@/components/GeneralButton.vue";

const router = useRouter();
const driverStore = useDriverStore();
const isProcessing = ref(false);

const handleAccept = (orderId) => {
  updateOrderStatus(orderId, "accepted");
};

const handleReject = (orderId) => {
  updateOrderStatus(orderId, "rejected");
};

const updateOrderStatus = async (id, status) => {
  if (isProcessing.value) return;

  if (
    status === "rejected" &&
    !confirm("Are you sure you want to reject this order?")
  ) {
    return;
  }

  isProcessing.value = true;

  try {
    await fetch(`http://localhost:8300/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const order = driverStore.orders.find((o) => o.id === id);

    if (status === "accepted") {
      router.push({ name: "mapOrder", params: { id: order.id } });
    } else {
      await driverStore.fetchOrders(); // refresh orders after rejection
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    isProcessing.value = false;
  }
};

onMounted(() => {
  driverStore.fetchOrders();
});
</script>

<style scoped>
.incoming-orders {
  display: flex;
}
.contain {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
  width: 100%;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.upper {
  display: flex;
  justify-content: space-between;
}
.head {
  font-size: 20px;
  font-weight: 600;
}
.text {
  font-size: 18px;
  margin-bottom: 5px;
}
.link {
  color: gray;
  font-style: italic;
  text-decoration: underline;
  margin-bottom: 5px;
}
.box {
  padding: 30px 25px;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: end;
}
.buttons {
  display: flex;
  gap: 10px;
}
.content {
  padding: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}
.location {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
