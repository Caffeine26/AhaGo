<template>
    <div class="text" v-html="text"></div>
</template>
<script>
export default {
  name: "Text",
  props: {
    text: String,
  },
};
</script>
<style scoped>
.text {
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 90vw;
  font-size: 24px;
  color: #464646;
  word-break: break-word; /* break long words if needed */
  overflow-wrap: break-word; /* wrap the text nicely */
}
</style>
