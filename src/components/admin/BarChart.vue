<template>
  <div class="bar-chart-wrapper">
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'BarChart',
  data() {
    return {
      chartInstance: null,
      dates: [],
      values: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8300/api/orders/summary');
        const data = response.data.data;
        this.dates = data.dates || [];
        this.values = data.values || [];
        this.renderChart();
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    },
    renderChart() {
      this.$nextTick(() => {
        const canvas = this.$refs.barChartCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        // Color points based on order count changes
        const colors = this.values.map((val, idx) => {
          if (idx === 0) return '#4caf50'; // green for first point
          const prev = this.values[idx - 1];
          if (val > prev) return '#4caf50';       // green if increased
          else if (val < prev) return '#f44336';  // red if decreased
          else return '#9e9e9e';                   // gray if no change
        });

        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.dates,
            datasets: [{
              label: 'Orders Over Time',
              data: this.values,
              fill: false,
              borderColor: '#2196f3',
              backgroundColor: '#2196f3',
              tension: 0.3,
              borderWidth: 3,
              pointRadius: 8,
              pointHoverRadius: 12,
              pointBackgroundColor: colors,
              pointBorderColor: '#fff',
              pointBorderWidth: 3,
              hoverBackgroundColor: '#ffc107',
              hoverBorderColor: '#ffa000',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1, color: '#333', font: { size: 14 } },
                grid: { color: '#eee' }
              },
              x: {
                ticks: { color: '#333', font: { size: 14 } },
                grid: { color: '#eee' }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: '#2196f3',
                  font: { weight: 'bold', size: 16 }
                }
              },
              tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
                backgroundColor: '#2196f3',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                  label: ctx => `Orders: ${ctx.parsed.y}`
                }
              }
            },
            hover: { mode: 'nearest', intersect: true }
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.bar-chart-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}
</style>
