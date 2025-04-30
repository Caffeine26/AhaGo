<template>
    <div class="star-rating">
      <svg
        v-for="index in totalStars"
        :key="index"
        @click="setRating(index)"
        @mouseover="hoverRating = index"
        @mouseleave="hoverRating = 0"
        class="star"
        :class="{ filled: (hoverRating || rating) >= index }"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="(hoverRating || rating) >= index ? '#FFD700' : '#757575'"
          d="M19.9996 28.7916L13.0829 32.9583C12.7773 33.1528 12.4579 33.2361 12.1246 33.2083C11.7912 33.1805 11.4996 33.0694 11.2496 32.875C10.9996 32.6805 10.8051 32.4378 10.6662 32.1467C10.5273 31.8555 10.4996 31.5289 10.5829 31.1667L12.4162 23.2916L6.29124 18C6.01346 17.75 5.84013 17.465 5.77124 17.145C5.70235 16.825 5.7229 16.5128 5.8329 16.2083C5.9429 15.9039 6.10957 15.6539 6.3329 15.4583C6.55624 15.2628 6.86179 15.1378 7.24957 15.0833L15.3329 14.375L18.4579 6.95831C18.5968 6.62498 18.8123 6.37498 19.1046 6.20831C19.3968 6.04165 19.6951 5.95831 19.9996 5.95831C20.304 5.95831 20.6023 6.04165 20.8946 6.20831C21.1868 6.37498 21.4023 6.62498 21.5412 6.95831L24.6662 14.375L32.7496 15.0833C33.1385 15.1389 33.444 15.2639 33.6662 15.4583C33.8885 15.6528 34.0551 15.9028 34.1662 16.2083C34.2773 16.5139 34.2985 16.8266 34.2296 17.1466C34.1607 17.4666 33.9868 17.7511 33.7079 18L27.5829 23.2916L29.4162 31.1667C29.4996 31.5278 29.4718 31.8544 29.3329 32.1467C29.194 32.4389 28.9996 32.6816 28.7496 32.875C28.4996 33.0683 28.2079 33.1794 27.8746 33.2083C27.5412 33.2372 27.2218 33.1539 26.9162 32.9583L19.9996 28.7916Z"
        />
      </svg>
      <p>Current Rating: {{ rating }}</p>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  const props = defineProps({
    totalStars: {
      type: Number,
      default: 5,
    },
    modelValue: {
      type: Number,
      default: 0,
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const rating = ref(props.modelValue);
  const hoverRating = ref(0);
  
  const setRating = (value) => {
    rating.value = value;
    emit('update:modelValue', value);
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  
  .star {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: lightgray;
    transition: color 0.2s;
  }
  
  .star.filled {
    color: gold;
  }
  </style>
  