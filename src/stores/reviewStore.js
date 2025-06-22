import { defineStore } from 'pinia';
import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import avatar3 from "@/assets/avatars/avatar3.png";

export const useReviewStore = defineStore('reviewStore', {
  state: () => ({
    reviews: [
      {
        id: 1,
        name: "Garima",
        avatar: avatar1,
        rating: 4,
        time: "1 hour ago",
        type: "Delivery",
        comment:
          "Absolutely delicious! The shrimp is perfectly cooked, bursting with flavor, and seasoned to perfection.",
        reviews: 4,
      },
      {
        id: 2,
        name: "Cheegy",
        avatar: avatar2,
        rating: 4,
        time: "1 hour ago",
        type: "Delivery",
        comment:
          "Whether grilled, buttered, or in a spicy sauce, their shrimp dishes are simply irresistible!",
        reviews: 4,
      },
      {
        id: 3,
        name: "Malina",
        avatar: avatar3,
        rating: 4,
        time: "1 hour ago",
        type: "Delivery",
        comment:
          "If you're a seafood lover, this is a must-try. Highly recommended!",
        reviews: 4,
      },
    ]
  }),
  actions: {
    addReview(review) {
      this.reviews.unshift({ ...review, id: this.reviews.length + 1, time: 'Just now' });
    }
  }
}); 