<template>
  <div class="dashboard-stats">
    <div class="card" v-for="stat in stats" :key="stat.label">
      <div class="icon">
        <i :class="stat.icon"></i>
      </div>
      <div class="info">
        <h4>{{ stat.label }}</h4>
        <p>{{ stat.value }}</p>
        <small :class="stat.trend > 0 ? 'positive' : 'negative'">
          {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardStats',
  props: {
    stats: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.dashboard-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.card {
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.icon {
  font-size: 30px;
  color: #f39c12;
  margin-right: 15px;
}
.info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}
.info p {
  margin: 4px 0;
  font-size: 20px;
}
small {
  font-size: 12px;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
