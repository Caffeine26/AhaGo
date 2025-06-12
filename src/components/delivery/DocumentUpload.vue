<template>
  <div class="upload-box">
    <label>{{ label }}</label>

    <div v-if="file">
      <a :href="file" target="_blank">View Uploaded Document</a>
    </div>

    <input type="file" @change="handleFileChange" />
    
    <div class="status" v-if="status">
      Status: <span :class="status.toLowerCase()">{{ status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    file: String,
    status: String,
  },
  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      this.$emit("upload", file);
    },
  },
};
</script>

<style scoped>
.status {
  margin-top: 8px;
  font-weight: bold;
}
.status .approved {
  color: green;
}
.status .pending {
  color: orange;
}
.status .rejected {
  color: red;
}
.upload-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
