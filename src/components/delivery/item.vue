<template>
  <div class="step-row">
    <div class="step-icon">
      <img :src="icon" alt="icon" />
    </div>
    <div class="step-line">
      <div class="dot"></div>
      <div v-if="!last" class="line"></div>
    </div>
    <div class="step-content">
      <h3 v-html="title"></h3>
      <Text :text="description" />
    </div>
  </div>
</template>

<script setup>
import Text from "./text.vue";
defineProps({
  title: String,
  description: String,
  icon: String,
  last: Boolean,
});
</script>

<style scoped>
.step-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;
}

.step-icon {
  display: flex;
  margin-right: 80px;
  border: #292929 solid 1px;
  border-radius: 20px;
}

.step-icon img {
  width: 300px;
  height: 260px;
  object-fit: contain;
}

.step-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
  margin-right: 80px;
}

.dot {
  width: 25px;
  height: 25px;
  background-color: #9a0404;
  border-radius: 50%;
  z-index: 1;
  margin-bottom: 4px;
}

.line {
  border-radius: 5px;
  width: 2px;
  height: 40vh;
  background-color: #9a0404;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #222;
}
.step-content p {
  margin-top: 6px;
  font-size: 24px;
  color: #555;
}
</style>
