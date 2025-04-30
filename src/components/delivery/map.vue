<template>
    <div class="map-container" ref="mapElement"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';
  
  const mapElement = ref(null);
  
  onMounted(() => {
    const map = L.map(mapElement.value).setView([11.5564, 104.9282], 13); // Phnom Penh as default
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
  });
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
  }
  </style>
  