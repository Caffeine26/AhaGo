<template>
  <div class="container">
    <Banner class="banner" imgSrc="../src/assets/delivery/images/image2.png">
    </Banner>
    <div class="content">
      <Article />
    </div>
  </div>
</template>
<script setup>
import Banner from "@/components/all/banner.vue";
import Article from "@/components/delivery/article.vue";
</script>
<style scoped>
.content {
  padding: 50px;
}
</style>
