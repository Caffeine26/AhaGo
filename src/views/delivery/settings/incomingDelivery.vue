<template>
  <div class="incoming-orders">
    <div class="contain">
      <div class="upper">
        <Title class="title" title="Incoming Orders" />
      </div>

      <div class="content">
        <Box v-for="order in incomingOrders" :key="order.id" class="box">
          <div class="head">{{ order.title || "Delivery Request" }}</div>

          <p v-if="order.details?.pickUp" class="text">
            Pick up: {{ order.details.pickUp }}
          </p>
          <p v-if="order.details?.destination" class="text">
            Destination: {{ order.details.destination }}
          </p>
          <p v-if="order.details?.customer" class="text">
            Customer: {{ order.details.customer }}
          </p>

          <p class="text">{{ order.message }}</p>

          <div v-if="order.status === 'pending'" class="bottom">
            <div class="buttons">
              <StatusAction
                :statusId="0"
                @accept="() => handleAccept(order.id)"
                @reject="() => handleReject(order.id)"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; 
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import StatusAction from "@/components/StatusAction.vue";
const router = useRouter(); 

const incomingOrders = ref([]);

const fetchIncomingOrders = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/incoming-orders"
    );
    console.log("Fetched incoming orders:", data); // <-- add this line
    incomingOrders.value = data;
  } catch (error) {
    console.error("Failed to fetch incoming orders:", error);
  }
};
const handleAccept = (orderId) => {
  updateOrderStatus(orderId, "accepted");
};

const handleReject = (orderId) => {
  updateOrderStatus(orderId, "rejected");
};

const isProcessing = ref(false);

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
    await axios.patch(`http://localhost:4000/api/incoming-orders/${id}`, {
      status,
    });

    const order = incomingOrders.value.find((o) => o.id === id);

    if (status === "accepted") {
      router.push({
        name: "mapOrder", // Make sure this route name is defined in your router
        query: {
          orderId: order.id,
          restaurantLat: order.details.restaurantLocation.lat,
          restaurantLng: order.details.restaurantLocation.lng,
          clientLat: order.details.clientLocation.lat,
          clientLng: order.details.clientLocation.lng,
        },
      });
    } else {
      await fetchIncomingOrders(); // refresh list after rejection
    }
  } catch (error) {
    console.error("Failed to update order status:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    isProcessing.value = false;
  }
};

watch(fetchIncomingOrders);
onMounted(fetchIncomingOrders);
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
}
.link {
  color: #9a0404;
  font-style: italic;
}
.link {
  text-align: right;
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
</style>
