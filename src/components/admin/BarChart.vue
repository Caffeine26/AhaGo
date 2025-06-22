<template>
  <div class="chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    ordersData: Object
  },
  data() {
    return {
      staticData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        values: [12, 19, 3, 5, 2, 3]
      }
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.ordersData.dates,
        datasets: [{
          label: 'Orders',
          data: this.ordersData.orders,
          backgroundColor: '#FF0000',
          borderRadius: 12,
          barThickness: 40
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Orders Overview',
            align: 'start',
            color: 'black',
            font: {
              family: 'Raleway',
              size: 20,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 32
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'black'
            }
          },
          y: {
            ticks: {
              color: 'black'
            },
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
</style>