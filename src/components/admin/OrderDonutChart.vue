<template>
  <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, ArcElement
} from 'chart.js'

// Register chart.js modules
ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Reactive state
const orders = ref([])

// Computed dynamic chart data
const chartData = computed(() => {
  if (!orders.value.length) return null

  const counts = {
    delivery: 0,
    dinein: 0,
    takeaway: 0,
  }

  // Count order types
  orders.value.forEach(order => {
    const type = order.order_type?.toLowerCase()
    if (type === 'delivery') counts.delivery++
    else if (type === 'dine-in' || type === 'dinein') counts.dinein++
    else if (type === 'take-away' || type === 'takeaway') counts.takeaway++
  })

  return {
    labels: ['Delivery', 'Dine In', 'Take Away'],
    datasets: [
      {
        label: 'Order Performance',
        data: [counts.delivery, counts.dinein, counts.takeaway],
        backgroundColor: ['#ffb400', '#ff3d57', '#e5e5e5'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  }
})

// Chart options
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

// Fetch all orders from API
const fetchOrders = async () => {
  try {
    const res = await fetch('http://localhost:8300/api/orders') // replace with your real endpoint
    const json = await res.json()
    orders.value = json.data || []
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}

// Lifecycle hook
onMounted(() => {
  fetchOrders()
})
</script>
