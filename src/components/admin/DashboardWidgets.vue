<template>
  <div class="widget-grid">
    <div
      class="widget"
      :style="{ border: '2px solid #2196F3' }"
    >
      <div class="widget-header">
        <div class="widget-icon">
          <img src="@/assets/icons/orders.png" alt="Orders Icon" class="icon-img" />
        </div>
        <div class="widget-options">⋮</div>
      </div>
      <div class="widget-body">
        <div class="widget-value">200</div>
        <div class="widget-label">Total orders</div>
      </div>
    </div>

    <div class="widget">
      <div class="widget-header">
        <div class="widget-icon">
          <img src="@/assets/icons/processes.png" alt="Process Icon" class="icon-img" />
        </div>
        <div class="widget-options">⋮</div>
      </div>
      <div class="widget-body">
        <div class="widget-value">50</div>
        <div class="widget-label">On Process</div>
      </div>
    </div>

    <div class="widget">
      <div class="widget-header">
        <div class="widget-icon">
          <img src="@/assets/icons/completed.png" alt="Completed Icon" class="icon-img" />
        </div>
        <div class="widget-options">⋮</div>
      </div>
      <div class="widget-body">
        <div class="widget-value">100</div>
        <div class="widget-label">Completed</div>
      </div>
    </div>

    <div class="widget">
      <div class="widget-header">
        <div class="widget-icon">
          <img src="@/assets/icons/cancels.png" alt="Cancel Icon" class="icon-img" />
        </div>
        <div class="widget-options">⋮</div>
      </div>
      <div class="widget-body">
        <div class="widget-value">50</div>
        <div class="widget-label">Cancel</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-grid {
   display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  gap: 16px;
  max-width: 600px; /* Optional: constrain width */
  margin: 0 auto; /* Center the grid */
}

.widget {
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.widget-icon {
  width: 32px;
  height: 32px;
}

.icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.widget-options {
  color: #777;
  font-size: 18px;
  cursor: pointer;
}

.widget-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.widget-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.widget-label {
  font-size: 14px;
  color: #555;
}
</style>

<script>
export default {
  name: 'DashboardWidgets',
}
</script>
