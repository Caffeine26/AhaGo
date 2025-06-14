<template>
  <nav class="breadcrumb">
    <span v-for="(crumb, index) in crumbs" :key="index">
      <span :class="{ active: index === crumbs.length - 1 }">
        {{ crumb.text }}
      </span>
      <span v-if="index !== crumbs.length - 1"> / </span>
    </span>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.breadcrumb .active {
  color: #111;
  font-weight: bold;
}
</style>
