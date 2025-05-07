<template>
    <div class="review-card border rounded-lg p-4 shadow-md bg-white">
      <div class="flex items-center mb-2">
        <img :src="avatar" alt="User avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <p class="font-semibold">{{ name }} - {{ date }}</p>
          <div class="flex items-center">
            <span v-for="star in 5" :key="star" class="text-yellow-400">
              <svg
                v-if="star <= rating"
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </span>
            <span class="ml-2 text-gray-600">{{ rating }}/5</span>
          </div>
        </div>
      </div>
      <p class="text-gray-800">{{ review }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReviewCard',
    props: {
      name: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      review: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        default: 'https://via.placeholder.com/40' // Placeholder image if none provided
      }
    }
  }
  </script>
  
  <style scoped>
  .review-card {
    max-width: 400px;
  }
  </style>