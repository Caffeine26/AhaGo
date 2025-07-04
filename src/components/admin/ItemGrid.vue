<template>
  <div class="item-grid">
    <router-link
      v-for="item in items"
      :key="item.id"
      :to="{ name: 'MenuItemDetail', params: { id: item.id } }"
      class="item-card-link"
    >
      <div class="item-card">
        <img
          :src="getImageUrl(item.img_url)"
          alt="item image"
          class="item-image"
          @error="onImageError"
        />

        <h3 class="item-name">{{ item.name }}</h3>

        <p class="item-description">{{ item.description }}</p>

        <div class="item-bottom">
          <p class="item-price">Price: ${{ item.price }}</p>
          <div class="stars">
            <span v-for="star in 5" :key="star" class="star-img">
              <img
                :src="starImg"
                :style="{ opacity: star <= (item.rating || 0) ? 1 : 0.3 }"
                alt="star"
              />
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ItemGrid',
  props: {
    items: {
      type: Array,
      required: true,
    },
    starImg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      backendBaseUrl: 'http://localhost:8300', // Adjust to your backend base URL
      defaultImage: 'https://via.placeholder.com/400x200?text=No+Image',
    };
  },
  methods: {
    getImageUrl(imgUrl) {
      if (!imgUrl) {
        return this.defaultImage;
      }
      // Ensure the URL starts with a slash to properly concatenate
      const path = imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`;
      return `${this.backendBaseUrl}${path}`;
    },
    onImageError(event) {
      // If image fails to load, fallback to default image
      event.target.src = this.defaultImage;
    },
  },
};
</script>

<style scoped>
.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
}

.item-card-link {
  text-decoration: none;
  color: inherit;
}

.item-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-description {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 6px 0;
  flex-grow: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 0.9rem;
  color: #555;
  text-align: left;
}

.stars {
  display: flex;
  gap: 2px;
}

.star-img img {
  width: 16px;
  height: 16px;
}
</style>
