<template>
  <div class="link" @click="goTo">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    to: String, // receives the route to navigate to
  },
  methods: {
    goTo() {
      if (this.to) {
        this.$router.push(this.to);
      }
    },
  },
};
</script>

<style scoped>
.link {
  color: #9a0404;
  font-style: italic;
  font-weight: 400;
  text-decoration: underline;
  font-size: 22px;
  cursor: pointer;
}
</style>
