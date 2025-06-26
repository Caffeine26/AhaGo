<template>
  <div class="order-type-graph">
    <h3 class="graph-title">Order Type Distribution</h3>
    <div
      v-for="(item, index) in orderData"
      :key="item.order_type"
      class="graph-row"
      @click="selectType(item.order_type)"
    >
      <span class="graph-label">{{ item.order_type }}</span>
      <div class="graph-bar-container">
        <div
          class="graph-bar"
          :style="{
            width: `${percentage[index]}%`,
            backgroundColor: colors[index]
          }"
        ></div>
      </div>
      <span class="graph-percentage">{{ percentage[index] }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderTypeGraph',
  props: {
    totalOrders: Number,
    orderData: Array,
    // orderData: {
    //   type: Object,
    //   default: () => ({
    //     walkIn: 45,
    //     takeAway: 30,
    //     onlineOrder: 25
    //   })
    // }
  },
  created() {
    for(let item of this.orderData) {
      this.percentage.push(Math.round((item.total / this.totalOrders) * 100))
    }
  },
  data() {
    return {
      percentage: [],
      colors: ['#4CAF50', '#2196F3', '#FF9800'],
      selectedType: null
    }
  },
  
  computed: {
    // toPercentage(amount) {
    //   console.log('totalorders=', this.totalOrders)
    //   console.log('amount=', amount)
    //   return Math.round((amount / this.totalOrders) * 100)
    // },
    // totalOrders() {
    //   return Object.values(this.orderData).reduce((sum, val) => sum + val, 0)
    // },
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
