<template>
  <div class="top-category">
    <div class="header">
      <h2>Top Category</h2>
      <button class="dropdown">This Month ⌄</button>
    </div>
    <Doughnut :data="chartData" :options="chartOptions" />
    <div class="legend">
      <div
        v-for="(item, index) in legendItems"
        :key="index"
        class="legend-item"
      >
        <div
          :style="{ backgroundColor: item.color }"
          class="legend-color"
        ></div>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <button class="see-more">See more</button>
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
  labels: ["Sea Food", "Beverage", "China Food", "Pizza", "Khmer Food"],
  datasets: [
    {
      data: [30, 20, 20, 15, 15],
      backgroundColor: ["#FFB6B6", "#FFA500", "#7B2CBF", "#2CA58D", "#FF0000"],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  cutout: "50%", // for donut style
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

const legendItems = [
  { label: "Sea Food", color: "#FFB6B6" },
  { label: "Beverage", color: "#FFA500" },
  { label: "China Food", color: "#7B2CBF" },
  { label: "Pizza", color: "#2CA58D" },
  { label: "Khmer Food", color: "#FF0000" },
];
</script>

<style scoped>
.top-category {
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 300px;
  height: 560px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown {
  background: #f1f1f1;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
}

.legend {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 15px;
  height: 15px;
  border-radius: 3px;
}

.see-more {
  margin-top: 15px;
  background-color: #ff3b30;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
