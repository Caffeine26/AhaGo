<template>
  <div class="bar-chart-wrapper">
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: Object,
      default: () => ({
        dates: [],
        values: []
      })
    },
    chartLabel: {
      type: String,
      default: 'Orders Over Time'
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      immediate: true,
      handler() {
        this.renderChart();
      }
    }
  },
  methods: {
    renderChart() {
      this.$nextTick(() => {
        const canvas = this.$refs.barChartCanvas;
        if (!canvas) {
          console.error("Canvas not found");
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error("Canvas context not available");
          return;
        }

        if (this.chartInstance) {
          this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.chartData?.dates || [],
            datasets: [
              {
                label: this.chartLabel,
                data: this.chartData?.values || [],
                backgroundColor: '#3b82f6',
                borderRadius: 6,
                borderSkipped: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
      });
    }
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>

<style scoped>
/* .chart {
  background-color: white;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
} */
.bar-chart-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}
</style>
