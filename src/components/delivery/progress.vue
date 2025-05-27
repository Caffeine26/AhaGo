<template>
  <div class="delivery-progress">
    <div class="labels">
      <span
        v-for="(step, index) in steps"
        :key="index"
        :class="{ active: currentStep === index }"
        @click="setStep(index)"
        :ref="(el) => (stepRefs.value[index] = el)"
      >
        {{ step }}
      </span>
    </div>
    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{
          left: fillLeft + 'px',
          width: fillWidth + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";

const steps = [
  "Delivering by rickshaw",
  "Delivering by tuktuk",
  "Delivering by motorbike",
];

const currentStep = ref(0);
const stepRefs = ref({});
const fillLeft = ref(0);
const fillWidth = ref(0);

function setStep(index) {
  currentStep.value = index;
  updateFillPosition();
}

function updateFillPosition() {
  nextTick(() => {
    const el = stepRefs.value[currentStep.value];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      fillLeft.value = offsetLeft;
      fillWidth.value = offsetWidth;
    }
  });
}

onMounted(() => {
  nextTick(updateFillPosition);
});
</script>

<style scoped>
.delivery-progress {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.labels {
  gap: 20px;
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 8px;
  /* font-weight: bold; */
  font-size: 24px;
  position: relative;
}

.labels span {
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
  padding: 4px 8px;
  width: 300px;
}

.labels span.active {
  color: #000;
}

.progress-bar {
  position: relative;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
}

.progress-fill {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #9a0404;
  border-radius: 3px;
  transition: all 0.3s ease;
  /* REMOVE this line ↓ */
  /* width: 300px; */
}
</style>
