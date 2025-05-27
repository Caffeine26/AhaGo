<template>
  <div class="earnings">
    <div class="container">
      <Title class="title" title="Track your earnings" />
      <div class="content">
        <Box class="box">
          <div class="upper">
            <p class="completed">Completed orders</p>
            <ButtonFilter
              class="filter"
              v-model:value="selectedFilter"
              :options="filterOptions"
            />
          </div>
        </Box>
        <BarChart
          class="chart"
          :labels="chartLabels"
          :dataValues="chartValues"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import BarChart from "@/components/BarChart.vue";
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
</script>

<style scoped>
.earnings {
  display: flex;
}
.container {
  padding: 80px 20px 80px 80px;
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
  width: 90%;
}
</style>
