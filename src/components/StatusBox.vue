<template>
  <div :class="['status', statusClass]">
    {{ statusText }}
  </div>
</template>

<script>
export default {
  props: {
    statusId: {
      type: Number,
      required: true
    }
  },
  computed: {
    statusText() {
      switch (this.statusId) {
        case 1:
          return "Available";
        case 2:
          return "Out of stock";
        default:
          return "Pending";
      }
    },
    statusClass() {
      switch (this.statusId) {
        case 1:
          return "available";
        case 2:
          return "out";
        default:
          return "pending";
      }
    }
  }
};
</script>

<style scoped>
.status {
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  width: fit-content;
  font-family: 'Raleway';
  font-size: 12px;
  border-radius: 20px;
  border: 2px solid;
}

.available {
  color: green;
  border-color: green;
}

.out {
  color: red;
  border-color: red;
}

.pending {
  color: orange;
  border-color: orange;
}
</style>
  