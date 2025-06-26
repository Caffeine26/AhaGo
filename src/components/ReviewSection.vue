<template>
  <div class="review-section">
    <div class="review-header">
      <h3>Review</h3>
      <div class="sort-options">
        <span>Sort by:</span>
        <ButtonFilter :options="sortOptions" v-model="selectedSortOption" @update-value="sortReviews" />
      </div>
    </div>

    <div class="review-card" v-for="(review, index) in reviews" :key="review.id">
      <img :src="avatar" alt="User" class="avatar" />
      <div class="review-content">
        <div class="review-user">
          <h4>Customer ID: {{ review.customer_id }}</h4>
          <!-- <span class="review-count">{{ review.reviewCount }} Reviews</span> -->
        </div>
        <div class="review-meta">
          <span class="delivery">comment on: </span>
          <span class="time">{{ formatTime(review.created_at) }}</span>
        </div>
        <div class="rating">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{ filled: n <= review.rating }"
          >★</span>
        </div>
        <p class="comment">{{ review.comment }}</p>
        <div class="actions">
          <img
            :src="review.isHeartFilled ? heart2 : heart1"
            alt="Helpful"
            class="action-icon"
            @click="toggleHeart(review)"
          />
          <img
            :src="commentIcon"
            alt="Comment"
            class="action-icon"
            @click="toggleCommentInput(index)"
          />
          <img
            :src="shareIcon"
            alt="Share"
            class="action-icon"
          />
        </div>

        <!-- Comment Input Box -->
        <div v-if="review.showCommentInput" class="comment-input-box">
          <input
            v-model="review.newReply"
            type="text"
            placeholder="Write a comment..."
            class="comment-input"
          />
          <button @click="postReply(index)" class="comment-button">Post</button>
        </div>

        <!-- Display Replies -->
        <div v-if="review.replies && review.replies.length" class="replies">
          <div class="reply" v-for="(reply, rIndex) in review.replies" :key="rIndex">
            <strong>You:</strong> {{ reply }}

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonFilter from './ButtonFilter.vue';
import Mymelody from '@/assets/Mymelody.jpg';
import heart1 from '@/assets/heart1.png';
import heart2 from '@/assets/heart2.png';
import comment from '@/assets/comment.png';
import share from '@/assets/share.png';

export default {
  name: 'ReviewSection',
  components: { ButtonFilter },
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      avatar: Mymelody,
      heart1,
      heart2,
      commentIcon: comment,
      shareIcon: share,
      selectedSortOption: 'newest',
      sortOptions: [
        { value: 'oldest', label: 'Oldest Reviews' },
        { value: 'newest', label: 'New Reviews' },
      ],
    };
  },
  methods: {
    formatTime(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
    sortReviews(selectedOption) {
      if (!this.reviews) return;
      if (selectedOption === 'newest') {
        this.reviews.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (selectedOption === 'oldest') {
        this.reviews.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      }
    },
    toggleHeart(review) {
      this.$set(review, 'isHeartFilled', !review.isHeartFilled);
    },
    toggleCommentInput(index) {
      this.$set(this.reviews[index], 'showCommentInput', !this.reviews[index].showCommentInput);
    },
    postReply(index) {
      const review = this.reviews[index];
      if (review.newReply && review.newReply.trim()) {
        if (!review.replies) this.$set(review, 'replies', []);
        review.replies.push(review.newReply.trim());
        review.newReply = '';
        review.showCommentInput = false;
      }
    },
  },
  watch: {
    selectedSortOption(newVal) {
      this.sortReviews(newVal);
    },
  },
  mounted() {
    // Initial sort when component mounts
    this.sortReviews(this.selectedSortOption);
  },
};
</script>

<style scoped>
* {
  font-family: 'Raleway';
}
.review-section {
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding-top: 50px;
}
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 16px 0;
}
.review-header h3 {
  text-decoration: underline;
}
.sort-options {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.review-card {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
.review-content {
  flex: 1;
}
.review-user {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}
.review-meta {
  margin-top: 4px;
  color: #666;
  font-size: 14px;
}
.rating {
  margin: 8px 0;
  color: gold;
}
.star {
  font-size: 16px;
  color: #ccc;
}
.star.filled {
  color: gold;
}
.comment {
  margin: 8px 0;
  font-size: 15px;
  line-height: 1.5;
}
.actions {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #555;
  margin-top: 8px;
  cursor: pointer;
}
.action-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.comment-input-box {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.comment-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.comment-button {
  padding: 6px 12px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.replies {
  margin-top: 10px;
  padding-left: 10px;
}
.reply {
  font-size: 14px;
  color: #333;
  padding: 4px 0;
  border-left: 2px solid #1e88e5;
  padding-left: 8px;
}
</style>
