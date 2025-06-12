<template>
  <div>
    <Box class="box" @click="showModal = true">
      <div class="left">
        <div class="up">
          <div class="row">
            <Title :title="rating.toFixed(1)" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="gold"
                d="M21.12 9.88a.74.74 0 0 0-.6-.51l-5.42-.79l-2.43-4.91a.78.78 0 0 0-1.34 0L8.9 8.58l-5.42.79a.74.74 0 0 0-.6.51a.75.75 0 0 0 .18.77L7 14.47l-.93 5.4a.76.76 0 0 0 .3.74a.75.75 0 0 0 .79.05L12 18.11l4.85 2.55a.73.73 0 0 0 .35.09a.8.8 0 0 0 .44-.14a.76.76 0 0 0 .3-.74l-.94-5.4l3.93-3.82a.75.75 0 0 0 .19-.77"
              />
            </svg>
            <div class="by">based on {{ total }} ratings</div>
          </div>
        </div>
        <div class="down"></div>
      </div>
      <div class="right">
        <ratingBreakdown />
      </div>
    </Box>

    <!-- Modal for Review Section -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <button class="close-button" @click="showModal = false">✕</button>
        <ReviewSection />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Box from "@/components/delivery/box.vue";
import Title from "@/components/delivery/title.vue";
import ratingBreakdown from "@/components/delivery/ratingBreakdown.vue";
import ReviewSection from "@/components/ReviewSection.vue"; 

defineProps({
  rating: Number,
  total: Number,
});

const showModal = ref(false);
</script>

<style scoped>
.left {
  display: flex;
}
.row {
  display: flex;
  align-items: center;
  gap: 20px;
}
.box {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-height: 90vh;
  width: 90%;
  overflow-y: auto;
  position: relative;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 14px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
