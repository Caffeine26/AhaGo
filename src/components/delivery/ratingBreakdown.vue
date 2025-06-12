<template>
  <div class="rating-breakdown">
    <div
      v-for="(item, index) in computedRatings"
      :key="index"
      class="rating-row"
    >
      <div class="label">{{ item.label }}</div>
      <div class="bar-container">
        <div class="bar" :style="{ width: item.percentage + '%' }"></div>
      </div>
      <div class="count">{{ item.count }}</div>
      <div class="comment-icon" v-if="item.comments > 0">
        💬 {{ item.comments }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const ratingData = [
  { label: "5 stars", count: 46, comments: 2 },
  { label: "4 stars", count: 24, comments: 0 },
  { label: "3 stars", count: 17, comments: 0 },
  { label: "2 stars", count: 11, comments: 3 },
  { label: "1 star", count: 3, comments: 8 },
];

const total = ratingData.reduce((sum, r) => sum + r.count, 0);

const computedRatings = computed(() =>
  ratingData.map((r) => ({
    ...r,
    percentage: total ? Math.round((r.count / total) * 100) : 0,
  }))
);
</script>

<style scoped>
.rating-breakdown {
  width: 100%;
  max-width: 420px;
  font-family: Arial, sans-serif;
}

.rating-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.label {
  width: 70px;
  font-size: 14px;
  flex-shrink: 0;
}

.bar-container {
  width: 160px; /* Fixed width so all bars are the same */
  height: 10px;
  background-color: #e0e0e0;
  margin: 0 10px;
  border-radius: 5px;
  position: relative;
}

.bar {
  height: 100%;
  background-color: #2c2c38;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.count {
  width: 30px;
  font-size: 14px;
  text-align: right;
  flex-shrink: 0;
}

.comment-icon {
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  color: #333;
  width: 30px;
  flex-shrink: 0;
}

.comment-icon::before {
  /* content: "💬"; */
  margin-right: 4px;
}
</style>
