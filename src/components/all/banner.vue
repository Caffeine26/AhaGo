<template>
  <div class="container">
    <img :src="imgSrc" alt="Banner Image" />
    <div class="overlay"></div>
    <div class="content">
      <slot></slot>
      <!-- Allows injecting custom content -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  height: 500px;
  overflow: hidden;
  z-index: 1;
}

img {
  width: 100vw;
  height: 500px;
  object-fit: cover;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.content {
  width: 60%;
  padding: 50px;
  position: absolute;
  top: -10%;
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  z-index: 3;
  /* color: white; */
  font-weight: 700;
}
</style>
