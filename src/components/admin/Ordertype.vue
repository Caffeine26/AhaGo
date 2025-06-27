<template>
  <div class="order-type-graph">
    <h3 class="graph-title">Order Type Distribution</h3>
    <div v-if="hasData">
      <div
        v-for="(item, index) in processedOrderData"
        :key="index"
        class="graph-row"
        @click="selectType(item.value)"
      >
        <span class="graph-label">{{ item.label }}</span>
        <div class="graph-bar-container">
          <div
            class="graph-bar"
            :style="{
              width: `${item.percentage}%`,
              backgroundColor: colors[index]
            }"
          ></div>
        </div>
        <span class="graph-percentage">{{ item.percentage }}%</span>
      </div>
    </div>
    <div v-else class="no-data-message">
      No order data available
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTypeGraph',
  props: {
    totalOrders: {
      type: Number,
      default: 0
    },
    orderData: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FF5722'], // Added more colors for flexibility
      selectedType: null
    }
  },
  computed: {
    hasData() {
      if (!this.orderData) return false
      if (Array.isArray(this.orderData)) return this.orderData.length > 0
      return Object.keys(this.orderData).length > 0
    },
    processedOrderData() {
      if (!this.hasData) return []

      // Handle array format
      if (Array.isArray(this.orderData)) {
        return this.orderData
          .filter(item => item && (item.total || item.total === 0))
          .map((item, index) => ({
            value: item.order_type || `type_${index}`,
            label: item.order_type || `Type ${index + 1}`,
            count: item.total || 0,
            percentage: this.calculatePercentage(item.total)
          }))
      }

      // Handle object format
      const defaultOrderTypes = {
        walkIn: 0,
        takeAway: 0,
        onlineOrder: 0
      }

      const safeData = { ...defaultOrderTypes, ...this.orderData }
      
      return [
        {
          value: 'walkIn',
          label: 'Walk In',
          count: safeData.walkIn,
          percentage: this.calculatePercentage(safeData.walkIn)
        },
        {
          value: 'takeAway',
          label: 'Take Away',
          count: safeData.takeAway,
          percentage: this.calculatePercentage(safeData.takeAway)
        },
        {
          value: 'onlineOrder',
          label: 'Online Order',
          count: safeData.onlineOrder,
          percentage: this.calculatePercentage(safeData.onlineOrder)
        }
      ].filter(item => item.count > 0) // Only show types with data
    }
  },
  methods: {
    calculatePercentage(count) {
      const total = Math.max(1, this.totalOrders) // Ensure we never divide by zero
      return Math.round((count / total) * 100)
    },
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
  width: 100%;
  max-width: 400px;
  min-height: 200px;
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
  margin-bottom: 15px;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.graph-row:hover {
  transform: translateX(5px);
}

.graph-label {
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: #444;
  font-weight: 500;
}

.graph-bar-container {
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.graph-bar {
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s ease, background-color 0.3s ease;
}

.graph-percentage {
  width: 40px;
  font-size: 14px;
  color: #333;
  text-align: left;
  font-weight: bold;
}

.no-data-message {
  text-align: center;
  color: #888;
  padding: 20px;
  font-style: italic;
}

@media (max-width: 768px) {
  .order-type-graph {
    padding: 15px;
    max-width: 100%;
  }
  
  .graph-row {
    margin-bottom: 12px;
  }
  
  .graph-label {
    width: 80px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .graph-title {
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .graph-row {
    gap: 8px;
  }
  
  .graph-percentage {
    width: 35px;
    font-size: 13px;
  }
}
</style>