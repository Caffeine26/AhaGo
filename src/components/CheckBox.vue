\<template>
  <label class="checkbox-container">
    <input type="checkbox" :checked="checked" @change="$emit('update:checked', $event.target.checked)" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
  },
};
</script>

<style scoped>
.checkbox-container {
  display: inline-block;
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  left: 0;
  top: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: orange;
  border-color: orange;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
