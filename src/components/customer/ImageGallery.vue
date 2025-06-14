<template>
  <div class="image-gallery">
    <img class="main-img" :src="cover1" alt="main" />
    <div class="side-imgs">
      <img :src="cover2" alt="side1" />
      <img :src="cover3" alt="side2" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageGallery",
  props: {
    cover1: {
      type: String,
      required: true,
    },
    cover2: {
      type: String,
      required: true,
    },
    cover3: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.image-gallery {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.main-img {
  width: 60%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.side-imgs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
}

.side-imgs img {
  width: 100%;
  height: 195px;
  object-fit: cover;
  border-radius: 12px;
}
</style>
