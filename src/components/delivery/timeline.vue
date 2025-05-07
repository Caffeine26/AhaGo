<template>
  <div class="timeline">
    <Item
      v-for="(step, index) in steps"
      :key="index"
      :title="step.title"
      :description="step.description"
      :icon="step.icon"
      :last="index === steps.length - 1"
    />
  </div>
</template>

<script setup>
import Item from "@/components/delivery/item.vue";
import img from "@/assets/delivery/images/image copy.png";

const steps = [
  {
    title:
      'New to <span style="color: #c20000; font-weight: bold;">AhaGo</span> Delivery? Create an account now!',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    icon: img,
  },
  {
    title: "Log in",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    icon: img,
  },
  {
    title: "Deliver orders",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    icon: img,
  },
  {
    title: "Earn money",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    icon: img,
  },
];
</script>

<style scoped>
.timeline {
  margin-left: 40px;
}
</style>
