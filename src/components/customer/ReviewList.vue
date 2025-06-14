<template>
  <div class="review-section">
    <div class="review-header">
      <span>Review</span>
      <div class="sort-dropdown">
        <select v-model="selectedSort" @change="onSortChange">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
    </div>
    <div class="review-list">
      <ReviewItem
        v-for="review in sortedReviews"
        :key="review.id"
        :review="review"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ReviewItem from "./ReviewItem.vue";

export default {
  name: "ReviewList",
  components: {
    ReviewItem,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const selectedSort = ref("newest");

    const sortedReviews = computed(() => {
      let sorted = [...props.reviews];
      switch (selectedSort.value) {
        case "newest":
          // Assuming reviews have a time property that can be parsed
          return sorted.sort((a, b) => new Date(b.time) - new Date(a.time));
        case "oldest":
          return sorted.sort((a, b) => new Date(a.time) - new Date(b.time));
        case "highest":
          return sorted.sort((a, b) => b.rating - a.rating);
        case "lowest":
          return sorted.sort((a, b) => a.rating - b.rating);
        default:
          return sorted;
      }
    });

    const onSortChange = () => {
      // Triggered when sort option changes
    };

    return {
      selectedSort,
      sortedReviews,
      onSortChange,
    };
  },
};
</script>

<style scoped>
.review-section {
  flex: 1;
  padding: 1rem 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sort-dropdown select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
