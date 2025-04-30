<template>
<div class="chart">
    <Bar :data="chartData" :options="chartOptions" />
</div>

</template>

<script>
//   install chart.js and vue-chartjs libs first
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
    labels: {
    type: Array,
    required: true
    },
    dataValues: {
    type: Array,
    required: true
    }
},
computed: {
    chartData() {
    return {
        labels: this.labels,
        datasets: [
        {
            label: 'data',
            data: this.dataValues,
            backgroundColor: '#FF0000',
            borderRadius: 12,
            barThickness: 70
        }
        ]
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
            }
        }
        }
    }
    }
}
}
</script>

<style scoped>
.chart {
    background-color: #D9D9D9;
    padding: 24px;
    border-radius: 20px;
}
</style>