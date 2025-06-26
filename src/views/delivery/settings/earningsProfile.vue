<template>
  <div class="earnings">
    <div class="container">
      <Title class="title" title="Track your earnings" />
      <div class="content">
        <!-- Summary Section -->
        <div class="summary">
          <div class="summary-item">
            <p class="label">Total Earnings</p>
            <p class="value">${{ totalEarnings.toFixed(2) }}</p>
          </div>
          <div class="summary-item">
            <p class="label">Completed Orders</p>
            <p class="value">{{ completedOrders }}</p>
          </div>
          <div class="summary-item">
            <p class="label">Bonuses</p>
            <p class="value">${{ bonuses.toFixed(2) }}</p>
          </div>
        </div>
        <!-- Aggregated Earnings List by Type -->
        <ButtonFilter
          class="filter"
          v-model:value="selectedFilter"
          :options="filterOptions"
        />
        <Box class="earnings-list">
          <!-- Table Header -->
          <div class="earning-header">
            <div>Source</div>
            <div>Transactions</div>
            <div>Today's Earnings</div>
            <div>Overall Earnings</div>
          </div>

          <!-- Aggregated Rows -->
          <div
            class="earning-row"
            v-for="(summary, index) in earningsSummary"
            :key="index"
          >
            <div class="source">{{ summary.source }}</div>
            <div>{{ summary.count }}</div>
            <div>${{ summary.total.toFixed(2) }}</div>
            <div>${{ summary.total.toFixed(2) }}</div>
          </div>
        </Box>

<BarChart
  class="chart"
  :ordersData="{ dates: chartLabels, orders: chartValues }"
/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDriverStore } from "@/stores/driverStore";
import BarChart from "@/components/admin/BarChart.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import ButtonFilter from "@/components/ButtonFilter.vue";
import { useAuthStore } from "@/stores/authenticationStore";

const driverStore = useDriverStore();
const authStore = useAuthStore();
const chartLabels = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
const chartValues = ref([10, 20, 15, 30, 25, 5, 12]);

const selectedFilter = ref("Today");
const filterOptions = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "Last Month", label: "Last Month" },
];

// Computed list of completed orders
const completedOrderList = computed(() =>
  driverStore.orders.filter(
    (order) =>
      order.status === "completed" &&
      order.driver_id === driverStore.user?.driver_id
  )
);

// Count of completed orders
const completedOrders = computed(() => completedOrderList.value.length);

// Per order delivery earning
const deliveryEarningPerOrder = 0.75;

// Dynamic bonus: $1 for every 5 completed orders
const bonuses = computed(() => {
  const bonusCount = Math.floor(completedOrders.value / 5);
  return bonusCount * 1.0;
});

// Total earnings
const totalEarnings = computed(
  () => completedOrders.value * deliveryEarningPerOrder + bonuses.value
);

// Earnings list ($0.75 per completed order)
const earnings = computed(() =>
  completedOrderList.value.map((order) => ({
    id: order.id,
    date: order.updated_at || order.created_at,
    source: "Delivery",
    amount: deliveryEarningPerOrder,
  }))
);

// Earnings summary by type
const earningsSummary = computed(() => {
  const summary = new Map();

  for (const e of earnings.value) {
    if (!summary.has(e.source)) {
      summary.set(e.source, { source: e.source, count: 0, total: 0 });
    }
    const item = summary.get(e.source);
    item.count += 1;
    item.total += e.amount;
  }

  if (bonuses.value > 0) {
    summary.set("Bonuses", {
      source: "Bonuses",
      count: Math.floor(completedOrders.value / 5),
      total: bonuses.value,
    });
  }

  return Array.from(summary.values());
});

// Fetch data on mount
onMounted(async () => {
  await authStore.fetchProfile();
  driverStore.user = authStore.user;
  await driverStore.fetchOrders();
});
</script>

<style scoped>
.earnings {
  display: flex;
}
.container {
  padding: 80px 40px 80px 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.completed {
  font-size: 18px;
  font-weight: 500;
}
.upper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box {
  padding: 20px;
  width: 30%;
}
.chart {
  width: 95%;
}
.filter {
  display: flex;
  justify-content: end;
}
.summary {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.summary-item {
  background: #f7f7f7;
  padding: 16px;
  border-radius: 10px;
  flex: 1;
}
.summary-item .label {
  font-size: 14px;
  color: #666;
}
.summary-item .value {
  font-size: 22px;
  font-weight: bold;
  color: #222;
}
.earning-header {
  display: flex;
  font-weight: bold;
  justify-content: space-between;
}
.earnings-list {
  display: flex;
  width: 95%;
  flex-direction: column;
  gap: 10px;
}
.earning-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 16px;
}
.source {
  width: 40px;
}
</style>
