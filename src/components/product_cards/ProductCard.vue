<template>
  <div class="product-card">
    <button
      class="favorite-btn"
      :class="{ active: isFavorite }"
      @click.stop="toggleFavorite"
      aria-label="Add to favorites"
    >
      <svg v-if="isFavorite" width="28" height="28" fill="#e6007a" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg v-else width="28" height="28" fill="none" stroke="#e6007a" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
    <img :src="image" :alt="title" class="product-image">
    <div class="product-info">
      <div class="product-header">
        <h3 class="product-title">{{ title }}</h3>
        <div class="product-rating">
          <span class="rating-star">⭐</span> {{ rating }}
        </div>
      </div>
      <p class="product-price">{{ category }} • Delivery: ${{ deliveryPrice.toFixed(2) }}</p>
      <div class="product-delivery-info">
        <span class="delivery-time">🕒 {{ deliveryTime }}</span>
        <span class="delivery-price">🏍️ ${{ deliveryPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
  title: {
    type: String,
    default: 'Unnamed Restaurant'
  },
  image: {
    type: String,
    default: '/placeholder.png'
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  deliveryTime: {
    type: String,
    default: '20-30 min'
  },
  deliveryPrice: {
    type: Number,
    default: 0.0
  },
  rating: {
    type: Number,
    default: 4.5
  },
  productId: {
    type: [String, Number],
    required: true
  },
  favorites: {
    type: Array,
    default: () => []
  }
},
  data() {
    return {
      isFavorite: false,
      favoriteIds: []
    }
  },
  watch: {
    favorites: {
      immediate: true,
      handler(newVal) {
        this.isFavorite = newVal.includes(this.productId)
      }
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      this.$emit('toggle-favorite', this.productId, this.isFavorite)
      if (this.isFavorite) {
        this.favoriteIds.push(this.productId)
      } else {
        this.favoriteIds = this.favoriteIds.filter(id => id !== this.productId)
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  position: relative;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.product-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #6b7280; /* Gray 500 */
}

.rating-star {
  color: #ffc107; /* Amber color for the star */
}

.product-price {
  font-size: 0.9rem;
  color: #6b7280; /* Gray 500 */
  margin: 0.25rem 0;
}

.product-delivery-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #6b7280; /* Gray 500 */
}

.delivery-time,
.delivery-price {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9A0404;
}

.delivery-star {
  color: #9A0404;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
  z-index: 2;
}
.favorite-btn.active svg {
  fill: #9A0404;
  stroke: #9A0404;
}
.favorite-btn svg {
  display: block;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0.7rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.header-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.logo {
  height: 38px;
}
.brand {
  font-size: 1.6rem;
  font-weight: bold;
  color: #b91c1c;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.header-icon {
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 50%;
  transition: background 0.2s;
}
.header-icon:hover {
  background: #f3f3f3;
}
</style>