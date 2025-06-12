<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
html, body, #app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 20px;
  height: 100%;
  margin: 0;
}

footer {
  background-color: #333;
  color: white;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
