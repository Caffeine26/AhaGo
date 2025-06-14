<template>
  <div class="action-buttons">
    <GeneralButton
      title="Direction"
      btnColor="#fff"
      titleColor="#b91c1c"
      @click="$emit('direction')"
    />
    <GeneralButton
      title="Share"
      btnColor="#fff"
      titleColor="#b91c1c"
      @click="$emit('share')"
    />
    <GeneralButton
      title="Reviews"
      btnColor="#fff"
      titleColor="#b91c1c"
      @click="$emit('reviews')"
    />
  </div>
</template>

<script>
import GeneralButton from "@/components/GeneralButton.vue";

export default {
  name: "ActionButtons",
  components: {
    GeneralButton,
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
</style>
