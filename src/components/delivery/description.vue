<template>
  <div class="container">
    <div class="svg" v-if="svg">
      <img :src="svg" alt="Description Icon" />
    </div>
    <SectionTitle :SectionTitle="SectionTitle" />
    <Text :text="text" />
  </div>
</template>

<script>
import SectionTitle from "./section_title.vue";
import Text from "./text.vue";

export default {
  name: "Description",
  props: {
    svg: String, // Resolved image path
    SectionTitle: String,
    text: String,
  },
  components: {
    SectionTitle,
    Text,
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 400px;
}
</style>
