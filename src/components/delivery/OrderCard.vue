<template>
  <div class="container">
    <div class="left">
      <img class="image" :src="imgSrc" :alt="title"/>
      <div class="content">
        <p class="title">{{ title }}</p>
        <p>x{{ amount }}</p>
      </div>
    </div>
    <div class="price">$ {{ price }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: "",
  },
  price: {
    type: Number,
    default: "",
  },
  imgSrc: {
    type: String,
    default: "",
  },
});
</script>
<style scoped>
.container {
  height: 100px;
  display: flex;
  justify-content: space-between;
}
.image {
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
.content,
.price {
  padding: 10px;
}
.title {
  font-size: 20px;
}
p {
  margin: 5px;
}
.left {
  display: flex;
  justify-content: center;
}
</style>