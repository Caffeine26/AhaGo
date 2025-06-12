<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
  labels: ['Online order', 'Dine in', 'Take away'],
  datasets: [
    {
      label: 'Order Performance',
      data: [40, 30, 30],
      backgroundColor: ['#ffb400', '#ff3d57', '#e5e5e5'],
      borderColor: ['#fff'],
      borderWidth: 2,
    },
  ],
}

const chartOptions = {
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#000',
      },
    },
  },
}
</script>
