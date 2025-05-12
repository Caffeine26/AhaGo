<template>
  <div class="graph-card">
    <div class="graph-header">
      <div>
        <h3 class="graph-title">{{ title }}</h3>
        <p class="graph-value">{{ value }}</p>
      </div>
      <select v-model="selectedPeriod" class="period-select">
        <option value="last-month">Last Month</option>
        <option value="last-8-months">Last 8 Months</option>
      </select>
    </div>
    <div class="graph-container">
      <svg :width="width" :height="height + 30" class="line-graph">
        <!-- Y-Axis Labels -->
        <text v-for="(line, index) in gridLines" :key="'label-' + index" :x="padding - 10" :y="line" text-anchor="end"
          alignment-baseline="middle" class="axis-label">
          {{ formatYAxisLabel(index) }}
        </text>

        <!-- X-Axis Labels -->
        <text v-for="(month, index) in months" :key="'month-' + index"
          :x="padding + (index * (width - padding * 2) / (months.length - 1))" :y="height - 10" text-anchor="middle"
          class="axis-label">
          {{ month }}
        </text>

        <!-- Grid Lines -->
        <line v-for="(line, index) in gridLines" :key="'grid-' + index" :x1="padding" :x2="width - padding" :y1="line"
          :y2="line" stroke="#E5E7EB" stroke-width="1" />

        <!-- Line Path -->
        <path :d="pathData" fill="none" stroke="#FF0000" stroke-width="2" />

        <!-- Data Points -->
        <circle v-for="(point, index) in dataPoints" :key="'point-' + index" :cx="point.x" :cy="point.y" r="4"
          fill="white" stroke="#FF0000" stroke-width="2" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineGraph',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    months: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedPeriod: 'last-month',
      width: 600,
      height: 300,
      padding: 40
    }
  },
  methods: {
    formatYAxisLabel(index) {
      const max = Math.max(...this.data)
      const value = (max / 4) * (4 - index)
      if (value >= 1000) {
        return Math.round(value / 1000) + 'K'
      }
      return Math.round(value)
    }
  },
  computed: {
    gridLines() {
      const lines = []
      const step = (this.height - this.padding * 2) / 4
      for (let i = 0; i <= 4; i++) {
        lines.push(this.padding + step * i)
      }
      return lines
    },
    dataPoints() {
      if (!this.data || !this.months || this.data.length !== this.months.length) {
        return [];
      }
      const xStep = (this.width - this.padding * 2) / (this.data.length - 1)
      return this.data.map((value, index) => ({
        x: this.padding + xStep * index,
        y: this.height - (value / Math.max(...this.data) * (this.height - this.padding * 2) + this.padding)
      }))
    },
    pathData() {
      if (!this.dataPoints.length) {
        return '';
      }
      return this.dataPoints.reduce((path, point, index) => {
        return path + (index === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`)
      }, '')
    }
  }
}
</script>

<style scoped>
.graph-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.graph-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.graph-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.graph-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0 0;
}

.period-select {
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: white;
}

.graph-container {
  width: 100%;
  overflow-x: auto;
}

.axis-label {
  font-size: 12px;
  fill: #666;
}

.line-graph {
  width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>