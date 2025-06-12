<template>
  <div class="order-type-graph">
    <h3 class="graph-title">Order Type Distribution</h3>
    <div
      v-for="(type, index) in orderTypes"
      :key="type.value"
      class="graph-row"
      @click="selectType(type.value)"
    >
      <span class="graph-label">{{ type.label }}</span>
      <div class="graph-bar-container">
        <div
          class="graph-bar"
          :style="{
            width: `${type.percentage}%`,
            backgroundColor: colors[index]
          }"
        ></div>
      </div>
      <span class="graph-percentage">{{ type.percentage }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTypeGraph',
  props: {
    orderData: {
      type: Object,
      default: () => ({
        walkIn: 45,
        takeAway: 30,
        onlineOrder: 25
      })
    }
  },
  data() {
    return {
      colors: ['#4CAF50', '#2196F3', '#FF9800'],
      selectedType: null
    }
  },
  computed: {
    totalOrders() {
      return Object.values(this.orderData).reduce((sum, val) => sum + val, 0)
    },
    orderTypes() {
      return [
        {
          value: 'walkIn',
          label: 'Walk In',
          count: this.orderData.walkIn,
          percentage: Math.round((this.orderData.walkIn / this.totalOrders) * 100)
        },
        {
          value: 'takeAway',
          label: 'Take Away',
          count: this.orderData.takeAway,
          percentage: Math.round((this.orderData.takeAway / this.totalOrders) * 100)
        },
        {
          value: 'onlineOrder',
          label: 'Online Order',
          count: this.orderData.onlineOrder,
          percentage: Math.round((this.orderData.onlineOrder / this.totalOrders) * 100)
        }
      ]
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type
      this.$emit('type-selected', type)
    }
  }
}
</script>

<style scoped>
.order-type-graph {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  max-width: none; /* remove fixed limit */
}

.graph-title {
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.graph-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  cursor: pointer;
}

.graph-label {
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: #444;
}

.graph-bar-container {
  flex: 1;
  height: 5px;
  background-color: #f0f0f0;
  border-radius: 6px;
  position: relative;
}

.graph-bar {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.graph-percentage {
  width: 40px;
  font-size: 14px;
  color: #333;
  text-align: left;
}
</style>
