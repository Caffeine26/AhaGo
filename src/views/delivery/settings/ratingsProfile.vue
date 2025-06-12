<template>
  <div class="customer">
    <div class="container">
      <Title class="title" title="Customer Satisfaction" />

      <div class="content">
        <Text text="Overall ratings from customers" />
        <Rate :rating="4.4" :total="98" />
      </div>

      <div class="content">
        <Text text="Overall ratings from restaurants" />
        <Rate :rating="4.4" :total="98" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/delivery/title.vue";
import Text from "@/components/delivery/text.vue";
import Rate from "@/components/delivery/rate.vue";
</script>

<style scoped>
.customer {
  display: flex;
}
.container {
  padding: 80px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.content {
  margin-bottom: 20px;
}
</style>
