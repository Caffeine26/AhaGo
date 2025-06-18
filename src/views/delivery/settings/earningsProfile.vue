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
          <div class="summary-item">
            <p class="label">Tips</p>
            <p class="value">${{ tips.toFixed(2) }}</p>
          </div>
        </div>

        <BarChart
          class="chart"
          :labels="chartLabels"
          :dataValues="chartValues"
        />

        <!-- Aggregated Earnings List by Type -->
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
            <!-- Same as today's for now -->
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BarChart from "@/components/admin/BarChart.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import ButtonFilter from "@/components/ButtonFilter.vue";

const chartLabels = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
const chartValues = ref([10, 20, 15, 30, 25, 5, 12]);

const selectedFilter = ref("Today");

const filterOptions = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "Last Month", label: "Last Month" },
];

// Summary data
const totalEarnings = ref(345.0);
const completedOrders = ref(23);
const bonuses = ref(25.0);
const tips = ref(30.0);

// Earnings list
const earnings = ref([
  { id: 1, date: "2025-06-10", source: "Delivery", amount: 25.0 },
  { id: 2, date: "2025-06-10", source: "Tip", amount: 5.0 },
  { id: 3, date: "2025-06-09", source: "Bonus", amount: 10.0 },
  { id: 4, date: "2025-06-08", source: "Delivery", amount: 20.0 },
  { id: 5, date: "2025-06-08", source: "Tip", amount: 14.0 },
]);

const earningsSummary = computed(() => {
  const map = new Map();
  for (const e of earnings.value) {
    if (!map.has(e.source)) {
      map.set(e.source, { source: e.source, count: 0, total: 0 });
    }
    const item = map.get(e.source);
    item.count += 1;
    item.total += e.amount;
  }
  return Array.from(map.values());
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
/* 🔽 Added Styles Below */
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
