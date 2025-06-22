<template>
  <div class="review-item">
    <div class="review-user">
      <img :src="review.avatar" class="user-avatar" />
      <div class="user-info">
        <div class="user-name">{{ review.name }}</div>
        <div class="user-reviews">{{ review.reviews }} Reviews</div>
      </div>
    </div>
    <div class="review-type">{{ review.type }}</div>
    <div class="review-time">{{ review.time }}</div>

    <!-- Use RateStar component here -->
    <RateStar
      :modelValue="review.rating"
      :totalStars="5"
      :static="true"
    />

    <div class="review-comment">{{ review.comment }}</div>
    <div class="review-actions">
      <button class="action-link">👍 Helpful</button>
      <button class="action-link">💬 Comment</button>
      <button class="action-link">↗️ Share</button>
    </div>
  </div>
</template>

<script>
import RateStar from "@/components/all/rateStar.vue"; // adjust the path as necessary

export default {
  name: "ReviewItem",
  components: {
    RateStar,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.review-item {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.review-user {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #111;
}

.user-reviews {
  font-size: 0.9rem;
  color: #666;
}

.review-type {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.review-time {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.review-rating {
  color: #fbbf24;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #fbbf24;
}

.review-comment {
  color: #111;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.review-actions {
  display: flex;
  gap: 1rem;
}

.action-link {
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.action-link:hover {
  color: #b91c1c;
}
</style>
